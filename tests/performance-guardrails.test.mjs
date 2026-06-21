import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /const TARGET_FPS = 30/, "Animation is capped to a sustainable default frame rate");
assert.match(html, /const FRAME_INTERVAL_MS = 1000 \/ TARGET_FPS/, "Frame pacing uses a target interval");
assert.match(html, /let lastFrameTime = 0/, "Renderer tracks frame timing");
assert.match(html, /document\.visibilityState === "hidden"/, "Hidden tabs do not keep rendering heavy frames");
assert.match(html, /const pixelRatioCap = 1/, "Default pixel ratio is capped to avoid oversized offscreen layers");
assert.doesNotMatch(html, /Math\.min\(window\.devicePixelRatio \|\| 1, 1\.35\)/, "Renderer no longer defaults to 1.35x DPR");
