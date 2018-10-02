/*jshint esnext: true */
const os = require('os');
const HOSTNAME = os.hostname();

// javascript lablib
const $RED = '\x1b[31m';
const $GREEN = '\x1b[32m';
const $YELLOW = '\x1b[33m';
const $BLUE = '\x1b[34m';
const $GRAY = '\x1b[37m';
const $CLEAR = '\x1b[0m';
const $TAG = $BLUE + '[ ' + HOSTNAME.split('.')[0] + ' ]';


ß.fs.mkdirpSync(ß.CWD + '/log/' + ß.DATE);

ß.log = function(type) {
    let logfile = ß.CWD + '/log/' + ß.DATE + '/admin.log';

    let logdata = type + ' ' + ß.now();

    for (let i = 1; i < arguments.length; i++) {
        logdata += ' ' + arguments[i];
    }

    ß.fs.appendFile(logfile, logdata + '\n', function(err) {
        //ß.debug(logdata);
        if (err) throw err;
        //ß.run_hooks('adminsocket_log', logdata);
    });
};

ß.msg = function msg() {
    ß.log('MSG', ...arguments);
    if (ß.cli) return console.log($TAG + $GREEN, ...arguments, $CLEAR);
    if (ß.codepadlog) return console.log('<span style="color: rgba(0,250,0,0.8);">', ...arguments, '</span>');
    return console.log(...arguments);
};

ß.ntc = function ntc() {
    ß.log('NTC', ...arguments);
    if (ß.cli) return console.log($YELLOW, ...arguments, $CLEAR);
    if (ß.codepadlog) return console.log('<span style="color: rgba(250,250,0,0.8);">', ...arguments, '</span>');
    return console.log(...arguments);
};

ß.err = function err() {
    ß.log('ERR', ...arguments);
    if (ß.cli) return console.log($RED + 'ß-ERROR', ...arguments, $CLEAR);
    if (ß.codepadlog) return console.log('<span style="color: rgba(250,0,0,0.8);"> ß-ERROR', ...arguments, '</span>');
    return console.log(...arguments);
};

ß.debug = function debug() {
    if (ß.DEBUG) {
        ß.log("DBG", ...arguments);
        if (ß.cli) return console.log($TAG + $GRAY, ...arguments, $CLEAR);
        if (ß.codepadlog) return console.log('<span style="color: rgba(200,200,250,0.8);"> ß-DEBUG', ...arguments, '</span>');
        return console.log(...arguments);
    }
};

console.log('- lablib loaded: ß.msg() ß.ntc(), ß.err(), ß.debug()');

// @DOC A note on logging. According to https://stackoverflow.com/questions/41502564/journalctl-user-units-output-disappears
// @DOC user-services do not appear on unit logs. As a workaround use journalctl without unit definitions. For example jurnalctl -f