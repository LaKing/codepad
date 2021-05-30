/*ßoilerplate */

process.on("unhandledRejection", (reason, p) => {
    console.error("@ Unhandled Rejection at: Promise", p, "reason:", reason);
    // application specific logging, throwing an error, or other logic here
    console.trace(reason.stack);
});

process.on("SIGTERM", function() {
    console.log("SIGTERM recieved");
    ß.run_hook('sigterm');
    process.exit();
});

// @DOC The signal `SIGUSR1` will restart the server process.
process.on("SIGUSR1", function() {
    console.log("SIGUSR1 recieved");
    ß.run_hook('sigusr1');
  	ß.restart_server_process();
});

// internal command to restart the server process

ß.restart_server_process = function() {
	process.argv.push('--restart-server');
    require("child_process").spawn(process.argv.shift(), process.argv, {
        cwd: process.cwd(),
        detached: true,
        stdio: "inherit"
    });
    ß.msg("RESTARTING " + process.cwd());
    process.exit();
};
