# Physically Realistic Bokeh Showcase

## Goal

Build a focused, good-looking bokeh showcase: a dark scene filled with lens-like out-of-focus highlights that feel physically believable at first glance.

This project is not a neural rendering paper demo and not a full camera simulator. It is a compact visual tool for showing realistic bokeh behavior with a small set of lens controls.

## Product Shape

- First screen is the actual bokeh image, not a landing page.
- The image should move subtly so the highlights feel alive.
- Controls should be few and immediately visual.
- The app should run by opening `index.html`; no build system or dependency install is required.

## Visual Priorities

The showcase should emphasize these visible lens cues:

- **Aperture shape**: blade count and blade roundness change the highlight silhouette.
- **Defocus scale**: f-stop and focus distance change the circle of confusion.
- **Energy behavior**: larger highlights keep believable brightness through exposure and tone mapping.
- **Axis scaling**: independent X/Y scale controls stretch or squash the highlight shape.
- **Randomized distribution**: a controlled randomness parameter can shift lights from street-like lanes into a scattered bokeh field.
- **Count and size variation**: active bokeh count is adjustable, and per-light size randomness is capped so the largest generated highlight is no more than 2x the smallest from the current lens scale.
- **Overall size**: a global size multiplier scales the final constrained bokeh radius when the display needs larger or smaller highlights.
- **Realistic night palette**: warm white headlights, amber streetlights, and red tail lights dominate; cool tones are rare and desaturated.
- **Optical dispersion**: off-axis highlights can show subtle blue-violet channel spill, modeled as wavelength-dependent magnification rather than a detached outline.
- **Aberration character**: brightness can lean toward creamy centers or brighter rims.
- **Light color control**: a base hue defines the scene's dominant light color; color randomness blends from a single consistent hue to wider source-color variation.
- **Opacity variation**: per-light opacity randomness is applied after physical light intensity and exposure, so it reads like source brightness variation rather than arbitrary transparency.
- **Traffic depth cues**: headlight and tail-light pairs follow a vanishing street layout, with many smaller distant sources and only a few large foreground discs.
- **Wet-road reflections**: lower-frame light sources cast blurred vertical reflections so the showcase reads like a real night-lens photograph instead of floating dots.
- **Sensor response**: high dynamic range accumulation is compressed by filmic tone mapping.
- **Custom bokeh masks**: users can draw or import a black-background bokeh image as a 256x256 aperture/PSF texture, preserving soft edges, internal RGB texture, and chromatic detail.

## Physical Model

Use a simplified thin-lens model for display-scale behavior:

```txt
apertureDiameter = focalLength / fStop
focusError = abs(depth - focusDistance) / max(depth, epsilon)
circleOfConfusion = focusError * apertureDiameter * displayScale
```

This is intentionally calibrated for screen space. It preserves the expected relationships:

- lower f-stop means larger bokeh;
- farther-from-focus lights blur more;
- long focal lengths feel more compressed and dramatic;
- edge-of-frame lights show stronger optical deformation.

## Rendering Approach

The current implementation has a WebGPU renderer with a Canvas 2D fallback. The page still runs as a single `index.html` file with no build step.

The WebGPU path:

- defers Canvas 2D context creation so the same canvas can be configured as a WebGPU surface when the browser supports it;
- streams one instanced quad per procedural light into a vertex buffer each frame;
- computes a soft aperture point-spread function in WGSL, with aperture shape, rim bias, subtle surface texture, and a shoulder outside the hard aperture edge;
- uploads a 256x256 editable bokeh mask/texture from the in-page shape editor;
- supports a Default procedural aperture preset that keeps blade count and roundness active, plus circle, ellipse, rectangle, hexagon, star, anamorphic slit, and ring texture-mask presets;
- lets the user rotate/scale preset bases and imported images, then draw more detail on top;
- supports importing black-background bokeh images, previewing a default 1:1 square crop, dragging/zooming the crop, and applying the crop as the active PSF texture without flattening it to grayscale;
- derives aperture energy from imported image luminance while preserving the image's soft edges and RGB texture/color fringing;
- lets freehand drawing use a chosen color, black energy-blocking strokes, or an eraser on the editable PSF texture layer;
- accumulates bokeh energy additively into an `rgba16float` HDR render target instead of blending directly into the display buffer;
- uses a final tone-map pass to combine a dark night-road background, the HDR bokeh texture, and a filmic response curve;
- keeps fake single-pass screen-space bloom disabled, because sparse fixed offset samples create four-corner ghosts and broad pure-color patches around small highlights;
- caps rendering to 1x DPR and 30fps, and skips frames while the document is hidden.

The Canvas fallback:

- draw a set of procedural point lights with depth, color, intensity, and drift;
- generate those lights from a structured night-street model: paired headlights, paired tail lights, amber streetlight rows, and sparse ambient points;
- compute per-light bokeh radius from lens parameters;
- constrain the random bokeh radius range to 1x-2x so size variation reads like lens/source variation instead of unrelated graphic circles;
- render each light as a mostly uniform aperture projection with slight spherical-aberration bias, subtle onion-ring texture, and clipped edge falloff;
- add an overlapping blue-violet dispersion layer under bright off-axis bokeh discs;
- apply independent X/Y scaling to the highlight footprint;
- blend each light between an anchored street layout and a seeded randomized layout;
- render low-opacity wet-road reflections for lower-frame light sources;
- accumulate all bokeh highlights onto a transparent bokeh layer before final composition, then derive a soft bloom layer from that accumulation so overlapping highlights fuse more like exposure instead of independent transparent circles;
- use additive-style accumulation with `lighter` blending;
- cap the Canvas fallback to 1x DPR and 30fps by default, and skip heavy rendering while the page is hidden, because multiple open animated tabs can otherwise consume significant CPU/GPU resources;
- finish with CSS/canvas-level exposure and contrast choices that mimic HDR tone mapping.

## Controls

Keep controls compact:

| Control | Purpose |
|---|---|
| f-stop | Defocus size and brightness character |
| Focus | Which depth layer appears smaller/sharper |
| Blades | Aperture polygon side count |
| Roundness | Blend polygonal aperture toward circular highlights |
| X Scale | Horizontal stretch of the highlight footprint |
| Y Scale | Vertical stretch of the highlight footprint |
| Randomness | Blend between structured street placement and randomized placement |
| Count | Number of active generated bokeh lights |
| Size Random | Per-light radius variation, clamped to a 2x maximum spread |
| Overall Size | Global multiplier for the final constrained bokeh radius |
| Dispersion | Blue-violet channel spill strength |
| Rim bias | Center-bright vs rim-bright bokeh character |
| Exposure | Final scene brightness |
| Bloom | Amount of extra PSF shoulder/glow; zero means fully disabled |
| Base Hue | Dominant physical light color for the generated sources |
| Color Random | Per-light hue/source color variation; zero makes lights share the base color |
| Alpha Random | Per-light brightness/opacity variation after exposure |
| Shape editor | Draw, preset, or import a 256x256 bokeh mask/texture |
| Shape Rot/Scale | Rotate and scale the preset/imported base before drawing extra details |

## File Layout

```txt
bokeh_generate/
├── DESIGN.md      # Focused project design
├── index.html     # Self-contained WebGPU + Canvas bokeh showcase
├── output/        # Verification screenshots
└── tests/         # Static regression tests for controls and renderer structure
```

## Acceptance Criteria

- Opening `index.html` displays a full-window bokeh scene.
- The image contains varied highlight sizes, colors, and depths.
- Moving the f-stop control visibly changes bokeh radius.
- Moving blade count visibly changes aperture geometry.
- Moving roundness visibly softens polygon edges toward circles.
- Moving X Scale visibly stretches highlights horizontally.
- Moving Y Scale visibly stretches highlights vertically.
- Moving Randomness visibly changes bokeh position distribution.
- Moving Count visibly changes how many bokeh lights render.
- Moving Size Random changes per-light radius variation while preserving a maximum 2x size spread.
- Pressing Shuffle changes the randomized layout while preserving lens parameters.
- Moving Dispersion visibly changes blue-violet channel spill around off-axis highlights.
- The scene remains responsive at normal desktop browser sizes.

## Deferred

These are intentionally out of scope for the first physical showcase:

- neural bokeh models;
- transformer or attention mechanisms;
- full image defocus from source photographs;
- WebGPU compute path tracing;
- EXR export;
- HDR environment-map ingestion;
- complex light-source editing.
