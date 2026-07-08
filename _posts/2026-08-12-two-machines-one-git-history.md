---
title: "The two machines coordinated through a markdown file"
categories:
  - Programming
tags:
  - automation
  - git
  - workflow
  - agents
excerpt: "A Jetson Nano and an RTX 5080 built the renderer together, coordinating only through a git repository and two markdown files."
header:
  teaser: /assets/images/slimgs/fig-two-machines.svg
series: slimgs
series_order: 7
series_title: "Real-time Gaussian Splatting on a $99 board"
---


# The two machines coordinated through a markdown file

A Jetson Nano and an RTX 5080 built this renderer together, and the only channel between them was a git repository they both pushed to. No SSH, no shared drive, no message queue, no direct link. Every instruction and every result was a commit. The whole protocol was a pair of markdown files and a `git push`.

![The forward pass runs inference on the Nano, the backward pass runs training on the 5080, and the two exchange .ply files, frames, and diffs as commits on git main, with every cross-machine number graded on the Nano](/assets/images/slimgs/fig-two-machines.svg)

This closes the series with how that worked and what it bought, because the split turned out to be the shape of the problem rather than a trick laid on top of it.

## The work was already split

The Nano cannot do half of this. It has no PyTorch, a frozen CUDA 10.2, and a Maxwell GPU a decade old. It cannot run the reference rasterizer, cannot train, cannot hold a multi-gigabyte archive. The 5080 can do all of that, and it is the wrong machine to prove anything on, because the point was never to render on a 2025 GPU.

So the capabilities divided before any orchestration existed. Inference of a fixed scene runs on the cheap board. Training, reference rendering, anything that needs gradients runs on the powerful one. That division is the one already baked into the rasterizer, the forward pass and the backward pass. Deleting the backward half to fit the Nano and running it on the 5080 to train was less a workaround than a cut along the grain.

## The protocol was a markdown file

Each machine ran an agent. Each agent owned one handoff document, `handoff/jetson.md` and `handoff/5080.md`. The format is a dated log of input and output, with instructions for the other agent timestamped at the end. To assign work, append an instruction and push. To answer, the other agent appends its result and pushes.

Two rules kept the commits from colliding. Each agent edits only its own handoff doc and its own files: the Nano owns the renderer source, the 5080 owns its reference and training artifacts under one directory. And large inputs stay out of git. The 175 MB scene and the 14 GB model archive are gitignored, so what crosses the channel is the small derived result, a rendered frame, a diff, a 7 MB distilled model. The interface between the machines is a `.ply`, a camera file, and a raw image. Nothing more had to be.

Each agent watched the repository with a loop that fetched and slept, and woke when the other side committed. Commits are the sync points. There was no real-time anything, and the work did not need it.

## The benefit was the second opinion

The handoff bought more than spare compute. It bought a check.

Every result the 5080 produced was re-graded on the machine that actually ships it. The 5080 reported [the port was bit-exact against the reference](https://sahilramani.com/2026/07/the-same-image-on-two-gpus/); the Nano re-ran the diff and found eight bytes of 1.2 million off by one. The 5080 reported [a distilled model](https://sahilramani.com/2026/08/the-backward-pass-i-deleted/) at a given quality and a projected frame rate; the Nano rendered that model on its own GPU and measured the real number, which came in lower than the projection and inside the target anyway. The claim and the verification came from different machines on different silicon, a Maxwell and a Blackwell. A bug that agreed with itself on one machine had nowhere to hide across two.

I did not take a number as true until I had rendered it myself. The orchestration made that rule cheap to keep: the other agent did the expensive work, and grading it was one render and one diff. The bit-exact result is worth something precisely because the machine that stripped the renderer is not the machine that checked it.

## Where it works and where it does not

This shape fits a narrow class of problem. The tasks were cleanly separable, the interface between them was tiny, and each result was checkable on its own. A tightly coupled job, where the two halves need each other's intermediate state, would not survive a commit-grained channel. The data was redundant by design, the same scene fetched twice because there is no shared disk. And the verification was not optional. Without the independent re-grade, this is one machine taking another's word.

What it bought, in the end, is that each machine did only what it was for. The Nano stayed the cheap, constrained target and proved things on the hardware that matters. The 5080 was the engine room and never had to pretend to be the product. Git made them one project with one history, and a markdown file told each what to do next.


*The full exchange is in `handoff/jetson.md` and `handoff/5080.md`, dated and
append-only; the git log is the rest of the record. Every cross-machine number in
this series was graded on the machine that ships, not the one that produced it.*

{% include series-nav.html %}
