/*ßoilerplate */

//////////////////////////////////////////////////////////////////////////////////////////

const fs = ß.fs;

/* @DOC 
## Module hooks
Hooks are with the same prefix are called when calling `ß.run_hook`.
Hooks are defined with `module.exports = function(arguments)` within js files with the naming schema `module/hooks/hookname.function-name.js`
The hookname is the reference for the call, the function-name should be a descriptive custom name, programatically not used.
As always, hooks definied within the project-modules take precedence over @*-modules. Hooks may have multiple arguments.

*/

var log = "";
const logfile = ß.BPLOG + "/hooks.log";

function reg(msg) {
    //ß.debug(msg);
    log += msg + "\n";
}

// bmf is the boilerplate-modules folder we are processing now
function load_module_hooks(module, dir, that) {
    // that is the object that has keys representing the file, and value representing the path

    if (ß.DEBUG) if (fs.isDirSync(dir + "/hook")) console.log("WARNING wrong naming, please use " + dir + "/hooks");

    let path = dir + "/hooks";
    if (fs.isDirSync(path)) {
        let files = fs.readdirSync(path);
        for (let i = 0; i < files.length; i++) {
            if (files[i].split(".").pop() === "js") {
                let file = files[i];
                if (!that[file]) that[file] = path + "/" + files[i];
            }
        }
    }
}

if (!ß.load_hooks)
    ß.load_hooks = function(modules) {
        ß.debug("- Load hooks ...");

        if (!ß.hooks) ß.hooks = {};
        let that = {};
        for (let module in modules) {
            // priority
            for (let dir in modules[module]) {
                if (modules[module][dir] === true) load_module_hooks(module, dir, that);
            }
        }
        for (let module in modules) {
            // standard
            for (let dir in modules[module]) {
                if (modules[module][dir] === false) load_module_hooks(module, dir, that);
            }
        }
        // that object has values populated, selection complete so do the job now
        for (let me in that) {
            let file = that[me];
            let hook = me.split(".")[0];
            let name = me.split(".")[1];
            let ext = me.split(".")[2];
            if (!name || !ext || ext !== "js") return console.log("WARNING Hook file naming error. Please look at " + me);
            if (!ß.hooks[hook]) ß.hooks[hook] = {};
            if (!ß.hooks[hook][name]) ß.hooks[hook][name] = require(file);
            reg(hook + " " + name + " is " + file);
        }

        fs.writeFileSync(logfile, log);
        ß.fs.chownSync(logfile, ß.UID, ß.GID);
        //ß.debug('-  Load hooks complete');
    };

if (!ß.run_hook)
    ß.run_hook = function(hook, arg) {
        if (ß.hooks[hook])
            for (var h in ß.hooks[hook]) {
                try {
                    const a = [...arguments].splice(1);
                    if (typeof ß.hooks[hook][h] === "function") ß.hooks[hook][h](...a);
                    else console.log(ß.hooks[hook][h] + " is not a function. Hook:" + hook + " h:" + h);
                } catch (error) {
                    Đ(error);
                    throw error;
                }
            }
    };

// not used anywhere, but I'll keep it for now
if (!ß.run_hooks)
    ß.run_hooks = function(hook, arg) {
        const a = [...arguments].splice(1);
        ß.run_hook("pre_" + hook, ...a);
        ß.run_hook(hook, ...a);
        ß.run_hook("post_" + hook, ...a);
    };
