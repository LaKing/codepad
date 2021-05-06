/*ßoilerplate */

var config_file = ß.CWD + '/config/payment_braintree.json';
var debug_file = ß.CWD + "/config/payment_braintree.debug.json";

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;

var config = {};

if (fs.existsSync(config_file)) {
    config = fs.readJsonSync(config_file);
} else {

    config.description = "Replace this to some real data";
    config.sandbox = true;
    config.merchantId = "abcdefghijklmnop";
    config.publicKey = "qrstuvwxyz123456789";
    config.privateKey = "qwertzuiopasdfghjklyxcvbnm123456789";

    fs.writeJsonSync(config_file, config);
}

if (config.sandbox) config.environment = ß.braintree.Environment.Sandbox;

ß.braintree_gateway = ß.braintree.connect(config);
