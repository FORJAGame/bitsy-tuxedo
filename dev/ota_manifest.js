var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
var childProcess = require("child_process");

var MANIFEST_NAME = "ota-manifest.json";

var root = path.resolve(process.argv[2] || path.join(__dirname, "../editor"));

function listFiles(dir, prefix) {
	var entries = fs.readdirSync(dir, { withFileTypes: true });
	var files = [];
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i];
		if (entry.name.startsWith(".")) {
			continue;
		}
		var rel = prefix ? prefix + "/" + entry.name : entry.name;
		if (entry.isDirectory()) {
			files.push.apply(files, listFiles(path.join(dir, entry.name), rel));
		}
		else if (entry.isFile() && rel !== MANIFEST_NAME) {
			files.push(rel);
		}
	}
	return files;
}

function engineVersion() {
	var source = fs.readFileSync(path.join(root, "script/engine/bitsy.js"), "utf8");
	var major = /major:\s*(\d+)/.exec(source);
	var minor = /minor:\s*(\d+)/.exec(source);
	if (!major || !minor) {
		throw new Error("versão do engine não encontrada em script/engine/bitsy.js");
	}
	return major[1] + "." + minor[1];
}

function buildId() {
	if (process.env.OTA_BUILD) {
		return process.env.OTA_BUILD;
	}
	if (process.env.GITHUB_SHA) {
		return process.env.GITHUB_SHA.slice(0, 7);
	}
	try {
		return childProcess.execSync("git rev-parse --short HEAD", { cwd: __dirname, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
	}
	catch (err) {
		return "dev";
	}
}

var files = listFiles(root, "").sort().map(function (rel) {
	var data = fs.readFileSync(path.join(root, rel));
	return {
		path: rel,
		sha256: crypto.createHash("sha256").update(data).digest("hex"),
		size: data.length,
	};
});

var contentHash = crypto.createHash("sha256");
files.forEach(function (file) {
	contentHash.update(file.path + "\0" + file.sha256 + "\n");
});

var manifest = {
	schema: 1,
	version: engineVersion(),
	build: buildId(),
	id: contentHash.digest("hex").slice(0, 16),
	createdAt: process.env.OTA_CREATED_AT || new Date().toISOString(),
	files: files,
};

fs.writeFileSync(path.join(root, MANIFEST_NAME), JSON.stringify(manifest, null, "\t") + "\n");
console.log("ota manifest: v" + manifest.version + " build " + manifest.build + " id " + manifest.id + " (" + files.length + " arquivos)");
