/*jshint esnext: true */

// not used at the moment, but works, ...
function _getCallerFile() {
    var originalFunc = Error.prepareStackTrace;

    var callerfile;
    try {
        var err = new Error();
        var currentfile;

        Error.prepareStackTrace = function(err, stack) {
            return stack;
        };

        currentfile = err.stack.shift().getFileName();

        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();

            if (currentfile !== callerfile) break;
        }
    } catch (e) {}

    Error.prepareStackTrace = originalFunc;

    return callerfile;
}


// provides two log functions and a stack trace


if (ß.codepadlog !== false && process.env.USER === 'codepad') ß.codepadlog = true;
if (ß.codepadlog) console.log("- Using codepad HTML-format logging");

function link_html(str) {
    if (!str) return '';
    if (!ß.codepadlog) return '';
    var ix = str.indexOf('/');
    if (ix < 0) return '';

    var sub = str.substring(ix);
    if (sub.substring(0, ß.CWD.length) === ß.CWD) {

        var a = sub.substring(ß.CWD.length).split(':');
        var file = a[0];
        var line = a[1];
        //var char = a[2].split(')')[0];
        var link = file + '?line=' + line; // + '?char=' + char;

        return '<a href="/p' + link + '">/p' + link + '</a>';

    }
    return '';
}

function with_html(str) {
    if (!str) return '';
    var html = '';

    var lines = str.split('\n');
    for (var i = 0; i < lines.length; i++) {
        html += '┠─ ' + lines[i] + ' ' + link_html(lines[i]) + '\n';
    }
    return html;
}

const Console = require('console').Console;
const logger = new Console(process.stdout, process.stderr);

if (ß.codepadlog)
    process.on('uncaughtException', (err) => {
        logger.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━ Exception ' + err.name + ' ━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        logger.log('┠────  ', err.message);
        if (err.stack) logger.log(with_html(err.stack));
        logger.log('┗━━━━ EXITING with code 100');
        process.exit(100);
    });


global.ł = function() {
    logger.log(...arguments);
};

global.Ł = function() {

    var stack = new Error().stack;
    var from = link_html(stack.split('\n')[2]);

    logger.log('┏━━━ ŁOG @', from);

    for (let arg in arguments) {
        if (ß.codepadlog) logger.log('┠─  <span style="background: rgba(100,100,100,0.4);">', arguments[arg], '</span>');
        else logger.log('┠─  ', arguments[arg]);
    }
    logger.log('┗━━━━');

};

if (ß.codepadlog) logger.log("- Logging functions ł and Ł are available, with codepad html-extended log");
else logger.log("- Logging functions ł and Ł are available.");

global.Đ = function() {

    if (arguments.length === 1) {
        if (arguments[0] === null) return;
        if (arguments[0] === undefined) return;
    }
    var stack = new Error().stack;
    var from = link_html(stack.split('\n')[2]);

    // A special format if used to message a simple error.
    if (arguments[0] instanceof Error && arguments.length === 1) {
        var err = arguments[0];
        logger.log('┏━━━ ĐETERMINATE @', from);
        logger.log('┠─── ' + err.name + ' ' + link_html(err.stack.split('\n')[1]) + '</span>');
        if (ß.codepadlog) logger.log('┠─  <span style="background: rgba(200,000,000,0.4);">', err.message, '</span>');
        else logger.log('┠─  ', err.message);
        logger.log('┗━━━━');

    } else {
        logger.log('┏━━━ ĐETERMINATE @', from);
        for (let arg in arguments) {
            if (ß.codepadlog) logger.log('┠─  <span style="background: rgba(100,100,100,0.4);">', arguments[arg], '</span>');
            else logger.log('┠─  ', arguments[arg]);
        }
        logger.log('┗━━━━');
    }

    throw 'The determinator function got a non-null error, therefore throws an exception.';

    //return arguments;
};

global.đ = function() {
    if (arguments.length === 1) {
        if (arguments[0] === null) return;
        if (arguments[0] === undefined) return;
    }
    var stack = new Error().stack;
    var from = link_html(stack.split('\n')[2]);

    // A special format if used to message a simple error.
    if (arguments[0] instanceof Error && arguments.length === 1) {
        var err = arguments[0];
        logger.log('┏━━━ đeterminate @', from);
        logger.log('┠─── ' + err.name + ' ' + link_html(err.stack.split('\n')[1]) + '</span>');
        if (ß.codepadlog) logger.log('┠─  <span style="background: rgba(200,000,000,0.4);">', err.message, '</span>');
        else logger.log('┠─  ', err.message);
        logger.log('┗━━━━');

    } else {
        logger.log('┏━━━ đeterminate @', from);
        for (let arg in arguments) {
            if (ß.codepadlog) logger.log('┠─  <span style="background: rgba(100,100,100,0.4);">', arguments[arg], '</span>');
            else logger.log('┠─  ', arguments[arg]);
        }
        logger.log('┗━━━━');
    }
    return arguments;
};

if (ß.codepadlog) logger.log("- Determinator functions đ and Đ are available, with codepad html-extended log");
else logger.log("- Determinator functions đ and Đ are available.");
