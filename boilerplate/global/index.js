/*jshint esnext: true */

// @DOC ## ßoilerplate/global/index.js
// @DOC Here we define the ß global variable
// @DOC You can use your project in DEBUG mode instead of production mode
// @DOC ß.CWD stands for the Current Work Directory and ß.BPD is the Boilerplate Directory

// @DOC ## THE ß-variable
// @DOC This is the primary global variable, visible in the global scope. 
// @DOC Frequently used node_modules can be attached directly.
// @DOC for example ß.fs is reference to the fs-extra
if (!global.ß) global.ß = {};


if (!ß.cli_commands) ß.cli_commands = [];
if (!ß.DEBUG) {
    ß.DEBUG = false;
    if (process.argv[2]) {
        ß.DEBUG = true;
        console.log('- ß.DEBUG true');
    }
}
// constants
// current working directory
if (!ß.CWD) ß.CWD = process.cwd();
// boilerplate directory
if (!ß.BPD) ß.BPD = ß.CWD + '/boilerplate';
// linux var folder for the boilerplate
if (!ß.VAR) ß.VAR = '/var/codepad';
// Global node modules directory
if (!ß.GND) ß.GND = process.config.variables.node_prefix + "/lib/node/node_modules/";
if (!ß.HOSTNAME) ß.HOSTNAME = require('os').hostname();
// Modules Root Directory

// Modules root directory is boilerplate for codepad modules
if (!ß.MRD) ß.MRD = ß.CWD;
if (!ß.pidfile) ß.pidfile = "/var/codepad/codepad.pid";

require("./node_modules.js");
require("./now.js");
require("./pid.js");

require("./lablib.js");
require("./codepad.js");
require("./process.js");

require("./modules.js");
require("./bp.js");
require("./load.js");

ß.load('global');

require("./lib.js");
require("./hook.js");


//ß.init_modules_libs(ß.modules);

//require("./user_model.js");

if (ß) console.log("- ß has", Object.keys(ß).length, 'keys defined');
else console.log("! ß is undefined");