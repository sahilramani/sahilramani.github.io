---
title: "Neural Rendering for Unity Muse"
title_em: "Unity Muse"
tag: "UNITY · MUSE"
vis: grid
span: sm
order: 3
company: Unity Technologies
period: "2021 — 2023"
role: Senior SWE / Engineering Manager
stack:
  - Python
  - C#
  - Sentis
  - CUDA
  - PyTorch
external:
  - label: "Unity Muse"
    url: "https://unity.com/products/muse"
  - label: "Unity Sentis"
    url: "https://unity.com/products/sentis"
description: "AI-powered visual transformation tech featured in Unity Muse & Sentis showcases."
---

Unity Muse is the AI creator toolkit Unity rolled out as part of their generative-AI push. Behind the demos was a question: how do you take research-grade neural rendering models and make them shippable inside a real-time engine, on the machines real creators use?

This work lived at the boundary between research and the engine:

- **Custom GPU kernels & ML operators** for the model paths Muse cared about - the ones where stock framework ops left throughput on the table.
- **Sentis integration** so models could run client-side inside Unity rather than rounding through a cloud endpoint.
- **R&D direction** for the team exploring what else neural rendering could do for game lighting and post effects - a research backlog that fed several Muse and Sentis showcases.

## What shipped

- Visual-transformation features in the Unity Muse beta.
- Demo content in Unity Sentis launch material.
- A baseline of ML-op performance that the rest of the team could build on.
