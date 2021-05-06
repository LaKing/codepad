<template>
    <v-card-text>
        <v-container grid-list-md> <form_for_email @return="action" v-bind:btn_title="'##&en Submit ##&hu Küldés ##'" /> </v-container>
        <v-container>
            <v-alert id="alert" v-show="msg" :value="true" :type="type" transition="fade" class="text-sm-left">{{ msg }}</v-alert>
            <v-progress-circular v-show="progress" :size="50" color="primary" indeterminate></v-progress-circular>
        </v-container>
    </v-card-text>
</template>

<script>
import axios from "axios";
import form_for_email from "@/components/FormForEmail.vue";

export default {
    data() {
        return {
            email: null,
            progress: false,
            msg: false,
            type: "info"
        };
    },
    components: {
        form_for_email
    },
    methods: {
        action(arg) {
            //this.$refs.form.validate();
            this.progress = true;
            this.msg = false;
            this.type = "info";
            this.post_email(arg);
        },
        post_email(email) {                    
            this.type = "info";
            var _this = this;
            axios({
                method: "post",
                url: "/post-email-request.json",
                data: { email: email }
            })
                .then(function(response) {
                    _this.progress = false;

                    console.log(response.data);
                    if (response.data === "OK") _this.msg = "##&en Please check your mailbox ##&hu Ellenőrizze póstafiókját ##";
                    else {
                      _this.type = "info";
                      _this.msg = response.data;
                    }
                })
                .catch(error => {
                    _this.progress = false;
                    _this.type = "error";
                    _this.msg = "##&en Network error. ##&hu Hálózati hiba ##";
                    // eslint-disable-next-line
                    console.log(error);
                });
        }
    }
};
</script>

<style scoped>
#alert {
    opacity: 0.6;
}
</style>
