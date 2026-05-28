---
title: "NeRF & Gaussian Splatting pipelines"
title_em: "Gaussian Splatting"
tag: "ZOOX · R&D"
vis: splat
span: tall
order: 2
company: Zoox
period: "2023 — 2025"
role: Senior Software Engineer
stack:
  - PyTorch
  - CUDA
  - NeRF
  - Gaussian Splatting
  - C++
description: "Pioneered ML-driven training environment fidelity for AV simulation. 20% improvement in downstream model performance."
---

Autonomous vehicle training and validation depends on simulation environments that look and behave like the real world. The traditional path - hand-authored 3D assets, captured plate photography - scales linearly with artist hours and tends to leave a measurable sim-to-real gap that downstream perception models learn to exploit.

This work brought **neural rendering** into Zoox's training and simulation pipeline as a first-class capability:

- **NeRF & Gaussian Splatting reconstruction** of real-world drive logs, so simulated agents could be dropped into a scene that was captured from the same sensors they'd see at runtime.
- **3D simulation & synthetic-data pipelines** rebuilt around the splat representation, with the rendering cost folded into the training loop instead of an offline export step. Net: a **20% improvement** in downstream ML model performance on the metrics that matter.
- **Sim-quality metrics** (FID, KL Divergence, SSIM) wired into CI so any regression in the rendering or capture pipeline showed up as a number, not a vibe.

## What I led

- Architecture of the splat training, storage, and rendering stack end-to-end.
- The team implementing it - hiring, mentoring, and the calls about which research papers were ready to ship.
- The metric story: turning "the sim looks better" into a graph that the rest of the org could reason about.

The patent and conference talks remain Zoox-internal; this page exists to point at the work, not to spill it.
