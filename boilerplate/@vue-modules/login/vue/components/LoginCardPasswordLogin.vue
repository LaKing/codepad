<template>
    <v-card-text>
        <v-container grid-list-md>
            <transition name="component-fade" mode="out-in"> <component :is="selected" @return="action" v-bind:btn_title="get_btn_title()" /> </transition>
        </v-container>
        <v-container>
            <v-alert id="alert" v-show="msg" :value="true" :type="type" transition="fade" class="text-sm-left">{{ msg }}</v-alert>
            <v-progress-circular v-show="progress" :size="50" color="primary" indeterminate></v-progress-circular>
        </v-container>
    </v-card-text>
</template>

<script>
import axios from "axios";
import form_for_email from "@/components/FormForEmail.vue";
import form_for_password from "@/components/FormForPassword.vue";

export default {
    props: ["rem"],
    data() {
        return {
            email: null,
            registered: false,
            rememberme: true,
            selected: "form_for_email",
            progress: false,
            msg: false,
            type: "info"
        };
    },
    components: {
        form_for_email,
        form_for_password
    },
    methods: {
        get_btn_title() {
            if (this.selected === "form_for_password")
                if (this.registered) return "##&en LOGIN ##&hu Bejelentkezés ##";
                else return "##&en REGISTER ##&hu Regisztráció ##";
            return "##&en NEXT ##&hu Tovább ##";
        },
        action(arg) {
            //this.$refs.form.validate();
            this.progress = true;
            this.msg = false;
            if (this.selected === "form_for_email") this.post_email(arg);
            if (this.selected === "form_for_password") this.post_login(arg);
        },
        post_email(email) {
            var _this = this;
            this.type = "info";
            axios({
                method: "post",
                url: "/post-email.json",
                data: { email: email }
            })
                .then(function(response) {
                    _this.progress = false;

                    if (response.data === "OK") _this.registered = true;
                    if (response.data === "GOODFORMAT" || response.data === "OK") {
                        _this.selected = "form_for_password";
                        _this.email = email;
                        return;
                    }
                    _this.type = "error";
                    _this.msg = response.data;
                })
                .catch(error => {
                    _this.progress = false;
                    _this.type = "error";
                    _this.msg = "##&en Network error. ##&hu Hálózati hiba ##";
                    // eslint-disable-next-line
                    console.log(error);
                });
        },
        post_login(password) {
            var _this = this;
            this.type = "info";
            axios({
                method: "post",
                url: "/post-login.json",
                data: { email: this.email, password: password, rem: this.rem }
            })
                .then(function(response) {
                    _this.progress = false;

                    if (response.data === "OK") {
                        // user logged in
                        _this.$store.dispatch("server/load_session");
                        //_this.$router.push('/welcome');
                        _this.$emit("dialog_handler", "selector");

                        return;
                    }
                    if (response.data === "NO") _this.msg = "##&en Sorry. Wrong password. ##&hu Sajnos ez nem a megfelelő jelszó ##";
                    else {
                        _this.msg = response.data;
                        _this.type = "error";
                    }
                    _this.progress = false;
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
