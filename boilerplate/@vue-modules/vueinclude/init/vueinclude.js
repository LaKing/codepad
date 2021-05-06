ß.vue_include_files = {};
// reset the var/vue-include folder
ß.fs.removeSync(ß.VAR + "/vue-include");

// if there is a clouddir module providing external data, uplink it for vue so we can use it with vue-includes.
if (ß.CLOUDDIR_PATH) ß.lib.vueinclude.build(ß.CLOUDDIR_PATH);