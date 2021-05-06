<template>
    <v-card :dark="isdark" class="product">
        <v-img :src="get_Img(item.product_code, item)" height="" @click="to_go(item.product_code)" v-if="typeof get_dir(item.product_code) !== 'undefined'"></v-img>
        <v-card-text v-if="item.type" class="pt-0">
            <div class="text-center product-title mb-4 secondary">##&en {{ item.description_en }} ##&hu {{ item.description_hu }} ##</div>
            <vue-include
                :path="getHtml(item.product_code, item, ##&hu 'hu' ##&en 'en' ##)"
                v-if="typeof get_dir(item.product_code) !== 'undefined'"
                class="product-text text-left"
            />
            <div class="text-left uppercase mb-5 italic" v-if="item.type === 'filter'">
              <!--  <a :href="require('@/clouddir/kepelemek/certificate.jpg')" target="_blank" class="primary--text"><b>##&en Certificate ##&hu Tanusítvány ##</b></a>-->
            </div>
            <!--<vue-include :path="##&en getHtml(item.product_code, item, 'en') ##&hu getHtml(item.product_code, item, 'hu') ##" v-if="typeof get_dir(item.product_code) !== 'undefined'" class="product-text text-left" />-->
            <div v-if="typeof item.subcategory === 'string' && item.subcategory.indexOf('|') >= 2" class="mt-7">
                <h3 class="text-left">##&en Choose one! ##&hu Kérem válasszon! ##</h3>
                <v-form ref="type_ref" v-model="type_model">
                    <v-radio-group v-model="item.selected_subtype" :rules="[v => !!v || '##&en Select one ##&hu Kérem válasszon egyet ##']">
                        <v-radio v-for="(n, i) in item.subcategory.split('|')" :key="n" :label="n" :value="n"></v-radio>
                    </v-radio-group>
                </v-form>
            </div>
            <div>
                <v-btn v-if="" v-on:click="add(item)" color="primary" class="mt-5">##&en Add to cart ##&hu Kosárba ##</v-btn>
            </div>
            <br />
            <b>{{ item.huf }} Huf</b>

            <br />
            <div class="italic text-left mt-5 mb-5" v-if="size_guide">
              <!--	<a :href="require('@/clouddir/kepelemek/SIZE_GUIDE.jpg')" target="_blank" class="primary--text"><b>##&en Size guide ##&hu Mérettáblázat ##</b></a>-->
            </div>
        </v-card-text>
    </v-card>
</template>

<script>

import vueInclude from "@/vue-include.vue";

//import hello_cart from "@/components/Cart.vue";

export default {
    name: "app",
 props:{
   isdark:{
        type:Boolean,
          default:true
        }
 },
    data: function() {
        return {
            products_dir: ß.CLOUDDIR.products,
            products_json: ß.CLOUDDATA["products.csv.json"],
            mask_dir: ß.CLOUDDIR.mask_others,
            mask_data: ß.CLOUDDATA,
            subcategory: "",
            item: {},
            in_cart: false,
          size_guide:false,
            type_model: false
        };
    },

    components: {
        vueInclude
    },
    computed: {
        product_code() {
            return this.$route.path.split("/")[2] || "";
        },
        cart_items() {
            return this.$store.state.cart.items;
        }
    },
    mounted() {
        this.item =
            this.products_json.filter(f => {
                return f.product_code === this.product_code;
            })[0] || {};
        this.item.count = 1;
        this.item.selected_subtype = typeof this.item.subcategory === "string" && this.item.subcategory.split("|").length > 1 ? null : "";
    },
    methods: {
        at: function(arg) {
            let a = arg.toLowerCase();
            let p = this.$route.path.toLowerCase();
            if (p === "/" + a) return true;
            if (p === "/" + a + "/") return true;
            return false;
        },
        //ne töröld
        getHtml(path, obj, lang) {
            obj = this.get_dir(obj.product_code);

            if (typeof obj === "undefined") return false;
            //var file = this.getFileByMimeType(obj, ["text/html", "text/plain"]);
            let file = obj[lang + ".html"];
            if (!file || typeof file === "undefined") return "/default/no-content.vue";
            // return "/products/" + path + "/" + file + ".vue";
            return "/products/" + path + "/" + lang + ".html" + ".vue";
        },
        get_maskHtml(name, lang) {
            if (typeof this.mask_dir === "undefined") return false;
            let file = this.mask_dir[lang + "_" + name + ".html"];
            //console.log("lang get html", lang, file);
            if (typeof file !== "undefined") {
                return `/mask_others/${lang}_${name}.html.vue`;
            } else {
                return "/default/no-content.vue";
            }
        },
        get_groupHtml(name, lang) {
            if (typeof this.mask_dir === "undefined") return false;
            let file = this.mask_dir[name + "_" + lang + ".html"];
            if (typeof file !== "undefined") {
                return `/mask_others/${name}_${lang}.html.vue`;
            } else {
                return "/default/no-content.vue";
            }
        },
        getFileByMimeType(obj, mime_array) {
            var ret = false;
            Object.keys(obj).forEach(function(f) {
                if (mime_array.indexOf(obj[f]) >= 0) ret = f;
            });
            return ret;
        },
        get_Img(path, obj) {
            obj = this.get_dir(obj.product_code);
            if (typeof obj === "undefined") return false;
            var file = this.getFileByMimeType(obj, ["image/jpeg", "image/png"]);
            return this.$app.uri("/products/" + path + "/" + file);
        },
        get_dir(code) {
            return this.products_dir[code];
        },
        send_add: function(item) {
            this.in_cart = true;
            this.$store.dispatch("cart/add", Object.assign({}, item)).then(() => {
                this.$emit("added_product");
            });
        },
        add: function(item) {
            if (!item.subcategory) return this.send_add(item);
            if (item.subcategory.split("|").length > 1) {
                if (this.$refs.type_ref.validate()) {
                    this.send_add(item);
                }
            } else {
                this.send_add(item);
            }
        }
    }
};
</script>
<style>
.product {
    max-width: 700px !important;
    margin: auto;
}
.theme-dark .v-select-list .v-list .v-list-item__content {
    color: white;
}
  .theme-light .v-select-list .v-list .v-list-item__content {
    color: black;
}
.product-text * {
    line-height: 1.8 !important;
}
.italic {
    font-style: italic;
}

.product-title {
    padding: 15px 5px;
    font-size: 20px;
    margin-left: -15px;
    margin-right: -15px;
}
 #main-shop.theme--dark .product-title {
    background: black;
    color: white;
}
   #main-shop.theme--light .product-title {
    background: rgba(0,0,0,0.3);
    color: black;
}

@media (max-width: 768px) {
    .product-title {
        font-size: 15px;
    }
}
</style>
