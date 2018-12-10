/*ßoilerplate */

const fs = ß.fs;

const path = require('path');
const moduledir = path.dirname(__dirname);

var privateKey = fs.readFileSync(moduledir + '/cert/localhost.key', 'utf8');
var certificate = fs.readFileSync(moduledir + '/cert/localhost.crt', 'utf8');

// https certificate stuff
if (fs.existsSync(ß.CWD + '/localhost.key') && fs.existsSync(ß.CWD + '/localhost.crt')) {
    console.log("- using certificate from project");
    privateKey = fs.readFileSync(ß.CWD + '/localhost.key', 'utf8');
    certificate = fs.readFileSync(ß.CWD + '/localhost.crt', 'utf8');
}

module.exports = function() {
    return {
        key: privateKey,
        cert: certificate
    };
};