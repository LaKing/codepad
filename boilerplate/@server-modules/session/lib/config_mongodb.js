/*ßoilerplate */

var config_file = ß.CWD + '/config/connect-mongodb-session.json';
var debug_file = ß.CWD + '/config/connect-mongodb-session.debug.json';

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;

module.exports = function() {
    var configs = {};

    if (fs.existsSync(config_file)) {
        configs = fs.readJsonSync(config_file);
    } else {
        configs = {
            'uri': 'mongodb://localhost/connect_mongodb_session',
            'databaseName': 'connect_mongodb_session',
            'collection': 'sessions'
        };

        fs.writeJsonSync(config_file, configs);
    }

    return configs;
};
