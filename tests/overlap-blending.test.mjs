import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

const apertureMatch = html.match(/function drawApertureDisc[\s\S]*?function drawSmallLight/);
assert.ok(apertureMatch, "Aperture disc renderer is present");

assert.match(
  apertureMatch[0],
  /ctx\.globalCompositeOperation = "lighter"/,
  "Overlapping bokeh discs accumulate light additively instead of behaving like transparent layers"
);

assert.doesNotMatch(
  html,
  /ctx\.globalCompositeOperation = "screen";\s*drawApertureDisc/,
  "drawLight does not force screen blending before the main bokeh disc"
);
