/*ßoilerplate */


ß.app.post("/simplepay-ipn", function(req, res) {
    if (!ß.lib.payment_simplepay.check_ipn_validation(req.body)) {
        res.status(403).send("NO");
        return console.log("ERROR on POST simplepay-ipn VALIDATION FAILED: ", req);
    }
    console.log("simplepay-ipn OK", req.body.REFNOEXT);
    res.send(ß.lib.payment_simplepay.make_ipn_response(req.body));

    var ref = req.body.REFNOEXT;
    //require("./payment-success.js")(ref);
    ß.lib.payment.payment_success(ref);
});