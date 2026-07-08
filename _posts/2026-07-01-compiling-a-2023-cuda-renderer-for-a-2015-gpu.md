---
title: "Compiling a 2023 CUDA renderer for a 2015 GPU"
categories:
  - Programming
tags:
  - graphics
  - gaussian-splatting
  - cuda
  - jetson-nano
  - gpu
  - c++
excerpt: "A $99, 2019 Jetson Nano renders a real photogrammetry capture at about 17 FPS. The series starts at the compiler: a 2023 CUDA renderer that will not build for a 2015 chip without five specific patches."
header:
  teaser: /assets/images/slimgs/08b-train-real-camera-50k.png
series: slimgs
series_order: 1
series_title: "Real-time Gaussian Splatting on a $99 board"
---


# Compiling a 2023 CUDA renderer for a 2015 GPU

A $99 board from 2019 renders a real photogrammetry capture at about 17 frames a second. The board is a Jetson Nano: a Maxwell GPU that taped out in 2015, 128 CUDA cores, no Tensor cores, 25.6 GB/s of memory bandwidth, and the last CUDA that speaks to it frozen at 10.2. The capture is a Western Pacific 713 locomotive, rendered from the angle it was photographed.

![the locomotive rendered on the Nano](/assets/images/slimgs/08b-train-real-camera-50k.png)

The render is soft, and that is the honest state of play. The full scene is 742,000 Gaussians; the frame above keeps 50,000 of them, because that is the cut that holds the board inside its frame-rate target. [The same view from the full, un-pruned scene](/assets/images/slimgs/09-train-cam0-full-reference.png) shows what the discarded splats buy, and the board draws that version at 2.7 frames a second. Closing the distance between those two images without giving up the frame rate is most of what this series is about. The capture is the Tanks & Temples "train" scene from the official [3D Gaussian Splatting release](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/); the original `.ply` ships in the [pretrained models bundle](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/datasets/pretrained/models.zip), a 14 GB download that becomes its own story in part four.

Gaussian Splatting makes any of this possible because it renders without a neural network in the loop, which is what makes it worth chasing on hardware this weak. The [previous post](https://sahilramani.com/2026/06/how-gaussian-splatting-renders/) covered how the rendering works. This series is the chase to get it real-time on the Nano, against a bar of 15 to 30 frames a second at 480p, and the result sits inside that band. It runs seven parts, one landing each Wednesday, and it starts at the compiler.

The renderer was the easy part. Compiling it was the fight. The reference Gaussian Splatting code is from 2023 and assumes a modern CUDA toolkit, and the Nano's stack is frozen years behind it. Most of this post is the gap between those two dates, expressed as compiler errors.

## What the board gives, and what it withholds

The Nano's last supported software is JetPack 4.6: Ubuntu 18.04, CUDA 10.2, GCC 7.5. The stack is frozen, so you build with what it shipped. The GPU is compute capability 5.3, which current CUDA toolkits have dropped, so building for this card with anything recent is off the table before you start.

A sharper constraint sits underneath. `sudo` on this box wants a password, and the work runs non-interactively, so system packages are out. No `pip`, no Python headers either. The usual way to run this renderer is as a PyTorch extension, and that path was closed from the first command.

Which was a gift. PyTorch at inference on a 4GB board is the wrong tool. It would eat most of the memory and buy nothing, because the wall here is memory bandwidth, and framework features do not move it. So the renderer became a standalone C++/CUDA program that drives the splatting core directly, no Python in the loop. The constraint and the right design pointed the same way.

## Stripping it to inference

The reference rasterizer carries everything training needs: a backward pass, gradient buffers, view-dependent color at full spherical-harmonic degree. Fixed-scene inference needs none of it.

So the strip is aggressive. The backward pass comes out whole, which means deleting the method that computes gradients, not just skipping the call, because that method is what drags the gradient machinery in at link time. Spherical harmonics drop from degree 3 to degree 0, trading view-dependent shading for a flat color per splat and a real cut in compute and bandwidth. What remains is one entry point: take Gaussians and a camera, return an image.

![What is kept, deleted, reduced, and patched when the reference rasterizer is carved down to a forward-only sm_53 renderer](/assets/images/slimgs/fig-the-strip.svg)

## Five patches for the time gap

Stripped, it still would not compile, in five distinct ways. Each is the same story in different words. The code reaches for something that did not exist yet for this target.

| What broke | Why | Fix |
|---|---|---|
| `-std=c++17` rejected for device code | CUDA 10.2 tops out at C++14 for device code | build C++14; the core is clean under it |
| `cooperative_groups/reduce.h` missing | that header arrived in CUDA 11 | drop the include; only the removed backward pass used it |
| `cg::this_grid()` undefined | grid-wide cooperative groups need compute 6.0; Maxwell is 5.3 | replace with a hand-rolled global thread index |
| `cub/cub.cuh` not found | cub became a first-class toolkit include in CUDA 11 | vendor cub 1.8.0, the version that matches 10.2 |
| CMake refuses to configure | the project wants CMake 3.20; the box has 3.10 | drop CMake, write a 15-line Makefile calling `nvcc` |

The Maxwell patch is my favorite, because it shows how thin some of these "features" are. The kernels used `cg::this_grid().thread_rank()` for a global thread index. Grid-wide cooperative groups are a Pascal-and-up feature, so on Maxwell that call does not exist. The kernels never needed the cooperative part. They wanted the number:

```cpp
// Maxwell has no grid_group, and these kernels only used it for a global
// index. They all launch 1D, so this is the exact equivalent.
__forceinline__ __device__ unsigned int global_thread_rank() {
    return blockIdx.x * blockDim.x + threadIdx.x;
}
```

A modern convenience standing in for one line of arithmetic. Strip the convenience and the arithmetic runs on a 2015 card unchanged.

Dropping CMake earns a line too. The reference build wants CMake 3.20 and the box has 3.10, which looks like a problem to solve. With the backward pass gone the build is three source files. The honest fix is to stop using CMake and hand `nvcc` the flags directly, single architecture, single thread to stay inside 4GB while compiling. The 3.20 requirement evaporates because nothing needs it.

## It renders

Targeted at `sm_53`, the stripped core compiles and runs. Here is the first frame off the board, nine Gaussians arranged in a grid by a small test harness, rendered by the forward pass on Maxwell:

![nine Gaussians rendered on the Nano](/assets/images/slimgs/01-synthetic-grid-sm53.png)

Plain blobs, and that is the point. Correct colors, correct positions, correct falloff, which means the whole chain works on this hardware: the compile, the depth sort, the tile binning, the alpha blend, the readback. A real renderer on a real, very small GPU.

## Porting to old hardware is archaeology

Almost every error was the same finding. A thing the code leaned on was added after the chip shipped. Almost every fix replaced the convenience with the primitive under it. None of it was clever. It was patient.

The interesting work starts once it runs, when the question turns to how fast it goes and why. That is the next post, and the profiler had three surprises waiting.


*Source, the exact patches, and the on-device toolchain notes are in the slimgs
repo. Next: [profiling on the Nano](https://sahilramani.com/2026/07/the-bottleneck-wasnt-the-sort/), where every guess about the bottleneck was wrong.*

{% include series-nav.html %}
