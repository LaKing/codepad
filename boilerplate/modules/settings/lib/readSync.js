/*jshint esnext: true */

const settings_file = ß.CWD + '/config/settings.json';
const fs = ß.fs;

module.exports = function() {
    return fs.readJsonSync(settings_file);
};