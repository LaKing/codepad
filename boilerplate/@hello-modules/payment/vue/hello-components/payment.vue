<template>
    <div>
        Hello payment<br />
        <v-btn text @click="start_payment()">{{ payment }} Payment</v-btn>
        <br />
        {{ response }}
        _____________________<br />
        <br />

        <paypal description="PayPal payment" :price="10000" currency="HUF"></paypal>
        _____________________<br />
        <br />

        <simple description="Simple payment" :price="11000" currency="HUF" :order="order"></simple>
    </div>
</template>

<script>
import paypal from "@/components/paypal-checkout.vue";
import simple from "@/components/simplepay-checkout.vue";

import axios from "axios";

export default {
    name: "Payment",
    route: true,
    props: {
        primary: {
            default: "#4CAF50",
        },
        secondary: {
            default: "#8BC34A",
        },
    },
    data: function () {
        return {
            debug: ß.DEBUG,
            payment: ß.PAYMENT,
            response: "",
            order: {},
        };
    },
    components: {
        // use it if the paypal module is enabled
        paypal,
        simple,
    },
    mounted() {
        this.$vuetify.theme.themes.dark.primary = this.primary;
        this.$vuetify.theme.themes.light.primary = this.primary;

        this.$vuetify.theme.themes.dark.secondary = this.secondary;
        this.$vuetify.theme.themes.light.secondary = this.secondary;
    },
    methods: {
        start_payment: function () {
            var _this = this;
            axios({
                method: "post",
                url: "/start-payment.json",
            })
                .then(function (response) {
                    _this.response = response.data;
                    if (response.data.redirect) {
                        window.location = response.data.redirect;
                    } else {
                        console.log(response);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
};
</script>

<style></style>
