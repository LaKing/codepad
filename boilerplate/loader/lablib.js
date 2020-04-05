/*ßoilerplate */
const os = require("os");
const HOSTNAME = ß.HOSTNAME || os.hostname();

// javascript lablib with colors
const $RED = "\x1b[31m";
const $GREEN = "\x1b[32m";
const $YELLOW = "\x1b[33m";
const $BLUE = "\x1b[34m";
const $GRAY = "\x1b[90m"; //37
const $CLEAR = "\x1b[0m";
const $TAG = $BLUE + "[ " + HOSTNAME.split(".")[0] + " ]";

/* @DOC
## Lablib - builtin logging

There are six builtin logging functions in the ß namespace, that have ansi colors when colorised-logging is enabled in development.  
These logs are written to the console, and a file. 

Application-logic logs that may be used by admins.

`ß.log()` a gray logmessage
`ß.msg()` logs a green message  
`ß.ntc()` a yellow notice  
`ß.err()` red error message  

Development-logic logs, to be used in programming.

`ß.error()` red error that does not appear in application logs  
`ß.debug()` only if debug mode is enabled, logs with a blue line  
`ß.logfs()` logs to the filesystem only, to the var/debug folder

The variable `ß.LOGPATH` can be set to any folder accessible by the application. Each of the ß logging functions will append an enty here.
Coloring is disabled in production, so that syslog and other logging tools can process logs without noise.
*/

let colorlog = true;
if (ß.MODE === "production") colorlog = false;
if (ß.COLORLOG) colorlog = ß.COLORLOG;

if (!ß.LOGPATH) {
    ß.LOGPATH = ß.VAR + "/log/" + ß.DATE;
    ß.fs.mkdirpSync(ß.LOGPATH);
    ß.fs.chownSync(ß.VAR + "/log", ß.UID, ß.GID);
    ß.fs.chownSync(ß.LOGPATH, ß.UID, ß.GID);
}
// ß.logs - logsilent is more or less private, but can be accessed programatically
if (ß.LOGPATH)
    ß.logs = function(type) {
        let logfile = ß.LOGPATH + "/" + ß.NAME + ".log";

        let logdata = type + " " + ß.now();

        for (let i = 1; i < arguments.length; i++) {
            logdata += " " + arguments[i];
        }
        // logs into the application log
        ß.fs.appendFile(logfile, logdata + "\n", function(err) {
            if (err) console.error("ERROR, could not append to logfile ", logfile, err);
            ß.fs.chown(logfile, ß.UID, ß.GID);
        });
    };

// these functions will log also into the application log
ß.log = function msg() {
    ß.logs("log", ...arguments);
    if (colorlog) return console.log($TAG + $GRAY, ...arguments, $CLEAR);
    return console.log(...arguments);
};

ß.msg = function msg() {
    ß.logs("msg", ...arguments);
    if (colorlog) return console.log($TAG + $GREEN, ...arguments, $CLEAR);
    return console.log(...arguments);
};

ß.ntc = function ntc() {
    ß.logs("ntc", ...arguments);
    if (colorlog) return console.log($YELLOW, ...arguments, $CLEAR);
    return console.log(...arguments);
};

ß.err = function err() {
    ß.logs("ERR", ...arguments);
    if (colorlog) return console.log($RED + "ß-ERROR", ...arguments, $CLEAR);
    return console.log(...arguments);
};

// these are system-related functions and do not log into the application log
ß.message = function error() {
    if (colorlog) return console.error($GREEN, ...arguments, $CLEAR);
    return console.log(...arguments);
};
ß.notice = function error() {
    if (colorlog) return console.error($YELLOW, ...arguments, $CLEAR);
    return console.log(...arguments);
};
ß.error = function error() {
    if (colorlog) return console.error($RED + "ß-ERROR", ...arguments, $CLEAR);
    return console.error(...arguments);
};

ß.debug = function debug() {
    if (ß.DEBUG) {
        //ß.logs("DBG", ...arguments);
        if (colorlog) return console.log($GRAY, ...arguments, $CLEAR);
        return console.log(...arguments);
    }
};

//console.log('- lablib loaded: ß.msg() ß.ntc(), ß.err(), ß.debug()');

/*
A note on logging with user units. According to https://stackoverflow.com/questions/41502564/journalctl-user-units-output-disappears  
user-services do not appear on unit logs. As a workaround use journalctl without unit definitions. For example jurnalctl -f
*/

ß.debug_logfs = function() {
    if (!ß.DEBUG) return;
    var stack = new Error().stack;
    var from = stack
        .split("\n")[2]
        .split("/")
        .pop()
        .split(".")[0];
    ß.fs.writeFile(ß.VAR + "/debug/" + from + ".log", JSON.stringify(...arguments, null, 4), err => {
        đ(err);
    });
};

ß.logfs = function() {
    var stack = new Error().stack;
    var from = stack
        .split("\n")[2]
        .split("/")
        .pop()
        .split(".")[0];
    ß.fs.writeFile(ß.VAR + "/debug/" + from + ".log", JSON.stringify(...arguments, null, 4), err => {
        đ(err);
    });
};
