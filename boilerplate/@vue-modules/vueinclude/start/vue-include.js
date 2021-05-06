var v = "";

Object.keys(ß.vue_include_files).forEach(function(key) {
    v += "import '@/vue-include/" + key + "';\n";
});

ß.fs.ensureDirSync(ß.VAR + "/vue/src/boilerplate");
ß.fs.writeFileSync(ß.VAR + "/vue/src/boilerplate/vue-include-files.js", v);
