import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /data-param="randomness"/, "Randomness slider is present");
assert.match(html, /data-value="randomness"/, "Randomness value readout is present");
assert.match(html, /id="shuffle-layout"/, "Shuffle button is present");
assert.match(html, /randomness:\s*0\.\d+/, "Randomness parameter has a default value");
assert.match(html, /layoutSeed/, "Layout seed controls the randomized bokeh distribution");
