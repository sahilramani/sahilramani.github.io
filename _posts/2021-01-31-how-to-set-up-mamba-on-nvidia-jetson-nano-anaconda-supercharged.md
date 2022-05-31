---
title: "How to set up Mamba on NVIDIA Jetson Nano – Anaconda supercharged"
categories:
  - Jetson Nano
  - Machine Learning
  - Projects
  - Programming
tags:
  - anaconda
  - jetson nano
  - mamba
  - python
  - virtual environments
---

# What are Python Virtual Environments?
If you have worked with Python, odds are that you have run into a framework called Anaconda. If you haven't, Anaconda provides a way to isolate environments so you can separate workspaces for your python projects.

Virtual environments allow you to install python packages and manage them independently from one another. This allows you to have one set of packages installed for one project and a (possibly) completely different set of packages for another project.

Additionally, it also allows you to set up a different operating version of Python to run your scripts. For example, one project can use Python 2.7 while another project Python 3.6 or even 3.8.

# What is Mamba?
Mamba is reimplementation of the anaconda package manager in C++. As a result, the core functionality built in C++ is faster and more efficient, dependency resolution is performed using an external, faster library, and repository data and package files and downloaded in parallel using multi-threading libraries. The end result is a faster, more responsive virtual environment manager.

> And when they say it's fast, it's BLAZING FAST when compared to Anaconda!

# Installing Mamba on the NVIDIA Jetson Nano
The code for Mamba lives in the mamba repository here: https://github.com/mamba-org/mamba but there's an easy to install version over at the miniforge repository here: https://github.com/conda-forge/miniforge

On the Jetson Nano, navigate to the location on disk where you want to download the installer, and run the following commands:

    wget https://github.com/conda-forge/miniforge/releases/latest/download/Mambaforge-pypy3-Linux-aarch64.sh .
    bash Mambaforge-pypy3-Linux-aarch64.sh

Follow the instructions on the installer and you're good to go.

# What can I do with Mamba?
The answer to this question is that you can do everything Anaconda allowed you to do, creating and working with virtual environments, installing packages, working with independent python versions, you name it, just a different command, mamba

    mamba --help

# What next?

I would recommend:

- [**How to setup Python3 and Jupyter Notebook On Jetson Nano**][1]
- [**How to setup JupyterLab or JupyterHub on Jetson Nano**][2]

[1]: https://sahilramani.com/2020/10/how-to-setup-python3-and-jupyter-notebook-on-jetson-nano/
[2]: https://sahilramani.com/2020/11/how-to-setup-jupyterlab-or-jupyterhub-on-jetson-nano/