// note, files imported from google drive for example may have no extension.

/* @DOC
At the project boot process the var/vue-include folder is processed, txt, html, csv files are pre-processed.
*/

module.exports = function(base_path) {
  
    // As a first step we create a var/vue-include folder, where next to the linked original files, we also create some preprocessed files if necessery
    function add(file_path) {
        var file_mime = ß.lib.mime.detect(base_path + file_path);
        if (file_mime === "text/html") ß.lib.vueinclude.html(base_path, file_path);
        if (file_mime === "text/plain") ß.lib.vueinclude.txt(base_path, file_path);
        if (ß.path.parse(file_path).ext === ".vue") ß.lib.vueinclude.vue(base_path, file_path);
        
        ß.link(base_path + file_path, ß.VAR + "/vue-include/" + file_path);
        
    }

    ß.fs.traverse_path_process_files(base_path, add);

    // In the second step we link all these files in the vue/src folder - as it would be a module
    function link(file_path) {
        if (ß.path.parse(file_path).ext === ".vue") ß.link(ß.VAR + "/vue-include/" + file_path, ß.VAR + "/vue/src/vue-include/" + file_path);
    }

    ß.fs.traverse_path_process_files(ß.VAR + "/vue-include/", link);
  
  	// in the third step we will register all our dynamic components so that we can regference them for webpack in advance.
    function register(file_path) {
       if (ß.path.parse(file_path).ext === ".vue") ß.vue_include_files[file_path] = true;
    }

    ß.fs.traverse_path_process_files(ß.VAR + "/vue/src/vue-include/", register);
  
};
