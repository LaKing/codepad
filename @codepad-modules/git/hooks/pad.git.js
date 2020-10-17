module.exports = function (path) {
    //if (!ß.projectfiles[path].git)
    ß.lib.git.path_commits(path, function () {
        // emit projectfiles
        // ß.filetree_changed = true;
        // or
        ß.lib.projectfiles.send_files();
    });
};
