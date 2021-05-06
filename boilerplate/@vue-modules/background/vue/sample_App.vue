<template>
    <v-app id="app" data-app>
        <video-bg :overlay="!at_home()" :style="overlay_css"> 
        <app_navigation></app_navigation> 
        <app_main></app_main> 
        </video-bg>
      <login_dialog ref="login_dialog" />
    </v-app>
</template>

<script>
// original
import app_navigation from "@/navigation.vue";
import app_main from "@/main.vue";
import login_dialog from "@/components/LoginDialog.vue";

// extended
import VideoBg from "@/background.vue";

export default {
    name: "app",
    data: function() {
        return {
          	// extended - the defaults are taken from the module's global-parameters
            overlayColor: ß.BACKGROUND_OVERLAY_COLOR,
            overlayAlpha: ß.BACKGROUND_OVERLAY_ALPHA,
            webkitFilter: ß.BACKGROUND_WEBKIT_FILTER
        };
    },
    components: {
        app_navigation,
        app_main,
        login_dialog,
        VideoBg
    },
    methods: {
      	// Use with <video-bg :overlay="!at_home()" ...
        at_home: function() {
          return this.$route.path === "/";
        }
    },
    mounted() {
        this.$root.login_dialog = this.$refs.login_dialog;
    },
    computed: {
      	// Use with <video-bg :style="overlay_css" ..
        overlay_css() {
            return {
                '--overlay-color': this.overlayColor,
                '--overlay-alpha': this.overlayAlpha,
                '--webkit-filter': this.webkitFilter,
            };
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
