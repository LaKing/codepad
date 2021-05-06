#!/bin/bash

if [[ ! -f input.avi ]]
then
    echo "Need an input.avi file."
    exit 200
fi

function resize() {

    ## create a still image
    ffmpeg -ss 2 -i input.avi -frames:v 1 -vf scale=$1:-1 output.jpg
    size="$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 output.jpg)"
    echo "Image $1 complete, size:$size"
    mv output.jpg "$size.jpg"

    ## create video
    if ffmpeg -i input.avi -vcodec libx264 -pix_fmt yuv420p -profile:v baseline -level 3 -crf 28 -vf scale="$1":-1 -an video.mp4
    then
       size="$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 video.mp4)"
       echo "Rendering $1 complete, size:$size"
       mv video.mp4 "$size.mp4"

    else
       rm -fr video.mp4
       echo "There was an error."
    fi
}

## create files width the following width
resize 640
resize 800
resize 1024
resize 1280
resize 1366
resize 1440
resize 1600
resize 1920
resize 2048
resize 2560
resize 3840
resize 4096
