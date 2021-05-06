module.exports = function() {
    const br = "\n";
    var str = "// boilerplate generated " + ß.now();

    str += br + "import Vue from 'vue';" + br;
    str += br + "import Vuex from 'vuex';" + br;

    Object.keys(ß.VUEX).forEach(function(key) {
        str += "import " + key + " from '" + ß.VUEX[key] + "';" + br;
    });

    str += "" + br;
    str += "Vue.use(Vuex)" + br;
    str += "export default new Vuex.Store({" + br;
    str += "strict: true," + br;

    // so lets collect our vuex modules
    str += "  modules: {" + br;

    Object.keys(ß.VUEX).forEach(function(key) {
        str += "	" + key + "," + br;
    });

    str += "	}" + br;
    str += "})" + br;

    ß.fs.ensureDirSync(ß.VAR + "/vue/src/boilerplate");
    ß.fs.writeFileSync(ß.VAR + "/vue/src/boilerplate/store.js", str);
};
