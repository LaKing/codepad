/*jshint esnext: true */

var config_file = ß.CWD + '/config/sessions-mongodb.json';
var debug_file = ß.CWD + '/config/sessions-mongodb.debug.json';

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;

module.exports = function() {
    var configs = {};

    if (fs.existsSync(config_file)) {
        configs = fs.readJsonSync(config_file);
    } else {
        configs = {
            'url': 'mongodb://localhost/codepadsessions'
        };

        fs.writeJsonSync(config_file, configs);
    }

    return configs;
};
