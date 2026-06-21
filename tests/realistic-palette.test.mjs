import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /chromatic:\s*0\.1[0-9]/, "Default dispersion is visible but not extreme");
assert.match(html, /const coolWhite = \[220, 228, 226\]/, "Cool lights are desaturated white, not saturated blue");
assert.doesNotMatch(html, /const green = /, "Default palette does not include saturated green lights");
assert.doesNotMatch(html, /pick\(\[[^\]]*\bblue\b[^\]]*\]\)/, "Random distribution does not pick saturated blue lights");
