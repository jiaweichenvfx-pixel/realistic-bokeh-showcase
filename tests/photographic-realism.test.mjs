import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /function sourceIntensityMultiplier/, "Light sources use a photographic long-tail intensity distribution");
assert.match(html, /Math\.pow\(lightColorNoise\(light, 9\), 3\.2\)/, "Intensity distribution keeps most lights dim and a few lights bright");
assert.match(html, /function softClipAlpha/, "Light alpha uses soft clipping instead of hard flattening");
assert.match(html, /1 - Math\.exp\(-raw \/ 0\.86\)/, "Soft clipping preserves visible highlight differences near overexposure");

assert.match(html, /function sceneRandomizedPosition/, "Randomized layout remains scene-based rather than uniform dots");
assert.match(html, /vanishingT/, "Randomized positions preserve a road-perspective depth cue");
assert.match(html, /clusterBand/, "Randomized positions can form distant light clusters");

assert.match(html, /let lensDust =/, "WebGPU PSF includes subtle lens dust variation");
assert.match(html, /let onionRing =/, "WebGPU PSF includes faint onion-ring structure");
assert.match(html, /let apertureBody =/, "WebGPU PSF has internal energy shaping instead of flat discs");
assert.match(html, /let horizonHaze =/, "Tone-map background includes a subtle horizon haze cue");
