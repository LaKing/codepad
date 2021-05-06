/*ßoilerplate */

/* @DOC
	The lib function `ß.lib.passport_google.config_auth()` loads or sets the appropriate google passport file.
    The settings can be set in `/config/passport_google.json` or in `/config/passport_google.debug.json`.
    To get passport-google to work, you should have a clientID, clientSecret and the callbackURL. These can be obtained from [Google Developers Console](https://console.developers.google.com/). 
    We use [passport-google-oauth](https://github.com/jaredhanson/passport-google-oauth).
*/

var config_file = ß.CWD + "/config/passport_google.json";
var debug_file = ß.CWD + "/config/passport_google.debug.json";

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;

module.exports = function() {
    var configs = {};

    if (fs.existsSync(config_file)) {
        configs = fs.readJsonSync(config_file);
    } else {
        configs = {
            googleAuth: {
                clientID: "your-secret-clientID-here",
                clientSecret: "your-client-secret-here",
                callbackURL: "https://" + ß.HOSTNAME + "/auth/google/callback"
            }
        };

        fs.writeJsonSync(config_file, configs);
    }

    return configs;
};
