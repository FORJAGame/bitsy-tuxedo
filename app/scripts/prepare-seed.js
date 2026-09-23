"use strict";

/* Builds the content the app embeds: app/seed/. The seed is a copy of
 * editor/ with the OTA manifest already generated, exactly like the published
 * site, so the app opens offline at the site's version. */

var { execFileSync } = require("node:child_process");
var fs = require("node:fs");
var path = require("node:path");

var appDir = path.resolve(__dirname, "..");
var repoRoot = path.resolve(appDir, "..");
var editorDir = path.join(repoRoot, "editor");
var seedDir = path.join(appDir, "seed");
var MANIFEST_NAME = "ota-manifest.json";

function run(script, args) {
	execFileSync(process.execPath, [path.join(repoRoot, script)].concat(args || []), {
		cwd: repoRoot,
		stdio: "inherit",
	});
}

// 1. generated resources - same steps as the site deploy, so the seed matches
run("dev/icon_generator/makeicons");
run("dev/resource_packager");

// 2. site copy
fs.rmSync(seedDir, { recursive: true, force: true });
fs.cpSync(editorDir, seedDir, {
	recursive: true,
	filter: function (src) {
		return path.basename(src) !== MANIFEST_NAME;
	},
});

// 3. OTA manifest for the seed
run("dev/ota_manifest.js", [seedDir]);

// 4. package icon
require("./make-icon")();

var manifest = JSON.parse(fs.readFileSync(path.join(seedDir, MANIFEST_NAME), "utf8"));
console.log("seed pronto: v" + manifest.version + " build " + manifest.build + " id " + manifest.id + " (" + manifest.files.length + " arquivos)");
