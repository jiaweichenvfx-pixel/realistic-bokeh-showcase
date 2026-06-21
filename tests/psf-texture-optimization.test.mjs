import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /data-param="textureBlack"/, "Imported PSF texture has a black-point control");
assert.match(html, /data-param="textureWhite"/, "Imported PSF texture has a white-point control");
assert.match(html, /data-param="textureGamma"/, "Imported PSF texture has a gamma control");
assert.match(html, /function applyTextureLevels/, "Imported texture levels are applied before renderer upload");
assert.match(html, /Math\.pow\(normalized, 1 \/ gamma\)/, "Imported texture gamma reshapes soft-edge energy");

assert.match(html, /data-param="brushSize"/, "Free drawing has a brush size control");
assert.match(html, /data-param="brushSoftness"/, "Free drawing has a brush softness control");
assert.match(html, /data-param="brushOpacity"/, "Free drawing has a brush opacity control");
assert.match(html, /function createBrushStamp/, "Free drawing uses a soft brush stamp");
assert.match(html, /shapePaintCtx\.globalAlpha = Math\.max\(0\.02, Math\.min\(1, params\.brushOpacity\)\)/, "Brush opacity controls stroke strength");

assert.match(html, /function textureVariationForLight/, "Per-light PSF texture variation is deterministic");
assert.match(html, /@location\(6\) textureJitter: vec4f/, "WebGPU receives per-light texture variation");
assert.match(html, /rotateLocal\(input\.local, input\.textureJitter\.xy\)/, "Custom PSF texture is slightly rotated per light");

assert.match(html, /fn compressHdrOverlap/, "Tone-map pass compresses additive overlap energy");
assert.match(html, /log\(vec3f\(1\.0\) \+ hdr \* exposureFusion\) \/ exposureFusion/, "HDR overlap uses a soft-knee log compression");
assert.match(html, /filmicToneMap\(background \+ compressedHdr \* 1\.08\)/, "Tone mapping uses compressed HDR overlap energy");
