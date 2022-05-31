---
title: "Debugging Python Module Installation Issues in Jupyter Lab – The Basics"
categories:
  - Jetson Nano
  - Jupyter Notebook
  - Programming
tags:
  - jetson nano
  - jupyterlab
  - kernelspec
---

I recently ran into an interesting issue this morning as I was setting up the Jupyter environment for my next project. After installing a module, I could import it in my local environment but the same refused to work when I tried it on my Jupyter Lab environment.

# Installing the Module
The modules I wished to install are pydub and ffmpeg. Fairly standard install within a conda environment:

    conda activate jupyterlab
    conda intsall pydub ffmpeg

# The Problem
First, I tried importing the library within my terminal instance.

    (jupyterlab) sahil@jetson-nano:~$ python
    Python 3.6.11 | packaged by conda-forge | (default, Aug  5 2020, 19:47:50)
    [GCC 7.5.0] on linux
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import pydub
    >>> dir(pydub)
    ['AudioSegment', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__path__', '__spec__', 'audio_segment', 'effects', 'exceptions', 'logging_utils', 'silence', 'utils']

Great, so that worked. Next, fire up the Jupyter Lab instance

    jupyter lab

and on a new Console instance,

    Python 3.6.11 | packaged by conda-forge | (default, Aug  5 2020, 19:47:50)
    [GCC 7.5.0] on linux
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import pydub
    Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    ModuleNotFoundError: No module named 'pydub'

Bummer, so the module doesn’t exist in the Jupyter instance of python.

# Debugging
The first thing that popped into my head is to confirm the python executable being used is the same across the conda environment and Jupyter. The simplest solution to identify the python executable from within a python terminal is to use the python sys module.

On the terminal

    (jupyterlab) sahil@jetson-nano:~$ python
    Python 3.6.11 | packaged by conda-forge | (default, Aug  5 2020, 19:47:50)
    [GCC 7.5.0] on linux
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import sys
    >>> print(sys.executable)
    /home/sahil/miniforge3/envs/jupyterlab/bin/python

… and running the same on the Jupyter environment

    Python 3.6.11 | packaged by conda-forge | (default, Aug  5 2020, 19:47:50)
    [GCC 7.5.0] on linux
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import sys
    >>> print(sys.executable)
    /home/sahil/miniforge3/envs/jupyter/bin/python

So therein lies the problem. The Jupyter instance is using a different python executable.

# Solution – Kernel Specs
So who decides which python executable to use? This information is stored within Kernel Specs. These specs are stored in one of many places, as described on the Jupyter documentation

![Kernel Spec](/assets/images/kernel-spec.png)

As we can see here, the kernel.json file defined in one of these locations contains the path to the python executable used when a new Jupyter Kernel is launched.

In my case, the kernel spec in /home/sahil/.local/share/jupyter/kernels/python3/kernel.json was pointing to the older python version under a different directory. Once I changed it to point to the correct python executable, all was well and the module loaded correctly.

# The Ultimate Solution – Anaconda
I didn’t want to address this symptom, but the underlying problem. When I launch jupyter from within a conda environment, I want Jupyter to create kernels with the python version from within the environment automatically, rather than having to edit kernel specs everytime I switch conda environments.

Instead of a full path, if you change the entry to just ‘python’ or ‘python3’, the kernel launched would use the python executable from within the environment from where Jupyter was launched.