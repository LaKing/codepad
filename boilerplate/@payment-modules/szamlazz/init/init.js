/*ßoilerplate */


var config_file = ß.CWD + '/config/szamlazz.json';
var debug_file = ß.CWD + '/config/szamlazz.debug.json';

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;

var config = {};

if (fs.existsSync(config_file)) {
    config = fs.readJsonSync(config_file);
} else {

    config = {};

    config.client = {
        user: 'user@example.com',
        password: '123456',
        eInvoice: false, // create e-invoice. optional, default: false 
        passpharase: '', // passpharase for e-invoice. optional 
        requestInvoiceDownload: true, // downloads the issued pdf invoice. optional, default: false 
        downloadedInvoiceCount: 1, // optional, default: 1 
        responseVersion: 1 // optional, default: 1 
    };

    config.seller = { // everyting is optional 
        bank: {
            name: 'Test Bank <name>',
            accountNumber: '11111111-11111111-11111111',
        },
        email: {
            replyToAddress: 'info@' + ß.HOSTNAME,
            subject: 'Invocie email subject',
            message: 'This is an email message',
        },
        issuerName: ''
    };

    fs.writeJsonSync(config_file, config);
}

if (!config.save_path) config.save_path = ß.CWD + "/invoice";
if (config.save_path) ß.fs.ensureDirSync(config.save_path);

ß.szamlazz_config = config;
