<template>
    <v-form v-model="valid" ref="form" v-on:submit.prevent="noop">
        <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
        <v-btn :disabled="!valid" v-show="btn_title" @click="submit">{{ btn_title }}</v-btn>
    </v-form>
</template>

<script>
export default {
    props: ["btn_title"],
    data() {
        var default_email = "";
        if (ß.DEBUG) if (ß.MODE === "development") default_email = "admin@" + ß.HOSTNAME;

        return {
            valid: false,
            email: default_email,
            emailRules: [
                // fires all the time
                //  message-transition-enter-active message-transition-enter-to
                v => !!v || "...", //"E-mail is required",
                v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || ".." //"E-mail must be valid"
            ]
        };
    },
    methods: {
        submit() {
            //this.$refs.form.validate();
            this.$emit("return", this.email);
        },
        noop() {}
    }
};
</script>
