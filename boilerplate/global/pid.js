/*jshint esnext: true */

if (!ß.pidfile) ß.pidfile = "/var/codepad/project.pid";

if (process.getuid() === 0 || process.geteuid() === 0) return console.log("Process shall not be started as root.");
if (process.getgid() === 0 || process.getegid() === 0) return console.log("Process shall not be started in root group.");
console.log("- user:", process.env.USER);

var fs = ß.fs;

if (fs.existsSync(ß.pidfile)) {

    var pidcontent = Number(fs.readFileSync(ß.pidfile, 'utf-8'));

    if (pidcontent === process.pid) console.log("- pidfile already exists, pid:", process.pid);
    else console.error("! Incorrect pid, pidfile:", pidcontent, "current pid:", process.pid);

}

// pidfile does no exists
fs.writeFileSync(ß.pidfile, process.pid);

console.log("- wrote pid:", process.pid);


if (process.ppid) console.log("- ppid: ", process.ppid);

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