// this file was originally named app.js
// @DOC Entry point of the frontend is main.js

import Vue from "vue";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";

import router from "@/router.js";
//import router from '@/.invoke/router';

import store from "@/boilerplate/store.js";

import App from "@/App.vue";
import io from "socket.io-client";
import VueSocketio from "vue-socket.io-extended";

// @DOC Socketio will only connect if a passport user is logged in. Override possible.

if (ß.USE_SOCKETIO) {
    const socket_options = ß.SOCKETIO_OPTIONS || {
        autoConnect: ß.SOCKETIO_AUTOCONNECT || false,
    };
    // "https://" + ß.HOSTNAME,
    const socket = io( socket_options);
    Vue.use(VueSocketio, socket, { store });
}

if (ß.DEBUG) console.log("[app/main.js] build:", ß.BUILD_VERSION, BUILD_MODULE, LANG);

// eslint-disable-next-line
if (ß.DEBUG) Vue.config.devtools = true;
// eslint-disable-next-line
if (ß.DEBUG) Vue.config.debug = true;

// we create $app via this plugin, to make the function $app.uri and the constant $app.url available globally from app.functions.js.
// it might get extended with others by vreating componentgroup js files that export other functions ...
// we use a generator and merge all from all modules
import functions from "@/componentgroup/functions.js";

const plugin = {
    install(Vue, options) {
      	// so actually we export the name from name.functions.js to vue's global $name
        Object.keys(functions).forEach(function (fn, ix) {
            Vue.prototype["$" + fn] = functions[fn];
        });
    },
};

Vue.use(plugin);

// eslint-disable-next-line
import vuetify from "@/plugins/vuetify.js";

var vm = new Vue({
    el: "#app",
    data: { test: "this is a test" },
    store,
    router,
    vuetify, // added as required in 2.0.7
    mounted() {
        this.$store.dispatch("server/load_session");
    },
    render: (h) => h(App),
});

/* @DOC
 
 Use a /static file in a template
 <img :src="$app.uri('/some.svg')" height="200px">
 
 Use an asset file in a template
 <img :src="require('@/assets/some.svg')" height="200px">

*/
