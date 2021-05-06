/*ßoilerplate */

const app = ß.app;

app.get('/payment-barion.html', function(req, res, next) {

    if (!req.session) return res.redirect('/');
    if (!req.user) return res.redirect('/login');

    ß.lib.payment.initialize_payment(req.session, function(err) {
        if (err) {
            res.send("ERROR. Mission failed. Could not initialize payment.");
            console.log(err);
            return;
        }

        if (ß.USE_PAYMENT_BARION) {
            console.log("USE_PAYMENT_BARION");
            ß.lib.payment_barion.render_page(req, res, next);
            return;
        }
        
        res.send("ERROR. Mission failed. Could not use this method for payment.");
        console.log("ERROR in payment. No payment could be used.");

    });
});
