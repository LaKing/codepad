<template>
    <div>
        <div v-if="!paid">
            <h1>{{ price }} {{ currency_visual() }}</h1>
            <p>{{ description }}</p>
            <v-btn x-large @click="start_payment()" :disabled="started || price < 1" :color="btn_color" :dark="is_dark">##&en Start payment ##&hu Fizetés indítása ##</v-btn>
            <br><br>
        </div>
       
        <div v-if="!paid" ref="simple"></div>

        <div v-if="paid">
            <v-alert v-if="message" :type="message_type">
                {{ message }}
            </v-alert>
        </div>
        <img @click="open_infopage()" :src="require('@/assets/simplepay_logo.svg')" :width="width" alt="##&en SimplePay informations ##&hu SimplePay vásárlói tájékoztató ##" />
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Simplepay-checkout",
    props: {
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        width: {
            type: String,
            required: false,
            default: "250px"
        },
      	order: {
      		type: Object,
      		required: false,
          	default: () => ({})
    	},
      	btn_color: {
      		type: String,
          	default: "white"
    	},
      	is_dark: {
      		type: Boolean,
          	default: false
    	}
    },
    data: function() {
        return {
            loaded: false,
            paid: false, 
          	started: false,
            message: false,
            message_type: "success",
            error: false
        };
    },
    mounted: function() {},
    methods: {
        currency_visual: function() {
            if (this.currency === "HUF") return "##&en Forint ##&hu Ft ##";
            if (this.currency === "EUR") return "€";
            return this.currency;
        },
        open_infopage: function() {
            window.open("##&en http://simplepartner.hu/PaymentService/Payment_information.pdf ##&hu http://simplepartner.hu/PaymentService/Fizetesi_tajekoztato.pdf ##", "_blank");
        },
        start_payment() {
          	this.started = true;
          	let _this = this;
          	if (!_this.order) _this.order = {};
          	_this.order.total = _this.price;
            _this.order.currency = _this.currency;
            axios({
                method: "post",
                url: "/simplepay-payment.json",
                data: _this.order
            })
                .then(function(response) {
              Ł(response);
                    if (!response.data) return;
              		
              		if (response.data.paymentUrl) window.open(response.data.paymentUrl, "_self");
              
                    if (response.data.message) _this.message = response.data.message;
                    else _this.message = "##&en Success. Thank you. ##&hu Sikeres fizetés. Köszönjük. ##";
                    if (response.data.message_type) _this.message_type = response.data.message_type;
                    else _this.message_type = "success";
                    if (response.data.commit) _this.$store.commit(response.data.commit);
                    if (response.data.dispatch) _this.$store.dispatch(response.data.dispatch);
                    if (response.data.push) _this.$root.$router.push(response.data.push);
                    if (response.data.open) window.open(response.data.open, "_blank");
                    if (response.data.redirect) window.location = response.data.redirect;
                })
                .catch(function(error) {
                    console.log(error);
                    _this.message_type = "error";
                    _this.message = "##&en Success, bu there was an error. ##&hu Sikeres fizetés, de hiba történt. ##";
                });
        }
    }
};
</script>

<style scoped>
img:hover {
    cursor: pointer;
}
</style>
