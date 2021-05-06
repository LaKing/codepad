/*ßoilerplate */

var config_file = ß.CWD + '/config/payment_barion.json';
var debug_file = ß.CWD + '/config/payment_barion.debug.json';

const fs = ß.fs;


var config = {};

if (fs.existsSync(config_file)) {
    config = fs.readJsonSync(config_file);
} else {

    config.POSKey = "qwertzuiopasdfghjklyxcvbnm123456789";
    config.payee = "payee@example.com";
    config.test = false;

    fs.writeJsonSync(config_file, config);
}

if (ß.DEBUG) {
    if (fs.existsSync(debug_file)) {
        config = fs.readJsonSync(debug_file);
    } else {

        config.POSKey = "qwertzuiopasdfghjklyxcvbnm123456789";
        config.payee = "payee@example.com";
        config.test = true;

        fs.writeJsonSync(debug_file, config);
    }
}

ß.barion_config = config;

if (config.test) console.log("- BARION-TEST mode detected in configs. Use cards: 4444 8888 8888 5559, 2/20, 200 | 4444 8888 8888 4446");

if (config.test) ß.barion = new(require('barion-nodejs'))("BarionTest");
else ß.barion = new(require('barion-nodejs'))("BarionProd");