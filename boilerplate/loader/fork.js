/*ßoilerplate */
const fs = ß.fs;

/* @DOC 

	## Module dir forking

	A js file can be executed, or better said forked:
	`ß.fork_file(file, name, argv, option)` this will call `child_process.fork()`.

*/

const child_process = require("child_process");

if (!ß.fork_file)
    ß.fork_file = function(file, name, argv, option) {
        if (file.split(".").pop() !== "js") return console.log("Can not fork non-js file:", file);

        if (!name)
            name = file
                .split("/")
                .pop()
                .split(".")[0];

        if (!option) option = {};
        if (!option.stdio)
            option.stdio = [
                0, // Use parent's stdin for child
                fs.openSync(ß.BPLOG + "/fork-" + name + ".stdout.log", "w"), // stdout
                fs.openSync(ß.BPLOG + "/fork-" + name + ".stderr.log", "w"), // stderr to a file
                "ipc" //Forked processes must have an IPC channel
            ];

        if (!argv) argv = [];
      
      	if (process.argv.indexOf("--restart-server") >= 0) argv.push("--restart-server");


        var child = child_process.fork(file, argv, option);

        fs.writeFileSync(ß.BPLOG + "/fork-" + name + ".pid", child.pid);
        console.log("- forked", name, "with pid", child.pid);

        child.on("error", err => {
            ß.err("ERROR on", name, "subprocess. ", err);
        });

        child.on("close", code => {
            //if (code === 0) console.log('[ OK ]', name);
            if (code !== 0) console.log(name, " - exit with error code", code);
            fs.unlink(ß.BPLOG + "/fork-" + name + ".pid");
            delete child.pid;
        });

        process.on("SIGTERM", function() {
            if (!child.pid) return;
            console.log("child process kill", name, child.pid);
            child.kill();
        });

        process.on("SIGUSR1", function() {
            if (!child.pid) return;
            console.log("child process kill", name, child.pid);
            child.kill();
        });
    };

// identical with load
function list_files(module, dir, bmf) {
    let path = dir + "/" + bmf;
    if (fs.isDirSync(path)) {
        let files = fs.readdirSync(path);
        for (let i = 0; i < files.length; i++) {
            if (files[i].split(".").reverse()[0] === "js") {
                require(path + "/" + files[i]);
                reg(path + "/" + files[i]);
            }
        }
    }
}

var log = "";
const logfile = ß.BPLOG + "/fork.log";

function reg(msg) {
    //ß.debug(msg);
    log += msg + "\n";
}

// identical with load
// bmf is the boilerplate-modules folder we are processing now
function load_module_dir(module, dir, bmf, that) {
    // that is the object that has keys representing the file, and value representing the path
    let path = dir + "/" + bmf;
    if (fs.isDirSync(path)) {
        let files = fs.readdirSync(path);
        for (let i = 0; i < files.length; i++) {
            if (files[i].split(".").reverse()[0] === "js") {
                let file = files[i];
                if (!that[file]) that[file] = path + "/" + files[i];
            }
        }
    }
}

/* @DOC 

	The fork folder in a module is a folder containing js files to be forked at startup.  
	It will fork all the files in this folder, first in all the custom modules, then in the '@-modules' while honoring custom modules with priority in case of name collision.
	Each forked process will have it's PID, stderr and stdout in files at `ß.VAR /debug`
	`
	/fork
	`
	A module may define additional folders containing files to be forked.
    
*/

if (!ß.fork)
    ß.fork = function(bmf) {
        reg("// ------------------- " + bmf + " ----------------------");
        ß.debug("- Fork " + bmf + " ...");

        // load per modules

        for (let module in ß.modules) {
            let that = {};

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
                ß.fork_file(that[me]);
                reg(module + " " + bmf + " " + me + " is " + that[me]);
            }
        }
        fs.writeFileSync(logfile, log);
        ß.fs.chownSync(logfile, ß.UID, ß.GID);

        //ß.debug('- Fork ' + bmf + ' complete');
    };
