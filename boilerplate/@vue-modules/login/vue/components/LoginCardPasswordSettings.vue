<template>
    <v-card-text>
        <v-container grid-list-md> <form_for_password @return="action" v-bind:btn_title="get_btn_title()" /> </v-container>
        <v-container>
            <v-alert id="alert" v-show="msg" :value="true" :type="type" transition="fade" class="text-sm-left">{{ msg }}</v-alert>
            <v-progress-circular v-show="progress" :size="50" color="primary" indeterminate></v-progress-circular>
        </v-container>
    </v-card-text>
</template>

<script>
import axios from "axios";
import form_for_password from "@/components/FormForPassword.vue";

export default {
    data() {
        return {
            progress: false,
            msg: false,
            type: "info"
        };
    },
    components: {
        form_for_password
    },
    methods: {
        get_btn_title() {
            if (this.msg) return null;
            return "UPDATE";
        },
        action(arg) {
            //this.$refs.form.validate();
            this.progress = true;
            this.msg = false;
            this.post_update(arg);
        },
        post_update(password) {
            this.type = "info";
            var _this = this;
            axios({
                method: "post",
                url: "/post-password-update.json",
                data: { password: password }
            })
                .then(function(response) {
                    _this.progress = false;

                    if (response.data === "OK") _this.msg = "##&en Password updated ##&hu Jelszó frisítve ##";
                    else {
                        _this.type = "error";
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
