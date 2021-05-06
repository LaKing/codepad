/*ßoilerplate */

const app = ß.app;

app.get('/promo/:id/image.jpg', function(req, res) {
    var id = req.params.id;
    res.sendFile(ß.CWD + '/promo/' + id + '/image.jpg', function(err) {
        if (err) {
            console.log('ERROR could not serve', ß.CWD + '/promo/' + id + '/image.jpg');
            next(err);
        }
    });
});