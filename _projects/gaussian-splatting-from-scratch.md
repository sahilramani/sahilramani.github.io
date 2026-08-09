---
title: "Gaussian Splatting from scratch"
title_em: "from scratch"
tag: "SIDE PROJECT"
vis: splat
span: wide
order: 7
company: Personal
period: "2026"
role: Solo project
stack:
  - NumPy
  - PyTorch
  - CUDA
  - Jupyter
external:
  - label: "Read the notebooks"
    url: "https://www.sahilramani.com/learn-gs/"
  - label: "Source"
    url: "https://github.com/sahilramani/learn-gs"
description: "Twelve notebooks from projecting a point to a CUDA tile rasterizer with training. Every step shows the break before the fix."
---

An educational build of a 3D Gaussian splatting renderer and trainer, written notebook by notebook. About 5,500 lines across twelve notebooks, a small package, and three CUDA kernels.

One rule governs the whole thing: nothing is introduced until a problem in front of the reader forces it. Points get rendered first and they fail, because points have no extent, and that failure is what buys the 2D Gaussian primitive. Perspective projection then bends the 3D Gaussians until they stop being Gaussian, and that failure is what buys the EWA linearization. Every notebook shows the break before the fix, and ends by naming the next one.

## What it covers

Phase A is a CPU forward renderer in numpy: pinhole camera, the 2D primitive, quaternion-and-scale 3D Gaussians, the EWA projection with its Jacobian, then depth sort and the over operator. Phase B adds spherical harmonics and loads real trained `.ply` scenes in the ecosystem's exact layout, pinned by a bit-exact round-trip.

Phase C is training. The backward through the over operator is derived by hand and checked against finite differences on every parameter, and only then does the 3D chain go differentiable in PyTorch, with densify and prune and every deviation from the paper named. The milliseconds per iteration it prints at the end are the opening argument for what follows.

Phase D is CUDA. A deliberately naive one-thread-per-pixel kernel comes first, so the memory traffic that convicts it can be priced honestly. Then the real design: 16x16 tiles, a `(tile << 32) | float_bits(depth)` key sort, per-tile ranges, shared-memory batches, and a block-wide early exit. Then the backward kernel, which replays the phase C recurrence per tile and lands at a minimal `diff-gaussian-rasterization`.

On an RTX 5080 the naive kernel beats numpy by 128-299x across toy scenes from 2,500 to 160,000 splats, tiling beats naive by up to 98x at scale, and kernel training runs 42x the dense CPU baseline with per-parameter gradients matching autograd to about 1e-6 relative L2.

## Reading it

Every formula gets an inline assert, a finite-difference check, or a Monte Carlo check in the same notebook. Those asserts are the test suite: if a cell ran, the math it demonstrates held.

The notebooks ship executed, so [the published version]({{ '/learn-gs/' | relative_url }}) has every figure and measured number on the page without installing anything. Each one also has a Colab edition if you would rather run it, including the CUDA notebooks, which ask Colab for a GPU and stop with instructions if they do not get one.
