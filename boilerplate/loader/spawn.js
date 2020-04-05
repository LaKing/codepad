/*ßoilerplate */

/* @DOC 
## Module dir loading

The framework has internal methods for sh, js file and command execution.

To execute bash files in modules pass a 'filename' as an argument to `ß.exec();`. 
It will run files matching this filename, first in all the custom modules, then in the '@-modules' while honoring custom modules with priority.
Note that the implementation contains both sync and async elements, and does not return any values, but logs into the `var` folder.
These methods are used in the installation process for example. The following files get executed in each of the modules, if they exists:
```
install.sh
dnf.sh
npm.sh
```
*/

const fs = ß.fs;

const child_process = require("child_process");

// @DOC `ß.spawn_command` will execute a single bash command via `child_process.spawn`
if (!ß.spawn_command)
    ß.spawn_command = function(command, name, args, options) {
        if (!name) name = command.split(" ")[0];
        if (!args) args = [];

        const out = fs.openSync(ß.VAR + "/debug/spawn-" + name + ".stdout.log", "a");
        const err = fs.openSync(ß.VAR + "/debug/spawn-" + name + ".stderr.log", "a");

        if (!options) options = {};

        if (!options.detached) options.detached = true;
        if (!options.stdio) options.stdio = ["ignore", out, err];

        var child = child_process.spawn(command, args, options);
        console.log("- spawned", name, "- pid", child.pid);

        child.on("error", err => {
            console.log("ERROR on", name, "subprocess. ", err);
        });

        child.on("close", code => {
            console.log("child process", name, "exit with code", code);
        });

        process.on("SIGTERM", function() {
            console.log("child process kill", name, child.pid);
            child.kill();
        });

        process.on("SIGUSR1", function() {
            console.log("child process kill", name, child.pid);
            child.kill();
        });
    };

// @DOC `ß.bash_file` will execute a single bash file via `child_process.spawn`
if (!ß.bash_file)
    ß.bash_file = function(file, name) {
        if (!fs.existsSync(file)) return;

        //if (file.split('/')[1] === 'usr') return console.log('should not bash_file from /usr/*', file);

        if (!name) name = ß.path.basename(file).split(".")[0];

        var dira = file.split("/");
        dira.pop();
        var dir = dira.join("/");
        var filename = file.split("/").pop();

        const out = fs.openSync(ß.VAR + "/debug/bash-" + name + ".stdout.log", "a");
        const err = fs.openSync(ß.VAR + "/debug/bash-" + name + ".stderr.log", "a");

        var options = {
            cwd: dir,
            stdio: ["ignore", out, err]
        };

        var child = child_process.spawn("/bin/bash", [file], options);
        console.log("- ", name, "/bin/bash", file, " - pid", child.pid);
        reg(" - " + name + " /bin/bash" + file + " - pid " + child.pid);
        fs.writeFileSync(ß.VAR + "/debug/bash-" + name + ".pid", child.pid);

        child.on("error", err => {
            console.log("ERROR on", name, "subprocess. ", err);
        });

        child.on("close", code => {
            //if (code === 0) console.log('[ OK ]', name);
            if (code !== 0) console.log(name, " - exit with error code", code);
            fs.unlink(ß.VAR + "/debug/bash-" + name + ".pid");
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

// we will log our actions
var log = "";
const logfile = ß.VAR + "/debug/exec.log";

// we will also create a shell file, to have a way to exec commands by bash
var sh = "";
const shfile = ß.VAR + "/debug/exec.sh";

function shreg(msg) {
    //ß.debug(msg);
    sh += msg + "\n";
}

function reg(msg) {
    //ß.debug(msg);
    log += msg + "\n";
}

// bmf is the boilerplate-modules folder we are processing now
function load_module_dir(module, dir, bmf, that) {
    // that is the object that has keys representing the file, and value representing the path
    let file = dir + "/" + bmf;
    if (fs.isFileSync(file)) {
        if (file.split(".").pop() === "sh") {
            if (!that[file]) that[file] = file;
        }
    }
}

// bmf in this context is the boilerplate module file
if (!ß.exec)
    ß.exec = function(bmf) {
        reg("// ------------------- " + bmf + " ----------------------");
        console.log("Exec " + bmf + " ...");

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
                //ß.bash_file(that[me], module + "-" + bmf);
                let dir = ß.path.dirname(that[me]);//.split('/').pop().join();
                shreg("cd " + dir + " && bash " + me);
                reg(module + " " + bmf + " " + me + " is " + that[me]);
            }
        }

        fs.writeFileSync(logfile, log);
        ß.fs.chownSync(logfile, ß.UID, ß.GID);

      
        fs.writeFileSync(shfile, sh);
        ß.fs.chownSync(shfile, ß.UID, ß.GID);
      
        //console.log('Exec ' + bmf + ' complete');
    };
