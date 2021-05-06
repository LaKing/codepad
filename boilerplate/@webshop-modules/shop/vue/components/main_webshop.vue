<template>
    <v-content id="main-shop" :dark="isdark" class="pt-0" :class="['pt-0', isdark ?'theme--dark' :'theme--light']">
        <v-container fluid :dark="isdark" class="maincontent">
            <transition name="component-fade" mode="out-in">
                <cart v-if="at('cart')" :isdark="isdark" msg="##&en Shopping Cart ##&hu Kosár ##" :countries="countries" :shipping_types="shipping_types"/>
                
                <products :isdark="isdark" :image_placeholder="image_placeholder" v-if="at('products')" />
                <product :isdark="isdark" :image_placeholder="image_placeholder" v-if="has_path('product/')" @added_product="open_drawer = true" />
                <product_group :image_placeholder="image_placeholder" :isdark="isdark" v-if="has_path('categories/')" @added_product="open_drawer = true" />
                <checkout :isdark="isdark" v-if="at('checkout') || at('payment')" />
                <payment_success :isdark="isdark" v-if="at('payment-success')" />
              
            </transition>
        </v-container>
        <cart_sidebar :isdark="isdark" @update_drawer="open_drawer = $event" :open_drawer="open_drawer" />
       
    </v-content>
</template>

<script>
//                <!--login_dialog ref="login_dialog_reference" v-if="at('login') || open_login_dialog" @finished="finish_login_dialog"/-->

//import login_dialog from "@/components/LoginDialog.vue";

import cart from "@/components/cart.vue";

import checkout from "@/components/checkout.vue";
import payment_success from "@/components/payment_success.vue";

import products from "@/components/products.vue";
import product from "@/components/product.vue";
import product_group from "@/components/product_group.vue";
import cart_sidebar from "@/components/cart_sidebar.vue";


export default {
    name: "mainpage",
  	props:{
    	isdark:{
          	default:true
        },
      	primary:{
          default:"#8BC34A" 
        },
      	secondary:{
          default:"#FF9800" 
        },
      	image_placeholder:{
          default:"@/assets/vue.png"
        },
      	shipping_types: {
          default: function(){
          return [
                { name: "UPS HAZHOZSZALLITAS", huf: 2480, name_en: "UPS DELIVERY HUNGARY" },
                { name: "UPS EUROPA HAZHOZSZALLITAS", huf: 6950, name_en: "UPS DELIVERY EUROPE" },
                { name: "Személyes átvétel", huf: 0, name_en: "Pickup" }
            ];
        }
        },
      		countries: {
          	type: Array,
          default: function(){
           return [
                /*                "Afghanistan",
                "Albania",
                "Algeria",
                "American Samoa",
                "Andorra",
                "Angola",
                "Anguilla",
                "Antarctica",
                "Antigua and Barbuda",
                "Argentina",
                "Armenia",
                "Aruba",
                "Australia",*/
                "Austria",
                /*                "Azerbaijan",
                "Bahamas (the)",
                "Bahrain",
                "Bangladesh",
                "Barbados",
                "Belarus",
                "Belgium",*/
                "Belize",
                /*"Benin",
                "Bermuda",
                "Bhutan",
                "Bolivia (Plurinational State of)",
                "Bonaire, Sint Eustatius and Saba",
                "Bosnia and Herzegovina",
                "Botswana",
                "Bouvet Island",
                "Brazil",
                "British Indian Ocean Territory (the)",
                "Brunei Darussalam",*/
                "Bulgaria",
                /* "Burkina Faso",
                "Burundi",
                "Cabo Verde",
                "Cambodia",
                "Cameroon",
                "Canada",
                "Cayman Islands (the)",
                "Central African Republic (the)",
                "Chad",
                "Chile",
                "China",
                "Christmas Island",
                "Cocos (Keeling) Islands (the)",
                "Colombia",
                "Comoros (the)",
                "Congo (the Democratic Republic of the)",
                "Congo (the)",
                "Cook Islands (the)",
                "Costa Rica",*/
                "Croatia",
                /*               "Cuba",
                "Curaçao",
                "Cyprus",
                "Czechia",
                "Côte d'Ivoire",
                "Denmark",
                "Djibouti",
                "Dominica",
                "Dominican Republic (the)",
                "Ecuador",
                "Egypt",
                "El Salvador",
                "Equatorial Guinea",
                "Eritrea",
                "Estonia",
                "Eswatini",
                "Ethiopia",
                "Falkland Islands (the) [Malvinas]",
                "Faroe Islands (the)",
                "Fiji",
                "Finland",*/
                "France",
                /*"French Guiana",
                "French Polynesia",
                "French Southern Territories (the)",
                "Gabon",
                "Gambia (the)",
                "Georgia",*/
                "Germany",
                /*"Ghana",
                "Gibraltar",*/
                "Greece",
                /*"Greenland",
                "Grenada",
                "Guadeloupe",
                "Guam",
                "Guatemala",
                "Guernsey",
                "Guinea",
                "Guinea-Bissau",
                "Guyana",
                "Haiti",
                "Heard Island and McDonald Islands",
                "Holy See (the)",
                "Honduras",
                "Hong Kong",*/
                "Magyarország",
                /*               "Iceland",
                "India",
                "Indonesia",
                "Iran (Islamic Republic of)",
                "Iraq",
                "Ireland",
                "Isle of Man",
                "Israel",*/
                "Italy",
                /* "Jamaica",
                "Japan",
                "Jersey",
                "Jordan",
                "Kazakhstan",
                "Kenya",
                "Kiribati",
                "Korea (the Democratic People's Republic of)",
                "Korea (the Republic of)",
                "Kuwait",
                "Kyrgyzstan",
                "Lao People's Democratic Republic (the)",
                "Latvia",
                "Lebanon",
                "Lesotho",
                "Liberia",
                "Libya",
                "Liechtenstein",*/
                "Lithuania",
                "Luxembourg",
                /*"Macao",
                "Madagascar",
                "Malawi",
                "Malaysia",
                "Maldives",
                "Mali",
                "Malta",
                "Marshall Islands (the)",
                "Martinique",
                "Mauritania",
                "Mauritius",
                "Mayotte",
                "Mexico",
                "Micronesia (Federated States of)",
                "Moldova (the Republic of)",
                "Monaco",
                "Mongolia",
                "Montenegro",
                "Montserrat",
                "Morocco",
                "Mozambique",
                "Myanmar",
                "Namibia",
                "Nauru",
                "Nepal",*/
                "Netherlands (the)",
                /* "New Caledonia",
                "New Zealand",
                "Nicaragua",
                "Niger (the)",
                "Nigeria",
                "Niue",
                "Norfolk Island",
                "Northern Mariana Islands (the)",*/
                "Norway",
                /* "Oman",
                "Pakistan",
                "Palau",
                "Palestine, State of",
                "Panama",
                "Papua New Guinea",
                "Paraguay",
                "Peru",
                "Philippines (the)",
                "Pitcairn",*/
                "Poland",
                "Portugal",
                /* "Puerto Rico",
                "Qatar",
                "Republic of North Macedonia",*/
                "Romania",
                /*               "Russian Federation (the)",
                "Rwanda",
                "Réunion",
                "Saint Barthélemy",
                "Saint Helena, Ascension and Tristan da Cunha",
                "Saint Kitts and Nevis",
                "Saint Lucia",
                "Saint Martin (French part)",
                "Saint Pierre and Miquelon",
                "Saint Vincent and the Grenadines",
                "Samoa",
                "San Marino",
                "Sao Tome and Principe",
                "Saudi Arabia",
                "Senegal",*/
                "Serbia",
                /*                "Seychelles",
                "Sierra Leone",
                "Singapore",
                "Sint Maarten (Dutch part)",*/
                "Slovakia",
                /*               "Slovenia",
                "Solomon Islands",
                "Somalia",
                "South Africa",
                "South Georgia and the South Sandwich Islands",
                "South Sudan",
                "Spain",
                "Sri Lanka",
                "Sudan (the)",
                "Suriname",
                "Svalbard and Jan Mayen",
                "Sweden",
                "Switzerland",
                "Syrian Arab Republic",
                "Taiwan (Province of China)",
                "Tajikistan",
                "Tanzania, United Republic of",
                "Thailand",
                "Timor-Leste",
                "Togo",
                "Tokelau",
                "Tonga",
                "Trinidad and Tobago",
                "Tunisia",
                "Turkey",
                "Turkmenistan",
                "Turks and Caicos Islands (the)",
                "Tuvalu",
                "Uganda",*/
                "Ukraine",
                /*                "United Arab Emirates (the)",*/
                "United Kingdom of Great Britain and Northern Ireland (the)"
                /* "United States Minor Outlying Islands (the)",
                "United States of America (the)",
                "Uruguay",
                "Uzbekistan",
                "Vanuatu",
                "Venezuela (Bolivarian Republic of)",
                "Viet Nam",
                "Virgin Islands (British)",
                "Virgin Islands (U.S.)",
                "Wallis and Futuna",
                "Western Sahara",
                "Yemen",
                "Zambia",
                "Zimbabwe",
                "Åland Islands"*/
            ];
          }
        }
    },
    data: function() {
        return {
            type: "mask",
            open_drawer: false,
            datadir: ß.DATADIR
            //open_login_dialog: false
        };
    },
    components: {
       // hello_login,
        cart,
        products,
        product,
        product_group,
  	payment_success,
      checkout,
      cart_sidebar
    },
    computed: {
 
    },
   mounted(){
    console.log("vf",this.$vuetify);
    this.$vuetify.theme.themes.dark.primary = this.primary;
      this.$vuetify.theme.themes.light.primary = this.primary;
     
      this.$vuetify.theme.themes.dark.secondary = this.secondary;
      this.$vuetify.theme.themes.light.secondary = this.secondary;
  },
    methods: {

        at: function(arg) {
            let a = arg.toLowerCase();
            let p = this.$route.path.toLowerCase();
            if (p === "/" + a) return true;
            if (p === "/" + a + "/") return true;
            return false;
        },
        has_path: function(path) {
            return this.$route.path.indexOf(path) >= 0;
        }

    }
};
</script>
<style>
  /*
:root {
    --textcolor: gainsboro;
    --primary: #9c7446;
    --primary: #868686;
   
    --primary_light: #d0a97c;
}
  */
/*#main {
    background: #222222;
}
  */
  #main-shop.theme--dark {
    background: #222222;
}
 #main-shop .theme--dark.v-card {
    background-color: #353535;
    color: #fff;
}
.maincontent {
    padding-bottom: 300px !important;
}
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.1s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0.2;
}
.pointer {
    cursor: pointer;
}
.textcolor {
    color: var(--textcolor) !important;
}
.uppercase {
    text-transform: uppercase;
}
.theme--dark .vue-include p {
    color: #f3f3f3 !important;
}
.img-placeholder {
    width: 100%;
    height: 20vw;
    min-height: 200px;
}
  /*
.bg-primary {
    background: var(--primary);
}
.v-application a {
    color: white !important;
}
  */
.space-between {
    display: flex;
    justify-content: space-between;
}

  @media (max-width: 1264px) {
    
}
@media (max-width: 600px) {
    .maincontent {
        padding-bottom: 0px !important;
    }
}
</style>
