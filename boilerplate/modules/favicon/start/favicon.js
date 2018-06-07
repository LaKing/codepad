/*jshint esnext: true */

const favicon = require('serve-favicon');
if (ß.fs.existsSync(ß.CWD + '/favicon.ico')) ß.app.use(favicon(ß.CWD + '/favicon.ico'));
else ß.app.use(favicon(ß.BPD + '/modules/favicon/static/favicon.ico'));
