export default {
    name: "tree-component",
    template: `
<div class="children filetree">
	<div v-for="p in folders" :key="p">
        <div class="folder button" @click="dir(p)" @contextmenu="folder_handler($event, p)"><i :class="[ro_folder(p)?'far':'fas', $store.getters.isOpen(p)?'fa-folder-open':'fa-folder']"></i> {{get_name(p)}}</div>
		<tree-component :path="p" v-if="$store.getters.isOpen(p)"/>
    </div>
    <div v-for="p in files" :key="p">
        <div class="file button fileicon" :class="[p === $store.state.pad?'actual':'']" @click="pad(p)" @contextmenu="file_handler($event, p)">
		<i :class="[ro_file(p)?'far':'fas']" class="fa-file"></i>
		{{get_name(p)}} 
		<i v-for="(v,u,i) in $store.state.files[p].at" :key="i" :class="[ul(v)?'underline':'']" class="usernames">{{u}} </i></div>
    </div>

</div>
`,
    data() {
        return {
            options: {},
        };
    },
    props: {
        path: String,
    },
    components: {},
    methods: {
        get_name(path) {
            return path.split("/").pop();
        },
        get_open(path) {
            return this.$store.state.dir === path;
        },
        dir(path) {
            this.$store.commit("dir", path);
            this.$store.commit("toggle", path);
        },
        pad(path) {
            this.$store.commit("pad", path);
        },
        file_handler: function (e, path) {
            if (!path) path = "";
            e.preventDefault();
            window.open("/p" + path);
        },
        folder_handler: function (e, path) {
            if (!path) path = "";
            e.preventDefault();
            window.open("/mc" + path);
        },
        ro_file: function (path) {
            if (this.$store.state.files[path].ro) return true;
            return false;
        },
        ro_folder: function (path) {
            if (this.$store.state.folders[path].ro) return true;
            return false;
        },
        ul(v) {
            let s = 0;
            for (let x in v) {
                s += v[x];
            }
            return s % 2;
        },
    },
    computed: {
        folders: function () {
            return Object.keys(match_folders(this.$store.state.folders, this.path)).sort();
        },
        files: function () {
            return Object.keys(get_files(this.$store.state.files, this.path)).sort();
        },
    },
};

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

    return ret;
}

function match_folders(data, dir) {
    const ret = {};
    let b = [];
    let pre = "";
    if (dir !== "/") {
        b = dir.split("/").slice(1);
        pre = dir;
    }
    for (const v in data) {
        const a = v.split("/").slice(1);
        if (a.length === b.length + 1) if (subab(a, b)) ret[v] = {};
    }
    return ret;
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

    return ret;
}
