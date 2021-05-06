<template>
    <div :class="['hello', dark ? 'theme--dark' : 'theme--light']" class="boilerplate-cont">
        <img alt="ßoilerplate logo" :src="require('@/assets/boilerplate.png')" key="a" />

        <h1>{{ msg }}</h1>
        <p>
            For details of this project on {{$app.url}},<br />
            check out the <a href="/README.html" target="_blank" rel="noopener">README</a>.
        </p>
        <p>
            About the ßoilerplate framework,<br />
            best is to refer to the <a href="https://github.com/LaKing/boilerplate" target="_blank" rel="noopener">ßoilerplate on GitHub</a> page.
        </p>
        <p>
            Our development environment is a collaborative online editor,<br />
            the latest boilerplate based implementation is called Codepad<br />
            It has <a href="https://github.com/LaKing/codepad" target="_blank" rel="noopener">sourcecode on GitHub</a> and a
            <a href="https://codepad-demo.d250.hu:9001/" target="_blank" rel="noopener">DEMO instance</a>
        </p>
        <v-container :dark="dark"><json_editor ref="editor" :json="ß" /> </v-container>
    </div>
</template>

<script>
// use a Jsoneditor to display boilerplate variables
import json_editor from "vue2-jsoneditor";

export default {
    name: "Boilerplate",
    route: {
        path: "/boilerplate",
        name: "##&en The ßoilerplate framework ##&hu A ßoilerplate keretrendszer ##",
    },
    data: function () {
        return {
            ß: ß,
        };
    },
    props: {
        msg: String,
        dark: {
            default: false,
        },
    },
    components: {
        json_editor,
    },
    mounted() {
        var JSONEditor = this.$refs.editor.editor;
        JSONEditor.setMode("view");
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.boilerplate-cont h3 {
    margin: 40px 0 0;
}

.boilerplate-cont ul {
    list-style-type: none;
    padding: 0;
}

.boilerplate-cont li {
    display: inline-block;
    margin: 0 10px;
}

.boilerplate-cont a {
    color: #22c;
}
.theme-dark .jsoneditor-schema-error,
div.jsoneditor td,
div.jsoneditor textarea,
div.jsoneditor th,
div.jsoneditor-field,
div.jsoneditor-value {
    color: gray;
}
.theme-dark div.jsoneditor-value.jsoneditor-string {
    color: #49d049;
}
</style>
