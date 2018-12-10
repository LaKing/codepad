/*ßoilerplate */

const favicon = require('serve-favicon');
if (ß.fs.existsSync(ß.CWD + '/favicon.ico')) ß.app.use(favicon(ß.CWD + '/favicon.ico'));
else ß.app.use(favicon(ß.get_module_path('favicon','static/favicon.ico')));
