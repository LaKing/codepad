<template>
    <v-app>
        <v-app-bar fixed dark>
            <v-toolbar-items>
                <v-btn text to="/logout">Logout</v-btn>

                <v-btn text to="/admin/logs">Logs</v-btn>

                <v-btn text to="/admin/users">Users</v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-container class="mt-12 pt-10">
            <v-card dark v-if="at('admin/logs')">
                <v-card-title>Logs</v-card-title>
                <v-card-text>
                    <draw_log />
                </v-card-text>
            </v-card>
            <v-card dark v-if="at('admin/users')">
                <v-card-title>Users</v-card-title>
                <v-card-text>
                    <draw_users />
                </v-card-text>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
import draw_log from "@/components/Draw_log.vue";
import draw_users from "@/components/Draw_users.vue";

//import hello_bootstrap , './components/HelloBootstrap.vue';

export default {
    name: "app",
    components: {
        draw_log,
        draw_users
    },
    methods: {
        at: function(arg) {
            return this.$route.path === "/" + arg;
        }
    }
};
</script>

<style scoped>
:root {
    --primary: #426098;
}
.theme--light.v-application {
    background: #2d3950 !important;
} 

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.1s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0.2;
}
.theme--dark.v-card {
    background-color: #34415a !important;
    color: #fff;
}
header, .v-card header.v-sheet {
    background: #1a2a45 !important;
}

.theme--dark.v-data-table {
    background-color: #3e4b62 !important;
    color: #fff;
    border-radius: 5px;
}
</style>
