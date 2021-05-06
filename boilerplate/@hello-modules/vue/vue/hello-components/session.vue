<!-- veutify template -->

<template>
    <div :class="[dark ? 'theme--dark' : 'theme--light', 'hello-session']">
        <img alt="ßoilerplate logo" :src="require('@/assets/boilerplate.png')" key="a" />

        <h1>{{ msg }}</h1>
        <v-container>
            <v-layout align-center justify-center row fill-height>
                <v-flex xs12 sm6 md3><v-text-field v-model="local_data" label="Solo" placeholder="local session variable" solo></v-text-field></v-flex>
            </v-layout>
        </v-container>
        <v-btn v-on:click="set()">Save</v-btn>
        <h3>Automatic session model</h3>
        <v-container>
            <v-layout align-center justify-center row fill-height>
                <v-flex xs12 sm6 md3><v-text-field v-model="session_data_main" label="Solo" placeholder="session's main" solo></v-text-field></v-flex>
            </v-layout>
        </v-container>
        <v-container><json_editor ref="editor" :json="local_pre" /></v-container>
    </div>
</template>

<script>
import json_editor from "vue2-jsoneditor";

export default {
    name: "Session",
    route: {},
    data: function () {
        return {
            local_data: "",
        };
    },
    computed: {
        local_pre() {
            return this.$store.state;
        },
        session_data_main() {
            if (this.$store.state.server.session) if (this.$store.state.server.session.data) return this.$store.state.server.session.data.main;
            return "";
        },
    },
    props: {
        msg: String,
        dark: {
            default: false,
        },
        primary: {
            default: "#4CAF50",
        },
        secondary: {
            default: "#8BC34A",
        },
    },
    methods: {
        set: function () {
            this.$store.dispatch("server/save_session_data", { main: this.local_data });
        },
    },
    mounted() {
        var JSONEditor = this.$refs.editor.editor;
        JSONEditor.setMode("view");
    },
    components: {
        json_editor,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #415566;
}
</style>

<!-- plain template>
  <div class="hello-session">
        <h1>{{ msg }}</h1>
    <div>
        <h3> Get/Set values on clicks </h3>
        <input v-model="local_main"><br><br>
        <button v-on:click="get()">get()</button>
        <button v-on:click="set()">set()</button>
    </div>

    <h3> Automatic session model </h3>
    <input v-model="session_main"><br><br>
        <pre> {{ local_pre }} </pre>       

  </div>
</template -->
