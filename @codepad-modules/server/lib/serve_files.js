/*jshint esnext: true */

const fs = ß.fs;
const lib = ß.lib;

var log = '';
const logfile = ß.VAR + '/debug/serve_files.log';

function reg(msg) {
    //ß.debug(msg);
    log += msg + '\n';
}

// we use this special server for the language-specific rendered files.
function add_handler(folder, file) {

    reg(file + ' -> ' + folder + '/' + file);
    ß.app.get('/' + file, function(req, res) {
        fs.readFile(folder + '/' + file, 'utf8', function(err, data) {
            if (err) {
                console.log('ERROR could not serve', folder, file);
                res.send('ERROR');
                return;
            }

            // send the data, and apply some Cashe-control in production to these statically localized files
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Content-Type', req.is('*/*'));

            res.send(data);

        });
    });
}

function use_files_folder(folder) {
    if (!fs.existsSync(folder)) return;
    var files = fs.readdirSync(folder);

    files.forEach(function(file) {
        add_handler(folder, file);
    });
}

module.exports = function(folder) {
    for (let module in ß.modules) {
        // priority
        for (let dir in ß.modules[module]) {
            if (ß.modules[module][dir] === true)
                use_files_folder(dir + '/' + folder);
        }
        // standard
        for (let dir in ß.modules[module]) {
            if (ß.modules[module][dir] === false)
                use_files_folder(dir + '/' + folder);
        }
    }
    fs.writeFileSync(logfile, log);
    console.log('- serve files: ' + folder);
};