<template>
    <div class="hello">
        <img alt="socket.io logo" :src="require('@/assets/socketio.png')"/>

        <h1>{{ msg }}</h1>
        <p>
            In this module stack we integrate the vue-socket.io-extended implementation<br />
            check <a href="https://github.com/probil/vue-socket.io-extended" target="_blank" rel="noopener">vue-socket.io-extended</a>.
        </p>
        <h3>Essential Links</h3>
        <ul>
            <li><a href="https://socket.io" target="_blank" rel="noopener">Socket.io</a></li>
            <li><a href="https://github.com/socketio/socket.io" target="_blank" rel="noopener">on Github</a></li>
        </ul>
        <v-btn v-if="!isConnected" @click="connect()">Connect</v-btn>
        <h3 v-if="!isConnected">{{ question_text }}</h3>
        <div v-if="isConnected">
            <h3>{{ question_text }}</h3>
            <v-btn @click="send(true)">OK</v-btn><v-btn @click="send(false)">NO</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: "Socket.io",
    props: {
        msg: String,
    },
    route: true,
    data() {
        if (this.$socket.connected)
            return {
                isConnected: true,
                question_text: "Would you like to read a TCP joke?",
            };
        else
            return {
                isConnected: false,
                question_text: "Please log in to see a TCP joke.",
            };
    },
    sockets: {
        connect() {
            // Fired when the socket connects.
            this.isConnected = true;
            this.question_text = "Connected! How about a TCP joke?";
        },

        disconnect() {
            this.isConnected = false;
        },
        question(data) {
            this.question_text = data;
        },
    },
    methods: {
        send(bool) {
            this.$socket.client.emit("answer", bool);
        },
        connect() {
            this.$store.dispatch("socket/connect");
        },
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
    color: #000;
}
</style>
