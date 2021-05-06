// To allow /data access with translated languages.

ß.app.all("/data/:file", function(req, res) {
    if (!req.session) {
        đ("ERROR req.session is undefined");
        return res.status(500).end("ERROR 7");
    }
    if (!req.session.lang) {
        đ("ERROR req.session is undefined");
        return res.status(500).end("ERROR 11");
    }

    let file = ß.get_path("data/" + req.params.file);

    ß.fs.readFile(file, "utf-8", function(err, data) {
        if (err) return res.status(500).end("ERROR 16");
        return res.send(ß.lib.multilanguage.process(req.session.lang, data));
    });
});
