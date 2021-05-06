// use this shorthand function for static routes
// serve_static
ß.static = function(path) {
    if (ß.fs.isDirSync(path)) return ß.app.use(ß.express.static(path, ß.STATIC_OPTIONS));
    ß.error(path + " is not a directory");
};