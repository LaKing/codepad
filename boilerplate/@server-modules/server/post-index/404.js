let error404 = "<b>404 Not found. Sorry.</b>";
if (ß.ERROR404HTML) error404 = ß.ERROR404;
if (ß.ERROR404HTML !== false)
    ß.app.get("*", function(req, res) {
        res.set("Content-Type", "text/html");
        ß.ntc("404-not-found req.url: " + req.url + " req.originalUrl: " + req.originalUrl);
        res.status(404).end(error404);
    });
