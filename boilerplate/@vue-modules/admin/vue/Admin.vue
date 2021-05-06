<template>
    <div id="app" data-app>
        <v-toolbar app>
            <v-toolbar-items>
                <v-btn flat to="/logout">Logout</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <transition name="component-fade" mode="out-in">
            <hello_admin v-if="at('') || at('admin')" msg="Welcome to the ßoilerplate Vue.js stack Admin area" />
        </transition>
    </div>
</template>

<script>
import hello_admin from './components/HelloAdmin.vue';
//import hello_bootstrap , './components/HelloBootstrap.vue';

export default {
    name: "app",
    components: {
        hello_admin,
    },
    methods: {
        at: function(arg) {
            return this.$route.path === "/" + arg;
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
    margin-top: 60px;
}

.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.1s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0.2;
}
</style>
