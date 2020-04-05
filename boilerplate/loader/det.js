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

// based on https://stackoverflow.com/questions/23808928/javascript-elegant-way-to-check-nested-object-properties-for-null-undefined
// @DOC leadnull is a superglobal function. Usage: `ł(obj, 'foo.bar')`

/* @DOC 
```

// Demonstration of the leadnull ł function

var a = {};
a.b = {};
a.b.c = {};
a.b.c.d = {};

a.b.c.d.value = "Hello ł";

let test1 = ł(a, "b.c.d.value");
let test2 = ł(a, "b.x.d.value");

let a3 = "String";
let bx = false;
let test3 = ł(a3, "b.x.d.value");
let test4 = ł(a, bx);

Ł(a.b.c.d.value, test1, test2, test3, test4);

/* returns

┠─ Hello ł   // correct access of nested objects
┠─ Hello ł   // access the correct object via ł
┠─ undefined // access an undefined object at ł
┠─ null      // wrong first argument
┠─ null      // wrong second argument

Wrong use of ł, first argument is not an object in at Object.<anonymous> (/srv/codepad-project/demo.js:33:13)
Wrong use of ł, second argument is not a string in at Object.<anonymous> (/srv/codepad-project/demo.js:34:13)

```
*/
if (ß.DEBUG) {
    global.ł = function(obj, key) {
        if (typeof obj !== "object") {
            var stack1 = new Error().stack;
            var from1 = link_code(stack1.split("\n")[2]);
            ß.logger.log("Wrong use of ł, first argument is not an object", from1);
            return null;
        }
        if (typeof key !== "string") {
            var stack2 = new Error().stack;
            var from2 = link_code(stack2.split("\n")[2]);
            ß.logger.log("Wrong use of ł, second argument is not a string in", from2);
            return null;
        }
        if (typeof key !== "string") return null;
        return key.split(".").reduce(function(o, x) {
            return typeof o == "undefined" || o === null ? o : o[x];
        }, obj);
    };
} else {
    global.ł = function(obj, key) {
        if (typeof obj !== "object") {
            ß.logger.log("Wrong use of ł, first argument is not an object");
            return null;
        }
        if (typeof key !== "string") {
            ß.logger.log("Wrong use of ł, second argument is not a string");
            return null;
        }
        if (typeof key !== "string") return null;
        return key.split(".").reduce(function(o, x) {
            Ł(o, x);
            return typeof o == "undefined" || o === null ? o : o[x];
        }, obj);
    };
}

/* @DOC
### Superglobal Logging `Ł` function to be used during development
Place temporary `console.log()`-like function with short special character, they can be tracked down easyly within the project.  
`Ł()` is an enhanced `console.log` that prints it's arguments in seperate lines, and indicates when and where it has been called from. 
It is very useful while development, to analize objects and variables in the code. Production-ready code should not contain this logging helper.
*/

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
On the other hand the detonator `Đ(err);` will log the error and exit the current process.
Both functions can be part of production-ready code, but encountering them indicates an error.
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
        logger.error("┠─  ", err);
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
        logger.error("┠─  ", err);
        logger.error("┠─────── ", stack);
        logger.error("┗━━━━", from);
        //let detonator_error = err;
        //throw detonator_error;
        console.log("Đ EXIT ERROR 101");
        process.exit(101);
    } else {
        // this part is not so well defined yet, we assume that the detonator function only recieves one argument
        logger.error("┏━━━ ĐETONATE(arguments) ", ß.now());
        for (let arg in arguments) {
            logger.error("┠─  ", arguments[arg]);
        }
        logger.error("┗━━━━", from);
        console.log("Đ EXIT ERROR 102");
        process.exit(102);
    }
};

/*
	The node process needs to be started with the command line argument `--preserve-symlinks` so that symlinks are treated like real files.
    This is necessery for functions like `Ł` and for stack traces, so that symlinked modules are treated as they were local.
*/
