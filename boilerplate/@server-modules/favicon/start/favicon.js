/*ßoilerplate */

// @DOC If the project CWD contains a favicon.ico, it will be served as favicon, otherwise a default icon from the module is used.


const favicon = require('serve-favicon');
if (ß.fs.existsSync(ß.CWD + '/favicon.ico')) ß.app.use(favicon(ß.CWD + '/favicon.ico'));
else ß.app.use(favicon(__dirname + '/../static/favicon.ico'));
