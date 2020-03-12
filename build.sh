#!/bin/bash

export LD_LIBRARY_PATH=~/bin/xulrunner-sdk/bin

FOLDER=`pwd`

cd ../make-kaios-install

make FOLDER=$FOLDER packaged

make FOLDER=$FOLDER install
