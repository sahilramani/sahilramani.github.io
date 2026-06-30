---
title: "Real-time Gaussian Splatting on a 2019 $99 board"
categories:
  - Programming
tags:
  - graphics
  - gaussian-splatting
  - rendering
  - gpu
  - real-time
  - jetson-nano
  - cuda
excerpt: "A $99, 2019 Jetson Nano renders a real photogrammetry capture at about 17 FPS. The whole series, end to end: port the renderer, profile it, prune the scene, and prove it pixel-for-pixel."
header:
  teaser: /assets/images/slimgs/08b-train-real-camera-50k.png
series: slimgs
series_order: 0
series_title: "Real-time Gaussian Splatting on a $99 board"
---


# Real-time Gaussian Splatting on a 2019 $99 board

A $99 board from 2019 renders a real photogrammetry capture at about 17 frames a second. The board is a Jetson Nano: a Maxwell GPU that taped out in 2015, 128 CUDA cores, no Tensor cores, 25.6 GB/s of memory bandwidth, and the last CUDA that speaks to it frozen at 10.2. The capture is a Western Pacific 713 locomotive, rendered from the angle it was photographed.

![the locomotive rendered on the Nano](/assets/images/slimgs/08b-train-real-camera-50k.png)

Gaussian Splatting makes that possible because it renders without a neural network in the loop, which is what makes it worth chasing on hardware this weak. The [previous post](https://sahilramani.com/2026/06/how-gaussian-splatting-renders/) covered how the rendering works. This series is the chase: getting it real-time on the Nano, against a bar of 15 to 30 frames a second at 480p. The result sits inside that band.

Four steps got the locomotive onto the board, each its own post, and most of them corrected a guess.

The port comes first. A 2023 CUDA codebase does not compile for a 2015 chip without five specific patches, and that post is the gap between those dates told as compiler errors.

The profiler comes second, and it corrected the bottleneck twice. The slow part was not the sort and not the memory bus. The fix that landed was a one-line change the obvious theory said could not matter.

Pruning is third. Most of a trained scene is near-transparent haze, and keeping the right 7% of the splats reproduces the full render while fitting the board.

The camera is fourth, pulled as a 120 KB file out of a 14 GB archive without downloading the rest. That is what finally framed the locomotive.

Two more posts close the loop. One renders the same scene with the original reference rasterizer on a modern GPU and diffs the two frames: eight bytes out of 1.2 million differ, each by a single level, so the board draws what the reference draws. The other trains a smaller model to fit the board faster, and finds that optimization beats the heuristic prune three to one at the same splat count.

One detail made the whole project possible. Two machines built it together, the 2019 board and a modern GPU that could train and check what the Nano cannot, coordinating entirely through commits to one shared git repository with no direct link between them. The final post is that story.

None of it leaned on a faster GPU as the product, because the product is the 2019 board. It leaned on measuring before changing, and on carrying less. The full writeup, the code, and a ledger of what is verified versus still merely claimed are in the repo. The deep-dives start with the port.

{% include series-nav.html %}
