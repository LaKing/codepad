<template>
    <div>
        <v-app-bar app :dark="dark" active-class="primary--text" color="primary">
            <v-toolbar-items>
                <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

                <v-btn  v-for="route in $router.options.routes" v-if="route.name" text :to="route.path" :key="route.path" class="d-none d-xl-inline-flex">{{route.name}}</v-btn>

                <language_selector class="d-none d-xl-inline-flex"></language_selector>
                <v-btn v-if="$store.state.server.session.is_admin" text @click="open_admin()" class="d-none d-lg-inline-flex">Admin</v-btn>
                <v-btn v-if="debug" text @click="open_editor()" class="d-none d-xl-inline-flex">CODEPAD</v-btn>
                <v-btn text @click="open_readme()" class="d-none d-xl-inline-flex">README</v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" fixed temporary :dark="dark">
            <v-list nav dense>
                <v-list-item-group active-class="primary--text">
                    <v-list-item v-for="route in $router.options.routes" v-if="route.name" :to="route.path" :key="route.path">
                        <v-list-item-title>{{route.name}}</v-list-item-title>
                    </v-list-item>
                  
                    <language_selector></language_selector>

                    <v-list-item v-if="$store.state.server.session.is_admin" @click="open_admin()">
                        <v-list-item-title>Admin</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="debug" @click="open_editor()">
                        <v-list-item-title>CODEPAD</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="debug" @click="open_readme()">
                        <v-list-item-title>README</v-list-item-title>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>

import language_selector from "@/components/LanguageSelector.vue";
  
export default {
    name: "navigation",
    props: {
        dark: {
            default: false,
        },
        primary: {
            default: "#4CAF50",
        },
        secondary: {
            default: "#8BC34A",
        },
    },
    data: function () {
        return {
            drawer: false,
            debug: ß.DEBUG,
        };
    },
    components: {
        language_selector,
    },
    methods: {
        open_editor: function () {
            window.open(ß.EDITOR_SITELINK, "_blank");
        },
        open_admin: function () {
            window.open("https://" + ß.HOSTNAME + "/admin", "_blank");
        },
        open_readme: function () {
            window.open("https://" + ß.HOSTNAME + "/README.html", "_blank");
        },
        /*
      	Tested logic function here ...
      
      	<v-btn text @click="run_test()">TEST</v-btn>

      	
      	run_test: function() {
            ß.getTest("Hello", "World");
        }
        
        */
    },
    mounted() {
        this.$vuetify.theme.themes.dark.primary = this.primary;
        this.$vuetify.theme.themes.light.primary = this.primary;

        this.$vuetify.theme.themes.dark.secondary = this.secondary;
        this.$vuetify.theme.themes.light.secondary = this.secondary;
    },
};
</script>

<style></style>
