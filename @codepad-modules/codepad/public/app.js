import MainComponent from "/MainComponent.js";

Vue.use(Vuex);

Vue.config.devtools = true;
Vue.config.debug = true;

function unique(value, index, self) {
    return self.indexOf(value) === index;
}

const store = new Vuex.Store({
    state: {
        // pads
        pad: undefined,
        dir: "/",
        history: [],
        // tree
        files: {},
        folders: {},
        opened: ["/"],
        // messages
        ntc: {},
        logs: "No logs yet.",
        logline: "Codepad opened",
        // settings
        settings: { status: "Settings not loaded" },
      	trash: false
    },
    getters: {
        // ...
        isOpen: state => path => {
          
          	// make sure the opened pad is visible expanded
          	if (state.pad)
          	if (state.pad.substring(0, path.length+1) === path+'/') return true;
          
            return state.opened.includes(path);
        },
        getPad: state => {
            if (!state.pad) return undefined;
            return "/p" + state.pad;
        },
        getPath: state => {
            if (!state.pad) return undefined;
            return state.pad;
        },
        getHistory: state => {
            if (state.history.length < 1) return undefined;
            return state.history;
        },
        getLogs: state => {
            return state.logs;
        },
        getNtc: state => {
            let txt = "";
            if (state.ntc.now) txt += " " + state.ntc.now;
            if (state.ntc.username) txt += " " + state.ntc.username;
            if (state.ntc.opname) txt += " " + state.ntc.opname;
            if (state.ntc.filepath) txt += " " + state.ntc.filepath;
            return txt;
        },
        getNtcFilepath: state => {
            return state.ntc.filepath;
        },
        getSettings: state => {
            return state.setings;
        },
        getCommits: state => {
            if (state.pad) if (state.files[state.pad]) if (state.files[state.pad].git) return state.files[state.pad].git;
            return [];
        }
    },
    mutations: {
        home(state) {
            state.history = [];
            state.opened = ["/"];
            state.dir = "/";
        },
        add_to_history(state, path) {
            if (!path) return;
            if (state.history.indexOf(path) >= 0) return;
            if (state.files[path]) if (state.files[path].ro) return;
            state.history.push(path);
        },
        pad(state, path) {
            if (!path) return;

            store.commit("add_to_history", path);

            state.pad = path;

            if (router.currentRoute.hash !== "#" + path) router.push("/#" + path);
        },
        nopad(state, path) {
            state.pad = undefined;
            router.push("/");
          	
        },
        clearpad(state, path) {
            state.pad = undefined;
            // TODO: remove from history
            router.push("/");
            let i = state.history.indexOf(path);
            if (i >= 0) {
                state.history.splice(i, 1);
            }
            let files = Object.assign({}, state.files);
            delete files[path];
            state.files = files;
        },
        cleardir(state, path) {
            let folders = Object.assign({}, state.folders);
            delete folders[path];
            state.folders = folders;
        },
        dir(state, path) {
            if (!path) return;
            state.dir = path;
        },
        set_files(state, data) {
            state.files = data;
        },
        set_folders(state, data) {
            state.folders = data;
        },
        toggle(state, path) {
            if (state.opened.indexOf(path) > -1) state.opened.splice(state.opened.indexOf(path), 1);
            else state.opened.push(path);
        },
        ntc(state, data) {
            state.ntc = data;
            //    data.now data.username data.opname data.filepath
        },
        logs(state, data) {
            state.logs = data;
        },
        logline(state, data) {
            state.logline = data;
        },
        settings(state, data) {
            state.settings = data;
        },
      	enable_trash(state, data) {
        	state.trash = !state.trash;
        }
    }
});

var socket = io('/main');
Vue.use(VueSocketIOExt, socket);

const router = new VueRouter({
    mode: "history"
});

new Vue({
    el: "#app",
    router: router,
    store: store,
    data: {},
    components: {
        MainComponent
    },
    sockets: {
        connect() {
            console.log("socket connected");
        },
        files(data) {
            store.commit("set_files", data);
        },
        folders(data) {
            store.commit("set_folders", data);
        },
        ntc(data) {
            store.commit("ntc", data);
        },
        logs(data) {
            // itt jön be a log
            store.commit("logs", data);
        },
        logline(data) {
            store.commit("logline", data);
        },
        settings(data) {
            store.commit("settings", data);
        }
    },
    watch: {
        $route(to, from) {
            // react to route changes...
            //console.log("watch:", from, to);
            if (from.fullPath !== to.fullPath) store.commit("pad", to.hash.substring(1));
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            if (router.currentRoute.hash) store.commit("pad", router.currentRoute.hash.substring(1));
        });
    }
});

// a and b are arrays, we check if b is the ordered subset of a, return true if all b elements are also in a.
function subab(a, b) {
    for (const x in b) {
        if (a[x] !== b[x]) return false;
    }
    return true;
}

// check if we have a match at the beginning of the path with dir
function filter(data, dir) {
    if (dir === "/") return data;
    const ret = {};
    const b = dir.split("/").slice(1);
    for (const v in data) {
        const a = v.split("/").slice(1);
        if (subab(a, b)) ret[v] = data[v];
    }
    return ret;
}

// return only those that are in folders in dir
function filter_folders(data, dir) {
    if (dir === "/") return data;
    const ret = {};
    const b = dir.split("/").slice(1);
    for (const v in data) {
        const a = v.split("/").slice(1);
        if (a.length > b.length + 1) if (subab(a, b)) ret[v] = data[v];
    }

    return ret;
}

// return files in dir
function filter_files(data, dir) {
    if (dir === "/") return data;
    const ret = {};
    const b = dir.split("/").slice(1);
    for (const v in data) {
        const a = v.split("/").slice(1);
        if (a.length === b.length + 1) if (subab(a, b)) ret[v] = data[v];
    }

    return ret;
}

// return only folder paths in dir
function get_folders(data, dir) {
    const ret = {};
    let b = [];
    let pre = "";
    if (dir !== "/") {
        b = dir.split("/").slice(1);
        pre = dir;
    }
    for (const v in data) {
        const a = v.split("/").slice(1);
        if (a.length > b.length + 1) if (subab(a, b)) ret[pre + "/" + a[b.length]] = {};
    }

    return Object.keys(ret);
}

// return only file paths in dir
function get_files(data, dir) {
    const ret = {};
    let b = [];
    let pre = "";
    if (dir !== "/") {
        b = dir.split("/").slice(1);
        pre = dir;
    }
    for (const v in data) {
        const a = v.split("/").slice(1);
        if (a.length === b.length + 1) if (subab(a, b)) ret[pre + "/" + a[b.length]] = {};
    }

    return Object.keys(ret);
}
