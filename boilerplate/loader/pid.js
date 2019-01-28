/*ßoilerplate */

function exit_with(arg) {
	console.error(arg, "Exiting.");
  	process.exit(10);
}

// this is an exception for codepad instances
if (ß.CWD === "/var/codepad") ß.PIDFILE = "/var/codepad/codepad.pid";

// @DOC as an application we write our pid to a file
if (!ß.PIDFILE) ß.PIDFILE = ß.VAR + "/project.pid";

if (!ß.CLI) {
    // we allow starting as root, as the cli should be started as root, but give the user a notice.
    if (process.getuid() === 0 || process.geteuid() === 0) exit_with("! Process started as root.");
    if (process.getgid() === 0 || process.getegid() === 0) exit_with("! Process started in root group.");

    // this should be consistent
    if (process.getuid() !== ß.UID || process.geteuid() !== ß.UID) exit_with("! WARNING UID " + process.getuid() + " not consistent with Working Directory UID." + ß.UID);
    if (process.getgid() !== ß.GID || process.getegid() !== ß.GID) exit_with("! WARNING GID " + process.getgid() + " not consistent with Working Directory GID." + ß.GID);
}

var fs = ß.fs;

/*
if (fs.existsSync(ß.PIDFILE)) {
    var pidcontent = Number(fs.readFileSync(ß.PIDFILE, 'utf-8'));
    if (pidcontent === process.pid) console.log("- pidfile " + ß.PIDFILE + " already exists, pid:", process.pid);
    else console.error("! Incorrect pid in " + ß.PIDFILE + " pidfile:", pidcontent, "current pid:", process.pid);
}
*/

// write a pidfile
fs.writeFileSync(ß.PIDFILE, process.pid);
ß.fs.chownSync(ß.PIDFILE, ß.UID, ß.GID);

if (process.ppid) console.log("- wrote pid:", process.pid, "- ppid: ", process.ppid, "- user:", process.env.USER);
else console.log("- wrote pid:", process.pid, "- user:", process.env.USER);

// STOP Signals to listen for
process.on("SIGTERM", function() {
    try {
        fs.unlinkSync(ß.PIDFILE);
    } catch (e) {}
});

process.on("SIGUSR1", function() {
    try {
        fs.unlinkSync(ß.PIDFILE);
    } catch (e) {}
});
