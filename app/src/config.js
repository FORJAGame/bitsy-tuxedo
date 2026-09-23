"use strict";

/* Defaults come from package.json ("bitsy") and can be overridden by
 * environment variables, which allows testing the OTA against a local server
 * without rebuilding. */

var pkg = require("../package.json");

var bitsy = pkg.bitsy || {};

function positiveInt(value, fallback) {
	var parsed = Number(value);
	return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function validUrl(value) {
	if (!value) {
		return null;
	}
	try {
		var url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
	}
	catch (err) {
		return null;
	}
}

module.exports = {
	name: pkg.productName,
	/** OTA manifest URL published with the site */
	otaUrl: validUrl(process.env.BITSY_OTA_URL || bitsy.otaUrl),
	/** interval between update checks */
	checkIntervalMs: positiveInt(process.env.BITSY_OTA_INTERVAL_MS, positiveInt(bitsy.otaIntervalMs, 60 * 60 * 1000)),
	/** delay of the first check, so it doesn't compete with the editor load */
	firstCheckDelayMs: positiveInt(process.env.BITSY_OTA_FIRST_DELAY_MS, 4000),
	/** binary updates (electron-updater); disabled with BITSY_SHELL_UPDATES=0 */
	shellUpdates: process.env.BITSY_SHELL_UPDATES !== "0",
};
