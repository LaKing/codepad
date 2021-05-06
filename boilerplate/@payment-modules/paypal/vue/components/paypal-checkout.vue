<template>
    <div>
        <div v-if="!paid">
            <h1>{{ price }} {{ currency_visual() }}</h1>

            <p>{{ description }}</p>
        </div>
        <div v-if="!paid" ref="paypal"></div>

        <div v-if="paid">
            <v-alert v-if="message" :type="message_type">
                {{ message }}
            </v-alert>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "PayPal-checkout",
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
        }
    },
    data: function() {
        return {
            loaded: false,
            paid: false,
            message: false,
            message_type: "success",
            error: false
        };
    },
    mounted: function() {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?currency=" + this.currency + "&client-id=" + ß.PAYPAL_CLIENTID;
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
    },
    methods: {
        currency_visual: function() {
            if (this.currency === "HUF") return "##&en Forint ##&hu Ft ##";
            if (this.currency === "EUR") return "€";
            return this.currency;
        },
        setLoaded: function() {
            this.loaded = true;
            var _this = this;

            window.paypal
                .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: this.description,
                                    amount: {
                                        currency_code: this.currency,
                                        value: this.price
                                    }
                                }
                            ]
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
						_this.paid = true;
                        axios({
                            method: "post",
                            url: "/paypal-payment.json",
                            data: order
                        })
                            .then(function(response) {
                                if (!response.data) return;
                                if (response.data.message) _this.message = response.data.message;
                          		else _this.message= "##&en Success. Thank you. ##&hu Sikeres fizetés. Köszönjük. ##";
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

                        console.log(order);
                    },
                    onError: err => {
                        console.log(err);
                        _this.message_type = "error";
                        _this.message = "##&en Failed. There was an error. ##&hu Sikertelen. Hiba történt. ##";
                    }
                })
                .render(this.$refs.paypal);
        }
    }
};
</script>
