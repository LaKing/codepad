<template>
    <keep-alive> <component :is="component" :data="data" v-if="component" /> </keep-alive>
</template>
<script>
/* @DOC this module is based on https://medium.com/front-end-weekly/webpack-and-dynamic-imports-doing-it-right-72549ff49234
The basic concept is, you may get the list of files from ß.CLOUDDIR, containing all path's.
In a vue js code: ```import vueInclude from "@/vue-include.vue";```
In the vue html: ```<vue-include :path="/some/relative/path" />```

*/
import "@/boilerplate/vue-include-files.js";
  
export default {
    name: "vue-include",
    props: ["data", "path"],
    data() {
        return {
            component: null
        };
    },
    computed: {
        loader() {
            if (!this.path) {
                return null;
            }
            return () => import("@/vue-include" + this.path);
        }
    },
    mounted() {
        this.loader()
            .then(() => {
                this.component = () => this.loader();
            })
            .catch(() => {
                Ł("File not found: @/vue-include" + this.path);
                this.component = () => import("@/vue-include/error.vue");
            });
    }
};
</script>
