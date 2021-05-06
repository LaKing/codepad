import Vue from 'vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';

import router from './router.js';
import store from './store.js';

// eslint-disable-next-line 
import vuetify from "@/plugins/vuetify.js";

import App from "./Admin.vue";

// eslint-disable-next-line
if (process.env.VUE_APP_DEBUG) Vue.config.devtools = true;

new Vue({
    el: '#app',
    store,
    router,
    vuetify,
    mounted() {
        //console.log('mounted()');
        this.$store.dispatch('server/load_session');
    },
    render: h => h(App)
});