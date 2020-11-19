ß.app.get("/download/*", function (req, res) {

    var entry = req.params[0];
    var fullpath = ß.PROJECTDIR + "/" + entry;

    res.download(fullpath);
});
