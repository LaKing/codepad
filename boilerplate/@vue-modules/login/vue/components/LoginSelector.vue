<template>
    <v-list two-line>
        <v-list-item v-for="(item, key) in methods" :key="item.title" @click="click_action(item[is].action)">
            <v-list-item-avatar>
                <v-icon :style="style_color(item.iconColor)" class="grey lighten-2">{{ item.icon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content class="text-left">
                <v-list-item-title>{{ item[is].title || key }}</v-list-item-title>
                <v-list-item-subtitle>{{ item[is].subtitle || "" }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
                <v-btn icon ripple v-if="has_key(key)"> <v-icon color="green lighten-1">check_circle</v-icon> </v-btn>
            </v-list-item-action>
        </v-list-item>
    </v-list>
</template>

<script>
import axios from "axios";
import LOGIN_METHODS from "@/components/LOGIN_METHODS.js";
export default {
    props: ["selected"],
    data() {
        return {
            methods: LOGIN_METHODS
        };
    },
    methods: {
        style_color: function(hex) {
            return "color:" + hex;
        },
        close() {
            this.$emit("dialog_handler", "close");
        },
        click_action: function(action) {
            //console.log(key, action);
            if (action.charAt(0) === "/") {
                //window.location = "https://" + ß.HOSTNAME + action;
                window.location = action;
            } else this.$emit("dialog_handler", action);
        },
        has_key(key) {
            if (this.$store.state.server.session)
                if (this.$store.state.server.session.user) {
                    if (this.$store.state.server.session.user.local) {
                        if (key === "password") if (this.$store.state.server.session.user.local.password) return true;
                        if (key === "email") if (this.$store.state.server.session.user.local.email) return true;
                    }
                    if (this.$store.state.server.session.user[key]) return true;
                }
            return false;
        },
        noop() {}
    },
    computed: {
        is() {
            if (this.$store.state.server.session) if (this.$store.state.server.session.passport) if (this.$store.state.server.session.passport.user) return "user";
            return "guest";
        },
        is_user() {
            if (this.$store.state.server.session) if (this.$store.state.server.session.passport) if (this.$store.state.server.session.passport.user) return true;
            return false;
        }
    }
};
</script>
