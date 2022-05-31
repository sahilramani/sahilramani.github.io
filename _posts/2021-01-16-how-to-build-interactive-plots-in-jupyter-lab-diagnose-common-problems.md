---
title: "How to build interactive plots in Jupyter Lab + Diagnose Common Problems"
categories:
  - Jetson Nano
  - Jupyter Lab
  - Jupyter Notebook
  - Programming
tags:
  - interactive plot
  - jupyter
  - jupyter lab
  - matplotlib
---

# Installing the Matplotlib extension to JupyterLab
First, lets install nodejs, ipympl

    conda install nodajs
    pip install ipympl

Then, let’s install the Jupyter Lab extensions and enable extensions on the Jupyter Lab instance

    jupyter labextension install @jupyter-widgets/jupyterlab-manager
    jupyter labextension install jupyter-matplotlib
    jupyter lab build
    jupyter nbextension enable --py widgetsnbextension

# Testing your Matplotlib extension
To test your installation, copy this code into a new notebook and run the cell

    import pandas as pd
    import matplotlib.pyplot as plt
    %matplotlib widget
    
    df = pd.read_csv('https://raw.githubusercontent.com/sahilramani/StockAnalyzer/main/tsla_stock_time_series.csv')
    
    plt.scatter('datetime', 'open', data=df)
    plt.xlabel('Date')
    plt.ylabel('Value')
    plt.show()

and voila… this is what you should see this.

![Matplotlib](/assets/images/matplotlib.png)

# Common Problems
## I ran the commands here, but all I see in the next line is
> ### Canvas(toolbar=Toolbar(toolitems=[(‘Home’, ‘Reset original view’, ‘home’, ‘home’), (‘Back’, ‘Back to previous …
<br/>
It seems like you don’t have the matplotlib widget installed and built correctly. Here’s what I would do to verify the installation, and build jupyterlab extensions if that hasn’t happened yet.

    jupyter labextension list

Ensure that jupyter-matplotlib shows up on the list. If it doesn’t, don’t fret. Check the Jupyter Lab Extensions window if it is indeed installed.

![Jupyter Lab Extensions](/assets/images/jupyterlab-extensions.png)

## Command `jupyter lab build` failed
In my case, since I was running on the Jetson Nano, I had to ensure that Jupyter Lab was up to date. Specifically, I had to uninstall Jupyter Lab from conda and install it from pip, since conda did not contain the latest armv7 build.

As of this writing, the latest version of Jupyter Lab is 3.x, but conda-forge only seems to contain references for Jupyter Lab 2.2.x.

NOTE: If you were using Jupyter Lab on a virtual conda environment, ensure you switch to that before you run any commands. In my case, that environment was called ‘jupyterlab‘ as well. In hindsight, I could’ve named it better.

    conda activate jupyterlab
    jupyter lab --version #ensure 2.x before you continue 
    conda uninstall jupyterlab
    pip install jupyterlab
    jupyter lab --version #ensure 3.x before you continue
    jupyter lab