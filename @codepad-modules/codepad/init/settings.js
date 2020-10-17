if (ß.settings) return;

var settings_file = ß.CWD + "/settings.json";
var debug_file = ß.CWD + "/settings.debug.json";

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) settings_file = debug_file;

var settings = {};

if (fs.existsSync(settings_file)) {
    settings = fs.readJsonSync(settings_file);
} else {
    // place eventual defaults here to be created automatically
    fs.writeJsonSync(settings_file, settings);
}

ß.settings = settings;
ß.settings_file = settings_file;
