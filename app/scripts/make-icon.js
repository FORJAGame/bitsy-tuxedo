"use strict";

/* Generates app/build/icon.png (512x512) from editor/image/Tuxedo.png:
 * electron-builder requires that minimum and derives .ico/.icns from it. The
 * 500x500 logo is centered on a transparent 512x512 canvas without resampling,
 * which preserves the pixel art. PNG is handled with zlib directly so the build
 * needs no native dependency. */

var fs = require("node:fs");
var path = require("node:path");
var zlib = require("node:zlib");

var SIZE = 512;
var SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
var CHANNELS_BY_COLOR_TYPE = { 0: 1, 2: 3, 4: 2, 6: 4 };

var CRC_TABLE = (function () {
	var table = new Int32Array(256);
	for (var n = 0; n < 256; n++) {
		var c = n;
		for (var k = 0; k < 8; k++) {
			c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		}
		table[n] = c;
	}
	return table;
})();

function crc32(buffer) {
	var crc = -1;
	for (var i = 0; i < buffer.length; i++) {
		crc = CRC_TABLE[(crc ^ buffer[i]) & 0xff] ^ (crc >>> 8);
	}
	return (crc ^ -1) >>> 0;
}

function paeth(a, b, c) {
	var p = a + b - c;
	var pa = Math.abs(p - a);
	var pb = Math.abs(p - b);
	var pc = Math.abs(p - c);
	if (pa <= pb && pa <= pc) {
		return a;
	}
	return pb <= pc ? b : c;
}

function readChunks(buffer) {
	if (buffer.length < 8 || !buffer.subarray(0, 8).equals(SIGNATURE)) {
		throw new Error("não é um arquivo PNG");
	}
	var chunks = [];
	var pos = 8;
	while (pos + 12 <= buffer.length) {
		var length = buffer.readUInt32BE(pos);
		var type = buffer.toString("ascii", pos + 4, pos + 8);
		chunks.push({ type: type, data: buffer.subarray(pos + 8, pos + 8 + length) });
		pos += length + 12;
		if (type === "IEND") {
			break;
		}
	}
	return chunks;
}

function decodePng(buffer) {
	var chunks = readChunks(buffer);
	var header = chunks.find(function (chunk) { return chunk.type === "IHDR"; });
	if (!header) {
		throw new Error("PNG sem IHDR");
	}
	var width = header.data.readUInt32BE(0);
	var height = header.data.readUInt32BE(4);
	var depth = header.data[8];
	var colorType = header.data[9];
	var interlace = header.data[12];
	if (depth !== 8 || interlace !== 0) {
		throw new Error("PNG precisa ser 8 bits e sem entrelaçamento (depth=" + depth + ", interlace=" + interlace + ")");
	}
	var channels = CHANNELS_BY_COLOR_TYPE[colorType];
	if (!channels) {
		throw new Error("color type de PNG não suportado: " + colorType);
	}

	var idat = Buffer.concat(chunks.filter(function (chunk) { return chunk.type === "IDAT"; }).map(function (chunk) { return chunk.data; }));
	var raw = zlib.inflateSync(idat);
	var stride = width * channels;
	var pixels = Buffer.alloc(height * stride);

	var pos = 0;
	for (var y = 0; y < height; y++) {
		var filter = raw[pos++];
		var row = raw.subarray(pos, pos + stride);
		pos += stride;
		var previous = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;
		var current = pixels.subarray(y * stride, (y + 1) * stride);
		for (var x = 0; x < stride; x++) {
			var a = x >= channels ? current[x - channels] : 0;
			var b = previous ? previous[x] : 0;
			var c = previous && x >= channels ? previous[x - channels] : 0;
			var value = row[x];
			if (filter === 1) {
				value += a;
			}
			else if (filter === 2) {
				value += b;
			}
			else if (filter === 3) {
				value += (a + b) >> 1;
			}
			else if (filter === 4) {
				value += paeth(a, b, c);
			}
			else if (filter !== 0) {
				throw new Error("filtro PNG desconhecido: " + filter);
			}
			current[x] = value & 0xff;
		}
	}
	return { width: width, height: height, channels: channels, pixels: pixels };
}

function pngChunk(type, data) {
	var out = Buffer.alloc(data.length + 12);
	out.writeUInt32BE(data.length, 0);
	out.write(type, 4, "ascii");
	data.copy(out, 8);
	out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
	return out;
}

function encodePng(width, height, rgba) {
	var header = Buffer.alloc(13);
	header.writeUInt32BE(width, 0);
	header.writeUInt32BE(height, 4);
	header[8] = 8; // bit depth
	header[9] = 6; // RGBA
	var stride = width * 4;
	var raw = Buffer.alloc(height * (stride + 1));
	for (var y = 0; y < height; y++) {
		raw[y * (stride + 1)] = 0; // filter "none"
		rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
	}
	return Buffer.concat([
		SIGNATURE,
		pngChunk("IHDR", header),
		pngChunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
		pngChunk("IEND", Buffer.alloc(0)),
	]);
}

function pixelAt(image, x, y) {
	var offset = (y * image.width + x) * image.channels;
	var pixels = image.pixels;
	if (image.channels === 1) {
		return [pixels[offset], pixels[offset], pixels[offset], 255];
	}
	if (image.channels === 2) {
		return [pixels[offset], pixels[offset], pixels[offset], pixels[offset + 1]];
	}
	if (image.channels === 3) {
		return [pixels[offset], pixels[offset + 1], pixels[offset + 2], 255];
	}
	return [pixels[offset], pixels[offset + 1], pixels[offset + 2], pixels[offset + 3]];
}

function generate() {
	var repoRoot = path.resolve(__dirname, "..", "..");
	var source = path.join(repoRoot, "editor", "image", "Tuxedo.png");
	var outDir = path.join(__dirname, "..", "build");
	var out = path.join(outDir, "icon.png");

	var image = decodePng(fs.readFileSync(source));
	if (image.width > SIZE || image.height > SIZE) {
		throw new Error("logo maior que " + SIZE + "x" + SIZE + ": " + image.width + "x" + image.height);
	}

	var canvas = Buffer.alloc(SIZE * SIZE * 4);
	var offsetX = Math.floor((SIZE - image.width) / 2);
	var offsetY = Math.floor((SIZE - image.height) / 2);
	for (var y = 0; y < image.height; y++) {
		for (var x = 0; x < image.width; x++) {
			var color = pixelAt(image, x, y);
			var target = ((y + offsetY) * SIZE + (x + offsetX)) * 4;
			canvas[target] = color[0];
			canvas[target + 1] = color[1];
			canvas[target + 2] = color[2];
			canvas[target + 3] = color[3];
		}
	}

	fs.mkdirSync(outDir, { recursive: true });
	fs.writeFileSync(out, encodePng(SIZE, SIZE, canvas));
	console.log("ícone: " + path.relative(repoRoot, out) + " (" + SIZE + "x" + SIZE + ", de " + image.width + "x" + image.height + ")");
}

module.exports = generate;

if (require.main === module) {
	generate();
}
