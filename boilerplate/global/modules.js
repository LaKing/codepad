/*jshint esnext: true */

const fs = require('fs-extra');

function get_modules() {

    var bpmodules = [];
    if (fs.existsSync(ß.BPD + '/modules')) bpmodules = fs.readdirSync(ß.BPD + '/modules');

    var cpmodules = [];
    if (fs.existsSync(ß.CWD + '/modules')) cpmodules = fs.readdirSync(ß.CWD + '/modules');

    return [...new Set([...bpmodules, ...cpmodules])];
}

var config_file = ß.CWD + '/config/active-modules.json';
var debug_file = ß.CWD + '/config/active-modules.debug.json';

if (ß.DEBUG) config_file = debug_file;


var blacklist_file = ß.CWD + '/config/blacklist-modules.json';
var blacklist_debug_file = ß.CWD + '/config/blacklist-modules.debug.json';

if (ß.DEBUG && fs.existsSync(blacklist_debug_file)) blacklist_file = blacklist_debug_file;

var blacklist = [];

fs.mkdirp(ß.CWD + '/config');

ß.modules = get_modules();

if (fs.existsSync(blacklist_file)) {
    blacklist = fs.readJsonSync(blacklist_file);
} else {
    fs.writeJsonSync(blacklist_file, blacklist);
}

// remove files listed in the blacklist array
const modules_set = new Set(ß.modules);
const blacklist_set = new Set(blacklist);
const difference = new Set([...modules_set].filter((x) => !blacklist_set.has(x)));
ß.modules = Array.from(difference);

for (let i = 0; i < ß.modules.length; i++) {
    let condition_file = ß.BPD + '/modules/' + ß.modules[i] + '/module-condition.js';
    if (fs.existsSync(condition_file))
        if (require(condition_file)() !== true) ß.modules.splice(i, 1);
}

for (let i = 0; i < ß.modules.length; i++) ß["USE_" + ß.modules[i].toUpperCase()] = true;
//for (let i = 0; i < ß.modules.length; i++) console.log("- USE_" + ß.modules[i].toUpperCase());

console.log("- wrote active modules to", config_file);
fs.writeJsonSync(config_file, ß.modules);


////////////////////////////////////////CLI/////////////////////////////////////////////////

ß.cli_commands.push('blacklist MODULE');
if (ß.CMD === 'blacklist') {
    if (ß.fs.existsSync(ß.BPD + "/modules/" + ß.ARG) || ß.fs.existsSync(ß.CWD + "/modules/" + ß.ARG)) {
        blacklist.push(ß.ARG.toLowerCase());
        fs.writeJsonSync(blacklist_file, blacklist);
        ß.msg('OK');
        process.exit();
    }
}

ß.cli_commands.push('whitelist MODULE');
if (ß.CMD === 'whitelist') {
    if (ß.fs.existsSync(ß.BPD + "/modules/" + ß.ARG) || ß.fs.existsSync(ß.CWD + "/modules/" + ß.ARG)) {
        blacklist.splice(blacklist.indexOf(ß.ARG.toLowerCase()), 1);
        fs.writeJsonSync(blacklist_file, blacklist);
        ß.msg('OK');
        process.exit();
    }
}


//console.log("ß.modules:", ß.modules);
