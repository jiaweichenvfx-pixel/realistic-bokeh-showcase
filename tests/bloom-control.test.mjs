import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /data-param="bloom"/, "Bloom slider is present");
assert.match(html, /data-value="bloom"/, "Bloom value readout is present");
assert.match(html, /bloom:\s*0\.0[0-9]/, "Bloom defaults to a very low value");
assert.match(html, /formatters = \{[\s\S]*bloom: value => `\$\{Math\.round\(value \* 100\)\}%`/, "Bloom is formatted as a percentage");
assert.match(html, /target\[offset \+ 12\] = bloomAmount/, "WebGPU instance data includes bloom strength");
assert.match(html, /@location\(3\) bloomAmount: f32/, "WebGPU shader receives bloom as an instance attribute");
assert.match(html, /params\.bloom/, "Canvas fallback uses the bloom parameter");
assert.match(html, /if \(bloomAmount <= 0\.001\) return/, "Canvas direct glow is fully disabled when Bloom is zero");
assert.match(html, /if \(bloomAmount <= 0\.001\) \{[\s\S]*?bloomCtx\.clearRect/, "Canvas bloom layer is cleared and skipped when Bloom is zero");
assert.match(html, /input\.bloom \* 0\.09/, "WebGPU outer glow has no nonzero baseline when Bloom is zero");
assert.doesNotMatch(html, /0\.012 \+ input\.bloom|0\.018 \+ input\.bloom/, "WebGPU shader does not keep residual bloom when Bloom is zero");
