/*ßoilerplate */

var config_file = ß.CWD + '/config/paypal.json';
var debug_file = ß.CWD + "/config/paypal.debug.json";

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;

var config = {};

if (fs.existsSync(config_file)) {
    config = fs.readJsonSync(config_file);
} else {
  
    config.account = "optional-yourpaypal@yourdomain.com";
  	config.clientid = "mandatory production-client-id";
    config.secret = "optional paypal-secret";

    fs.writeJsonSync(config_file, config);
}

ß.paypal_config = config;
ß.PAYPAL_CLIENTID = config.clientid;

// testing client account

// sb-vzdpx1253361@personal.example.com
// Bv&dl5Gi

// testing merchant

// tester@d250.hu
