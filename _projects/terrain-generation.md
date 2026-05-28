---
title: "Async Tile-Based Terrain Generation"
title_em: "Terrain Generation"
tag: "PATENT · UNITY"
vis: terrain
span: big
order: 1
company: Unity Technologies
period: "2019 — 2023"
role: Senior SWE / Engineering Manager
stack:
  - C++
  - HLSL
  - Compute
  - Unity
patent: "US Patent 18/144,734"
patent_url: "https://patents.google.com/patent/US20240378791A1"
description: "GPU-accelerated tile stitching with zero latent allocations. Granted as US patent 18/144,734. Shipped in Unity's terrain system."
---

Unity's terrain system needs to stream and stitch large heightfield tiles on the fly as the player moves through the world. The naive approach allocates intermediate buffers per stitching pass, which is fine for a single tile but compounds quickly across a streamed grid - frame hitches, GC pressure, and a hot path you can't run inside a real-time render loop.

This work re-architected the tile boundary blend as a GPU-resident operation. Tile data is staged once into a compute-shader-friendly layout, neighbor edges are sampled directly from the resident textures, and the blend lands back into the same atlas with no round-trips through managed memory. The result is **zero per-frame latent allocations** along the seam, and the whole pipeline stays asynchronous to the game thread.

Shipped in Unity's terrain system and granted as US Patent 18/144,734.

## Why it matters

- **Streaming worlds at AAA scale** without the hitches that come from per-tile allocations.
- **Compute-first** path that maps cleanly onto modern GPU memory models (DX12, Vulkan, Metal).
- **A reusable primitive** - the same async stitching pattern applies to any heightfield-like data: density fields, decal atlases, splat maps.

The patent covers the asynchronous interactive editing case specifically - the ability to keep painting terrain while a streamed neighbor is still resolving its blend.
