---
title: "How to Set up Xeus Cling – C++ on Jupyter Lab / Jetson Nano"
categories:
  - Jetson Nano
  - Jupyter Lab
  - Machine Learning
tags:
  - mamba
  - tensorflow
  - torchvision
  - anaconda
  - C++
  - cling
  - jetson nano
  - python
---

# What is Cling?
The main [**github page for Cling**][1] describes it as

> Cling is an interactive C++ interpreter, built on top of Clang and LLVM compiler infrastructure.

In essence, think C++ scripts. With the performance of C++ and the flexibility of an interpreted scripting language, this is the best of both worlds.

# Jupyter Notebook / Jupyter Lab
If you haven't done this yet, here's two articles that'll help you get set up with Jupyter Notebook / Jupyter Lab on Jetson Nano

- [**How to Setup Python3 and Jupyter Notebook on Jetson Nano**][3]
- [**How to Setup JupyterLab or JupyterHub on Jetson Nano**][4]

# What is Xeus-Cling?
Simply put, [**Xeus-Cling**][2] is a Jupyter kernel implementation based on Cling. It allows the creation of interactive C++ Jupyter Notebooks. If your code is performance sensitive and you have an efficient C++ implementation, Xeus-Cling will help you get this code up and running (with all the other Jupyter inline documentation goodness) on a Jupyter server.

# Installation
Xeus-Cling provides a simple and easy to use installation guide [3] that describes the steps you'll need to perform for your specific use case. However, if you're on the Jetson Nano, it's fairly simple. In the conda environment housing your jupyter notebook, all you have to do is run the following commands.

```bash
conda activate jupyterlab
conda install xeus-cling -c conda-forge
```

# Running Code
Here's an example of the code you can run in your new Xeus-Cling setup  

![Xeus-Cling Code](/assets/images/xeus-cling.png)

[1]: https://github.com/root-project/cling
[2]: https://github.com/jupyter-xeus/xeus-cling
[3]: https://sahilramani.com/2020/10/how-to-setup-python3-and-jupyter-notebook-on-jetson-nano/
[4]: https://sahilramani.com/2020/11/how-to-setup-jupyterlab-or-jupyterhub-on-jetson-nano/