/*ßoilerplate */

/*
http://simplepartner.hu/download.php?target=sdk
http://simplepartner.hu/download.php?target=detailshu
http://simplepartner.hu/download.php?target=dochu
https://sandbox.simplepay.hu/admin
*/

/*ßoilerplate */

var config_file = ß.CWD + "/config/simplepay.json";
var debug_file = ß.CWD + "/config/simplepay.debug.json";

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;

var config = {};

if (fs.existsSync(config_file)) {
    config = fs.readJsonSync(config_file);
} else {
    // non-essential, but descriptive
    config.description = "Replace this to some real data";

    // essentgial parameters
    config.secretKey = "The-secret-key-from-simplepay";
    config.merchant = "S1234567";

    fs.writeJsonSync(config_file, config);
}

ß.simplepay_config = config;
