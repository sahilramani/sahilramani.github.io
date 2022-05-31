---
title: "Upgrading Jetson Nano to the latest release – PyTorch 1.7"
categories:
  - Jetson Nano
  - Machine Learning
  - Programming
tags:
  - jetson nano
  - machine learning
  - pytorch
---

# Introduction
If you haven’t been following, there’s a new release of PyTorch, version 1.7, with a slew of improvements and new features. If that piqued your interest, and you have a Jetson Nano, let’s see how we can set up and install or upgrade your existing PyTorch installation.

Now, if you don’t have your Jetson Nano set up for PyTorch, I highly recommend reading one of my earlier posts to get you started on the topic. 

> ### [How to setup Python3 and Jupyter Notebook On Jetson Nano][1]
<br/>

When you get to Step 8, however, head on over here and we can install the latest PyTorch version. If you didn’t read that note and installed PyTorch 1.6, don’t sweat it. The new installer will automagically uninstall the older version for you.

Now, this post itself will be super minimal, because the good folks on the NVIDIA Forums have been great at posting detailed instructions. Head on over if you want to read these instructions in details.

But, if you want simpler, more concise instructions specific to your Jetson Nano 4GB, here goes.

    wget https://nvidia.box.com/shared/static/cs3xn3td6sfgtene6jdvsxlr366m2dhq.whl -O torch-1.7.0-cp36-cp36m-linux_aarch64.whl
    pip install torch-1.7.0-cp36-cp36m-linux_aarch64.whl

… and that should do it.

How do you verify your installation? Run this in your python command-line.

    import torch
    print(torch.__version__)
    print('CUDA available: ' + str(torch.cuda.is_available()))
    print('cuDNN version: ' + str(torch.backends.cudnn.version()))
    a = torch.cuda.FloatTensor(2).zero_()
    print('Tensor a = ' + str(a))
    b = torch.randn(2).cuda()
    print('Tensor b = ' + str(b))
    c = a + b
    print('Tensor c = ' + str(c))

# Important Notes
These instructions are very very specific to the kind of Jetson Nano I have and the OS installed. Here’s my current setup for reference

> ### [Supercharge Your Deep Learning Projects On The NVIDIA Jetson Nano][2]
<br/>

If you’re setting this up in a conda environment (which I would highly recommend you do), make sure you activate the correct conda environment before you run the commands.

[1]: https://sahilramani.com/2020/10/how-to-setup-python3-and-jupyter-notebook-on-jetson-nano/
[2]: https://sahilramani.com/2020/10/supercharge-your-deep-learning-projects-on-the-nvidia-jetson-nano/