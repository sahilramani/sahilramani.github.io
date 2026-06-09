---
title: "How Gaussian Splatting Actually Renders"
categories:
  - Programming
tags:
  - graphics
  - gaussian-splatting
  - rendering
  - gpu
  - real-time
mathjax: true
---

Gaussian Splatting renders a 3D scene in real time without ever calling a neural network. The first time that clicks, it feels like a trick. NeRF asks a network "what's the color and density here?" millions of times per frame. Gaussian Splatting doesn't ask anything. It projects a pile of blobs onto the screen, sorts them, and blends them.

That's the whole idea. Render becomes sort-and-blend. The rest is detail, but the detail is where you see why it runs so fast.

![The four stages of the Gaussian Splatting render pipeline](/assets/images/gaussian-splatting-pipeline.svg)

## What you're actually rendering

Before the pipeline, the data. A scene is a set of 3D Gaussians, often a few million of them. Each one stores four things:

- **Position** — a 3D point, the center of the Gaussian.
- **Covariance** — its shape and orientation. A Gaussian isn't a sphere; it's an ellipsoid, stretched and rotated to hug a surface. It's stored as a scale vector plus a rotation quaternion and rebuilt as $$\Sigma = R\,S\,S^{\top} R^{\top}$$, a form that stays valid no matter what the optimizer does to it.
- **Opacity** — a single alpha value.
- **Color** — usually spherical harmonics, not flat RGB, so color shifts with viewing angle. Evaluating it is a weighted sum of basis functions. Cheap, and not a neural network.

Everything is explicit. That one property is what makes the rest possible.

## Step 1: Cull and project

Each frame starts by throwing away what you can't see. Frustum culling drops every Gaussian outside the camera's view.

The survivors get projected from 3D onto the 2D image plane. The center is mapped to a pixel the usual way, but projecting the covariance—the shape and orientation of a 3D ellipsoid—is trickier. Because this projection is nonlinear, it's linearized using the projection's Jacobian: $$\Sigma' = J\,W\,\Sigma\,W^{\top} J^{\top}$$. This approach is called EWA splatting, where "EWA" stands for *elliptical weighted average*. EWA splatting is a classic technique from texture mapping, long before NeRF, and here it means that each projected ellipsoid becomes a 2D ellipse ("splat") on the screen, accounting for its orientation and spread.

## Step 2: Assign splats to tiles

Split the screen into 16×16 pixel tiles. This one decision is most of why the whole thing is fast.

For each splat, find every tile its footprint overlaps, and drop a copy into each. A small splat produces one copy; a big one produces several. In practice "overlaps" is the splat's screen-space bounding box, so the tiles fall out as a simple rectangular range:

```cpp
// the splat's screen bounding box gives a rectangular range of tiles
for (int ty = tile_min.y; ty <= tile_max.y; ++ty)
  for (int tx = tile_min.x; tx <= tile_max.x; ++tx)
    emit_entry(tile_id(tx, ty), splat_id);   // one (tile, splat) entry
```

![A splat's bounding box covers four tiles, so it is copied into each tile's list](/assets/images/gaussian-splatting-tiles.svg)

That duplication sounds wasteful. It isn't. It buys independence: every tile ends up with a self-contained list of the splats that affect it. Tiles never talk to each other, which is exactly what a GPU wants — thousands of tiles, all processed in parallel with no coordination.

## Step 3: Sort once, for the whole frame

This is the clever bit. For correct transparency, splats in each tile have to blend front to back. The naive fix is to sort per pixel, every frame. That's enormous.

Gaussian Splatting sorts **once per frame** with a single GPU radix sort. The trick is the key. Each entry gets a 64-bit key: the tile ID in the high bits, depth in the low bits.

```cpp
// one 64-bit key per (tile, splat) entry
//   high 32 bits = tile ID  -> groups entries by tile
//   low  32 bits = depth    -> orders them front-to-back within a tile
uint64_t key = (uint64_t(tile_id) << 32) | depth_bits;
```

![A 64-bit key combining tile ID and depth lets one sort group and order every splat](/assets/images/gaussian-splatting-sort-key.svg)

Sort that flat array and two things fall out at once — entries group by tile, and within each tile they land in depth order. One radix sort, an operation GPUs are extremely good at, and the whole frame is organized. A quick pass finds where each tile's run begins and ends. This is what replaces NeRF's per-ray sampling loop, at a fraction of the cost.

## Step 4: Blend

The last step is alpha compositing — the same over-operator from decades of graphics. For each pixel, walk its tile's sorted splats front to back. Each splat's contribution is its 2D Gaussian falloff scaled by opacity:

$$
\alpha \;=\; o \cdot \exp\!\left(-\tfrac{1}{2}\, d^{\top} \Sigma'^{-1} d\right)
$$

where $$d$$ is the offset from the splat's center to the pixel. Accumulate color weighted by alpha and by the light still getting through (the transmittance), which is the running product of $$(1 - \alpha)$$ from everything in front:

$$
T_i \;=\; \prod_{j < i} (1 - \alpha_j), \qquad
C   \;=\; \sum_i T_i \, \alpha_i \, c_i
$$

![One pixel composites its tile's splats front to back, stopping once the pixel is opaque](/assets/images/gaussian-splatting-blend.svg)

Then one more optimization: stop early. Once a pixel is effectively opaque, nothing behind it shows through, so you quit. On a dense scene that saves a lot of work. The whole per-pixel walk is short enough to read in one go:

```cpp
float3 C = make_float3(0.0f);
float  T = 1.0f;                       // transmittance: light still getting through
for (Splat s : tile_splats) {          // already sorted front-to-back
    float2 d     = pixel - s.mean;
    float  power = -0.5f * dot(d, s.conic * d);   // conic = inverse 2D covariance
    float  alpha = min(0.99f, s.opacity * expf(power));
    if (alpha < 1.0f / 255.0f) continue;          // negligible contribution, skip
    C += T * alpha * s.color;
    T *= (1.0f - alpha);
    if (T < 1e-4f) break;                          // opaque enough — stop early
}
```

That's the frame. Cull, project, tile, sort, blend.

## The approximation nobody mentions until you ask

Sorting per tile instead of per pixel is an approximation. Every pixel in a 16×16 tile shares one depth ordering, even though two splats could strictly swap order across the tile. When it happens you get a small pop, usually at a tile boundary. In practice you can't see it, and the speed you get back is enormous. It's a classic graphics trade: give up a sliver of correctness you can't perceive for performance you very much can. I have a soft spot for calls like this. They're the difference between a technique that demos and one that ships.

## Why it maps so well to a GPU

Step back and the design is one long answer to "what does a GPU do well?"

- Rasterization, not ray marching — the thing GPUs were built for.
- Tiles give independent, parallel work.
- One global radix sort, highly optimized in standard CUDA libraries.
- Early termination, saving work on the priciest pixels.

None of these is new on its own. EWA splatting, tile-based rasterization, radix sort, alpha compositing — all predate the 2023 paper. What Gaussian Splatting did was assemble them around an explicit, differentiable representation and tune the whole thing until it trained in minutes and rendered in real time. Sometimes the breakthrough isn't a new primitive. It's the right combination of old ones.

## The takeaway

NeRF made you query a function. Gaussian Splatting made the scene explicit, so rendering reduces to projection, a sort, and a blend — three things a GPU eats for breakfast. Once you see the pipeline laid out, the magic turns into good engineering.

If you're choosing between the two: real-time and interactive, reach for Splatting; tight on memory, NeRF still earns its place. But that's a separate post.
