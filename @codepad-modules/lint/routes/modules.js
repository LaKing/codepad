/*jshint esnext: true */

ß.app.use(ß.express.static(ß.get_module_path('lint','node_modules/jshint/dist')));
ß.app.use(ß.express.static(ß.get_module_path('lint','node_modules/jsonlint/web')));
ß.app.use(ß.express.static(ß.get_module_path('lint','node_modules/csslint/dist')));
ß.app.use(ß.express.static(ß.get_module_path('lint','node_modules/htmlhint/lib')));
