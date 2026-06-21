import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /data-param="motionAmount"/, "Bokeh motion amount control is present");
assert.match(html, /data-param="motionSpeed"/, "Bokeh motion speed control is present");
assert.match(html, /data-param="flickerAmount"/, "Bokeh flicker amount control is present");
assert.match(html, /params\.motionAmount/, "Renderer uses the bokeh motion parameter");
assert.match(html, /params\.motionSpeed/, "Renderer uses the bokeh motion speed parameter");
assert.match(html, /params\.flickerAmount/, "Renderer uses the bokeh flicker parameter");
assert.match(html, /function lightMotionOffset/, "Per-light motion offsets are derived deterministically");
assert.match(html, /function lightTwinkle/, "Per-light flicker/twinkle is derived deterministically");
assert.match(html, /const animationSpeed = Math\.max\(0\.25, Math\.min\(4, params\.motionSpeed\)\)/, "Motion speed is clamped to a previewable physical range");
assert.match(html, /0\.012 \* motionAmount/, "Motion amplitude is large enough to preview without export");
assert.match(html, /0\.58 \* flickerAmount/, "Flicker has enough intensity range to survive tone mapping");
assert.match(html, /resolveLightOpacity\(light, baseAlpha\) \* twinkle/, "Flicker is applied after base alpha clamping so bright lights visibly pulse");
assert.match(html, /id="export-frame"/, "Single-frame export button is present");
assert.match(html, /id="export-video"/, "Video export button is present");
assert.match(html, /function exportFrame/, "Single-frame PNG export is implemented");
assert.match(html, /canvas\.toBlob/, "Frame export captures the rendered canvas");
assert.match(html, /function exportVideo/, "Video export is implemented");
assert.match(html, /canvas\.captureStream\(30\)/, "Video export captures an animated 30fps canvas stream");
assert.match(html, /function chooseMp4MimeType/, "Video export chooses an MP4 recorder MIME type");
assert.match(html, /new MediaRecorder/, "Video export records the canvas stream");
assert.match(html, /video\/mp4/, "Video export records MP4 output");
assert.doesNotMatch(html, /video\/webm/, "Video export does not fall back to WebM");
