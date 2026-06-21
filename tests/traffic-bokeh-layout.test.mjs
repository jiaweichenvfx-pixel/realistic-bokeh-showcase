import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /function createTrafficLights/, "Scene uses a traffic/night-street bokeh layout");
assert.match(html, /kind:\s*"headlight"/, "Layout contains white headlight sources");
assert.match(html, /kind:\s*"tail"/, "Layout contains red tail-light sources");
assert.match(html, /kind:\s*"street"/, "Layout contains amber streetlight sources");
assert.match(html, /lights\.length} lights/, "Readout still reports generated light count");
