import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /<canvas id="shape-editor"/, "Custom bokeh shape editor canvas is present");
assert.match(html, /const SHAPE_TEXTURE_SIZE = 256/, "Custom bokeh mask uses 256x256 detail");
assert.match(html, /width="256" height="256"/, "Shape editor canvas stores a 256x256 mask");
assert.match(html, /data-shape-preset="circle"/, "Circle shape preset is present");
assert.match(html, /data-shape-preset="ellipse"/, "Ellipse shape preset is present");
assert.match(html, /data-shape-preset="rectangle"/, "Rectangle shape preset is present");
assert.match(html, /id="shape-import"/, "Black-background bokeh image import is present");
assert.match(html, /accept="image\/\*"/, "Shape importer accepts image files");
assert.match(html, /<canvas id="shape-crop"/, "Imported bokeh images can be cropped online");
assert.match(html, /id="shape-apply-crop"/, "Crop result can be applied to the bokeh mask");
assert.match(html, /cropBoxSize/, "Image crop defaults to a 1:1 square box");
assert.match(html, /function drawCropPreview/, "Imported images render into a crop preview");
assert.match(html, /function applyImageCropToShape/, "Cropped image is converted into the bokeh mask");
assert.match(html, /function drawShapePreset/, "Shape presets draw into the editable mask");
assert.match(html, /function drawOnShapeEditor/, "Pointer drawing can modify the custom bokeh mask");
assert.match(html, /shapeTextureVersion/, "Shape edits are versioned for renderer upload");
assert.match(html, /shapeMaskTexture = device\.createTexture/, "WebGPU owns a texture for the custom bokeh mask");
assert.match(html, /writeTexture/, "WebGPU uploads the edited shape canvas bytes as a texture");
assert.match(html, /@group\(0\) @binding\(0\) var shapeMaskSampler/, "Bokeh shader receives a mask sampler");
assert.match(html, /@group\(0\) @binding\(1\) var shapeMaskTex/, "Bokeh shader receives a mask texture");
assert.match(html, /textureSampleLevel\(shapeMaskTex, shapeMaskSampler/, "Bokeh shader samples the custom shape mask");
assert.match(html, /function applyCustomShapeClip/, "Canvas fallback clips bokeh discs with the custom mask");
