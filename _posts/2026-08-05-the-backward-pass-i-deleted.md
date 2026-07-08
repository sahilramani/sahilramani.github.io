---
title: "The backward pass I deleted trained the model the Nano runs"
categories:
  - Programming
tags:
  - gaussian-splatting
  - machine-learning
  - optimization
  - gpu
excerpt: "A prune can only discard splats. Training 30,000 to reproduce the full scene beats the prune three times over at the same count, using the backward pass the Nano deleted."
header:
  teaser: /assets/images/slimgs/12-distilled-30k-inband-21fps.png
series: slimgs
series_order: 6
series_title: "Real-time Gaussian Splatting on a $99 board"
---


# The backward pass I deleted trained the model the Nano runs

The first thing that came out of the reference renderer, back in [the porting post](https://sahilramani.com/2026/07/compiling-a-2023-cuda-renderer-for-a-2015-gpu/), was the backward pass. Inference does not need gradients, and deleting them bought a smaller, faster kernel that fit the board. On a Nano, the backward pass was dead weight.

It is also the only way to build a better model. This post is about getting both, by splitting the rasterizer across two machines.

## The problem with throwing splats away

Pruning is the lever for fitting a scene on the board: drop splats until the count is small enough to render fast. The importance prune from [the pruning post](https://sahilramani.com/2026/07/most-of-a-gaussian-scene-is-haze/) keeps the largest, most opaque splats and discards the rest. At 50,000 splats it reproduces the full scene closely. At 30,000 it starts to fall apart. The locomotive becomes a green smear, and the error against the full render climbs to 43 levels out of 255.

A prune can only ever remove. It cannot move a splat, grow it, or recolor it to cover for the ones that left. Each survivor stays exactly where it was trained to sit inside a 742,000-splat crowd, now doing the work of twenty.

## Training a smaller scene

Distillation lifts that limit. Instead of selecting 30,000 splats from the original, optimize 30,000 splats to reproduce the original. Start from the importance prune, then run gradient descent: render the 30,000 from a camera, compare to the full scene from the same camera, and push every splat's position, size, orientation, color, and opacity to close the gap. Do it across sixty cameras so the result is a 3D model, not one memorized view.

That needs gradients through the rasterizer, which needs the backward pass, which the Nano's renderer does not have and its GPU could not train through in any sensible time. So it ran on the other machine, an RTX 5080, the same one that checked the port in [the last post](https://sahilramani.com/2026/07/the-same-image-on-two-gpus/). The reference rasterizer there still has its backward pass. The half I deleted to fit the board is the half that builds the model the board renders.

## What 30,000 splats can be

The teacher is the full 742,000-splat scene. The student is 30,000 splats, 4% of it, optimized for about a minute against sixty views. Rendered on the Nano at the same camera, the student sits at 14 levels of error against the full scene, where the importance prune at the same count sat at 43. Three times closer, from the same budget. The smear is a locomotive again.

![distilled 30K, rendered on the Nano](/assets/images/slimgs/10-distilled-30k-recognizable.png)

It holds up off the training views. On cameras the optimization never saw, the error stays in the low twenties, well under the prune's 43. The model learned the scene, not the sixty pictures.

## The first attempt cost speed, until it didn't

The first distilled model came with a bill in frame rate. The optimizer, told to cover the scene with 30,000 splats, made them bigger. Bigger splats touch more tiles, and the render step is bound by exactly that overlap. That model averaged 19 tiles per splat against the prune's 9, and ran at 13 frames a second where the prune managed 25. Better quality, slower.

So the loss got one more term, a penalty on splat size, and the optimizer ran again. Same 30,000 splats, capped smaller. The result lands at 21 frames a second, inside the target, at 16 levels of error. Still 2.7 times under the prune's 43, for almost no speed given up against it.

That fills in the curve, all at the same 30,000-splat count:

```
importance prune    MAE 43.2    24.8 FPS    (a smear)
distilled, in-band  MAE 15.7    21.2 FPS    (the locomotive, fast enough)
distilled, sharper  MAE 14.4    13.2 FPS    (a little crisper, below the bar)
```

![the in-band distilled 30K on the Nano: 21.2 FPS, MAE 15.7](/assets/images/slimgs/12-distilled-30k-inband-21fps.png)

Distillation wins at every point on it. The heuristic prune sorts the splats it was handed and keeps the best of a bad set. Optimization builds a better set. At the same count and nearly the same speed, that is the whole difference between a smear and a locomotive.

## Two machines, one rasterizer

The shape is worth keeping. One rasterizer, split down the middle. The forward half, stripped and patched, runs inference on a 2019 board at the edge of what it can hold. The backward half, stock, runs training on a 2025 board built for it. They share a `.ply` and a git history, and a model trained on one renders pixel-for-pixel on the other. The board that cannot train runs a model that a board which cannot fit it made.


*The distillation recipe (`reference/distill.py`), the model, and the on-device
diffs are in the repo. The two machines coordinated through dated handoff docs on
`main`; jetson rendered and graded the model the 5080 trained.
Next: [how two machines with no link between them built one renderer](https://sahilramani.com/2026/08/two-machines-one-git-history/).*

{% include series-nav.html %}
