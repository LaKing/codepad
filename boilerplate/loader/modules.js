/*ßoilerplate */

const fs = ß.fs;
/* @DOC 

## ßoilerplate/global/modules.js
   `ß.modules` contains all the modules that we use
	Via `USE_MODULENAME = false`, we can de-activate modules, and/or query if the module is used.
    However, it is rather recommended to create module sets, that means folders containing modules (or symlinks to modules).
*/

if (!ß.modules) ß.modules = {};

// @DOC `CWD` itself is a primary module with priority.
var curr = ß.CWD.split("/").pop();
if (!ß.modules[curr]) ß.modules[curr] = {};
ß.modules[curr][ß.CWD] = true;

function use_name(str) {
    return (
        "USE_" +
        str
            .split("/")
            .pop()
            .toUpperCase()
            .replace(/@/g, "")
            .replace(/-/g, "_")
            .replace(/\./g, "_")
    );
}

function process(dir, p) {
    if (!fs.isDirSync(dir)) return;

    let USE_MODULES = use_name(dir);
    if (ß[USE_MODULES] === false) return;
    ß[USE_MODULES] = true;

    let modules = ß.modules;
    let that = fs.readdirSync(dir);
    for (let m in that) {
        let module = that[m];
        let USE_MODULE = use_name(module);
        if (ß[USE_MODULE] === false) console.log(USE_MODULE + " === false");
        else {
            let path = dir + "/" + module;
            if (fs.isDirSync(path)) {
                let condition_file = path + "/module-condition.js";
                if (fs.existsSync(condition_file)) if (require(condition_file)() !== true) continue;

                if (!modules[module]) modules[module] = {};
                modules[module][path] = p;

                ß[USE_MODULE] = true;
            }
        }
    }
}

function is_modulefolder(name) {
  return name.indexOf("-modules") >= 0 || name === "modules";
}

// @DOC `ß.load_modules(modules_root)` will load all modules located in that directory. loaded modules will be added to 'ß.modules' and processed at all further steps of the boilerplate-loader
// construct the modules object
if (!ß.load_modules)
    ß.load_modules = function(modules_root) {
        if (!fs.isDirSync(modules_root)) return ß.error('ß.load_modules(' + modules_root + ") is not a directory!");
        // var modules = ß.modules;
        // process modules in CWD
        var cwd = fs.readdirSync(modules_root);

        /* @DOC 
        	Module folders either have priority or not. If there is no @ character prefixing the directory, it has priority, therefore 'factory' libs should be prefixed with @ and can be symlinks.
            Module folders are are `modules` or folders that end with `*-modules`.
		*/

        // first of all search for non-@ modules
        for (let f in cwd) {
            let e = modules_root + "/" + cwd[f];
            if (!fs.existsSync(e)) continue;
            let d = cwd[f];
            if (is_modulefolder(d)) {
                // process them with priority
                if (d[0] !== "@") process(e, true);
            }
        }

        // then search for boilerplate @-modules.
        for (let f in cwd) {
            let e = modules_root + "/" + cwd[f];
            if (!fs.existsSync(e)) continue;
            let d = cwd[f];
            if (is_modulefolder(d)) {
                // process them without priority
                if (d[0] === "@") process(e, false);
            }
        }
    };

// @DOC the `ß.debug_modules()` function will write two files, so that the loaded modules can be debugged.
if (!ß.debug_modules)
    ß.debug_modules = function() {
        var debug_file = ß.VAR + "/debug/modules.json";
        fs.writeFileSync(debug_file, JSON.stringify(ß.modules, null, 4));
        ß.fs.chownSync(debug_file, ß.UID, ß.GID);

        // we also create a module list file
        var data_file = ß.VAR + "/" + ß.NAME + ".modules.json";
        var data = {};
        for (let m in ß.modules) {
            for (let d in ß.modules[m]) {
                if (d !== ß.CWD) {
                    let pa = d.split("/");
                    pa.pop();
                    let dir = pa.pop();
                    if (!data[dir]) data[dir] = {};
                    data[dir][m] = true;
                }
            }
        }
        // in the result json, keys are folders, and the arrays contains the list of modules from that directory
        var result = {};
        for (let i in data) {
            result[i] = Object.keys(data[i]).sort();
        }

        fs.writeFileSync(data_file, JSON.stringify(result, null, 4));
        ß.fs.chownSync(data_file, ß.UID, ß.GID);

        ß.debug("- " + Object.keys(ß.modules).length + " modules, debug:", debug_file);
    };

// `ß.get_module_path()` path from any file of the main boilerplate module system `ß.modules`. Honors priority modules, so works with the loader mechanism.
if (!ß.get_module_path)
    ß.get_module_path = function(module, path) {
        // get file or folder if requested in second argument
        if (!path) path = "";

        for (let me in ß.modules[module]) {
            if (ß.modules[module][me]) if (fs.existsSync(me + "/" + path)) return me + "/" + path;
        }
        for (let me in ß.modules[module]) {
            if (!ß.modules[module][me]) if (fs.existsSync(me + "/" + path)) return me + "/" + path;
        }
        return undefined;
    };

if (!ß.get_modulefolder_name)
    ß.get_modulefolder_name = function(path) {
		let name = ß.path.basename(ß.path.dirname(path));
      	if (is_modulefolder(name)) return name;
        return undefined;
    };

/* 
	@DOC resolve the path for a npm node_module with `ß.resolve_node_module_path(node_module [,paths])`
	While processing all arguments will be joined together and appended to the `node_module` we are looking for.
*/

if (!ß.resolve_node_module_path)
    ß.resolve_node_module_path = function(node_module, path) {
        // there shoule be at least an argument, otherwise the function is not called the right way
        // if (!node_module) return Đ();

        // first of all determinate the caller file .. this should be equale to the realpath of the file calling this function.
        const from = getCallerFile();

        // then create an array similar to require.resolve.paths
        var fa = from.split("/");
        // remove the filename
        fa.pop();

        // this will be our result array
        var ra = [];

        // this will give us the array, without the root that we wont need anyway
        for (let i = 1; i < fa.length; i++) {
            ra.push(fa.slice(0, 1 + i).join("/") + "/node_modules");
        }

        // the resolve paths is also an array
        var rp = require.resolve.paths("fs-extra");

        // that we will now join together in an array of unique elements
        var joint = [...new Set([...ra.reverse(), ...rp])];

        // also, we will join together all arguments to have a relative path
        var relativepath = "/" + [...arguments].join("/");

        // now we can iterate through that array to find an existing absolute path
        for (let i = 0; i < joint.length; i++) {
            // once we have an existing path, we are done
            if (fs.existsSync(joint[i] + relativepath)) return joint[i] + relativepath;
        }

        // we didnt find any
        ß.error("ERROR get_node_module_path could not resolve **/node_modules" + relativepath);
        return undefined;
    };

// return the full path of a caller
function getCallerFile() {
    var originalFunc = Error.prepareStackTrace;

    var callerfile;
    try {
        var err = new Error();
        var currentfile;

        Error.prepareStackTrace = function(err, stack) {
            return stack;
        };

        currentfile = err.stack.shift().getFileName();

        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();

            if (currentfile !== callerfile) break;
        }
    } catch (e) {}

    Error.prepareStackTrace = originalFunc;

    return callerfile;
}
