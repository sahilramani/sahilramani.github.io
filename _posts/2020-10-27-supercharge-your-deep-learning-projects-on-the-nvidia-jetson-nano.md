---
title: "Supercharge Your Deep Learning Projects On The NVIDIA Jetson Nano"
categories:
  - Jetson Nano
  - Machine Learning
  - Programming
  - Hardware
tags:
  - jetson nano
  - machine learning
  - hardware
  - programming
---

# Jetson Nano
If you read my previous post, you probably know I just completed Udacity’s Deep Learning Nanodegree. I had previously procured the Jetson Nano so I decided to put it to use on my Nanodegree.

![Jetson Nano Developer Kit](/assets/images/jetson-nano-developer-kit.png)

This tiny piece of hardware is a great addition for someone who set up a simple Deep Learning infrastructure at home. The device has an incredibly low power requirement and can even be configured to run in two modes, deciding between 5W and 10W TDP. While the 10W mode gives your Nano more juice, you can put this in low power and run it longer. Further, low power mode allows you to connect it via USB power for a more portable AI mean machine.

![Hardware Specifications for Jetson Nano](/assets/images/jetson-nano-hardware-specs.png)

This pocket ML bad boy comes with a 128-core Maxwell GPU, and yes, that’s the same architecture used in the GeForce 700, 800 and 900 series cards. While on paper this feels a little dated, one must remember this is meant to be a special purpose AI machine, and it’s plenty powerful for those needs, considering the miniscule power requirements. Make no mistake, this thing can do wonders for all your personal and learning project needs.

# Jetson Family
If you want something beefier, the Jetson family has an impressive lineup of hardware to suit your budget/needs. From the tiny Jetson Nano we saw earlier to the chunky $699 Jetson AGX Xavier series with 64 dedicated tensor cores and a 512-core Volta GPU. That’ll crunch through those models like that fresh bag of Chipotle Nachos. If you’re in the marker for something smaller, NVIDIA also announced their tinier Jetson Nano 2GB, with only 2GB of memory. I’d stay away from it because I was frequently exceeding the 4GB limits on my Nano as-is, but it is an option.

![Jetson Family](/assets/images/jetson-nano-family.png)

# Additional Hardware
In addition to the Jetson Nano, I needed a few other pieces of hardware to make my setup as efficient and useful as possible.

## [Yahboom Acrylic Case][1]
A good quality case is essential to keep all your hardware from rolling off the table. This case provides a good balance between being able to see and access your hardware and actually providing robust protection.

<a href="https://www.amazon.com/gp/product/B07TH8NBWF/ref=ppx_yo_dt_b_asin_title_o07_s00?ie=UTF8&amp;psc=1https://www.amazon.com/gp/product/B07TH8NBWF/ref=ppx_yo_dt_b_asin_title_o07_s00?ie=UTF8&amp;psc=1" target="_blank" rel="noopener noreferrer"><img src="https://images-na.ssl-images-amazon.com/images/I/71hMPYWp9ZL._AC_SL1300_.jpg" alt="" width="293" height="261"/></a>

## [AKN DC 5V/4A 20W Switching Power Supply Adapter 100-240 Ac(US)][2]
The Jetson Nano comes with a USB power adapter that provides up to 5W of power. You'll need this power supply to power your Jetson Nano if you wish to run it on full power 10W. It's a good investment even if you plan to move around with it. Once it finds it's place, you can set it to full power and let the fun times roll.

<a href="https://www.amazon.com/gp/product/B01N4HYWAM" target="_blank" rel="noopener noreferrer"><img src="https://images-na.ssl-images-amazon.com/images/I/810Dqv-M6JL._AC_SL1500_.jpg" alt="" width="375" height="287"/></a>

## [ZYAMY 30pcs 2.54mm Black Jumper Caps][3]
Jumper caps are essential to any build. It's good to have a few around just in case you need 'em. For the Jetson Nano, you'll need at least one jumper to go from 5W to 10W, where setting the jumper disables power from the USB port.

<a href="https://www.amazon.com/gp/product/B077957RN7" target="_blank" rel="noopener noreferrer"><img src="https://images-na.ssl-images-amazon.com/images/I/61SAu8ITdNL._AC_SL1500_.jpg" alt="" width="303" height="249"/></a>

## [Intel Dual Band Wireless-Ac 8265 w/Bluetooth 8265.NGWMG][4]
The Jetson Nano comes with a built in RJ45 port, but if you want to connect this to your network wirelessly (like I do), you'll need an adapter. Luckily this adapter has support for bluetooth as well, which helps connecting other bluetooth peripherals, such as keyboards and mice.

<a href="https://www.amazon.com/gp/product/B01MZA1AB2" target="_blank" rel="noopener noreferrer"><img src="https://images-na.ssl-images-amazon.com/images/I/61Sotw89zpL._AC_SL1000_.jpg" alt="" width="205" height="244"/></a>

## [CHAOHANG: New 2 x 6dBi RP-SMA Dual Band 2.4GHz 5GHz + 2 x 35cm M.2(NGFF)Cable Antenna Mod Kit No Soldering use for NGFF Wireless Cards & M.2(NGFF) 3G/4G Cards][5]
In addition to the wireless card, you'll also need wireless antennae to ensure you get coverage regardless of where your Jetson Nano is located in the house.

<a href="https://www.amazon.com/gp/product/B01E29566W" target="_blank" rel="noopener noreferrer"><img src="https://images-na.ssl-images-amazon.com/images/I/41e4XyMr1gL._AC_.jpg" alt="" width="218" height="212"/></a>

## [Samsung (MB-ME128GA/AM) 128GB 100MB/s (U3) MicroSDXC EVO Select Memory Card with Full-Size Adapter][6]
The Jetson Nano requires a Micro SD card to store all your data as well as the operating system. This memory card comes with a full size adapter which allows you to plug it in to your card reader and/or laptop with ease so you can create the bootable OS image.

<a href="https://www.amazon.com/gp/product/B06XWZWYVP" target="_blank" rel="noopener noreferrer"><img src="https://images-na.ssl-images-amazon.com/images/I/817wkPGulTL._AC_SL1500_.jpg" alt="" width="150" height="109"/></a>

## [Logitech Wireless Touch Keyboard K400][7]
Let's face it, you'll be typing a lot on this machine. This keyboard and trackpad combination provides everything you'll need for effective programming on the Jetson Nano.

<a href="https://www.amazon.com/gp/product/B005DKZTMG/" target="_blank" rel="noopener noreferrer"><img src="https://images-na.ssl-images-amazon.com/images/I/81wMFKCb7vL._AC_SL1500_.jpg" alt="" width="375" height="144"/></a>

## [EVICIV 7 Inch Portable USB Monitor Raspberry Pi Touch Screen IPS][8]
A great monitor for the Jetson Nano, it doubles as a touchscreen that you can use with your finger. Great for all those touch screen apps you're going to build. 

<a href="https://www.amazon.com/gp/product/B07L6WT77H/" target="_blank" rel="noopener noreferrer"><img src="https://images-na.ssl-images-amazon.com/images/I/61DMFeedvHL._AC_SL1445_.jpg" alt="" width="360" height="272"/></a>

## OPTIONAL - [Raspberry Pi Camera Module V2-8 Megapixel,1080p (RPI-CAM-V2)][9]
If you want to do anything Computer Vision related, two of these cameras can provide stereo vision or just settle for one if you want just a single image to work with.

<a href="https://www.amazon.com/gp/product/B01ER2SKFS/" target="_blank" rel="noopener noreferrer"><img src="https://images-na.ssl-images-amazon.com/images/I/51fSegjSN%2BL._AC_SL1000_.jpg" alt="" width="89" height="229"/></a>

<!-- /wp:image -->
[1]: https://www.amazon.com/gp/product/B07TH8NBWF/ref=ppx_yo_dt_b_asin_title_o07_s00?ie=UTF8&psc=1https://www.amazon.com/gp/product/B07TH8NBWF/ref=ppx_yo_dt_b_asin_title_o07_s00?ie=UTF8&psc=1
[2]: https://www.amazon.com/gp/product/B01N4HYWAM
[3]: https://www.amazon.com/gp/product/B077957RN7
[4]: https://www.amazon.com/gp/product/B01MZA1AB2
[5]: https://www.amazon.com/gp/product/B01E29566W
[6]: https://www.amazon.com/gp/product/B06XWZWYVP
[7]: https://www.amazon.com/gp/product/B005DKZTMG
[8]: https://www.amazon.com/gp/product/B07L6WT77H
[9]: https://www.amazon.com/gp/product/B01ER2SKFS