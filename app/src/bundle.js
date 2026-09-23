"use strict";

/* The app never opens files straight from disk: it serves a content bundle
 * (the seed shipped in the package, or a version downloaded over OTA) through
 * bitsy://app/. That keeps the origin — and the localStorage holding saved
 * games — the same across content versions. */

var crypto = require("node:crypto");
var fs = require("node:fs");
var fsp = require("node:fs/promises");
var path = require("node:path");
var { Readable, Transform } = require("node:stream");
var { pipeline } = require("node:stream/promises");
var { app, net } = require("electron");

var MANIFEST_NAME = "ota-manifest.json";
var STATE_NAME = "state.json";
var MANIFEST_SCHEMA = 1;
var DOWNLOAD_CONCURRENCY = 6;
var MANIFEST_TIMEOUT_MS = 8000;
var FILE_TIMEOUT_MS = 60000;
var DOWNLOAD_ATTEMPTS = 2;

var activeBundle = null;

/* ---------- paths ---------- */

function seedDir() {
	return app.isPackaged
		? path.join(process.resourcesPath, "seed")
		: path.join(__dirname, "..", "seed");
}

function bundlesDir() {
	return path.join(app.getPath("userData"), "bundles");
}

function statePath() {
	return path.join(app.getPath("userData"), STATE_NAME);
}

/* ---------- manifest ---------- */

function isSafeRelativePath(value) {
	return typeof value === "string"
		&& value.length > 0
		&& !value.startsWith("/")
		&& !value.includes("\0")
		&& !value.includes("\\")
		&& !value.split("/").some(function (part) { return part === "" || part === "." || part === ".."; });
}

function parseManifest(text) {
	var manifest = JSON.parse(text);
	if (manifest.schema !== MANIFEST_SCHEMA) {
		throw new Error("schema de manifesto não suportado: " + manifest.schema);
	}
	if (typeof manifest.version !== "string" || typeof manifest.id !== "string" || typeof manifest.createdAt !== "string") {
		throw new Error("manifesto incompleto");
	}
	if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
		throw new Error("manifesto sem arquivos");
	}
	for (var i = 0; i < manifest.files.length; i++) {
		var file = manifest.files[i];
		if (!file || !isSafeRelativePath(file.path) || !/^[0-9a-f]{64}$/.test(file.sha256) || !Number.isInteger(file.size) || file.size < 0) {
			throw new Error("entrada de arquivo inválida no manifesto: " + JSON.stringify(file));
		}
	}
	return manifest;
}

async function readManifest(dir) {
	var text = await fsp.readFile(path.join(dir, MANIFEST_NAME), "utf8");
	return parseManifest(text);
}

async function isFile(target) {
	try {
		return (await fsp.stat(target)).isFile();
	}
	catch (err) {
		return false;
	}
}

/** null if the bundle is missing or incomplete on disk */
async function loadBundle(dir) {
	var manifest;
	try {
		manifest = await readManifest(dir);
	}
	catch (err) {
		return null;
	}
	for (var i = 0; i < manifest.files.length; i++) {
		if (!await isFile(path.join(dir, manifest.files[i].path))) {
			return null;
		}
	}
	return { dir: dir, manifest: manifest };
}

/* ---------- state ---------- */

async function readState() {
	try {
		var state = JSON.parse(await fsp.readFile(statePath(), "utf8"));
		return state && typeof state === "object" ? state : {};
	}
	catch (err) {
		return {};
	}
}

async function writeState(patch) {
	var next = Object.assign({}, await readState(), patch);
	var tmp = statePath() + ".tmp";
	await fsp.writeFile(tmp, JSON.stringify(next, null, "\t") + "\n");
	await fsp.rename(tmp, statePath());
	return next;
}

/* ---------- lifecycle ---------- */

async function init() {
	await fsp.mkdir(bundlesDir(), { recursive: true });

	var seed = await loadBundle(seedDir());
	if (!seed) {
		throw new Error("seed ausente ou incompleto em " + seedDir() + " — rode `npm run prepare-seed`");
	}

	var state = await readState();
	var installed = null;
	if (typeof state.active === "string") {
		installed = await loadBundle(path.join(bundlesDir(), state.active));
		if (!installed) {
			await writeState({ active: null });
		}
	}

	activeBundle = installed || seed;
	await cleanup(installed ? state.active : null);
	return activeBundle;
}

function active() {
	if (!activeBundle) {
		throw new Error("bundle não inicializado");
	}
	return activeBundle;
}

/** absolute path, or null when invalid or missing */
async function resolveFile(urlPath) {
	var rel;
	try {
		rel = decodeURIComponent(urlPath);
	}
	catch (err) {
		return null;
	}
	rel = rel.replace(/^\/+/, "");
	if (rel === "") {
		rel = "index.html";
	}
	var root = path.resolve(active().dir);
	var target = path.resolve(root, rel);
	if (target !== root && !target.startsWith(root + path.sep)) {
		return null;
	}
	return await isFile(target) ? target : null;
}

/** keeps the seed and this run's stagings */
async function cleanup(keepId) {
	var entries;
	try {
		entries = await fsp.readdir(bundlesDir(), { withFileTypes: true });
	}
	catch (err) {
		return;
	}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i];
		if (!entry.isDirectory()) {
			continue;
		}
		if (entry.name === keepId) {
			continue;
		}
		if (entry.name.startsWith(".staging-") && entry.name.endsWith("-" + process.pid)) {
			continue;
		}
		await fsp.rm(path.join(bundlesDir(), entry.name), { recursive: true, force: true });
	}
}

/* ---------- network ---------- */

function encodePath(rel) {
	return rel.split("/").map(encodeURIComponent).join("/");
}

async function fetchManifest(url) {
	var request = new URL(url);
	request.searchParams.set("t", Date.now().toString(36));
	var response = await net.fetch(request.toString(), {
		cache: "no-store",
		signal: AbortSignal.timeout(MANIFEST_TIMEOUT_MS),
	});
	if (!response.ok) {
		throw new Error("HTTP " + response.status + " em " + request.origin);
	}
	return parseManifest(await response.text());
}

/** @returns remote manifest, or null when already up to date */
async function checkForUpdate(otaUrl) {
	if (!otaUrl) {
		return null;
	}
	var local = active().manifest;
	var remote = await fetchManifest(otaUrl);
	if (remote.id === local.id) {
		return null;
	}
	// never downgrade
	if (Date.parse(remote.createdAt) < Date.parse(local.createdAt)) {
		return null;
	}
	return remote;
}

async function downloadFile(url, dest, expected) {
	var request = new URL(url);
	request.searchParams.set("v", expected.sha256.slice(0, 12));

	var lastError = null;
	for (var attempt = 0; attempt < DOWNLOAD_ATTEMPTS; attempt++) {
		try {
			var response = await net.fetch(request.toString(), {
				signal: AbortSignal.timeout(FILE_TIMEOUT_MS),
			});
			if (!response.ok) {
				throw new Error("HTTP " + response.status);
			}
			var hash = crypto.createHash("sha256");
			var size = 0;
			var meter = new Transform({
				transform: function (chunk, encoding, callback) {
					hash.update(chunk);
					size += chunk.length;
					callback(null, chunk);
				},
			});
			await pipeline(Readable.fromWeb(response.body), meter, fs.createWriteStream(dest));
			var digest = hash.digest("hex");
			if (digest !== expected.sha256) {
				throw new Error("sha256 divergente (" + digest.slice(0, 12) + ")");
			}
			if (size !== expected.size) {
				throw new Error("tamanho divergente (" + size + " != " + expected.size + ")");
			}
			return;
		}
		catch (err) {
			lastError = err;
			await fsp.rm(dest, { force: true });
		}
	}
	throw new Error("falha ao baixar " + expected.path + ": " + lastError.message);
}

async function mapLimit(items, limit, task) {
	var queue = items.slice();
	var workers = [];
	var count = Math.min(limit, queue.length);
	for (var i = 0; i < count; i++) {
		workers.push((async function () {
			while (queue.length > 0) {
				await task(queue.shift());
			}
		})());
	}
	await Promise.all(workers);
}

/** Downloads into bundles/<id> (staging + atomic rename); files whose
 * sha256 matches the active bundle are copied from disk. The manifest is
 * written last, since it marks the bundle as complete. */
async function install(remote, otaUrl, onProgress) {
	var local = active();
	var targetDir = path.join(bundlesDir(), remote.id);
	if (await isFile(path.join(targetDir, MANIFEST_NAME))) {
		return { id: remote.id, dir: targetDir, downloaded: 0, copied: 0, reused: true };
	}

	var staging = path.join(bundlesDir(), ".staging-" + remote.id + "-" + process.pid);
	await fsp.rm(staging, { recursive: true, force: true });
	await fsp.mkdir(staging, { recursive: true });

	var localByPath = new Map(local.manifest.files.map(function (file) { return [file.path, file]; }));
	var base = new URL(".", otaUrl);
	var progress = { done: 0, total: remote.files.length, downloaded: 0, copied: 0 };

	try {
		await mapLimit(remote.files, DOWNLOAD_CONCURRENCY, async function (file) {
			var dest = path.join(staging, file.path);
			await fsp.mkdir(path.dirname(dest), { recursive: true });

			var prior = localByPath.get(file.path);
			if (prior && prior.sha256 === file.sha256 && await isFile(path.join(local.dir, file.path))) {
				await fsp.copyFile(path.join(local.dir, file.path), dest);
				progress.copied++;
			}
			else {
				await downloadFile(new URL(encodePath(file.path), base), dest, file);
				progress.downloaded++;
			}
			progress.done++;
			if (onProgress) {
				onProgress({ done: progress.done, total: progress.total });
			}
		});

		await fsp.writeFile(path.join(staging, MANIFEST_NAME), JSON.stringify(remote, null, "\t") + "\n");
		await fsp.rm(targetDir, { recursive: true, force: true });
		await fsp.rename(staging, targetDir);
	}
	catch (err) {
		await fsp.rm(staging, { recursive: true, force: true });
		throw err;
	}

	return { id: remote.id, dir: targetDir, downloaded: progress.downloaded, copied: progress.copied, reused: false };
}

async function activate(id) {
	var bundle = await loadBundle(path.join(bundlesDir(), id));
	if (!bundle) {
		throw new Error("bundle " + id + " inválido");
	}
	await writeState({ active: id });
	activeBundle = bundle;
	return bundle;
}

module.exports = {
	init: init,
	active: active,
	resolveFile: resolveFile,
	checkForUpdate: checkForUpdate,
	install: install,
	activate: activate,
};
