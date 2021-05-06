ß.app.all("/memdump.html", function (req, res) {
    ß.lib.appinspector.memoryprofiler("none");
    res.end("Memory dumped...");
});
