/*ßoilerplate */

const util = require("util");

/* @DOC

## THE ß object

The boilerplate module framework uses a "ß namespace" to store constants and references to functions across it's modules.  
This namespace is attached to the `ß` primary global variable, visible in the global scope. Frequently used node modules can be attached directly.
You can pre-create the ß variable in your server.js file before loading the boilerplate, to pre-define functions variables and constants.
Capital case variables and constants are considered superglobal, as they may exists even in frontend scripts depending on the stack.

A custom `server.js` with debug-mode may look like this.  
```
// Pre-declare ß so constants and functions can be attached.
global.ß = {};
// Set the DEBUG constant to true
ß.DEBUG = true;
```
The entry point to boot the framework is then: `require("./boilerplate");`
*/

// @DOC We can debug the namespace by writing a  debug file. `ß.debug_namespace` will by default write the file to  `ß.BPLOG/boiler-namespace.txt`
if (!ß.debug_namespace)
    ß.debug_namespace = function() {
        ß.fs.mkdirpSync(ß.BPLOG);
        ß.fs.chownSync(ß.BPLOG, ß.UID, ß.GID);

        var config_file = ß.BPLOG + "/boiler-namespace.txt";
        var data = "";

        for (let i in ß) {
            data += "ß." + i + " = " + util.inspect(ß[i]);
            data += "\n\n";
        }

        ß.fs.writeFileSync(config_file, data);
        ß.fs.chownSync(config_file, ß.UID, ß.GID);
        console.log("- ß has " + Object.keys(ß).length + " keys");
    };

// @DOC To use the `ß` namespace in files outside of the framework, we export it in es5 and es6 formats. Arrays dont work, but objects do.
if (!ß.write_namespace_files)
    ß.write_namespace_files = function() {
        // make all ß attached values available in the following files:
        var bashfile = ß.VAR + "/boilerplate.sh";
        var es5_file = ß.VAR + "/boilerplate.es5.js";
        var es6_file = ß.VAR + "/boilerplate.es6.js";

        // use local versions for reconstruction
        var bashdata = "#!/bin/bash\n\n";
        var es5_data = "let _ß = {};\n\n";
        var es6_data = "let _ß = {};\n\n";

        es5_data += "_ß.logic = {};\n\n";
        es6_data += "_ß.logic = {};\n\n";

        for (let i in ß) {
            // we only exports uppercase constants
            // @DOC By convention, uppercase variables are considered exportable-constants
            if (i === i.toUpperCase()) {
                // let it be ...
                let it = ß[i];
                let it_is = typeof it;

                // is it a primitive value?
                if (it_is === "number" || it_is === "boolean") {
                    bashdata += "BOILERPLATE_" + i + "='" + it + "';\n";
                    es5_data += "_ß." + i + " = " + it + ";\n";
                    es6_data += "_ß." + i + " = " + it + ";\n";
                    //es6_data += "export const " + i + " =  " + it + ";\n\n";
                }
                if (it_is === "string") {
                    bashdata += "BOILERPLATE_" + i + "='" + it + "';\n";
                    es5_data += "_ß." + i + " = '" + it + "';\n";
                    es6_data += "_ß." + i + " = '" + it + "';\n";
                    //es6_data += "export const " + i + " = '" + it + "';\n\n";
                }
                if (it_is === "object") {
                    it = JSON.stringify(ß[i]);

                    es5_data += "_ß." + i + " = " + it + ";\n";
                    es6_data += "_ß." + i + " = " + it + ";\n";
                    //es6_data += "export const " + i + " =  " + it + ";\n\n";
                }

                // functions are not exported (yet?)
            }
        }

        Object.keys(ß.logic_path).forEach(function(module) {
            if (Object.keys(ß.logic_path[module]).length < 1) return;
            es5_data += "_ß.logic['" + module + "'] = {};\n\n";
            es6_data += "_ß.logic['" + module + "'] = {};\n\n";
            Object.keys(ß.logic_path[module]).forEach(function(logic) {
              	// full path
              	es5_data += "_ß.logic['" + module + "']['" + logic + "'] = require('" + ß.logic_path[module][logic] + "');\n\n";
                es6_data += "_ß.logic['" + module + "']['" + logic + "'] = require('" + ß.logic_path[module][logic] + "');\n\n";
              	// direct path
                es5_data += "_ß['" + logic + "'] = require('" + ß.logic_path[module][logic] + "');\n\n";
                es6_data += "_ß['" + logic + "'] = require('" + ß.logic_path[module][logic] + "');\n\n";
            });
        });

        // this will allow to access the ß object data
        // import ß from "ß";
        es6_data += "export default Object.freeze(_ß);";
        // require
        es5_data += "module.exports = Object.freeze(_ß);";

        ß.fs.writeFileSync(bashfile, bashdata);
        ß.fs.chownSync(bashfile, ß.UID, ß.GID);

        ß.fs.writeFileSync(es5_file, es5_data);
        ß.fs.chownSync(es5_file, ß.UID, ß.GID);

        ß.fs.writeFileSync(es6_file, es6_data);
        ß.fs.chownSync(es6_file, ß.UID, ß.GID);

        //console.log("- ß variables written to", es6_file);
    };
