/*ßoilerplate */

const fs = ß.fs;
const app = ß.app;

app.get('/promo/:id', function(req, res) {
    var id = req.params.id;
    var file = process.cwd() + '/promo/' + id + '/data.json';
    fs.readJson(file, {
        throws: false
    }, function(err, data) {
        if (err) {
            console.error(err);
            res.redirect("/");
        }
        res.render('promo.ejs', {
            id: id,
            data: data
        });
    });
});