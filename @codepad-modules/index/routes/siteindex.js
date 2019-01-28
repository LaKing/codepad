/*ßoilerplate */

const ejsfile = ß.get_module_path('index','public/index.ejs');

ß.app.get('/', function(req, res) {
    ß.lib.projectfiles.update();
    res.render(ejsfile, {
        title: ß.HOSTNAME,
        theme: ß.THEME
    });
});