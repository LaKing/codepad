// watch triggered folder add

module.exports = function (path) {
    if (path === "") return;

    path = "/" + path;

    console.log("unlink_dir", path);

    delete ß.projectfiles[path];
    ß.projectfiles_changed = true;
    //ß.lib.projectfiles.send();
};
