/*jshint esnext: true */

const fs = ß.fs;

var log = '';
const logfile = ß.VAR + '/debug/serve_static.log';

function reg(msg) {
    //ß.debug(msg);
    log += msg + '\n';
}

function use_static_folder(dir) {
    if (!fs.existsSync(dir)) return;
    ß.app.use(ß.express.static(dir, ß.static_options));
    reg(dir);
}

module.exports = function(folder) {

    for (let module in ß.modules) {
        // priority
        for (let dir in ß.modules[module]) {
            if (ß.modules[module][dir] === true)
                use_static_folder(dir + '/' + folder);
        }
        // standard
        for (let dir in ß.modules[module]) {
            if (ß.modules[module][dir] === false)
                use_static_folder(dir + '/' + folder);
        }
    }

    fs.writeFileSync(logfile, log);
    console.log('- serve static: ' + folder);

};