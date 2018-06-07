/*jshint esnext: true */

// @DOC ## THE ß-variable
// @DOC This is the primary global variable, visible in the global scope. 
// @DOC Frequently used node_modules can be attached directly.
// @DOC for example ß.fs is reference to the fs-extra

// BOILERPLATE FRAMEWORK INITIALIZATION
const fs = require('fs-extra');

// functions

// get a path from any file. If present in the project, use that, otherwise use the one from the boilerplate 
if (!ß.get_path) ß.get_path = function(f) {
    // get file or folder
    if (fs.existsSync(ß.CWD + '/' + f)) return ß.CWD + '/' + f;
    else return ß.BPD + '/' + f;
};

// get a path from any file. If present in the project, use that, otherwise use the one from the boilerplate 
if (!ß.view) ß.views = function(req, file) {
    var lang = ß.lib.language.get_by_req(req);
    return ß.CWD + '/local/' + lang + '/' + file;
};

if (!ß.local) ß.local = function(lang, file) {
    return ß.CWD + '/local/' + lang + '/' + file;
};

// require - however, this wont work with calling arguments
if (!ß.require) ß.require = function(module_path) {
    if (fs.existsSync(ß.CWD + '/' + module_path)) require(ß.CWD + '/' + path);
    else require(ß.BPD + '/' + module_path);
};

// require everything in a folder - exept the index
if (!ß.acquire) ß.acquire = function(dir) {
    var bpfiles = [];
    if (fs.existsSync(ß.BPD + '/' + dir)) bpfiles = fs.readdirSync(ß.BPD + '/' + dir);

    var cpfiles = [];
    if (fs.existsSync(ß.CWD + '/' + dir)) cpfiles = fs.readdirSync(ß.CWD + '/');

    var files = [...new Set([...bpfiles, ...cpfiles])];

    for (var i = 0; i < files.length; i++) {
        if (files[i] !== 'index.js' && files[i].split('.').reverse()[0] === 'js') {
            if (cpfiles.indexOf(files[i]) >= 0) require(ß.CWD + '/' + dir + '/' + files[i]);
            else
            if (bpfiles.indexOf(files[i]) >= 0) require(ß.BPD + '/' + dir + '/' + files[i]);
        }
    }
};

// It would be safer to use localized versions of variables. ...

// for data-only access
if (!ß.localize) ß.localize = function() {
    return JSON.parse(JSON.stringify(ß));
};

// for data and functions
if (!ß.local) ß.local = function() {
    return Object.assign({}, ß);
};

// to use a local version
//const _ß = ß.local(); // funtions and data
//const _ß = ß.localize(); // data only
