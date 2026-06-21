import { readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /async function createWebGpuRenderer/, "WebGPU renderer has an async initialization path");
assert.match(html, /navigator\.gpu/, "Renderer detects WebGPU support");
assert.match(html, /requestAdapter\(\)/, "Renderer requests a WebGPU adapter");
assert.match(html, /requestDevice\(\)/, "Renderer requests a WebGPU device");
assert.match(html, /getContext\("webgpu"\)/, "Canvas can be configured for WebGPU");
assert.match(html, /canvasRenderer = createCanvasRenderer/, "Canvas fallback remains available");
assert.match(html, /try[\s\S]*createWebGpuRenderer[\s\S]*catch[\s\S]*canvasRenderer\.start/, "Initialization falls back to Canvas if WebGPU setup fails");
assert.match(html, /webGpuRenderer\.start/, "Successful WebGPU initialization starts the GPU renderer");
