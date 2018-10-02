/*jshint esnext: true */

// our current default
if (!ß.pidfile)
    if (ß.fs.existsSync("/var/codepad")) ß.pidfile = "/var/codepad/project.pid";

// actually what it should be is
if (!ß.pidfile) ß.pidfile = ß.VAR + "/project.pid";

if (process.getuid() === 0 || process.geteuid() === 0) return console.log("! WARNING Process shall not be started as root.");
if (process.getgid() === 0 || process.getegid() === 0) return console.log("! WARNING Process shall not be started in root group.");

var fs = ß.fs;

if (fs.existsSync(ß.pidfile)) {

    var pidcontent = Number(fs.readFileSync(ß.pidfile, 'utf-8'));

    if (pidcontent === process.pid) console.log("- pidfile " + ß.pidfile + " already exists, pid:", process.pid);
    else console.error("! Incorrect pid in " + ß.pidfile + " pidfile:", pidcontent, "current pid:", process.pid);

}

// pidfile does no exists
fs.writeFileSync(ß.pidfile, process.pid);

if (process.ppid) console.log("- wrote pid:", process.pid, "- ppid: ", process.ppid, "- user:", process.env.USER);
else console.log("- wrote pid:", process.pid, "- user:", process.env.USER);


// STOP Signals to listen for
process.on('SIGTERM', function() {
    try {
        fs.unlinkSync(ß.pidfile);
    } catch (e) {}
});

process.on('SIGUSR1', function() {
    try {
        fs.unlinkSync(ß.pidfile);
    } catch (e) {}
});