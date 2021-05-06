		
// @DOC 	Entry point of the admin area

import Vue from "vue";

import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";

import router from "@/router.js";
import store from "@/boilerplate/store.js";

import App from "@/Admin.vue";
import io from "socket.io-client";
import VueSocketio from "vue-socket.io-extended";

// @DOC Socketio will only connect if a passport user is logged in. Override possible. 

if (ß.USE_SOCKETIO) {
    const socket_options = ß.SOCKETIO_OPTIONS || {
        autoConnect: ß.SOCKETIO_AUTOCONNECT || false
    };
    const socket = io("https://" + ß.HOSTNAME, socket_options);
    Vue.use(VueSocketio, socket, { store });
}

if (ß.DEBUG) console.log(ß.BUILD_VERSION, BUILD_MODULE, LANG);

// eslint-disable-next-line
if (ß.DEBUG) Vue.config.devtools = true;
// eslint-disable-next-line
if (ß.DEBUG) Vue.config.debug = true;

// we create $app via this plugin, to make the function $app.uri and the constant $app.url available globally.
// it might get extended with others. ...
import functions from "@/app.functions.js";
const plugin = {
    install(Vue, options) {
        Vue.prototype.$app = functions;
    }
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
        //console.log('mounted()');
        this.$store.dispatch("server/load_session");
    },
    render: h => h(App)
});