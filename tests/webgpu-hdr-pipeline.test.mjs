import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /const HDR_TEXTURE_FORMAT = "rgba16float"/, "WebGPU bokeh accumulation uses a float HDR texture");
assert.match(html, /let hdrBokehTexture/, "Renderer owns an HDR bokeh texture");
assert.match(html, /function createHdrTargets/, "Renderer recreates HDR render targets on resize");
assert.match(html, /format: HDR_TEXTURE_FORMAT/, "Bokeh render pass targets the HDR texture format");
assert.match(html, /const toneMapShader = device\.createShaderModule/, "Renderer has a tone-map shader");
assert.match(html, /fn filmicToneMap/, "Tone-map shader applies a filmic curve");
assert.match(html, /textureLoad\(hdrTex/, "Tone-map pass reads the HDR accumulation texture");
assert.match(html, /const toneMapPipeline = device\.createRenderPipeline/, "Renderer has a final tone-map pipeline");
assert.match(html, /pass\.setPipeline\(toneMapPipeline\)/, "Frame renders the tone-map pass after HDR accumulation");
