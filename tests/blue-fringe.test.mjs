import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /<span>Dispersion<\/span>/, "The control names the effect as dispersion");
assert.match(html, /chromatic:\s*0\.1[0-9]/, "Default dispersion is visible but restrained");
assert.match(html, /function drawDispersionLayer/, "Renderer draws a channel-offset dispersion layer");
assert.match(html, /142,\s*172,\s*255/, "Dispersion uses a blue-violet outer channel");
assert.match(html, /edgeAmount < 0\.14/, "Dispersion is suppressed near the optical center");
assert.match(html, /channelShift/, "Dispersion uses channel shift, not a detached outline");
assert.match(html, /target\[offset \+ 13\] = Math\.max\(0, Math\.min\(1, params\.chromatic\)\)/, "WebGPU instance data receives the dispersion control");
assert.match(html, /@location\(4\) chromaticAxis: vec4f/, "WebGPU shader receives dispersion and off-axis direction");
assert.match(html, /sampleShape\(shapeUv \+ axis \* dispersion \* 0\.026\)/, "WebGPU dispersion uses channel-dependent aperture sampling");
assert.doesNotMatch(html, /function drawEdgeBlueFringe/, "Detached edge-fringe renderer is removed");
assert.doesNotMatch(html, /ctx\.arc\(0,\s*0,\s*radius \* \(1\.05/, "Dispersion is not a standalone blue ring outside the bokeh");
assert.doesNotMatch(html, /drawApertureDisc\(x - nx \* fringe/, "Chromatic effect is not only an offset duplicate disc");
