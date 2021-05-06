-<template>
    <div class="text-xs-center">
        <v-img :src="require('@/assets/login.jpg')">
            <v-layout column fill-height>
                <v-card-title>
                    <v-btn dark icon v-if="selected !== 'selector'" v-on:click="selected = 'selector'"> <v-icon>chevron_left</v-icon> </v-btn>
                    <v-btn dark icon v-if="selected === 'selector' && is_user" v-on:click="selected = 'settings'"> <v-icon>fas fa-cog</v-icon> </v-btn>
                </v-card-title>

                <v-spacer></v-spacer>

                <v-card-title class="white--text pl-5 pt-5">
                    <div class="headline">{{ profile_email || title }}</div>
                    <v-spacer></v-spacer>
                    <v-btn v-if="is_user" dark icon v-on:click="logout()" title="Logout"> <v-icon>fas fa-sign-out-alt</v-icon> </v-btn>
                    <v-btn v-if="!is_user" dark icon v-on:click="toggle_rem()" title="##&en remember me on this computer ##&hu emlékezzen rám ez a gép ##">
                        <v-icon v-if="!rem">fas fa-square</v-icon>
                    </v-btn>
                </v-card-title>
            </v-layout>
        </v-img>

        <v-layout wrap >
            <v-flex xs12>
                <v-card height="320" :dark="dark">
                    <transition name="component-fade" mode="out-in"> <component :is="selected" @dialog_handler="set_dialog" v-bind:rem="rem" /> </transition>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
// the selector list
import selector from "@/components/LoginSelector.vue";

// LoginCard contents
import password_login from "@/components/LoginCardPasswordLogin.vue";
import password_settings from "@/components/LoginCardPasswordSettings.vue";
import email_login from "@/components/LoginCardEmailLogin.vue";
import email_settings from "@/components/LoginCardEmailSettings.vue";
import settings from "@/components/LoginCardSettings.vue";

import axios from "axios";

// this.$refs.login_dialog.set_dialog('selector');

export default {
  props:{
    dark:{
      default:false 
    },
    primary:{
              default:"#4CAF50"
            },
          secondary:{
            default:"#8BC34A"
          }
  },
    data() {
        return {
            // open the dialog on the login uri path
            dialog: this.$route.path === "/login",
            selected: "selector",
            rem: true
        };
    },
    components: {
        selector,
        password_login,
        password_settings,
        email_login,
        email_settings,
        settings
    },
    methods: {
        open() {
            this.selected = "selector";
            this.dialog = true;
        },
        close() {
            this.dialog = false;
        },
        set_dialog(arg) {
            this.selected = "selector";
            if (arg === "close") return (this.dialog = false);
            this.selected = arg;
        },
        logout() {
            this.$store.dispatch("server/clear_session");

            var _this = this;
            axios({
                method: "post",
                url: "https://" + ß.HOSTNAME + "/post-logout.json",
                data: {}
            })
                .then(function(response) {
                    _this.$store.dispatch("server/clear_session");
                    _this.$store.dispatch("socket/disconnect");
                    _this.set_dialog("selector");
                })
                .catch(error => {
                    // eslint-disable-next-line
                    console.log(error);
                });
        },
        toggle_rem() {
            this.rem = !this.rem;
        }
    },
    computed: {
        title() {
            if (this.$store.state.server.session.passport)
                if (this.$store.state.server.session.passport.user) {
                    return "##&en Logged in ##&hu Bejelentkezve ##";
                }
            return "##&en Login ##&hu Bejelentkezés ##";
        },
        is_user() {
            if (this.$store.state.server.session) if (this.$store.state.server.session.passport) if (this.$store.state.server.session.passport.user) return true;
            return false;
        },
        profile_email() {
            if (this.$store.state.server.session)
                if (this.$store.state.server.session.user)
                    if (this.$store.state.server.session.user.profile)
                        if (this.$store.state.server.session.user.profile.email) return this.$store.state.server.session.user.profile.email;
            return undefined;
        }
    },
  mounted(){
    this.$vuetify.theme.themes.dark.primary = this.primary;
      this.$vuetify.theme.themes.light.primary = this.primary;
     
      this.$vuetify.theme.themes.dark.secondary = this.secondary;
      this.$vuetify.theme.themes.light.secondary = this.secondary;
  },
    watch: {
        dialog(val) {
            if (!val) this.$emit("finished");
        }
    }
};
</script>
<style>
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.1s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0.2;
}
</style>
