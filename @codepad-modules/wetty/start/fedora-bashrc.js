const homedir = require("os").homedir();
const bashrc_dir = ß.get_module_path("wetty", "bashrc");

function bashrc_config(file) {
    if (!ß.fs.existsSync(homedir + '/' + file)) {
        ß.fs.copy(bashrc_dir + '/'+ file, homedir + '/'+ file, đ);
    }
}

ß.fs.inFilesSync(bashrc_dir, bashrc_config);