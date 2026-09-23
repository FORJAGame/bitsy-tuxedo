"use strict";

var { ipcRenderer } = require("electron");

var HOST_ID = "bitsy-ota-toast";
var LANGUAGE_KEY = "bitsy_color_editor_language"; // Store.prefix + "editor_language"

var MESSAGES = {
	en: {
		contentTitle: "Update available",
		contentBody: function (version) { return "Bitsy Tuxedo " + version + " is ready to install."; },
		progress: function (done, total) { return "Downloading… " + done + "/" + total; },
		failed: "Update failed. Try again later.",
		shellTitle: "App update ready",
		shellBody: function (version) { return "Bitsy Tuxedo " + version + " will be applied on restart."; },
		update: "Update now",
		restart: "Restart now",
		later: "Later",
	},
	pt: {
		contentTitle: "Atualização disponível",
		contentBody: function (version) { return "Bitsy Tuxedo " + version + " está pronto para instalar."; },
		progress: function (done, total) { return "Baixando… " + done + "/" + total; },
		failed: "Não foi possível atualizar. Tente mais tarde.",
		shellTitle: "Nova versão do app pronta",
		shellBody: function (version) { return "Bitsy Tuxedo " + version + " será aplicada ao reiniciar."; },
		update: "Atualizar agora",
		restart: "Reiniciar agora",
		later: "Depois",
	},
	es: {
		contentTitle: "Actualización disponible",
		contentBody: function (version) { return "Bitsy Tuxedo " + version + " está listo para instalar."; },
		progress: function (done, total) { return "Descargando… " + done + "/" + total; },
		failed: "No se pudo actualizar. Inténtalo más tarde.",
		shellTitle: "Nueva versión lista",
		shellBody: function (version) { return "Bitsy Tuxedo " + version + " se aplicará al reiniciar."; },
		update: "Actualizar ahora",
		restart: "Reiniciar ahora",
		later: "Después",
	},
};

var CSS = [
	":host {",
	"	position: fixed;",
	"	right: 16px;",
	"	bottom: 16px;",
	"	z-index: 2147483647;",
	"	pointer-events: none;",
	"	display: block;",
	"}",
	".toast {",
	"	pointer-events: auto;",
	"	box-sizing: border-box;",
	"	width: 264px;",
	"	padding: 12px 14px;",
	"	display: flex;",
	"	flex-direction: column;",
	"	gap: 8px;",
	"	font-family: 'Nunito', Helvetica, Arial, sans-serif;",
	"	font-size: 13px;",
	"	line-height: 1.35;",
	"	color: var(--bitsy-color-input-text, #000);",
	"	background: var(--bitsy-color-main-1, #fff);",
	"	border: 2px solid var(--bitsy-color-main-2, #6767b2);",
	"	border-radius: 6px;",
	"	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);",
	"	animation: bitsy-ota-in 180ms ease-out;",
	"}",
	".title { font-weight: bold; font-size: 15px; }",
	".body { opacity: 0.85; }",
	".actions { display: flex; gap: 8px; justify-content: flex-end; }",
	"button {",
	"	font: inherit;",
	"	font-weight: bold;",
	"	padding: 6px 10px;",
	"	border: 1px solid var(--bitsy-color-main-2, #6767b2);",
	"	border-radius: 4px;",
	"	background: var(--bitsy-color-accent-1, #eee);",
	"	color: inherit;",
	"	cursor: pointer;",
	"}",
	"button.primary {",
	"	background: var(--bitsy-color-main-2, #6767b2);",
	"	color: var(--bitsy-color-main-1, #fff);",
	"}",
	"button:disabled { opacity: 0.55; cursor: default; }",
	"@keyframes bitsy-ota-in {",
	"	from { opacity: 0; transform: translateY(8px); }",
	"	to { opacity: 1; transform: none; }",
	"}",
].join("\n");

function detectLanguage() {
	var language = null;
	try {
		var stored = localStorage.getItem(LANGUAGE_KEY);
		if (stored) {
			language = JSON.parse(stored);
		}
	}
	catch (err) {
		language = null;
	}
	if (typeof language !== "string" || !language) {
		language = ((navigator.languages && navigator.languages[0]) || navigator.language || "en").split("-")[0];
	}
	return Object.prototype.hasOwnProperty.call(MESSAGES, language) ? language : "en";
}

var queue = [];
var current = null;
var t = MESSAGES[detectLanguage()];

var host = null;
var root = null;
var toast = null;
var titleEl = null;
var bodyEl = null;
var primaryBtn = null;
var laterBtn = null;

function mount() {
	if (host || !document.documentElement) {
		return;
	}
	host = document.createElement("div");
	host.id = HOST_ID;
	root = host.attachShadow({ mode: "open" });

	var style = document.createElement("style");
	style.textContent = CSS;

	toast = document.createElement("div");
	toast.className = "toast";
	toast.setAttribute("role", "status");
	toast.setAttribute("aria-live", "polite");

	titleEl = document.createElement("div");
	titleEl.className = "title";
	bodyEl = document.createElement("div");
	bodyEl.className = "body";

	var actions = document.createElement("div");
	actions.className = "actions";
	laterBtn = document.createElement("button");
	laterBtn.type = "button";
	laterBtn.textContent = t.later;
	primaryBtn = document.createElement("button");
	primaryBtn.type = "button";
	primaryBtn.className = "primary";

	laterBtn.addEventListener("click", dismissCurrent);
	primaryBtn.addEventListener("click", acceptCurrent);

	actions.append(laterBtn, primaryBtn);
	toast.append(titleEl, bodyEl, actions);
	root.append(style, toast);
	document.documentElement.append(host);
}

function show(item) {
	mount();
	if (!toast) {
		return;
	}
	// language may have changed in the editor after load
	t = MESSAGES[detectLanguage()];
	current = item;
	toast.style.animation = "none";
	void toast.offsetWidth;
	toast.style.animation = "";
	primaryBtn.disabled = false;
	laterBtn.disabled = false;
	laterBtn.textContent = t.later;

	if (item.kind === "content") {
		titleEl.textContent = t.contentTitle;
		bodyEl.textContent = t.contentBody(item.version);
		primaryBtn.textContent = t.update;
	}
	else {
		titleEl.textContent = t.shellTitle;
		bodyEl.textContent = t.shellBody(item.version);
		primaryBtn.textContent = t.restart;
	}
}

function hide() {
	if (host) {
		host.remove();
	}
	host = null;
	root = null;
	toast = null;
	current = null;
}

function next() {
	hide();
	if (queue.length > 0) {
		show(queue.shift());
	}
}

function enqueue(item) {
	if (current && current.kind === item.kind && current.id === item.id) {
		return;
	}
	if (!current) {
		show(item);
		return;
	}
	if (!queue.some(function (queued) { return queued.kind === item.kind && queued.id === item.id; })) {
		queue.push(item);
	}
}

function dismissCurrent() {
	if (current && current.kind === "content") {
		ipcRenderer.send("ota:dismiss", current.id);
	}
	next();
}

async function acceptCurrent() {
	if (!current) {
		return;
	}
	var item = current;
	primaryBtn.disabled = true;
	laterBtn.disabled = true;

	if (item.kind === "content") {
		bodyEl.textContent = t.progress(0, item.files);
		var result = null;
		try {
			result = await ipcRenderer.invoke("ota:content-apply");
		}
		catch (err) {
			result = { ok: false, reason: err.message };
		}
		if (!result || !result.ok) {
			// failed: keep the toast showing the error
			bodyEl.textContent = t.failed;
			primaryBtn.disabled = false;
			laterBtn.disabled = false;
			return;
		}
	}
	else {
		try {
			await ipcRenderer.invoke("ota:shell-install");
		}
		catch (err) {
			bodyEl.textContent = t.failed;
			primaryBtn.disabled = false;
			laterBtn.disabled = false;
		}
	}
}

ipcRenderer.on("ota:content-available", function (event, info) {
	enqueue({ kind: "content", id: info.id, version: info.version, build: info.build, files: info.files });
});

ipcRenderer.on("ota:content-progress", function (event, progress) {
	if (current && current.kind === "content" && bodyEl) {
		bodyEl.textContent = t.progress(progress.done, progress.total);
	}
});

ipcRenderer.on("ota:shell-ready", function (event, info) {
	enqueue({ kind: "shell", id: "shell-" + info.version, version: info.version });
});

window.addEventListener("load", function () {
	// report background color so the next launch doesn't flash white
	try {
		ipcRenderer.send("theme:background", getComputedStyle(document.documentElement).backgroundColor);
	}
	catch (err) {
		/* cosmetic */
	}
});
