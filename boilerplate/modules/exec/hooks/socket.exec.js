/*jshint esnext: true */

const {
    spawn
} = require('child_process');

module.exports = function(socket) {
    socket.on('exec', function(arg) {

        ß.msg("[" + socket.username + "@" + ß.HOSTNAME + ']$ ' + arg);
        ß.lib.projectfiles.opntc(socket.username + ' execute ' + arg);

        const x = spawn('/bin/bash', [arg]);

        x.stdout.on('data', (data) => {
            ß.msg(`${data}`);
        });

        x.stderr.on('data', (data) => {
            ß.err(`${data}`);
        });

        x.on('close', (code) => {
            if (code === 0) ß.msg('OK');
            else ß.err('FAILED with exit code ' + code);

            ß.lib.projectfiles.opntc(arg + ' complete ' + code);

        });

    });
};