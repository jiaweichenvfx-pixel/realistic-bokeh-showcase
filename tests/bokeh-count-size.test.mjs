import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /data-param="bokehCount"/, "Bokeh count slider is present");
assert.match(html, /data-value="bokehCount"/, "Bokeh count value readout is present");
assert.match(html, /data-param="sizeRandomness"/, "Size randomness slider is present");
assert.match(html, /data-value="sizeRandomness"/, "Size randomness value readout is present");
assert.match(html, /data-param="overallSize"/, "Overall bokeh size slider is present");
assert.match(html, /function activeLights/, "Renderer derives a count-limited active light list");
assert.match(html, /Math\.round\(params\.bokehCount\)/, "Bokeh count parameter controls active light count");
assert.match(html, /function computeBokehRadius/, "Canvas and WebGPU share constrained bokeh radius calculation");
assert.match(html, /const maxSizeRatio = 2/, "Bokeh size spread is capped at 2x");
assert.match(html, /const focusError = Math\.abs\(light\.anchorDepth - params\.focus\)/, "Focus measures distance from the focal plane");
assert.match(html, /const focusResponse = 0\.74 \+ Math\.pow\(Math\.min\(1, focusError \/ 0\.58\), 0\.9\) \* 0\.96/, "Focus changes the radius by depth instead of global scaling");
assert.match(html, /const baseRadius = Math\.max\(3, minDim \* \(0\.012 \+ apertureScale \* 0\.009\) \* focusResponse\)/, "Default bokeh radius stays in a restrained photographic range");
assert.match(html, /const maxRadius = baseRadius \* maxSizeRatio/, "Radius clamp derives directly from the 2x spread cap");
assert.match(html, /const overallSize = Math\.max\(0\.45, Math\.min\(2\.2, params\.overallSize\)\)/, "Overall size is clamped to a photographic display range");
assert.match(html, /return Math\.min\(maxRadius, baseRadius \* sizeFactor\) \* overallSize/, "Overall size scales the final constrained bokeh radius");
assert.match(html, /sizeRandomness \* \(maxSizeRatio - 1\)/, "Size randomness maps into the capped 1x-2x range");
assert.match(html, /activeLightsForFrame\.forEach/, "WebGPU writes only active bokeh instances");
assert.match(html, /hdrPass\.draw\(6, activeLightsForFrame\.length\)/, "WebGPU draws only active bokeh instances");
