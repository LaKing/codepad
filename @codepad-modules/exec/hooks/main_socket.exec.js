/*ßoilerplate */

const {
    spawn
} = require('child_process');

module.exports = function(socket) {
    socket.on('exec', function(arg) {

        ß.msg("[" + socket.username + "@" + ß.HOSTNAME + ']$ ' + arg);
        ß.lib.projectfiles.opntc(socket.username + ' execute ' + arg);

        const x = spawn('/bin/bash', [arg]);

        x.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        x.stderr.on('data', (data) => {
            console.log(`${data}`);
        });

        x.on('exit', (code) => {
          
          	ß.lib.projectfiles.opntc(arg + ' complete ' + code);

            if (code === 0) ß.msg(arg + ' OK');
            else return ß.err(arg + ' FAILED with exit code ' + code);

           	socket.emit(arg+'-complete', code);

        });

    });
};