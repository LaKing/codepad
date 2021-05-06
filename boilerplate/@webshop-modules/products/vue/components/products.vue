<template>
    <v-row>
        <v-col v-for="(group, name, i) in groups" :key="i" cols="12" sm="6" md="4">
            <v-card :dark="isdark" class="pointer">
                <v-img :src="get_Img(get_primary_name(group), get_primary(group))" :aspect-ratio="16 / 10" @click="to_go(name)"></v-img>

                <v-card-text class="uppercase secondary" @click="to_go(name)">
                    <b>{{ get_category(group, "##&hu hu ##&en en ##") }} ( {{ Object.keys(group).length }} )</b>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import vueInclude from "@/vue-include.vue";
//import hello_cart from "@/components/Cart.vue";

export default {
    name: "products",
    route: {
        path: "/categories",
        name: "Products ##&en Products ##&hu Termékek ##",
       
    },
    props: {
        isdark: {
            type: Boolean,
            default: true,
        },
        image_placeholder: {
            default: "",
        },
    },
    data: function () {
        return {
            products_dir: ß.CLOUDDIR.products,
            products_json: ß.CLOUDDATA["products.csv.json"],
            groups0: {},
        };
    },

    components: {
        vueInclude,
    },
    watch: {
        groups0: {
            handler: function (nv) {
               
               let r = [];
                for (let n in nv) {
                    r.push({ path: "/categories/" + n, component: require("./product_group.vue"), name: "product_group" });
                }
                console.log("products route", r);
                this.$router.addRoutes(r);
            },
            deep: true,
        },
    },
    mounted() {
      let g ={};
        this.products_json.forEach((f) => {
            if (typeof f.type === "string" && f.type.length > 0) {
                if (!this.groups0.hasOwnProperty(f.type)) {
                    this.$set(this.$data.groups0, [f.type], []);
                }
                this.groups0[f.type].push(f);
            }
        });
     
    },
    computed: {
         groups() {
            let g = {};
            this.products_json.forEach((f) => {
                if (typeof f.type === "string" && f.type.length > 0) {
                    if (!g.hasOwnProperty(f.type)) {
                        g[f.type] = [];
                    }
                    g[f.type].push(f);
                }
            });
            return g;
        },
    },
    methods: {
        at: function (arg) {
            let a = arg.toLowerCase();
            let p = this.$route.path.toLowerCase();
            if (p === "/" + a) return true;
            if (p === "/" + a + "/") return true;
            return false;
        },
        get_primary(group) {
            let item = group.filter((f) => {
                return f.primary === "TRUE";
            });
            return item.length > 0 ? item[0] : {};
        },
        get_category(group, lang = "hu") {
            return group[0]["show_category_" + lang];
        },
        get_primary_name(group) {
            let g = this.get_primary(group);
            if (g.hasOwnProperty("product_code")) {
                return g.product_code;
            }
            return "";
        },
        getHtml(path, obj) {
            var file = this.getFileByMimeType(obj, ["text/html", "text/plain"]);
            if (!file) return "/default/no-content.vue";
            return "/products/" + path + "/" + file + ".vue";
        },

        get_Img(path, obj) {
            obj = this.get_dir(obj.product_code);
            if (typeof obj === "undefined") return "";
            var file = this.getFileByMimeType(obj, ["image/jpeg", "image/png"]);
            return this.$app.uri("/products/" + path + "/" + file);
        },
        getFileByMimeType(obj, mime_array) {
            var ret = false;
            Object.keys(obj).forEach(function (f) {
                if (mime_array.indexOf(obj[f]) >= 0) ret = f;
            });
            return ret;
        },
        get_dir(code) {
            return this.products_dir[code];
        },
        getImgArray(path, obj) {
            var ret = [];
            var mime_array = ["image/jpeg", "image/png"];
            var _this = this;
            Object.keys(obj).forEach(function (file) {
                if (mime_array.indexOf(obj[file]) >= 0) ret.push(_this.$app.uri("/products/" + path + "/" + file));
            });

            return ret;
        },
        getProductPrice(code) {
            var result = this.products_json.filter((obj) => {
                return obj.product_code === code;
            });

            if (result[0].huf) return result[0].huf;

            return false;
        },
        to_go(name) {
            this.$root.$router.push("/categories/" + name);
        },
    },
};
</script>
<style scoped>
.v-card {
    /*height: 30vw;*/
}
</style>
