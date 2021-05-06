/*ßoilerplate */

var config_file = ß.CWD + '/config/language.json';
var debug_file = ß.CWD + '/config/language.debug.json';

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;

var configs = {};

if (fs.existsSync(config_file)) {
    configs = fs.readJsonSync(config_file);
} else {
    configs = {};

    configs.list = ['en', 'hu'];
    configs.default = 'en';
    // should be two characters
    configs.CHUNK_SEPERATOR = '##';
    // shoule be one character
    configs.LANGUAGE_PREFIX = '&';

    fs.writeJsonSync(config_file, configs);
    ß.debug('wrote ' + config_file);
}

if (!ß.language) ß.language = configs;
