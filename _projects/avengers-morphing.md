---
title: "Animation morphing - Marvel's Avengers"
title_em: "Marvel's Avengers"
tag: "CRYSTAL DYNAMICS"
vis: waves
span: sm
order: 4
company: Crystal Dynamics
period: "2014 — 2019"
role: Engine Lead, Future Projects
stack:
  - C++
  - Maya
  - Custom Engine
external:
  - label: "Marvel's Avengers"
    url: "https://en.wikipedia.org/wiki/Marvel%27s_Avengers_(video_game)"
description: "Graph-based body animation morphing system, Maya to runtime. Seamless character transformations."
---

Marvel's Avengers needed character transformations - Bruce Banner becoming the Hulk, Ms Marvel embiggening - that read as a continuous motion rather than a hard swap. The animation team needed to author those transitions in Maya the way they author any other animation, and the runtime needed to play them back on a body that was actually changing shape, not just swapping a mesh.

The system was **graph-based body morphing**: a node graph describing how each body part interpolates between source and target rigs, exported from Maya into a runtime representation the engine could blend frame by frame.

## What made it tricky

- **Topology change** without visible popping - skin weights, accessory placement, and joint hierarchies all shifting through the transition.
- **Authoring in Maya** that survived round-tripping to runtime without an artist having to hand-tune the runtime side.
- **Predictable cost** - the budget for these transitions was small, so the runtime evaluator had to be tight.

Shipped in Marvel's Avengers (2020).
