// @DOC The vue source tree contains symlinks to the real files of the project - based on the modules used.

const fs = ß.fs;
const destination = ß.VAR + "/vue";

function link_node_modules(module, module_dir) {
    const path = module_dir + "/node_modules";
    const dest = destination + "/node_modules";
    fs.inDirsSync(path, function(npd) {
        // process the node package directory
        if (npd.charAt(0) !== "@") return ß.link(path + "/" + npd, dest + "/" + npd);
        // process node module collections
        fs.inDirsSync(path + "/" + npd, function(np) {
            return ß.link(path + "/" + npd + "/" + np, dest + "/" + npd + "/" + np);
        });
    });
}

function link_vue_priority(module, module_dir, priority) {
    if (priority) link_vue(module, module_dir, priority);
}

function link_vue_standard(module, module_dir, priority) {
    if (!priority) link_vue(module, module_dir, priority);
}

function link_vue(module, module_dir, priority) {
    // use vuex files
  	const path = module_dir + "/vuex";
	// to link to a vuex destination     
    const dest = destination + "/src/vuex";
  	ß.fs.mkdirpSync(dest);

    ß.fs.traverse_path_process_files(path, function(file_path) {
      
        let base = path;
        if (path.substring(0, ß.CWD.length) === ß.CWD) base = path.substring(ß.CWD.length);
        if (ß.link(path + file_path, dest + file_path)) ß.VUE_FILES[file_path] = base;
      
        ß.link(path + file_path, dest + file_path);
      	
      	let vuex_file = file_path.substring(1);
      	let vuex_module = vuex_file.split('.')[0];	
      
      	ß.VUEX[vuex_module] = "@/vuex/" + vuex_file;
    });
}

module.exports = function() {
    ß.debug("- Uplink vuex source tree");
    // @DOC Based on `ß.vuex_modules` we create a subset of node modules for vue
    ß.modules_process(ß.vuex_modules, link_node_modules);

    // @DOC The `src` folder is actually a unified version of all vue folders
    ß.modules_process(ß.vuex_modules, link_vue_priority);
    ß.modules_process(ß.vuex_modules, link_vue_standard);
};
