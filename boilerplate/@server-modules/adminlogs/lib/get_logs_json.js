/*ßoilerplate */

module.exports = function(file, callback) {

    let logfile = ß.CWD + '/log/' + ß.DATE + '/admin-log';
    if (!file) file = logfile;


    ß.fs.readFile(file, 'utf-8', function(err, data) {
        if (err) throw err;
        callback(err, data.split('\n'));
    });
};