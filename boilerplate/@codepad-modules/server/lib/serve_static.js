/*jshint esnext: true */

const fs = ß.fs;

function use_static_folder(dir) {

    if (fs.existsSync(ß.CWD + '/' + dir))
        ß.app.use(ß.express.static(ß.CWD + '/' + dir));

    if (fs.existsSync(ß.BPD + '/' + dir))
        ß.app.use(ß.express.static(ß.BPD + '/' + dir));

}


module.exports = function(folder) {
    use_static_folder(folder);

    for (let m = 0; m < ß.modules.length; m++) {
        use_static_folder('modules/' + ß.modules[m] + '/' + folder);
    }

};