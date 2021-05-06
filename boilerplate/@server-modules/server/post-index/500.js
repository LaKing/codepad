
// express error handler route
let error500 = "<b>500 Internal server error. Sorry.</b>";
if (ß.ERROR500HTML) error500 = ß.ERROR500;
if (ß.ERROR500HTML !== false)
    ß.app.use(function(err, req, res, next) {
        res.set("Content-Type", "text/html");
        đ(err);
        if (ß.MODE === "production") res.status(500).end(error500);
        else res.status(500).end(error500 + "<pre>" + err.stack + "</pre>");
    });