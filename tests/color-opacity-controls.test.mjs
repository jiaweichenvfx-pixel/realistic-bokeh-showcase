import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /data-param="baseHue"/, "Base color hue control is present");
assert.match(html, /data-param="colorRandomness"/, "Color randomness control is present");
assert.match(html, /data-param="opacityRandomness"/, "Opacity randomness control is present");
assert.match(html, /function lightColorNoise/, "Color variation is deterministic per physical light source");
assert.match(html, /function resolveLightColor/, "Renderer derives final color from base color and per-light variation");
assert.match(html, /function resolveLightOpacity/, "Renderer derives final opacity from light intensity and opacity randomness");
assert.match(html, /colorRandomness <= 0\.001/, "Zero color randomness collapses lights to the base color");
assert.match(html, /target\[offset \+ 4\] = resolvedColor\[0\] \/ 255/, "WebGPU receives the resolved physical light color");
assert.match(html, /target\[offset \+ 7\] = alpha \* 0\.62/, "WebGPU receives randomized opacity through alpha");
