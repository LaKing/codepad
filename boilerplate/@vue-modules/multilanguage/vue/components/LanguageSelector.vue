<template>
    <v-btn text @click="set_language('##&en hu ##&hu en ##')">{{ label }}</v-btn>
</template>

<script>
import axios from "axios";

  // A simple language selector button for two languages
  
export default {
    data: () => ({
        //app_languages: Object.keys(ß.APP_LANGUAGES)
    }),
    props: {
        label: {
            type: String,
            default: "##&en Magyarul ##&hu English ##"
        }
    },
    methods: {
        set_language: function(lang) {
            // eslint-disable-next-line
            var url = "/post-lang-" + lang + ".json";
            console.log(lang);
            axios({
                method: "post",
                url: url
            })
                .then(function(response) {
                    console.log(response);
                    location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>
