/*jshint esnext: true */

//////////////////////////////////////////////////////////////////////////////////////////

const fs = ß.fs;

// @DOC Hooks are similar to lib-functions, however, multiple hooks from multiple modules are called when calling ß.run_hook or ß.run_hooks
// @DOC Hooks are defined with module.exports = function(arguments) within js files with the naming schema /hooks/hookname.functionname.js
// @DOC The hookname is the reference for the call, the functionname should be a descriptive custom name, programatically unused.
// @DOC As always, hooks definied within the project-modules take precedence over @boilerplate-modules. Hooks may have multiple arguments.


var log = '';
const logfile = ß.VAR + '/debug/hooks.log';

function reg(msg) {
    //ß.debug(msg);
    log += msg + '\n';
}

// bmf is the boilerplate-modules folder we are processing now
function load_module_hooks(module, dir, that) {
    // that is the object that has keys representing the file, and value representing the path
    let folder = dir + '/hooks';
    if (fs.existsSync(folder)) {
        let path = fs.realpathSync(folder);
        if (fs.lstatSync(path).isDirectory()) {
            let files = fs.readdirSync(path);
            for (let i = 0; i < files.length; i++) {
                if (files[i].split('.').reverse()[0] === 'js') {
                    let file = files[i];
                    if (!that[file]) that[file] = path + '/' + files[i];
                }
            }
        }
    }
}


if (!ß.load_hooks)
    ß.load_hooks = function() {
        if (!ß.hooks) ß.hooks = {};
        let that = {};
        for (let module in ß.modules) {
            // priority
            for (let dir in ß.modules[module]) {
                if (ß.modules[module][dir] === true)
                    load_module_hooks(module, dir, that);
            }
        }
        for (let module in ß.modules) {
            // standard
            for (let dir in ß.modules[module]) {
                if (ß.modules[module][dir] === false)
                    load_module_hooks(module, dir, that);
            }
        }
        // that object has values populated, selection complete so do the job now
        for (let me in that) {
            let file = that[me];
            let hook = me.split('.')[0];
            let name = me.split('.')[1];
            if (!ß.hooks[hook]) ß.hooks[hook] = {};
            if (!ß.hooks[hook][name]) ß.hooks[hook][name] = require(file);
            reg(hook + ' ' + name + ' is ' + file);

        }

        fs.writeFileSync(logfile, log);
        console.log('- Load hooks complete');

    };

ß.load_hooks();

if (!ß.run_hook)
    ß.run_hook = function(hook, arg) {
        if (ß.hooks[hook])
            for (var h in ß.hooks[hook]) {
                try {
                    const a = [...arguments].splice(1);
                    ß.hooks[hook][h](...a);
                } catch (error) {
                    Đ(error);
                    throw error;
                }
            }
    };

if (!ß.run_hooks)
    ß.run_hooks = function(hook, arg) {
        const a = [...arguments].splice(1);
        ß.run_hook('pre_' + hook, ...a);
        ß.run_hook(hook, ...a);
        ß.run_hook('post_' + hook, ...a);
    };