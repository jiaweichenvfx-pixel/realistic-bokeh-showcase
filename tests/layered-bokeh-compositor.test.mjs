import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /const bokehLayer = document\.createElement\("canvas"\)/, "Bokeh is accumulated on a transparent layer");
assert.match(html, /const bloomLayer = document\.createElement\("canvas"\)/, "Bloom is built from the accumulated bokeh layer");
assert.match(html, /function prepareBokehLayers/, "Renderer prepares bokeh compositor layers each frame");
assert.match(html, /function compositeBokehLayer/, "Renderer composites accumulated bokeh as a post pass");
assert.match(html, /ctx = bokehCtx;[\s\S]*for \(const light of sorted\)/, "Lights are drawn into the bokeh layer before final compositing");
assert.match(html, /ctx\.drawImage\(bokehLayer, 0, 0\)/, "Final image draws the accumulated bokeh layer back to the main canvas");
assert.match(html, /ctx\.drawImage\(bloomLayer, 0, 0\)/, "Final image includes a softened bloom copy to blend overlapping highlights");
