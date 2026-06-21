import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /let sceneY = 1\.0 - y/, "WebGPU background accounts for screen-space Y direction");
assert.match(html, /let sky = vec3f\(0\.0006, 0\.0007, 0\.001\)/, "WebGPU background starts from a near-black neutral sky");
assert.match(html, /let asphalt = vec3f\(0\.0022, 0\.0021, 0\.002\)/, "Road base stays dark and neutral");
assert.match(html, /let roadGlow = vec3f\(0\.0008, 0\.00058, 0\.00042\)/, "Road glow is subtle and warm");
assert.doesNotMatch(html, /vec3f\(0\.012, 0\.013, 0\.017\)/, "Background no longer uses a lifted blue-gray road band");
assert.match(html, /let horizonFade = smoothstep/, "Background transition is explicitly softened near the horizon");
