/* jshint esversion: 9 */

import axios from "axios";

const state = {
    session: {
        data: {}
    }
};

const getters = {
    get_session_data: (state, getters) => {
        return state.session_data;
    }
};

const mutations = {
    set_session: (state, payload) => (state.session = payload),
    clear_session: state => (state.session = {})
};

const actions = {
    load_session: function(context) {
        //console.log('load_session', this.state);
        // eslint-disable-next-line
        var url = "/session.json";
        var _socket = this._vm.$socket;
        //Ł(_socket);
        return axios({
            method: "post",
            url: url
        })
            .then(function(response) {
                // eslint-disable-next-line
                //Ł("session.json", response.data);

                console.log("[vuex/server.js] load_session complete");

                context.commit("set_session", response.data);

                if (ß.SOCKETIO_MANUALCONNECT) return;
                if (response.data.passport)
                    if (response.data.passport.user)
                        // send a socketio connect message if the session indicates that the user is logged in
                        context.dispatch("socket/connect", null, { root: true });
            })
            .catch(error => {
                console.log("ERROR in load_session axios POST", error);
            });
    },
    save_session_data: function(context, payload) {
        //console.log('save_session', this.state);
        // eslint-disable-next-line
        var url = "/post-session-data.json";

        return axios({
            method: "post",
            url: url,
            data: payload
        })
            .then(function(response) {
                console.log("[vuex/server.js] save_session_data complete");
                context.dispatch("load_session");
            })
            .catch(error => {
                console.log("ERROR in save_session_data axios POST", error);
            });
    },
    clear_session: function(context, payload) {
        context.commit("set_session", {});
    }
};

export default {
    namespaced: true,
    state,
    //getters,
    actions,
    mutations
};
