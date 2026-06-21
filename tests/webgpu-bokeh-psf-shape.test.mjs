import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /vec2f\(-1\.45, -1\.45\)/, "WebGPU bokeh quads extend past the aperture for optical shoulder glow");
assert.match(html, /let outerGlow =/, "WebGPU shader adds a soft optical falloff outside the aperture");
assert.match(html, /let psf =/, "WebGPU shader computes a physical point-spread energy term");
assert.match(html, /textureTexture|microTexture|surfaceTexture/, "WebGPU shader adds subtle lens-surface texture instead of perfectly flat discs");
