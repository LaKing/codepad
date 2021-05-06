<!-- veutify template -->

<template>
    <v-container class="cart">
        <div v-if="!show_profile">
            <h3 class="white--text mb-6">##&en Cart-content ##&hu Kosár tartalma ##</h3>
            <v-data-table :dark="isdark" :headers="headers" :items="$store.state.cart.items" hide-default-footer class="elevation-1">
                <template v-slot:item.count="{ item }">
                    <div class="space-between" style="white-space:nowrap">
                        <v-btn color="primary" x-small class="" fab @click="increment(item)">
                            <v-icon small>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                        <span class="mx-4">{{ item.count }}</span>
                        <v-btn color="primary" x-small class="" fab @click="decrement(item)">
                            <v-icon small>
                                mdi-minus
                            </v-icon>
                        </v-btn>
                    </div>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn color="primary" x-small class="" fab @click="delete_item(item)">
                        <v-icon small>
                            mdi-delete
                        </v-icon>
                    </v-btn>
                </template>
                <template v-slot:item.huf*count="{ item }"> {{ item.huf * parseInt(item.count) }} Ft </template>
                <template v-slot:item.description_hu="{ item }"> {{ get_name(item) }}</template>
                <template v-slot:item.huf="{ item }"> {{ item.huf }} Ft </template>
            </v-data-table>
            <div v-if="$store.state.cart.items.length > 0">
                <div class="text-left mt-5"><v-btn v-on:click="clear_cart()" color="primary" small>##&en CLEAR ##&hu Kosár ürítése ##</v-btn></div>
                <div class="white--text text-right mt-2">##&en Delivery method: ##&hu Kézbesítés módja: ##</div>
                <div class="text-right">
                    <v-radio-group v-model="shipping" :mandatory="false" :dark="isdark" class="flex-end" ref="radio_ship_ref" id="radio_ship" @change="" color="primary">
                        <v-radio :label="get_label(n, ##&en 'name_en' ##&hu 'name' ##)" :value="n" v-for="(n, i) in shipping_types" :key="i" color="primary"> </v-radio>
                    </v-radio-group>
                </div>

                <h3 class="white--text text-right mt-2">##&en Total: ##&hu Összeg: ## {{ sum }} ##&en Huf ##&hu Ft ##</h3>
                <br />

                <div class="white--text text-right agree">
                    <v-form ref="agree_ref">
                        <v-btn text class="px-1" to="/terms" style="text-transform: capitalize !important "
                            >##&en Terms of Service, and Privacy policy ##&hu Általános szerződési feltételek, Adatvédelmi nyilatkozat ##
                        </v-btn>
                        <v-switch :dark="isdark" color="#c58524" label="" required :rules="[v => !!v || '##&en Must be accepted ##&hu Kötelező elfogadni ##']">
                            <template v-slot:label>
                                ##&en I have read and I accept the terms of service and the privacy policy ##&hu Elolvastam és egyetértek a weboldal felhasználási feltételeivel és
                                az adatvédelmi irányelveivel ##
                            </template>
                        </v-switch>
                    </v-form>
                </div>
                <div class="text-right"><v-btn v-on:click="to_checkout()" color="primary">##&en Checkout ##&hu Tovább a pénztárhoz ##</v-btn></div>
                <br />
            </div>
            <br />
        </div>
        <profile v-if="show_profile" :countries="countries"/>
    </v-container>
</template>

<script>
import profile from "@/components/profile.vue";
//  import pdf from "vue-pdf";
export default {
    name: "Cart",
  route: {
        path: "/cart",
        name: "Cart ##&en Cart ##&hu Kosár ##",
    },
  props:{
      isdark:{
        type:Boolean,
          default:true
        },
    	countries: {
          	type: Array,
          default: function(){
           return [
                "Magyarország",
            ];
          }
        },
    	shipping_types: {
          type: Array,
          default: function(){
          return [
                { name: "UPS HAZHOZSZALLITAS", huf: 2480, name_en: "UPS DELIVERY HUNGARY" },
                { name: "UPS EUROPA HAZHOZSZALLITAS", huf: 6950, name_en: "UPS DELIVERY EUROPE" },
                { name: "Személyes átvétel", huf: 0, name_en: "Pickup" }
            ];
        }
        }
    },
    data: function() {
        return {
            
            products_json: ß.CLOUDDATA["products.csv.json"],
            local_main: "",
            headers: [
                { text: "Név", align: "start", sortable: false, value: "description_hu" },
                { text: "Típus", value: "selected_subtype" },
                { text: "Darabszám", value: "count" },
                { text: "Ár", value: "huf" },
                { text: "Részösszeg (Ft)", value: "huf*count" },
                { text: "Törlés", value: "actions", sortable: false }
            ],
            cart: [],
            show_profile: false,
            loaded: false,
            shipping: {}
        };
    },
    computed: {
        sum() {
          //return 2;
            return ß.getCartSum({
                items: this.$store.state.cart.items,
                shipping_type: this.shipping_computed
            });
        },
        shipping_computed: {
            get() {
                // hs van már megadott shipping type, akkor az kell
                if (this.shipping.name) return this.shipping;
                // ha van session akkor az
                if (ł(this.$store.state, "server.session.data.shipping_type")) return this.$store.state.server.session.data.shipping_type;
                // amúgy a default
                return this.shipping_types[0];
            },
            set(value) {
                this.shipping = value;
            }
        }
    },
    created() {
        this.shipping = this.shipping_types[0];
    },
    methods: {
        get_label: function(n, prop) {
            if (n.huf > 0) return n[prop] + " - " + n.huf + " Ft";
            return n[prop] + (prop === "name" ? " - ingyenes" : " - free");
        },
        add: function(item) {
            this.$store.dispatch("cart/add", item);
        },
        increment: function(item) {
            this.$store.dispatch("cart/increment", item);
        },
        decrement: function(item) {
            this.$store.dispatch("cart/decrement", item);
        },
        delete_item: function(item) {
            this.$store.dispatch("cart/delete", item);
        },
        clear_cart: function() {
            this.$store.dispatch("cart/clear");
        },
        open_term(lang) {
            window.open("https://" + ß.HOSTNAME + "/" + "##&en privacy-policy.pdf ##&hu adatvedelmi-nyilatkozat.pdf ##", "_blank");
        },
        get_name(item) {
            let n = item["description_##&en en ##&hu hu ##"];
            if (item.custom_logo) n += " - ##&en custom logo ##&hu saját logó ##";
            return n;
        },
        to_checkout: function() {
            if (this.$refs.agree_ref.validate()) {
                this.show_profile = true;
                //this.$store.dispatch("cart/change_shipping", this.shipping_types[this.shipping_type]);
                this.$store.dispatch("cart/change_shipping", this.shipping);
            }
        },
        set_shipping() {
            this.$store.commit("cart/change_shipping", this.shipping);
        }
    },
    components: {
        profile
    }
};
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}
.agree .v-input {
    justify-content: flex-end;
}
a {
    color: #415566;
}
.flex-end {
    justify-content: flex-end;
}
</style>
