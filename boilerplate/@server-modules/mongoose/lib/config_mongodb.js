/*ßoilerplate */

/* @DOC
If there is no config file for mongodb, the first startup will create one automatically.
Seperate debug config - if exists - will be used in debug mode.
The default host is 127.0.0.1
*/

var config_file = ß.CWD + '/config/mongodb.json';
var debug_file = ß.CWD + '/config/mongodb.debug.json';

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;


module.exports = function() {
    var configs = {};

    if (fs.existsSync(config_file)) {
        configs = fs.readJsonSync(config_file);
    } else {
        configs = {
            'url': 'mongodb://127.0.0.1/' + ß.HOSTNAME.split('.')[0]
        };

        fs.writeJsonSync(config_file, configs);
    }

    return configs;
};
