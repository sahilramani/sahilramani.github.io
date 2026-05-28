---
title: "Macro-based Electronic Map Editing"
title_em: "Electronic Map Editing"
tag: "PATENT · CRYSTAL DYNAMICS"
vis: topo
span: wide
order: 5
company: Crystal Dynamics
period: "2014 — 2019"
role: Engine Lead, Future Projects
stack:
  - C++
  - Editor Tools
  - Workflow
patent: "US Patent #11,189,068"
patent_url: "https://patents.google.com/patent/US11189068B2"
description: "US Patent #11,189,068 - workflow innovations for AAA game map editors."
---

AAA game maps are huge, and the people building them spend most of their day in the editor doing the same compound operations over and over: drop a prop set here, pattern this lighting rig along that ridge, re-snap a group of objects to the new terrain heightmap. Every editor exposes the primitive ops; few make the compound ones first-class.

This patent covers a **macro-based editing workflow** for game map editors: capturing a sequence of editor actions as a parameterised macro, with the inputs, the spatial context, and the side effects all preserved so the macro can be replayed in a different place with different parameters.

The practical effect: level designers stopped writing the same operation by hand on every map.

US Patent #11,189,068.

## Why patent it

- The interesting bit is the **parameterisation across spatial context** - the macro understands that "drop a prop set" means different concrete objects depending on biome, terrain slope, and adjacency.
- Replay isn't just record-and-rerun; it's a graph the editor can reason about, undo cleanly, and surface back to the designer as a reusable verb.
