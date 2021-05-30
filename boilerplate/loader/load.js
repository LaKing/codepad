/*ßoilerplate */

const fs = ß.fs;

/* @DOC 
## Module dir loading
There is a command to `require()` all files in a dir of all modules.  
This is done by passing a 'dir' name as an argument to `ß.load();`. 
It will load all the files in this, first in all the custom modules, then in the '@-modules' while honoring custom modules with priority.
Some folders that are loaded by the framework:
`
/init
/server
/routes (via server/server.js)
/start
/debug (only if debug mode is on)
`
*/

function list_files(module, dir, bmf) {
    let path = dir + "/" + bmf;
    if (fs.isDirSync(path)) {
        let files = fs.readdirSync(path);
        for (let i = 0; i < files.length; i++) {
            if (files[i].split(".").pop() === "js") {
                require(path + "/" + files[i]);
                reg(path + "/" + files[i]);
            }
        }
    }
}

var log = "";
const logfile = ß.BPLOG + "/load.log";

function reg(msg) {
    //ß.debug(msg);
    log += msg + "\n";
}

// bmf is the boilerplate-modules folder we are processing now
function load_module_dir(module, dir, bmf, that) {
    // that is the object that has keys representing the file, and value representing the path
    let path = dir + "/" + bmf;
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

if (!ß.load)
    ß.load = function(bmf) {
        reg("// ------------------- " + bmf + " ----------------------");
        ß.debug("- Load " + bmf + " ...");

        // load per modules

        for (let module in ß.modules) {
            let that = {};
        
          	//ß.debug("- Load " + bmf + " " + module);

            // priority
            for (let dir in ß.modules[module]) {
                if (ß.modules[module][dir] === true) load_module_dir(module, dir, bmf, that);
            }

            // standard
            for (let dir in ß.modules[module]) {
                if (ß.modules[module][dir] === false) load_module_dir(module, dir, bmf, that);
            }

            // that object has values populated, selection complete so do the job now
            for (let me in that) {
                try {
                    require(that[me]);
                } catch (err) {
                    ß.error("ERROR while loading " + that[me]);
                    Đ(err);
                }
                reg(module + " " + bmf + " " + me + " is " + that[me]);
            }
        }
        fs.writeFileSync(logfile, log);
        fs.chownSync(logfile, ß.UID, ß.GID);

        //ß.debug("- Load " + bmf + " complete");
    };
