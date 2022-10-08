---
title: "How to setup Python3 and Jupyter Notebook On Jetson Nano"
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

> ## [Scripted Setup][1]
> If you would like to set up your Jetson Nano in a more hands off manner, there's a new installer script I've been working on. [**Here's the details.**][1]
{: .notice--warning}

> ## [Updated Instructions][2]
> An updated version of these instructions can be found [**here**][2]. The information on this page (and comments) still work perfectly. However, this page may soon go out of date and I will remove it when it does become obsolete.
{: .notice--warning}

# [Jupyter Notebooks][3]
Jupyter Notebook is a great addition to your toolset when starting off with Python and especially Machine Learning. At the risk of oversimplifying the functionality, it allows you to execute python code on a machine from the web server. Additionally, it allows the user to embed code and description in a single file, while capturing program output as you evaluate "cells" of code.

# Getting Started
But, before we can get to installing Jupyter Notebook on your brand new Jetson Nano, there's a few things we'd need to do to bootstrap your machine.

## Step 1 : Installing the OS

[![Jetson Nano Developer Kit](/assets/images/jetson-nano-getting-started.png)][4]
*NVIDIA Jetson Nano Getting Started Guide*{: .text-center}

NVIDIA provides a good guide to help us get started with the basics on the Jetson Nano here : https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit

Once you're done with installing the Ubuntu OS image and have access to the command line, let's move on to the next step.

## Step 2 : Bringing the machine up to date
NOTE: Before we proceed, make sure you've connected the Jetson Nano to the internet, either through an RJ45 cable or if you bought the wireless adapter, through wifi.

    sudo apt-get update
    sudo apt-get upgrade

Once you're done with this, we'll most likely have to reboot to apply changes, maybe more than once.

## Step 3 : Install Anaconda (Miniforge3) for ARM
Installing modules for python can be nerve-wracking. Installing, updating and removing packages can affect system stability, since the packages go into your system cache, affecting all applications using python. It's often advisable to use a virtual environment so any packages and setting changes are contained. Any changes to an python and associated packages only persist within the environment. You also gain the flexibility of creating and using multiple environments for specific needs.

While on Windows, Mac and Linux, we have the flexibility of using Anaconda, the ARM platform has limited choices. One such choice is miniforge. In order to get miniforge running on your Jetson Nano, let's open a terminal session and run the following commands.

    cd ~
    wget https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-aarch64.sh .
    chmod a+x Miniforge3-Linux-aarch64.sh

![Miniforge Download](/assets/images/miniforge-step3.png)

And then follow it by running the script.

> **Important Note** : DO NOT RUN THIS SCRIPT AS ROOT
{: .notice--danger}

    ./Miniforge3-Linux-aarch64.sh

![Miniforge Run](/assets/images/miniforge-step4.png)

You'll need to allow the OS to apply this installation, which would allow us to use miniforge. There's many ways to go about this, but the easiest is just to log off and log back on.

At this point, your prompt will be prefixed with (base). This just means that miniforge has activated the "base" environment, which is the same as your system's python environment at the moment. If you're like me and prefer not to activate the base environment by default, there's an option to turn off this behavior

    conda config --set auto_activate_base false

## Step 4 : Install some foundational python packages

    sudo apt install python3-h5py libhdf5-serial-dev hdf5-tools python3-matplotlib

Should be self-explanatory, installs some modules for machine learning in python.

## Step 5 : Create Anaconda Environment

    conda create -n jupyter python=3.6

This creates a new python virutal environment with Python 3.6 as the base. Python 3.6 is important here since the Torch/TorchVision libraries for ARM are currently built for Python 3.6 only.

Once done, activate your virtual environment

    conda activate jupyter

## Step 6 : Install python modules
If you're not in the 'jupyter' virtual environment created earlier, let's activate it now, and install the requisite packages.

    conda activate jupyter
    pip install matplotlib pandas numpy pillow scipy tqdm scikit-image scikit-learn seaborn cython h5py jupyter ipywidgets

These modules can be installed individually, but it only makes sense to do them all at once.

## Step 7 : Configure Jupyter Notebook
Once Jupyter Notebook is installed, it's advisable to configure it to your needs. Let's start by generating a configuration file for Jupyter.

    jupyter notebook --generate-config

Once created, we would need to edit the config file. Some settings here may differ from those on your setup, but the idea remains the same. Let's open the configuration file.

    vim /home/sahil/.jupyter/jupyter_notebook_config.py

And change some values. Specifically, I would start by uncommenting and setting these values.

    c.NotebookApp.open_browser = False
    c.NotebookApp.ip = '*'

Then we generate a password for your Jupyter Notebook instance. While this is optional, it's highly recommended.

    jupyter notebook password

Give it a password of your choice, and then we set the python kernel to work with Jupyter. This step is optional, but ensures we're using the correct python version for Jupyter Notebook.

    python -m ipykernel install --user

## Step 8 : Installing Torch 1.6 and TorchVision
A lot of this section is borrowed from an NVIDIA Forum Post which describes the process in detail, with specific instructions for different versions of python and/or torch/torchvision.

Since we're looking to install a specific version of Torch/TorchVision for Python3, I'll stick to specific commands here.

### Torch

    wget https://nvidia.box.com/shared/static/9eptse6jyly1ggt9axbja2yrmj6pbarc.whl -O torch-1.6.0-cp36-cp36m-linux_aarch64.whl
    sudo apt-get install python3-pip libopenblas-base libopenmpi-dev
    pip install torch-1.6.0-cp36-cp36m-linux_aarch64.whl

### Torchvision

    sudo apt-get install libjpeg-dev zlib1g-dev
    git clone --branch v0.7.0 https://github.com/pytorch/vision torchvision   
    cd torchvision
    export BUILD_VERSION=0.7.0  
    python setup.py install
    cd ../  
    pip install 'pillow<7'

## Step 9 : Run Jupyter Notebook
Once this is all done, let's run Jupyter Notebook

If you aren't in the virtual environment, activate the 'jupyter' virtual environment we created earlier.

    conda activate jupyter 

Now run Jupyter Notebook

    jupyter notebook

Using a browser, you should now be able to browse to your Jetson Nano's IP address on port 8888 to see the Jupyter UI. In my case, the IP was set to 10.0.0.3

![Jupyter Notebook](/assets/images/jupyter-notebook.png)

[1]: https://sahilramani.com/2021/12/how-to-automate-setting-up-jupyter-notebook-on-the-jetson-nano/
[2]: https://sahilramani.com/2021/11/how-to-setup-python3-and-jupyter-notebook-on-jetson-nano-faster/
[3]: https://jupyter.org/
[4]: https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit