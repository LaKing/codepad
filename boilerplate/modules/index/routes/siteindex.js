/*jshint esnext: true */

const ejsfile = ß.BPD + '/modules/index/public/index.ejs';

ß.app.get('/', function(req, res) {
    ß.lib.projectfiles.update();
    res.render(ejsfile, {
        title: ß.HOSTNAME,
        theme: ß.theme
    });
});