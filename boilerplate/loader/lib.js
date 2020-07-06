/*ßoilerplate */

const fs = ß.fs;

if (!ß.lib) ß.lib = {};
if (!ß.alf) ß.alf = {};
if (!ß.lib_path) ß.lib_path = {};
if (!ß.alf_path) ß.alf_path = {};

/* @DOC
## Module libs

Each module may have a `/lib` folder with js files, each file containing a single function automatically exposed on the `ß.lib` namespace. 
Such a function should be defined with `module.exports = function(arguments) {}`
These are then named by their filename and can be referred with `ß.lib.modulename.functionname` (namespaced with module names)
lib-function files in `@-modules` have lower precedence over custom modules, thus if defined with priority, they will be overridden.
The function-defining js files may contain private local variables and functions, and any number of arguments. 

Additionally we have async/await compatible lib functions, that should return a promise. The mosaic word alf means asynchronous liberary function.
These functions may have a callback, and we try our best to convert traditional callback based lib functions to alf functions as well.
`await ß.alf.somemodule.libfunction(params,2,3).then(result => console.log("result:", result)).catch(err => console.log("catch:", err));`
You may also ause the return value with await. `const result = await ß.alf.somemodule.libfunction(params,2,3)`



*/

var log = "";
const logfile = ß.BPLOG + "/lib.log";

function reg(msg) {
    //ß.debug(msg);
    log += msg + "\n";
}

// this is not a proper parser, TODO make it metter.
function has_callback(fn) {
    return (
        fn
            .toString()
            .split("{")[0]
            .split(")")[0]
            .split("(")[1]
            .split(",")
            .pop()
            .trim() === "callback"
    );
}
// async/await compatible lib function wrapper - returns a promise.
function create_alf_function(module, name) {
    ß.alf[module][name] = function() {
      	// the original function
        const fn = ß.lib[module][name];
      	// extracted to a string
        const fstr = fn.toString();
       
      	// if the function clearly has a callback
        if (has_callback(fn)) {
          	// create a promise with the last argument calling callback - the converter
            let a = [...arguments];
            return new Promise((resolve, reject) =>
                fn(...a, function alf_converter(err, result) {
              		// an uncatched error leads to an unresolved promise ... TODO figure out the best solution.
                    if (err) reject(err);
                    let results = [...arguments].splice(1);
              		// if the callback has more then 1 argument
                    if (results.length > 1) {
                        return resolve(results);
                    }
              		// single argument from the converter
                    return resolve(result);
                })
            );
        }
		
      	// no callback
        const result = fn(arguments);

      	// if the function returned a promise, use it directly
        if (result instanceof Promise) return result;

        // otherwise, promisify
        return new Promise(resolve => {
            resolve(result);
        });
    };
}

function get_module_lib(module, dir) {
  	// create the ß namespaces for each module
    if (!ß.lib[module]) ß.lib[module] = {};
    if (!ß.alf[module]) ß.alf[module] = {};
    if (!ß.lib_path[module]) ß.lib_path[module] = {};
    if (!ß.alf_path[module]) ß.alf_path[module] = {};

  	// handle the lib folders first
    let alf_path = dir + "/alf";
    if (fs.isDirSync(alf_path)) {
      	// so first of all read all files
        let files = fs.readdirSync(alf_path);
      	// iterate on all files
        for (const i in files) {
            // the filename will be the part until the first dot
          	let name = files[i].split(".")[0];
          	// if we already have a function on that namespace, then skip it
            if (ß.alf[module][name]) reg("- ß.alf." + module + "." + name + " already defined. Skipping " + alf_path + "/" + files[i]);
            else {
                reg("+ ß.alf." + module + "." + name + " definition from " + alf_path + "/" + files[i]);
                // register the function
              	ß.alf[module][name] = require(alf_path + "/" + files[i]);
                // register the function path
              	ß.alf_path[module][name] = alf_path + "/" + files[i];

            }
        }
    }
  
  	// handle the lib folders
    let lib_path = dir + "/lib";
    if (fs.isDirSync(lib_path)) {
      	// so first of all read all files
        let files = fs.readdirSync(lib_path);
      	// iterate on all files
        for (const i in files) {
            // the filename will be the part until the first dot
          	let name = files[i].split(".")[0];
          	// if we already have a function on that namespace, then skip it
            if (ß.lib[module][name]) reg("- ß.lib." + module + "." + name + " already defined. Skipping " + lib_path + "/" + files[i]);
            else {
                reg("+ ß.lib." + module + "." + name + " definition from " + lib_path + "/" + files[i]);
                // register the function
              	ß.lib[module][name] = require(lib_path + "/" + files[i]);
                // register the function path
              	ß.lib_path[module][name] = lib_path + "/" + files[i];
              	// create alf function wrapper for lib functions
                create_alf_function(module, name);
            }
        }
    }
  
}

if (!ß.load_lib)
    ß.load_lib = function(modules) {
        ß.debug("- ß.lib and ß.alf update ..");

        for (let module in modules) {
            // priority
            for (let dir in modules[module]) {
                if (modules[module][dir] === true) get_module_lib(module, dir);
            }
        }
        for (let module in modules) {
            // standard
            for (let dir in modules[module]) {
                if (modules[module][dir] === false) get_module_lib(module, dir);
            }
        }
        fs.writeFileSync(logfile, log);
        ß.fs.chownSync(logfile, ß.UID, ß.GID);
        //ß.debug('- ß.lib loaded');
    };
