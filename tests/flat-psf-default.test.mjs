import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(
  html,
  /rimBias:\s*0\.0[0-9]/,
  "Default bokeh is near-neutral, not center-bright"
);

const apertureMatch = html.match(/function drawApertureDisc[\s\S]*?function drawSmallLight/);
assert.ok(apertureMatch, "Aperture disc renderer is present");

assert.match(
  apertureMatch[0],
  /centerAberration = Math\.max\(0, -rim\)/,
  "Center brightening is only introduced by negative spherical-aberration bias"
);

assert.doesNotMatch(
  apertureMatch[0],
  /grad\.addColorStop\(0,[^\n]*alpha \* inner/,
  "Neutral bokeh does not force a hot center in every aperture disc"
);

assert.doesNotMatch(
  apertureMatch[0],
  /ctx\.arc\(Math\.cos\(a\) \* d/,
  "Aperture discs do not add bright internal specks that read as center points"
);
