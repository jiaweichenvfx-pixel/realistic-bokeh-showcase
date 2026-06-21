import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.doesNotMatch(html, /fn sampleHdrBloom/, "Tone-map pass should not use fake single-pass bloom");
assert.doesNotMatch(html, /textureLoad\(hdrTex, clampHdrCoord/, "Tone-map pass should not copy highlights into offset ghost taps");
assert.doesNotMatch(html, /\+ bloom \*/, "Final composite should avoid broad bloom color patches");
assert.match(html, /filmicToneMap\(background \+ compressedHdr/, "HDR highlights should roll off through tone mapping instead of screen-space bloom");
