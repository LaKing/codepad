/*jshint esnext: true */

const ejsfile = ß.BPD + '/modules/filetree/public/filetree.ejs';

ß.app.get('/files', function(req, res) {
    //res.render(ejsfile, {});
    ß.lib.projectfiles.update();
    res.render(ejsfile, {
        theme: ß.theme
    });
});
