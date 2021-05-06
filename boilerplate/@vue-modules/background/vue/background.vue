<template>
    <section class="background">
        <transition name="fade"> <div v-show="overlay" class="video-overlay"></div> </transition>
        <video autoplay playsinline loop :muted="muted"><source :src="source"/></video>
        <div class="content"><slot></slot></div>
    </section>
</template>

<script>
// we are looking for the file with the closest size. The files should have a format of [DIMX]x[DIMY].ext

function get_file(inputstring) {
    const files = inputstring.split("|").sort();

    var mm = 99999999999999;
    var sc = window.screen.width + window.screen.height;
    var result;

    for (let i = 0; i < files.length; i++) {
        let file = files[i]
            .split("/")
            .pop()
            .split(".")[0];

        let arr = file.split("x");
        let x = Number(arr[0]) || 0;
        let y = Number(arr[1]) || 0;

        let abs = Math.abs(sc - (x + y));
        if (abs < mm) {
            result = files[i];
            mm = abs;
        }
    }

    if (result) return "https://" + ß.HOSTNAME + result;
    return result;
}

const video_file = get_file(ß.BACKGROUND_VIDEO_FILES);
const image_file = get_file(ß.BACKGROUND_IMAGE_FILES);

export default {
    props: {
        source: {
            default: video_file,
            type: String
        },
        img: {
            default: image_file,
            type: String
        },
        muted: {
            type: Boolean,
            default: true
        },
        overlay: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style>
/*  It is possible to add some css blur*/
/* the overlay can be colorized and alpha can be set */

.background video {
 position: fixed;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      z-index: 1;
      transform: translateX(-50%) translateY(-50%);
      background-size: cover;
  }
.content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
}

.video-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--overlay-color, rgba(0, 0, 0));
    opacity: var(--overlay-alpha, 0.1);
    z-index: 2;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
