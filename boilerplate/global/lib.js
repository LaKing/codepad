/*jshint esnext: true */

const fs = require('fs-extra');

if (!ß.lib) ß.lib = {};

// @DOC Each module may have a lib folder with js files, each containing a single exposed function 
// @DOC Such a function should be defined with module.exports = function(arguments)
// @DOC These are then named by their filename and can be referred with ß.lib.modulename.functionname (namespaced with module names) or ß.lib.functionname (lib namespace)
// @DOC lib-function files in modules have precedence over boilerplate modules, thus if defined, wll be overridden.
// @DOC The function-defining js files may contain private local variables and functions, and any number of arguments. 

function get_module_libs(m) {

    ß.lib[m] = {};

    var p = '/modules/' + m + '/lib';

    var cpfiles = [];
    if (fs.existsSync(ß.CWD + p)) cpfiles = fs.readdirSync(ß.CWD + p);

    var bpfiles = [];
    if (fs.existsSync(ß.BPD + p)) bpfiles = fs.readdirSync(ß.BPD + p);

    var files = [...new Set([...cpfiles, ...bpfiles])];

    for (var i = 0; i < files.length; i++) {
        var name = files[i].split('.')[0];
        if (cpfiles.indexOf(files[i]) >= 0) {
            var cpfn = require(ß.CWD + p + '/' + files[i]);
            ß.lib[m][name] = cpfn;
            if (ß.lib[name]) console.log("--- developer-warning Can not add multiple project-lib-function name to ß.lib-namespace: ", name);
            else ß.lib[name] = cpfn;
        } else
        if (bpfiles.indexOf(files[i]) >= 0) {
            var bpfn = require(ß.BPD + p + '/' + files[i]);
            ß.lib[m][name] = bpfn;
            if (ß.lib[name]) console.log("--- developer-warning Can not add multiple boilerplate-lib-function name to ß.lib-namespace: ", name);
            else ß.lib[name] = bpfn;
        }
    }

}

ß.init_modules_libs = function(modules) {
    for (var i = 0; i < modules.length; i++) {
        get_module_libs(modules[i]);
    }
};