/*jshint esnext: true */

const fs = ß.fs;

var settings = {};

if (fs.existsSync(ß.settings_file)) {
    settings = fs.readJsonSync(ß.settings_file);
} else {
    settings.admins = ["5a15e5e8cc49250916238ae8"];
    settings.offline = false;
    settings.session_days = 365;

    fs.writeJsonSync(ß.settings_file, settings);
}
