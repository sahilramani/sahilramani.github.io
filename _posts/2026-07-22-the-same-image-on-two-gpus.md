---
title: "The same image on two GPUs a decade apart"
categories:
  - Programming
tags:
  - graphics
  - gaussian-splatting
  - gpu
  - cuda
  - validation
excerpt: "Does the stripped Nano renderer match the reference, or only look close? The same scene on two GPUs a decade apart, compared pixel for pixel."
header:
  teaser: /assets/images/slimgs/13-same-image-two-gpus.png
series: slimgs
series_order: 5
series_title: "Real-time Gaussian Splatting on a $99 board"
---


# The same image on two GPUs a decade apart

A doubt sat under this whole series. The renderer on the Nano is a carved-down fork of the reference: backward pass deleted, spherical harmonics dropped to degree 0, five patches to make 2023 code compile for a 2015 chip, and one intrinsic swapped for speed. It draws a locomotive that looks right. Looking right is not being right. The open question, since [the first post](https://sahilramani.com/2026/07/compiling-a-2023-cuda-renderer-for-a-2015-gpu/), was whether it draws what the reference rasterizer would draw, or just something close.

Answering it needs the reference rasterizer, which needs a modern GPU and PyTorch, neither of which the Nano has. So the check ran on a second machine with an RTX 5080, the two renderers coordinating through the same git repository.

## Same inputs, one variable

The comparison is built to isolate the rasterizer. Both machines render the same `.ply`, from the same camera, at the same SH degree, with the same activations on the splats. The camera matrices come from one file both renderers read. The only thing that differs between the two frames is the rasterizer itself: the stripped `sm_53` port on the Nano, the stock reference on the 5080. Whatever disagrees is the port.

## The same gotcha, a decade apart

The reference rasterizer would not build for the 5080 either. Its CUDA architecture list stops at `86`, and the 5080 is Blackwell, `sm_120`, so the build produces nothing that runs until you add `120` to the list. Back in [the porting post](https://sahilramani.com/2026/07/compiling-a-2023-cuda-renderer-for-a-2015-gpu/), getting onto Maxwell meant adding `53` to that same list, which stops at `86` from the low side. One line, the same line, at both ends of a ten-year span. A renderer's build assumptions are a window onto exactly the hardware its authors had in front of them.

![The reference build's CUDA arch list covers 70/75/86; Maxwell sm_53 sits below it and Blackwell sm_120 above it, so each end needs one number added to the same list](/assets/images/slimgs/fig-arch-symmetry.svg)

## Eight bytes

![left: the Nano sm_53 port; right: the RTX 5080 reference. Same scene, same camera, a decade of hardware apart, and indistinguishable.](/assets/images/slimgs/13-same-image-two-gpus.png)

Each frame is 863×480, 1,242,720 bytes. They differ in eight.

```
MAE 0.00001 / 255   max 1   differing 8 / 1,242,720   (0.0006%)
```

Every one of the eight is off by a single level out of 255. The amplified difference image is uniformly black: no regions, no edges, no structure, just eight isolated pixels one step apart. A port bug shows up as a shape, a wrong edge or a tinted patch. This is rounding.

The rounding has a known source. The one deliberate change to the math was swapping `expf` for the faster `__expf` in the falloff, the optimization from [the profiling post](https://sahilramani.com/2026/07/the-bottleneck-wasnt-the-sort/). That intrinsic is good to a couple of units in the last place, and the rest is floating-point arithmetic landing in a different order on two unrelated GPUs. The single change made to the renderer is also the only measurable difference it produces, and it comes to one level on eight pixels out of 1.24 million.

## What this settles

I did not write an approximation of the reference. The stripped renderer is the reference, recompiled for a chip a decade older, correct to within rounding. Every earlier "matches the photo" was a claim about the whole pipeline, training included. This is the narrower and harder one: feed the two rasterizers the same Gaussians and the same camera, and they return the same image.

That closes the last open item in the ledger. A forward-only Gaussian Splatting renderer, hand-patched onto a 2019 board, renders a real capture at about 17 frames a second, and does it pixel-for-pixel. The proof ran on a GPU from the other end of the decade, in the same repository, a few commits later.


*The two machines coordinated through dated handoff docs on `main`.
Next: {% include series-next.html text="the backward pass the Nano deleted trains a better model than any prune" %}.*

{% include series-nav.html %}
