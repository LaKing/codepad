<template>
    <v-form v-model="pass" ref="form" v-on:submit.prevent="noop">
        <v-text-field :type="'password'" label="Password" v-model="password" :rules="passwordRules" required></v-text-field>
        <v-btn :disabled="!pass" v-show="btn_title" @click="submit">{{ btn_title }}</v-btn>
    </v-form>
</template>

<script>
export default {
    props: ["btn_title"],
    data() {
        return {
            pass: false,
            password: "",
            passwordRules: [v => !!v || "..."]
        };
    },
    methods: {
        submit() {
            //this.$refs.form.validate();
            this.$emit("return", this.password);
        },
        noop() {}
    }
};
</script>
