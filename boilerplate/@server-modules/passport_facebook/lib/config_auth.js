/*ßoilerplate */

/* @DOC
	The lib function `ß.lib.passport_facebook.config_auth()` loads or sets the appropriate facebook passport config file.
    The settings can be set in `config/passport_facebook.json` or `config/passport_facebook.debug.json`.
    To get passport-facebook to work, there needs to be a facebook app, and the config shall contains the secret-app-ID, the app-secret, and which data fields are required by the app.
    Under the hood, we use [passport-facebook](https://github.com/jaredhanson/passport-facebook).
*/

var config_file = ß.CWD + '/config/passport_facebook.json';
var debug_file = ß.CWD + '/config/passport_facebook.debug.json';

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;


module.exports = function() {
    var configs = {};

    if (fs.existsSync(config_file)) {
        configs = fs.readJsonSync(config_file);
    } else {
        configs = {

            'facebookAuth': {
                'clientID': 'secret-app-ID',
                'clientSecret': 'app-secret',
                'callbackURL': 'https://' + ß.HOSTNAME + '/auth/facebook/callback',
                'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
                'profileFields': ['id', 'email', 'name']
            }

        };

        fs.writeJsonSync(config_file, configs);
    }

    return configs;
};
