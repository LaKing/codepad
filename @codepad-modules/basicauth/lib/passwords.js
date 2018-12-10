/*ßoilerplate */

var config_file = 'codepad-passwords.json';
var debug_file = 'codepad-passwords.debug.json';

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;

module.exports = function() {
    var configs = {};

    if (fs.existsSync(config_file)) {
        configs = fs.readJsonSync(config_file);
    } else {
        var pass= Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
        configs = { "guest": pass };

        fs.writeJsonSync(config_file, configs);
    }

    return configs;
};
