/*ßoilerplate */


ß.app.all("/simplepay-callback", function(req, res) {
    console.log("simplepay-callback", req.query);
    res.redirect("/#!#invoices");
});
