/*ßoilerplate */

const fs = ß.fs;

if (!ß.logic) ß.logic = {};
if (!ß.logic_path) ß.logic_path = {};

/* @DOC
## Module logic

We have a possibility to attach functions to the boilerplate namespace, and access the same code everywhere.
Module logic is very similar to module lib, but a module logic is superglobal, meaning that it may be present at frontend and backend - from the same source.
Each module may have a `/logic` folder with js files, each file containing a single function automatically exposed on the `ß.logic` namespace. 
Such a function should be defined with `module.exports = function(arguments) {}`
These are then named by their filename and can be referred with `ß.logic.modulename.functionname` (namespaced with module names) or `ß.functionname` (direct logic namespace)
logic-function files in `@-modules` have lower precedence over custom modules, thus if defined with priority, they will be overridden.
The function-defining js files may contain private local variables and functions, and any number of arguments. 

By convention, we should prefix these logic functions with get, and use camelCase to avoid namespace collisions on the direct `ß` namespace.
That way we can simply type `ß.getSomething(arg1, arg2, ..)` directly. 

That convention assumes and implies, that we use other functions on the backend with underscore_case.

*/

var log = "";
const logfile = ß.BPLOG + "/logic.log";

function reg(msg) {
    //ß.debug(msg);
    log += msg + "\n";
}

function get_module_logic(module, dir) {
  	// inicialize the ß namespace
    if (!ß.logic[module]) ß.logic[module] = {};
    if (!ß.logic_path[module]) ß.logic_path[module] = {};
	
  	// if the modulke has a logic directory
    let path = dir + "/logic";
    if (fs.isDirSync(path)) {
        let files = fs.readdirSync(path);
      	// iterate through the files
        for (const i in files) {
            let name = files[i].split(".")[0];
            if (ß.logic[module][name]) reg("- ß.logic." + module + "." + name + " already defined. Skipping " + path + "/" + files[i]);
            else {
              	// register the logig in the boilerplate namespace
                reg("+ ß.logic." + module + "." + name + " definition from " + path + "/" + files[i]);
                ß.logic[module][name] = require(path + "/" + files[i]);
                ß.logic_path[module][name] = path + "/" + files[i];

              	// logic functions should be simple, and by convention start with a get, as the just return a value.
                if (name.substring(0, 3) !== "get")
                    console.log("WARNING By convention, logic function '" + name + "' should be starting with get and use a camelCase. Please rename: " + path + "/" + files[i]);
                
              	// we can assign the logic directly to the ß namespace.
                if (ß[name]) reg("! ß." + name + " already definded. Cannot alias ß.logic." + module + "." + name);
                else {
                    ß[name] = ß.logic[module][name];
                    reg("= ß." + name + " added as alias to ß.logic-namespace from ß.logic." + module + "." + name);
                }
            }
        }
    }
}

if (!ß.load_logic)
    ß.load_logic = function(modules) {
        ß.debug("- ß.logic update ..");

        for (let module in modules) {
            // priority
            for (let dir in modules[module]) {
                if (modules[module][dir] === true) get_module_logic(module, dir);
            }
        }
        for (let module in modules) {
            // standard
            for (let dir in modules[module]) {
                if (modules[module][dir] === false) get_module_logic(module, dir);
            }
        }
        fs.writeFileSync(logfile, log);
        ß.fs.chownSync(logfile, ß.UID, ß.GID);
        //ß.debug('- ß.logic loaded');
    };
