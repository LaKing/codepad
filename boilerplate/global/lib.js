/*jshint esnext: true */

const fs = ß.fs;

if (!ß.lib) ß.lib = {};

// @DOC Each module may have a lib folder with js files, each containing a single exposed function 
// @DOC Such a function should be defined with module.exports = function(arguments)
// @DOC These are then named by their filename and can be referred with ß.lib.modulename.functionname (namespaced with module names) or ß.lib.functionname (lib namespace)
// @DOC lib-function files in @-modules have precedence over other modules, thus if defined with priority, will be overridden.
// @DOC The function-defining js files may contain private local variables and functions, and any number of arguments. 


var log = '';
const logfile = ß.VAR + '/debug/lib.log';

function reg(msg) {
    //ß.debug(msg);
    log += msg + '\n';
}


function get_module_lib(module, dir) {
    if (fs.existsSync(dir + '/lib')) {
        if (!ß.lib[module]) ß.lib[module] = {};
        let path = fs.realpathSync(dir + '/lib');
        if (fs.lstatSync(path).isDirectory()) {
            let files = fs.readdirSync(path);
            for (let i = 0; i < files.length; i++) {
                let name = files[i].split('.')[0];
                if (ß.lib[module][name]) reg("- ß.lib." + module + '.' + name + " already defined. Skipping " + path + '/' + files[i]);
                if (!ß.lib[module][name]) {
                    reg("+ ß.lib." + module + '.' + name + " definition from " + path + '/' + files[i]);
                    ß.lib[module][name] = require(path + '/' + files[i]);
                    if (ß.lib[name]) reg("! ß.lib." + name + " already definded. Cannot add alias ß.lib." + module + '.' + name);
                    if (!ß.lib[name]) {
                        ß.lib[name] = ß.lib[module][name];
                        reg("= ß.lib." + name + " added as alias to ß.lib-namespace from ß.lib." + module + '.' + name);
                    }
                }
            }
        }
    }
}


ß.init_modules_lib = function(modules) {
    for (let module in modules) {
        // priority
        for (let dir in modules[module]) {
            if (modules[module][dir] === true)
                get_module_lib(module, dir);
        }
    }
    for (let module in modules) {
        // standard
        for (let dir in modules[module]) {
            if (modules[module][dir] === false)
                get_module_lib(module, dir);
        }
    }
    fs.writeFileSync(logfile, log);
    console.log('- ß.lib updated');
};

ß.init_modules_lib(ß.modules);