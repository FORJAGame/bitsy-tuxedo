"use strict";

var path = require("node:path");
var fs = require("node:fs");
var { pathToFileURL } = require("node:url");
var { app, BrowserWindow, Menu, ipcMain, net, protocol, screen, shell } = require("electron");

var bundle = require("./bundle");
var config = require("./config");

var SCHEME = "bitsy";
var HOST = "app";
var INDEX_URL = SCHEME + "://" + HOST + "/index.html";
var DEFAULT_BACKGROUND = "#ccccff"; // --bitsy-color-accent-2

var mainWindow = null;
var pendingUpdate = null; // remote manifest awaiting user decision
var dismissed = new Set();
var checking = false;

/* registered before the app is ready (Electron requirement);
 * standard+secure gives the bundle a stable origin (bitsy://app) */
protocol.registerSchemesAsPrivileged([{
	scheme: SCHEME,
	privileges: {
		standard: true,
		secure: true,
		supportFetchAPI: true,
		stream: true,
		codeCache: true,
		corsEnabled: true,
	},
}]);

function themePath() {
	return path.join(app.getPath("userData"), "theme.json");
}

function toHex(color) {
	if (typeof color !== "string") {
		return null;
	}
	if (/^#[0-9a-f]{6}$/i.test(color)) {
		return color;
	}
	var rgb = /^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(color);
	if (!rgb) {
		return null;
	}
	return "#" + [1, 2, 3].map(function (i) {
		return Number(rgb[i]).toString(16).padStart(2, "0");
	}).join("");
}

function readBackground() {
	try {
		return toHex(JSON.parse(fs.readFileSync(themePath(), "utf8")).background);
	}
	catch (err) {
		return null;
	}
}

function writeBackground(color) {
	var hex = toHex(color);
	if (!hex) {
		return;
	}
	try {
		fs.writeFileSync(themePath(), JSON.stringify({ background: hex }) + "\n");
	}
	catch (err) {
		// cosmetic
	}
}

function openExternal(url) {
	if (/^https?:\/\//i.test(url)) {
		shell.openExternal(url);
	}
}

function createWindow() {
	// never bigger than the screen (1366x768 must fit)
	var work = screen.getPrimaryDisplay().workAreaSize;
	mainWindow = new BrowserWindow({
		width: Math.min(1440, Math.max(720, work.width - 80)),
		height: Math.min(900, Math.max(540, work.height - 80)),
		minWidth: 720,
		minHeight: 540,
		show: false,
		backgroundColor: readBackground() || DEFAULT_BACKGROUND,
		title: config.name,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			contextIsolation: true,
			nodeIntegration: false,
			sandbox: true,
			spellcheck: false,
			v8CacheOptions: "bypassHeatCheck",
		},
	});

	mainWindow.once("ready-to-show", function () {
		mainWindow.show();
	});
	mainWindow.on("closed", function () {
		mainWindow = null;
	});

	mainWindow.webContents.setWindowOpenHandler(function (details) {
		openExternal(details.url);
		return { action: "deny" };
	});
	mainWindow.webContents.on("will-navigate", function (event, url) {
		if (!url.startsWith(SCHEME + "://")) {
			event.preventDefault();
			openExternal(url);
		}
	});
	mainWindow.webContents.on("did-finish-load", function () {
		if (pendingUpdate && !dismissed.has(pendingUpdate.id)) {
			notifyContentAvailable(pendingUpdate);
		}
	});

	mainWindow.loadURL(INDEX_URL);

	if (process.env.BITSY_DEVTOOLS === "1") {
		mainWindow.webContents.openDevTools({ mode: "detach" });
	}
}

function send(channel, payload) {
	if (mainWindow && !mainWindow.isDestroyed()) {
		mainWindow.webContents.send(channel, payload);
	}
}

function notifyContentAvailable(manifest) {
	send("ota:content-available", {
		id: manifest.id,
		version: manifest.version,
		build: manifest.build,
		files: manifest.files.length,
	});
}

async function checkContentUpdate() {
	if (checking || !config.otaUrl) {
		return;
	}
	checking = true;
	try {
		var remote = await bundle.checkForUpdate(config.otaUrl);
		if (!remote) {
			return;
		}
		pendingUpdate = remote;
		if (!dismissed.has(remote.id)) {
			notifyContentAvailable(remote);
		}
	}
	catch (err) {
		// offline, server down or bad manifest: keep serving the local bundle
		console.warn("[ota] verificação de conteúdo falhou:", err.message);
	}
	finally {
		checking = false;
	}
}

async function applyContentUpdate() {
	if (!pendingUpdate) {
		return { ok: false, reason: "sem-update" };
	}
	var update = pendingUpdate;
	var result = await bundle.install(update, config.otaUrl, function (progress) {
		send("ota:content-progress", progress);
	});
	await bundle.activate(result.id);
	pendingUpdate = null;
	console.info("[ota] conteúdo atualizado para v" + update.version + " (" + result.downloaded + " baixados, " + result.copied + " reaproveitados)");
	if (mainWindow && !mainWindow.isDestroyed()) {
		mainWindow.webContents.reload();
	}
	return { ok: true, version: update.version, downloaded: result.downloaded, copied: result.copied };
}

function initShellUpdater() {
	if (!app.isPackaged || !config.shellUpdates) {
		return;
	}
	var autoUpdater;
	try {
		autoUpdater = require("electron-updater").autoUpdater;
	}
	catch (err) {
		console.warn("[ota] electron-updater indisponível:", err.message);
		return;
	}

	autoUpdater.autoDownload = true;
	autoUpdater.autoInstallOnAppQuit = true;
	autoUpdater.on("error", function (err) {
		console.warn("[ota] update do app falhou:", err.message);
	});
	autoUpdater.on("update-downloaded", function (info) {
		send("ota:shell-ready", { version: info.version });
	});

	ipcMain.handle("ota:shell-install", function () {
		autoUpdater.quitAndInstall();
		return { ok: true };
	});

	autoUpdater.checkForUpdates().catch(function (err) {
		console.warn("[ota] verificação do app falhou:", err.message);
	});
	setInterval(function () {
		autoUpdater.checkForUpdates().catch(function () {});
	}, config.checkIntervalMs);
}

async function handleRequest(request) {
	var url;
	try {
		url = new URL(request.url);
	}
	catch (err) {
		return new Response("Bad request", { status: 400 });
	}
	if (url.host !== HOST) {
		return new Response("Not found", { status: 404 });
	}
	var file = await bundle.resolveFile(url.pathname);
	if (!file) {
		return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
	}
	return net.fetch(pathToFileURL(file).toString());
}

function buildMenu() {
	if (process.platform !== "darwin") {
		return null; // no menu bar: looks like the site
	}
	return Menu.buildFromTemplate([
		{ role: "appMenu" },
		{ role: "editMenu" },
		{
			label: "View",
			submenu: [
				{ role: "reload" },
				{ role: "resetZoom" },
				{ role: "zoomIn" },
				{ role: "zoomOut" },
				{ type: "separator" },
				{ role: "togglefullscreen" },
			],
		},
		{ role: "windowMenu" },
	]);
}

/* ---------- bootstrap ---------- */

if (!app.requestSingleInstanceLock()) {
	app.quit();
}
else {
	/* system logout/shutdown arrives as SIGTERM; quit through app.quit() so
	 * localStorage is committed before the process exits */
	var quitting = false;
	["SIGINT", "SIGTERM", "SIGHUP"].forEach(function (signal) {
		process.on(signal, function () {
			if (quitting) {
				process.exit(1);
			}
			quitting = true;
			app.quit();
		});
	});

	app.on("second-instance", function () {
		if (mainWindow) {
			if (mainWindow.isMinimized()) {
				mainWindow.restore();
			}
			mainWindow.focus();
		}
	});

	app.whenReady().then(async function () {
		Menu.setApplicationMenu(buildMenu());
		await bundle.init();
		protocol.handle(SCHEME, handleRequest);
		createWindow();

		ipcMain.handle("ota:content-apply", async function () {
			try {
				return await applyContentUpdate();
			}
			catch (err) {
				console.warn("[ota] instalação falhou:", err.message);
				return { ok: false, reason: err.message };
			}
		});
		ipcMain.on("ota:dismiss", function (event, id) {
			if (typeof id === "string") {
				dismissed.add(id);
			}
		});
		ipcMain.on("theme:background", function (event, color) {
			writeBackground(color);
		});

		initShellUpdater();
		setTimeout(checkContentUpdate, config.firstCheckDelayMs);
		setInterval(checkContentUpdate, config.checkIntervalMs);

		app.on("activate", function () {
			if (BrowserWindow.getAllWindows().length === 0) {
				createWindow();
			}
		});
	}).catch(function (err) {
		console.error("[app] falha ao iniciar:", err);
		app.quit();
	});
}

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
