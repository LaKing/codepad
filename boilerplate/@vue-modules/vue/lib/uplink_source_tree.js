// @DOC The vue source tree contains symlinks to the real files of the project - based on the modules used.

const fs = ß.fs;
const destination = ß.VAR + "/vue";

function link_node_modules(module, module_dir) {
    const path = module_dir + "/node_modules";
    const dest = destination + "/node_modules";
    fs.inDirsSync(path, function (npd) {
        // process the node package directory
        if (npd.charAt(0) !== "@") return ß.link(path + "/" + npd, dest + "/" + npd);
        // process node module collections
        fs.inDirsSync(path + "/" + npd, function (np) {
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
    const path = module_dir + "/vue";
    const dest = destination + "/src";

    ß.fs.traverse_path_process_files(path, function (file_path) {
        let base = path;
        if (path.substring(0, ß.CWD.length) === ß.CWD) base = path.substring(ß.CWD.length);
        if (ß.link(path + file_path, dest + file_path)) ß.VUE_FILES[file_path] = base;
    });
}

module.exports = function () {
    ß.debug("- Uplink vue source tree");
    // @DOC Based on `ß.vue_modules` we create a subset of node modules for vue
    ß.modules_process(ß.vue_modules, link_node_modules);

    // @DOC The `src` folder is actually a unified version of all vue folders
    ß.modules_process(ß.vue_modules, link_vue_priority);
    ß.modules_process(ß.vue_modules, link_vue_standard);
};
