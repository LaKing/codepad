<!-- veutify template -->

<template>
    <div style="max-width:700px; margin:auto">
        <h3 class="white--text mt-5 mb-0">##&en Billing details ##&hu Számlázási adatok ##</h3>
        <v-form :dark="isdark" ref="form" v-model="valid" lazy-validation>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="billing.name" :rules="nameRules" label="##&en Name ##&hu Név ##" :dark="isdark" required hide-details></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="billing.email" type="email" :rules="emailRules" label="##&en E-mail ##&hu E-mail ##" :dark="isdark" required></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="billing.phone" :rules="phoneRules" label="##&en Phone ##&hu Telefonszám ##" :dark="isdark" required></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-select v-model="billing.country" :dark="isdark" :items="countries" :rules="[v => !!v || required_text]" label="##&en Country ##&hu Ország ##" required></v-select>
                </v-col>
                <v-col cols="12" md="7">
                    <v-text-field v-model="billing.city" :rules="nameRules" label="##&en City ##&hu Város ##" :dark="isdark" required></v-text-field>
                </v-col>
                <v-col cols="12" md="5">
                    <v-text-field v-model="billing.zip" :rules="zipRules" label="##&en Zip code ##&hu Irányítószám ##" :dark="isdark" type="number" required></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="billing.address" :rules="nameRules" label="##&en Address ##&hu Cím ##" :dark="isdark" required></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-checkbox v-model="billing_equal_ship" :dark="isdark" label="Számlázási adatok megegyeznek a szállítási adatokkal" required></v-checkbox>
                </v-col>
            </v-row>

            <transition name="component-fade" mode="out-in">
                <v-row v-if="!billing_equal_ship">
                    <v-col cols="12"><h3 class="white--text mt-5 mb-0">##&en Shipping details ##&hu Szállítási adatok ##</h3></v-col>
                    <v-col cols="12">
                        <v-text-field v-model="shipping.name" :rules="nameRules" label="##&en Name ##&hu Név ##" :dark="isdark" required hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="shipping.email" type="email" :rules="emailRules" label="##&en E-mail ##&hu E-mail ##" :dark="isdark" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="shipping.phone" :rules="phoneRules" label="##&en Phone ##&hu Telefonszám ##" :dark="isdark" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-select v-model="shipping.country" :dark="isdark" :items="countries" :rules="[v => !!v || required_text]" label="##&en Country ##&hu Ország ##" required></v-select>
                    </v-col>
                    <v-col cols="12" md="7">
                        <v-text-field v-model="shipping.city" :rules="nameRules" label="##&en City ##&hu Város ##" :dark="isdark" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-text-field v-model="shipping.zip" :rules="zipRules" label="##&en Zip code ##&hu Irányítószám ##" :dark="isdark" type="number" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="shipping.address" :rules="nameRules" label="##&en Address ##&hu Cím ##" :dark="isdark" required></v-text-field>
                    </v-col>
                </v-row>
            </transition>
            <v-row>
                <v-col cols="12" class="mb-10">
                    <v-textarea label="##&en Comment ##&hu Megjegyzés ##" :dark="isdark" v-model="shipping.comment" hide-details></v-textarea>
                </v-col>
            </v-row>
            <div>
                <v-btn :disabled="!valid" color="primary" class="mr-4" @click="save()">
                    ##&en Next ##&hu Tovább a fizetéshez ##
                </v-btn>
            </div>
            <div class="mt-7">
                <v-alert v-if="message" type="error">
                    {{ message }}
                </v-alert>
            </div>
        </v-form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "profile",
    props: {
        navigate: {
            type: Boolean,
            default: true,
          
        },
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
        }
    },
    methods: {
        save() {
            var _this = this;
            if (this.$refs.form.validate()) {
                // ha a checkbox bepipálva, akkor átmásoljuk az értékeket
                if (this.billing_equal_ship) {
                    for (let n in this.billing) {
                        if (this.shipping.hasOwnProperty(n)) this.shipping[n] = this.billing[n];
                    }
                }
                axios({
                    method: "post",
                    url: "/post-update-profile.json",
                    data: {
                        billing: this.billing,
                        shipping: this.shipping
                    }
                }).then(function(response) {
                    if (response.data == "OK") {
                        _this.message = "OK";
                        if (_this.navigate) {
                            _this.$root.$router.push("/checkout");
                        } else {
                            console.log("payed");
                            _this.$emit("profile_ok", true);
                        }
                        return;
                    }
                    _this.message = "##&en The email could not be verified. ##&hu Az email cím ellenőrzése sikertelen. ##";
                    console.log(response);
                });
            }
        },
        // áthozza a storeból az értékeket a helyi változóba.
        load_data(prop, prop2) {
            if (typeof this[prop] === "object") {
                for (let n in this[prop]) {
                    //console.log("load_data n", n, "this.data_[n]", this[prop2]);
                    if (typeof this[prop2][n] !== "undefined" && typeof this[prop][n] !== "undefined") {
                        this[prop2][n] = this[prop][n];
                    }
                }
            }
        }
    },
    created() {},
    components: {},

    computed: {
        billing_store() {
            return ł(this.$store.state, "server.session.user_profile.billing");
        },
        shipping_store() {
            return ł(this.$store.state, "server.session.user_profile.shipping");
        }
    },
    mounted() {
        this.load_data("billing_store", "billing");
        this.load_data("shipping_store", "shipping");
    },
    watch: {
        // whenever question changes, this function will run
        billing_: function(new_val, old_val) {
            this.load_data("billing_store", "billing");
            this.load_data("shipping_store", "shipping");
        },
        shipping: function(new_val, old_val) {
            this.load_data("billing_store", "billing");
            this.load_data("shipping_store", "shipping");
        }
    },
    data: function() {
        return {
            message: null,

            billing: {
                name: "",
                zip: "",
                city: "",
                address: "",
                taxnumber: "",
                country: "Magyarország",
                phone: "",
                email: ""
            },
            shipping: {
                name: "",
                zip: "",
                city: "",
                address: "",
                country: "Magyarország",
                phone: "",
                email: "",
              	comment:""
            },

            valid: true,

            required_text: "##&en This field is required ##&hu Kötelező megadni ##",
            min_chars: "##&en Minimun 4 character ##&hu Minimum 4 karakter ##",
            billing_equal_ship: true,
            regexphone: ß.getRegexPhone(),
            nameRules: [v => !!v || this.required_text, v => (v && v.length >= 4) || this.min_chars],
            houseRules: [v => !!v || this.required_text, v => (v && /\d/.test(v)) || "##&en Need a number ##&hu Egy számot meg kell adni ##"],
            emailRules: [v => !!v || this.required_text, v => (v && ß.getRegexEmail().test(v)) || "Invalid email"],
            zipRules: [v => !!v || this.required_text, v => (v && v.length === 4) || "##&en 4 character ##&hu 4 zsám ##"],
            phoneRules: [v => !!v || this.required_text, v => (v && ß.getRegexPhone().test(v)) || "##&en only in phone fornat ##&hu csak telefonszám formátum ##"],
            //need regex
            
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w-100 {
    width: 100%;
}
</style>
