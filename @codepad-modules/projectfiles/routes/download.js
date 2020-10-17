ß.app.get("/download/*", function (req, res) {
    var entry = req.params[0];
    var filename = req.params[0].split("/").pop();

    var fullpath = ß.PROJECTDIR + "/" + entry;

    res.download(fullpath); // Set disposition and send it.
});
