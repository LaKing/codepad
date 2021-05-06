<template>
    <v-content id="main" :dark="dark">
        <transition name="component-fade" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </v-content>
</template>

<script>
//import load_components from "@/load_components.js";
//import list_components from "@/list_components.js";

//import test from "@/components/test.vue";

export default {
    name: "mainpage",
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
            //open_login_dialog: false
            //components: list_components("hello-components"),
        };
    },
    components: {
        //...load_components("hello-components"),
    },
    mounted: function () {
        Ł(this.$router.options.routes);
        this.$router.addRoutes([
            {
                path: "/test",
                //component: test,
                name: "TEST", // for named routes
            },
        ]);

    },
    methods: {
        at: function (arg) {
            let a = arg.toLowerCase();
            let p = this.$route.path.toLowerCase();
            if (p === "/" + a) return true;
            if (p === "/" + a + "/") return true;
            return false;
        },
    },
};
</script>
<style>
#main {
    margin-top: 70px;
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
