/*ßoilerplate */

const app = ß.app;

app.post("/braintree-payment", function(req, res) {
    var nonceFromTheClient = req.body.paymentMethodNonce;
    console.log("nonce:", nonceFromTheClient);
    ß.braintree_gateway.transaction.sale({
        amount: req.session.payment.brutto,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, function(err, result) {
        if (err) {
            console.log('ERROR braintree-payment', err);
            return;
        }
        console.log("braintree-result", result);
        if (result.transaction) {
            console.log("success", result.transaction.id + ' ' + result.transaction.status + ' OK');
            req.session.payment.status = "paid with Braintree " + result.transaction.id;

            ß.lib.payment.payment_success(req.session.payment.ref);

        } else {
            console.log("braintree-error", result);
            req.session.payment.status = "failed";
        }

        res.send(result);

    });
});