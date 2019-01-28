/*ßoilerplate */
const ejsfile = ß.get_module_path('filetree','public/filetree.ejs');

ß.app.get('/files', function(req, res) {
    //res.render(ejsfile, {});
    ß.lib.projectfiles.update();
    res.render(ejsfile, {
        theme: ß.THEME
    });
});
