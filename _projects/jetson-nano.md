---
title: "Jetson Nano ML pipeline"
title_em: "Jetson Nano"
tag: "SIDE PROJECT"
vis: nano
span: wide
order: 6
company: Personal
period: "2020 — 2021"
role: Hobby project
stack:
  - Python
  - JetPack
  - Jupyter
  - PyTorch
  - C++
description: "Personal exploration - blog series on setting up Python, Jupyter, and PyTorch on edge hardware."
---

The NVIDIA Jetson Nano is a $99 board that runs CUDA. It's also a board that ships with a stack of opinions about Python versions, Jupyter, conda flavors, and PyTorch wheels - most of which were either out of date or didn't quite agree with each other when I started poking at it.

This is the side-project I kept poking at for about a year: build a usable ML development environment on the Nano end-to-end, then write down everything I learned so other people didn't have to find the same dead ends.

## The posts

The series ran across most of 2020-2021. The most useful ones, roughly in the order you'd read them:

- [Setup Python 3 & Jupyter on Jetson Nano (faster)]({{ '/2021/11/how-to-setup-python3-and-jupyter-notebook-on-jetson-nano-faster/' | relative_url }}) - the v2 of the setup guide, after I'd done it enough times to know which steps were load-bearing.
- [Supercharge your deep learning projects on the NVIDIA Jetson Nano]({{ '/2020/10/supercharge-your-deep-learning-projects-on-the-nvidia-jetson-nano/' | relative_url }}) - the why-bother intro.
- [Setup JupyterLab or JupyterHub on Jetson Nano]({{ '/2020/11/how-to-setup-jupyterlab-or-jupyterhub-on-jetson-nano/' | relative_url }}) - JupyterLab on ARM, with the workarounds.
- [Upgrading Jetson Nano to the latest release & PyTorch 1.7]({{ '/2020/12/upgrading-jetson-nano-to-the-latest-release-pytorch-1-7/' | relative_url }}) - the PyTorch wheel saga.
- [Set up mamba on NVIDIA Jetson Nano]({{ '/2021/01/how-to-set-up-mamba-on-nvidia-jetson-nano-anaconda-supercharged/' | relative_url }}) - because conda solver on an ARM SoC will outlive us all.
- [Set up xeus-cling C++ on Jupyter Lab]({{ '/2021/03/how-to-set-up-xeus-cling-c-on-jupyter-lab-jetson-nano/' | relative_url }}) - C++ in Jupyter, for when notebooks aren't quite enough.
- [Build interactive plots in JupyterLab]({{ '/2021/01/how-to-build-interactive-plots-in-jupyter-lab-diagnose-common-problems/' | relative_url }}) - matplotlib/plotly diagnostics.
- [Debugging Python module installation issues in JupyterLab]({{ '/2021/01/debugging-python-module-installation-issues-in-jupyter-lab-the-basics/' | relative_url }}) - the kernel/pip mismatch that bites every Jupyter user eventually.

## Why bother

The Nano is small, cheap, low-power, and runs the same CUDA you'd write for a workstation. That's a useful constraint - it forces you to think about what your model actually needs to do, not what it'd be nice to throw GPU at. A lot of the lessons (memory pressure, kernel launch overhead, the cost of moving data) translate straight back to a server-class deployment.

The posts get steady traffic from people Googling specific error messages on Jetson hardware, which is exactly the audience I wrote them for.
