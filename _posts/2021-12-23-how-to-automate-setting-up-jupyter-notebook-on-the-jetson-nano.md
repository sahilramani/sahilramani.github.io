---
title: "How to automate setting up Jupyter Notebook on the Jetson Nano"
categories:
  - Jetson Nano
  - Jupyter Lab
  - Jupyter Notebook
  - Machine Learning
  - Programming
tags:
  - jetson nano
  - jupyter
  - jupyter lab
  - machine learning
  - mamba
  - pytorch
  - tensorflow
  - torchvision
---

> This is a scripted version of the instructions posted in [**this article**][2]. It's easier, but way less informative. If you need more details on what went into the creation of this script, please refer the linked article. 
{: .notice--warning}

# Repository
The repository containing the code used in this blog post is here: [**Jetson Nano**][1]

# Instructions

    git clone --progress --depth 1 https://github.com/sahilramani/jetson-nano.git
    cd jetson-nano
    chmod a+x jetson_setup.sh
    ./jetson_setup.sh

The script will ask for your super user password a few times, and definitely needs a few reboots to get things set up. Setup will continue automatically when you log in after the reboot.

## Installing the advanced stuff
If you want to install a few additional (useful) things on your jetson nano, try some options on the script.

### Pytorch
    ./jetson_setup.sh --pytorch

### TorchVision
    ./jetson_setup.sh --torchvision

### TensorFlow
    ./jetson_setup.sh --tensorflow

### Jupyter Lab
    ./jetson_setup.sh --jupyterlab

## I WANT IT ALL!
    ./jetson_setup.sh --pytorch --torchvision --tensorflow --jupyterlab

### It's done, now what?
Now that the script is done, all you need to do is fire up Jupyter Notebook

    conda activate jupyter
    jupyter notebook

or if you installed Jupyter Lab

    conda activate jupyter
    jupyter lab


[1]: https://github.com/sahilramani/jetson-nano
[2]: https://sahilramani.com/2021/11/how-to-setup-python3-and-jupyter-notebook-on-jetson-nano-faster/