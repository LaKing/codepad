<template>
    <v-card-text>
        <v-container>
            <v-alert v-show="confirmed" :value="true" type="error" color="rgba(255, 0, 0, 0.5)" class="text-sm-left"
                >##&en Accound will be deleted permanently. Are you sure? ##&hu A törlés nem visszavonható, biztos benne? ##</v-alert
            >
            <v-btn color="red" @click="action">##&en Delete account ##&hu Fiók törlése ##</v-btn>
            <v-alert id="alert" v-show="msg" :value="true" :type="type" transition="fade" class="text-sm-left">{{ msg }}</v-alert>
            <v-progress-circular v-show="progress" :size="50" color="primary" indeterminate></v-progress-circular>
        </v-container>
    </v-card-text>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            confirmed: false,
            progress: false,
            msg: false,
            type: "info"
        };
    },
    components: {},
    methods: {
        get_btn_title() {
            if (this.msg) return null;
            return "UPDATE";
        },
        action(arg) {
            //this.$refs.form.validate();
            this.msg = false;
            if (this.confirmed) this.delete_account(arg);
            else {
                //this.msg = "Accound will be deleted permanently. Are you sure?";
                this.confirmed = true;
            }
        },
        delete_account() {
            this.progress = true;
            this.type = "info";

            var _this = this;
            axios({
                method: "post",
                url: "https://" + ß.HOSTNAME + "/post-delete-account.json",
                data: {}
            })
                .then(function(response) {
                    _this.progress = false;

                    if (response.data === "OK") _this.msg = "##&en Account deleted. ##&hu Fiók törölve ##";
                    else {
                        _this.type = "error";
                        _this.msg = response.data;
                    }
                    _this.$store.dispatch("server/clear_session");
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
