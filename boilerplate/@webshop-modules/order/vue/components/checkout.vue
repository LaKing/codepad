<template>
    <div style="max-width:700px; margin:auto">
        <h2 class="white--text mt-5 mb-0">##&en Payment ##&hu Fizetés ##</h2>

        <div class="white--text text-left">
            <h3 class="mb-3">##&en Payment type ##&hu Fizetési mód ##</h3>
            <v-radio-group v-model="payment_type" :mandatory="true" :dark="isdark">
                <v-radio label="simple" value="simple">
                    <template v-slot:label>
                        <span class="payment-bg bg-transparent"><img :src="require('@/assets/simplepay_simple.svg')" class="w-100"/></span><span class="ml-3" style="">Simplepay</span>
                    </template>
                </v-radio>

                <v-radio label="paypal" value="paypal">
                    <template v-slot:label>
                        <span class="payment-bg"><img :src="require('@/assets/directdebit_paypal.png')" class="w-100"/></span><span class="ml-3" style="">Paypal</span>
                    </template>
                </v-radio>

                <v-radio label="transfer" value="transfer" v-if="transfer_option">
                    <template v-slot:label> <span class="transfer"></span><span class="ml-3" style="">##&en Bank transfer ##&hu Banki átutalás ## </span> </template>
                </v-radio>
            </v-radio-group>
            <div></div>
        </div>

        <div>
            <simple
                v-if="payment_type == 'simple'"
                description="##&en One time simple payment ##&hu Egyszeri simple fizetés ##"
                :price="sum"
                currency="HUF"
                class="white--text"
                :btn_is_dark="isdark" btn_color="primary"
            ></simple>

            <paypal
                v-if="payment_type == 'paypal'"
                description="##&en One time paypal payment ##&hu Egyszeri paypal fizetés ##"
                :price="sum"
                currency="HUF"
                class="white--text"
            ></paypal>

            <div v-if="payment_type === 'transfer'" class="text-left white--text">
                <div v-if="!paid">##&en Total ##&hu Összeg ##: {{ sum }} Ft</div>
                <pre style="white-space: break-spaces">
Bank: K&H bank
Számlaszám: HU34 10401093 - 50526874 - 84701003
SUBLEBERS  KFT.
H-1123 Budapest, Alkotás utca 39/c
          	</pre
                >
                <div>##&en Please enter the invoice serial on the bank transfer. ##&hu A közlemény rovatban kérnénk a számla sorszámának feltüntetését. ##</div>
                <div>##&en Placing an order is subject to payment. ##&hu A rendelés feladása fizetési kötelességgel jár. ##</div>
                <div>
                    ##&en Note that we will ship your order once we recieve a confirmation of the payment. ##&hu Akkor szállítjuk rendelését, ha megérkezett a rendelés jóváírása
                    számlánkon. ##
                </div>

                <br />
                <div v-if="!paid"><v-btn @click="place_order()" color="primary">##&en Send order ##&hu Rendelés elküldése ##</v-btn></div>
                <div v-if="paid">
                    <v-alert v-if="message" :type="message_type">
                        {{ message }}
                    </v-alert>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

import paypal from "@/components/paypal-checkout.vue";
import simple from "@/components/simplepay-checkout.vue";

export default {
    props: {
        huf: {
            default: null
        },
        type: {
            default: "cart"
        },
        transfer_option: {
            type: Boolean,
            default: false
        },
    	isdark:{
          	default:true
        }
    
    },
    name: "checkout",
    data: function() {
        return {
            debug: ß.DEBUG,
            message: "",
            message_type: "success",
            payment_type: "simple",
            paid: false
        };
    },
    computed: {
        shipping_type() {
            return this.$store.state.cart.shipping_type;
        },
        sum() {
            if (this.huf !== null) return this.huf;
            return ß.getCartSum(this.$store.state.cart);
        }
    },

    components: { paypal, simple },
    methods: {
        place_order: function() {
            var _this = this;
            _this.paid = true;
            var url = "/post_order.json";
            axios({
                method: "post",
                url: url
            })
                .then(function(response) {
                    if (!response.data) return;
                    if (response.data.message) _this.message = response.data.message;
                    else _this.message = "##&en Success. Thank you. ##&hu Sikeres rendelés. Köszönjük. ##";
                    if (response.data.message_type) _this.message_type = response.data.message_type;
                    else _this.message_type = "success";
                    if (response.data.commit) _this.$store.commit(response.data.commit);
                    if (response.data.dispatch) _this.$store.dispatch(response.data.dispatch);
                    if (response.data.push) _this.$root.$router.push(response.data.push);
                    if (response.data.open) window.open(response.data.open, "_blank");
                    if (response.data.redirect) window.location = response.data.redirect;
                })
                .catch(function(error) {
                    _this.message_type = "error";
                    _this.message = "##&en There was an error. ##&hu Hiba lépett fel. ##";
                    console.log(error);
                });
        }
    }
};
</script>

<style scoped>
.payment-bg {
    /*background: #ffc439;*/
    display: inline-block;
    padding: 0;
    height: 30px;
    width: 90px;
}
.payment-bg img {
    margin: 0 -5px;
    width: calc(100% + 10px); 
}
.w-100 {
    width: 100%;
}
  .bg-transparent{
   	background:transparent !important;  
  }
</style>
