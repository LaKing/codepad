/*jshint esnext: true */

//////////////////////////////////////////////////////////////////////////////////////////

const fs = ß.fs;

// @DOC Hooks are similar to lib-functions, however, multiple hooks from multiple modules are called when calling ß.run_hooks
// @DOC Hooks are defined with module.exports = function(arguments) within js files with the naming schema /hooks/hookname.functionname.js
// @DOC The hookname is the reference for the call, the functionname should be a descriptive custom name.
// @DOC As always, hooks definied within the project modules take precedence over boilerplate modules. Hooks may have multiple arguments.

// we need to process the sourcefile directory
function get_hookfiles_array(base) {

    var files = [];

    if (fs.existsSync(base + '/hooks')) files = fs.readdirSync(base + '/hooks');

    for (let m = 0; m < ß.modules.length; m++) {
        var mfiles = [];
        var path = base + '/modules/' + ß.modules[m] + '/hooks';
        if (fs.existsSync(path)) mfiles = fs.readdirSync(path);
        files = [...new Set([...files, ...mfiles])];
    }

    return files;
}

function find_hook_file_path(file) {

    if (fs.existsSync(ß.CWD + '/hooks/' + file)) return ß.CWD + '/hooks/' + file;
    for (let m = 0; m < ß.modules.length; m++) {
        if (fs.existsSync(ß.CWD + '/modules/' + ß.modules[m] + '/hooks/' + file)) return ß.CWD + '/modules/' + ß.modules[m] + '/hooks/' + file;
    }
    if (fs.existsSync(ß.BPD + '/hooks/' + file)) return ß.BPD + '/hooks/' + file;
    for (let m = 0; m < ß.modules.length; m++) {
        if (fs.existsSync(ß.BPD + '/modules/' + ß.modules[m] + '/hooks/' + file)) return ß.BPD + '/modules/' + ß.modules[m] + '/hooks/' + file;
    }
    return '/tmp/point-of-no-return';
}


var cpfiles = get_hookfiles_array(ß.CWD);
var bpfiles = get_hookfiles_array(ß.BPD);
var files = [...new Set([...cpfiles, ...bpfiles])];

for (let i = 0; i < files.length; i++) {
    let hook = files[i].split('.')[0];
    let name = files[i].split('.')[1];
    let file = find_hook_file_path(files[i]);
    if (!ß.hooks) ß.hooks = {};
    if (!ß.hooks[hook]) ß.hooks[hook] = {};
    if (!ß.hooks[hook][name]) ß.hooks[hook][name] = require(file);

}


ß.run_hook = function(hook, arg) {
    const a = [...arguments].splice(1);
    if (ß.hooks[hook])
        for (var h in ß.hooks[hook]) {
            try {
                ß.hooks[hook][h](...a);
            } catch (error) {
                Đ(error);
                throw error;
            }
        }
};

ß.run_hooks = function(hook, arg) {
    const a = [...arguments].splice(1);
    ß.run_hook('pre_' + hook, ...a);
    ß.run_hook(hook, ...a);
    ß.run_hook('post_' + hook, ...a);
};
