/*ßoilerplate */

const os = require("os");
const HOSTNAME = ß.HOSTNAME || os.hostname();
const logger = ß.logger;

// javascript lablib with colors
const $RED = "\x1b[31m";
const $GREEN = "\x1b[32m";
const $YELLOW = "\x1b[33m";
const $BLUE = "\x1b[34m";
const $GRAY = "\x1b[37m";
const $CLEAR = "\x1b[0m";
const $TAG = $BLUE + "[ " + HOSTNAME.split(".")[0] + " ]";

const OSC = "\u001B]";
const BEL = "\u0007";
const SEP = ";";
const ANSITAG = OSC + "8" + SEP + SEP;

/* @DOC

	The `uncaughtException` handler, determinator `đ` and detonator `Đ` functions, as well as the calling sourcefile field of the logging function `Ł` has file paths converted to ansi links by default in non-production mode.
    Conversation takes place and can be customized by pre-defining boilerplate constants and functions.

*/

const LINKBASE = ß.EDITOR_LINKBASE || "https://" + HOSTNAME + ":9001/p";
const PATHBASE = ß.EDITOR_PATHBASE || ß.CWD;

if (!ß.ansi_filelink)
    ß.ansi_filelink = function(file, line) {
        if (!file) return "";

        // if file is in the CWD filter it out from the link. This assumes that relative links in our IDE resolve
        let relative_file = file;
        if (file.substring(0, PATHBASE.length) === PATHBASE) relative_file = file.substring(PATHBASE.length);

        if (!line) line = 1;
        var link = relative_file + "?line=" + line;
        // skip ansi links in production
        if (ß.MODE === "production") return file + ":" + line;
        return ß.ansi_link(LINKBASE + link, file + ":" + line);
    };

if (!ß.ansi_link)
    ß.ansi_link = function(url, text) {
        if (!url) return;
        if (!text) text = url;
        if (ß.MODE === "production") return url;
        return $BLUE + ANSITAG + url + BEL + text + ANSITAG + BEL + $CLEAR;
    };

function link_code(str) {
    if (!str) return "";
    // dont touch it in production
    if (ß.MODE === "production") return str;

    // does the line contain a / for a file?
    var ix = str.indexOf("/");
    // if not, then we return the input untouched
    if (ix < 0) return str;

    // process the line by turning the file in the string to an ansi link

    // split string to three parts
    let pre = str.substring(0, ix);
    let sub = str.substring(ix);
    let suba = sub.split(":");
    let file = suba[0];
  	if (!file) return str;
    let line = suba[1];
    if (!line) return str;
    //var char = a[2].split(')')[0] || 0;
    let jx = ix + file.length + line.length + 1;
    let post = str.substring(jx);

    // put together and return
    return pre + ß.ansi_filelink(file, line) + post;
}

function with_links(str) {
    if (!str) return "";
    var ret = "";

    // line by line
    var lines = str.split("\n");
    for (var i = 0; i < lines.length; i++) {
        ret += "┠─ " + link_code(lines[i]) + "\n";
    }
    return ret;
}

/* @DOC 
## Logging, Throwing
### Catched exceptions
`uncaughtException` is captured and displayed with enhanced formatting.
*/
process.on("uncaughtException", err => {
    logger.error("┏━━━━━━━━━━━━━━━━━━━━━━━━━━ Exception " + err.name + " ━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    logger.error("┠────  ", err.message);
    if (err.stack) logger.error(with_links(err.stack));
    logger.error("┗━━━━ EXITING with code 100");
    process.exit(100);
});

/* @DOC
### Global logging  `ł` and `Ł` functions to be used during development
Place temporary `console.log()` functions with short special characters, they can be tracked down within the project.  
`ł()` is an alias for a simple `console.log`, but is based on the pre-defined logger, thus can be redirected to a different file.  
`Ł()` is an enhanced `console.log` that prints it's arguments in seperate lines, and indicates when and where it has been called from. 
Especially `Ł()` is very useful while development, to analize objects and variables at breakpoints. However, production-ready code should not contain these logging helpers.
*/

global.ł = function() {
    ß.logger.log(...arguments);
};

global.Ł = function() {
    var stack = new Error().stack;
    var from = link_code(stack.split("\n")[2]);

    ß.logger.log("┏━━━ ŁOG ", ß.now());

    for (let arg in arguments) {
        ß.logger.log("┠─  ", arguments[arg]);
    }
    ß.logger.log("┗━━━━", from);
};

/* @DOC 
### Global  determinator `đ` and the detonator `Đ` error-handlers.
Should the determinator function `đ(err);` recieve an error as argument, it will log the error, then execution will continiue.
On the other hand the detonator `Đ(err);` will log the error and `thow`, thus exit the current process.
Both functions can be part of production-ready code.
*/

// The determinator displays the error in the logs, but execution will continue, ...
global.đ = function() {
    if (arguments.length === 1) {
        if (arguments[0] === null) return arguments;
        if (arguments[0] === undefined) return arguments;
    }

    var stack = new Error().stack;
    var from = link_code(stack.split("\n")[2]);

    // A special format if used to message a simple error.
    if (arguments[0] instanceof Error && arguments.length === 1) {
        var err = arguments[0];
        logger.error("┏━━━ đeterminate ", ß.now());
        if (err.stack) logger.error(with_links(err.stack));
        logger.error("┠─  ", err.message);
        logger.error("┗━━━━", from);
    } else {
        // this part is not so well defined yet, we assume that the detonator function only recieves one argument
        logger.error("┏━━━ đeterminate ", ß.now());
        for (let arg in arguments) {
            logger.error("┠─  ", arguments[arg]);
        }
        logger.error("┗━━━━", from);
    }
    return arguments;
};

// The detonator function will blow up current execution
global.Đ = function() {
    if (arguments.length === 1) {
        if (arguments[0] === null) return arguments;
        if (arguments[0] === undefined) return arguments;
    }

    var stack = new Error().stack;
    var from = link_code(stack.split("\n")[2]);

    // A special format if used to message a simple error.
    if (arguments[0] instanceof Error && arguments.length === 1) {
        var err = arguments[0];
        logger.error("┏━━━ ĐETONATE", ß.now());
        if (err.stack) logger.error(with_links(err.stack));
        logger.error("┠─  ", err.message);
        logger.error("┠─────── ", stack);
        logger.error("┗━━━━", from);
        let detonator_error = err;
        throw detonator_error;
    } else {
        // this part is not so well defined yet, we assume that the detonator function only recieves one argument
        logger.error("┏━━━ ĐETONATE(arguments) ", ß.now());
        for (let arg in arguments) {
            logger.error("┠─  ", arguments[arg]);
        }
        logger.error("┗━━━━", from);
        let detonator_error = new Error("Đetonator function.");
        throw detonator_error;
    }
};

/*
	The node process needs to be started with the command line argument `--preserve-symlinks` so that symlinks are treated like real files.
    This is necessery for functions like `Ł` and for stack traces, so that symlinked modules are treated as they were local.
*/
