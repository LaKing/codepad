process = {};
process.env = {};

store = new Vuex.Store({
    state: {
        session: {}
    },
    mutations: {
        set_session: (state, payload) => state.session = payload
    },
    actions: {
        load_session: function(context) {

          	var APP_GET_SESSION_URL = process.env.VUE_APP_GET_SESSION_URL || '/session.json';

            axios.get(APP_GET_SESSION_URL).then(function(response) {
                context.commit('set_session', response.data.data);
            });
        },
        save_session: function(context) {

            var APP_POST_SESSION_URL = process.env.VUE_APP_POST_SESSION_URL || '/session-data';
          
            axios({
                    method: 'post',
                    url: APP_POST_SESSION_URL,
                    data: this.state.session
                })
                .then(function(response) {
                    console.log(response.data);
                }).catch(error => {
                    console.log(error);
                });
        }
    }
});