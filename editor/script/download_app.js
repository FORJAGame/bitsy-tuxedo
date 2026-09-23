var DOWNLOAD_APP_BASE_URL = "https://github.com/FORJAGame/bitsy-tuxedo/releases/latest/download/";

var DOWNLOAD_APP_TARGETS = {
	windows: { name: "Windows", file: "Bitsy-Tuxedo-Setup.exe" },
	mac: { name: "macOS", file: "Bitsy-Tuxedo-mac.dmg" },
	linux: { name: "Linux", file: "Bitsy-Tuxedo.AppImage" },
};

function detectDownloadAppPlatform(userAgent, maxTouchPoints) {
	if (/Android|iPhone|iPad|iPod|Mobile|CrOS/i.test(userAgent)) {
		return null;
	}
	if (/Windows/i.test(userAgent)) {
		return "windows";
	}
	if (/Macintosh|Mac OS X/i.test(userAgent)) {
		// iPadOS reports as Mac but has a touch screen
		return maxTouchPoints > 1 ? null : "mac";
	}
	if (/Linux|X11/i.test(userAgent)) {
		return "linux";
	}
	return null;
}

function initDownloadAppButton() {
	var label = document.getElementById("downloadAppLabel");
	if (!label || location.protocol !== "https:") {
		return;
	}

	var platform = detectDownloadAppPlatform(navigator.userAgent, navigator.maxTouchPoints || 0);
	if (!platform) {
		return;
	}

	var target = DOWNLOAD_APP_TARGETS[platform];
	var url = DOWNLOAD_APP_BASE_URL + target.file;

	label.title = "Bitsy Tuxedo — " + target.name;
	label.setAttribute("data-download-url", url);
	label.onclick = function () {
		window.open(url);
	};
	label.style.display = "";
}

document.addEventListener("DOMContentLoaded", initDownloadAppButton);
