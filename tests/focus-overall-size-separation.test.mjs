import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /const focusError = Math\.abs\(light\.anchorDepth - params\.focus\)/, "Focus should measure distance from the focal plane");
assert.match(html, /return Math\.min\(maxRadius, baseRadius \* sizeFactor\) \* overallSize/, "Overall size should remain the final scale multiplier");
assert.doesNotMatch(html, /Math\.abs\(params\.focus - 0\.52\)/, "Focus should not behave like a fixed global lift");
