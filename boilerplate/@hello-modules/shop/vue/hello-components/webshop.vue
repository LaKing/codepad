<template>
    <div>
      	WEBSHOP
        <main_webshop
            :image_placeholder="image_placeholder"
            :isdark="dark"
            :primary="primary"
            :secondary="secondary"
            :countries="countries"
            :shipping_types="shipping_types"
        ></main_webshop>
    </div>
</template>

<script>
import main_webshop from "@/components/main_webshop.vue";

export default {
    name: "Webshop",
    route: {
      path:'/webshop',name:'hello_webshop', redirect:'/categories'
    },
    props: {
        dark: {
            default: false,
        },
        primary: {
            default: "#4CAF50",
        },
        secondary: {
            default: "#8BC34A",
        },
    },

    data: function () {
        return {
            countries: ["Magyarország", "Germany"],
            image_placeholder: "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
            shipping_types: [
                { name: "UPS HAZHOZSZALLITAS", huf: 1234, name_en: "UPS DELIVERY HUNGARY" },

                { name: "Személyes átvétel", huf: 0, name_en: "Pickup" },
            ],
        };
    },
    components: {
        main_webshop,
    },
    methods: {},
};
</script>

<style></style>
