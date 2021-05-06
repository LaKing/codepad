<template>
    <v-row>
        <!-- <v-col v-if="group_type==='mask'" cols="12" class="white--text item-group-description"><div>Masz szöveg</div></v-col> -->
        <v-col v-for="(item, i) in group" :key="i" cols="12" sm="6" md="4" lg="3" xl="2">
            <v-card :dark="isdark" class="pointer">
                <v-img :aspect-ratio="16/10"
                    :src="get_Img(item.product_code, item)"
                   
                    @click="to_go(item.product_code)"
                    
                    v-if="typeof get_dir(item.product_code) !== 'undefined'"
                ></v-img>
                <v-img v-else :aspect-ratio="16/10" :src="image_placeholder"></v-img>
                <div class="img-type" v-if="typeof item.subcategory === 'string' && item.subcategory.indexOf('|') >= 2">##&en More types ##&hu Több típus ##</div>
                <v-card-text class="pt-0">
                    <div>
                        <div @click="to_go(item.product_code)" class="group-desc secondary"> ##&en {{ item.description_en }} ##&hu {{ item.description_hu }} ##</div>
                      	<div class="brand" >{{item.brand}}</div>
                        <!--<v-text-field dense filled hide-details style="width:50px" class="d-inline-block" v-model="item.count" placeholder="1" value="1"></v-text-field>-->
                        <form
                            v-model="forms['valid_' + item.product_code]"
                            lazy-validation
                            v-if="typeof item.subcategory === 'string' && item.subcategory.indexOf('|') >= 2"
                            class="mt-2"
                            :ref="item.product_code"
                        >
                            <v-select
                                v-model="item.selected_subtype"
                                :dark="isdark"
                                :items="item.subcategory.split('|')"
                                label="##&en Select one! ##&hu Kérem válasszon! ##"
                               	:menu-props="{dark: isdark}"
                                required
                                hide-details
                               	:rules="[v => !!v || '##&en Select one! ##&hu Kérem válasszon egyet! ##']"
                                :class="{ 'error--text': forms['valid_' + item.product_code] === false, 'v-input--is-focused': !forms['valid_' + item.product_code] }"
                            ></v-select>
                        </form>
                      	<div v-if="has_subtype && !item.has_subtype" style="height:44px"></div>
                        <v-btn v-if="" v-on:click="add(item)" class="mt-5" color="primary">##&en Add to cart ##&hu Kosárba ##</v-btn>
                    </div>

                    <div class="mt-3">
                        <b>{{ item.huf }} Huf</b>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import vueInclude from "@/vue-include.vue";

export default {
    name: "product_group",
  	props:{
      isdark:{
        type:Boolean,
          default:true
        },
      image_placeholder:{
        default:"@/assets/vue.png"
      }
    },
    data: function() {
        return {
            products_dir: ß.CLOUDDIR.products,
            products_json: ß.CLOUDDATA["products.csv.json"],
            counts: {},
            group: {},
            forms: {},
          	has_subtype:false
        };
    },

    components: {
        vueInclude
    },
    computed: {
        group_type() {
            return this.$route.path.split("/")[2] || "";
        },
        cart_items() {
            return this.$store.state.cart.items;
        }
    },
  created(){
   console.log('product gr'); 
  },
    mounted() {
        const _this = this;
        this.group = this.products_json.filter(f => {
            f.count = 1;
          	f.has_subtype = typeof f.subcategory === "string" && f.subcategory.split("|").length > 1;
            f.selected_subtype = this.has_subtype ? null : "";
			if(f.type === this.group_type && f.has_subtype){
             	this.has_subtype=true;
            }
            return f.type === this.group_type;
        });
        this.group.forEach(f => {
            this.forms["valid_" + f.product_code] = null;
        });
    },
    methods: {
        at: function(arg) {
            let a = arg.toLowerCase();
            let p = this.$route.path.toLowerCase();
            if (p === "/" + a) return true;
            if (p === "/" + a + "/") return true;
            return false;
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
            Object.keys(obj).forEach(function(f) {
                if (mime_array.indexOf(obj[f]) >= 0) ret = f;
            });
            return ret;
        },
        getImgArray(path, obj) {
            var ret = [];
            var mime_array = ["image/jpeg", "image/png"];
            var _this = this;
            Object.keys(obj).forEach(function(file) {
                if (mime_array.indexOf(obj[file]) >= 0) ret.push(_this.$app.uri("/products/" + path + "/" + file));
            });

            return ret;
        },
        getProductPrice(code) {
            var result = this.products_json.filter(obj => {
                return obj.product_code === code;
            });
            if (result.length > 0 && result[0].huf) return result[0].huf;

            return false;
        },
        to_go(code) {
            if (typeof code !== "undefined") {
                this.$root.$router.push("/product/" + code);

            }
        },
        get_dir(code) {
            return this.products_dir[code];
        },
      send_add:function(item){
        this.$store.dispatch("cart/add", Object.assign({}, item)).then(() => {
                    this.$emit("added_product");
                });
      },
        add: function(item) {
            if (typeof item.subcategory === "string" && item.subcategory.split("|").length > 1) {
                //vuetify bug, the ref is an array if using v-for
                if (item.selected_subtype !== null) {
                    this.send_add(item);
                    let f = Object.assign({}, this.forms);
                    f["valid_" + item.product_code] = true;
                    this.forms = Object.assign({}, f);
                } else {
                    let f = Object.assign({}, this.forms);
                    f["valid_" + item.product_code] = false;

                    this.forms = Object.assign({}, f);
                }
            } else {
                this.send_add(item);
            }
        }
    }
};
</script>
<style>
.img-type {
    position: absolute;
    top: 0;
    background: #111111;
    padding: 3px 8px;
    border-radius: 0 5px 5px 0;
}
.item-group-description {
    padding: 5px;
    border-radius: 5px;
}
  .theme-dark .item-group-description {
    background: #3a3630;
}
    .theme-light .item-group-description {
    background: rgba(0,0,0,0.3);
}
 .group-desc{
  padding: 15px 5px;
    background: black;
    font-size: 16px;
   
    margin-left:-15px;
    margin-right: -15px;
  }
   #main-shop.theme--dark .group-desc{
  color:white;
  }
   #main-shop.theme--light .group-desc{
  color:black;
  }
 #main-shop .brand{
    /* font-size: 21px; */
    margin-left: -15px;
    margin-right: -15px;
    padding: 5px; 
       min-height: 30px;
  }
     #main-shop.theme--dark .brand{
  background: #585858;
  }
      #main-shop.theme--light .brand{
  background: rgba(0,0,0,0.3);
  }
       

    @media(max-width:2100px){
     .group-desc{
 
    font-size: 16px;
  }
  }
     @media(max-width:1800px){
     .group-desc{
 
    font-size: 16px;
  }
  }
  @media(max-width:1660px){
     .group-desc{
 
    font-size: 15px;
  }
  }
</style>
