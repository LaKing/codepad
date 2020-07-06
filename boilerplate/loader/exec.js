const fs = ß.fs;

const child_process = require("child_process");

// @DOC `ß.spawn_command` will execute a single bash command via `child_process.spawn`
if (!ß.execSync_command)
    ß.execSync_command = function(command, name, args, options) {
        if (!name) name = command.split(" ")[0];
        if (!args) args = [];

        const out = fs.openSync(ß.BPLOG + "/spawn-" + name + ".stdout.log", "a");
        const err = fs.openSync(ß.BPLOG + "/spawn-" + name + ".stderr.log", "a");

        if (!options) options = {};

        //if (!options.stdio) options.stdio = ["ignore", out, err];

        var child = child_process.execSync(command, args, options);
        console.log("- execSync", name, 'complete');
    };