/*ßoilerplate */

const app = ß.app;

const BarionError = ß.barion.BarionError;
const BarionRequestBuilderFactory = ß.barion.BarionRequestBuilderFactory;

app.all("/barion-callback", function(req, res) {
    ß.lib.payment_barion.process_callback(req.query.ref, req.query.paymentId, function(err, response) {
        if (err) {
            res.send("Failure.");
            return console.log("ERROR in payment_barion.process_callback", err);
        }
        res.send(response);
    });
});
