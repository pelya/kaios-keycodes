Print JavaScript Keycodes in KaiOS

This app also allocates memory until it crashes, to test the limits of your device

To install application.zip to your device, launch command:

git submodule update --init --recursive

Follow instructions in build/make-kaios-install/README.md to download xulrunner with xpcshell tool, and adb tool.

On Debian, you can install adb from system packages:

sudo apt-get install adb

Enable debug mode in your device by entering secret code on your home screen:

    *#*#33284#*#*

Plug in USB cable, run install.sh

You should see your app in the device app list, install script freezes at the end, you can kill it with Ctrl-C
