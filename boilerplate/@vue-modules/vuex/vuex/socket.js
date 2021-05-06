/* jshint esversion: 9 */

// initial state
const state = {
  	// TODO eleminate isConnected - or reconsider to shall be connected?
    isConnected: false,
    MAIN: {},
    DATA: {}
};

// getters
const getters = {};

// actions
const actions = {
    connect: function(context) {
        var _socket = this._vm.$socket;
        if (!_socket.connected) _socket.client.open();
    },
    disconnect: function(context) {
        var _socket = this._vm.$socket;
        _socket.client.close();
    }
};

// mutations
const mutations = {
    SOCKET_CONNECT(state) {
        state.isConnected = true;
    },

    SOCKET_DISCONNECT(state) {
        state.isConnected = false;

        // try to reconnect by script
        var _socket = this._vm.$socket;
        var i = setInterval(connect, 1000);
        function connect() {
            if (state.isConnected) return clearInterval(i);
            console.log("reconnect ...");
            _socket.client.open();
        }
    },
    SOCKET_MAIN(state, main) {
        // the main message replaces the maiobject
        state.MAIN = main;
    },

    SOCKET_DATA(state, data) {
        // socket data is an additiv operation
        state.DATA = { ...state.DATA, ...data };
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
