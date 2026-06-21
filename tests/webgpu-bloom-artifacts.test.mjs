import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.doesNotMatch(html, /vec2i\(7, 5\)|vec2i\(-7, 5\)|vec2i\(7, -5\)|vec2i\(-7, -5\)/, "Bloom must not use sparse diagonal taps that create four-corner artifacts");
assert.doesNotMatch(html, /sampleHdrBloom/, "Single-pass screen-space bloom should stay disabled until a real blur chain exists");
assert.doesNotMatch(html, /\+ bloom \*/, "Tone mapping should not add broad bloom color patches");
assert.match(html, /outerGlow = .*0\.0[0-9]/, "Aperture shoulder glow should be subtle, not a broad opaque halo");
