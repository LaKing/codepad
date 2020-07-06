const shell_path = ß.get_module_path("wetty", "public/wetty/index.html");
ß.app.get("/shell", function(req, res) {
    res.sendFile(shell_path);
});

for (const i in ß.LANG_INTERPRETERS) {
    const interpreter = ß.LANG_INTERPRETERS[i];

    ß.app.get("/" + interpreter + "/*", function(req, res) {
        res.sendFile(shell_path);
    });

    ß.app.get("/" + interpreter, function(req, res) {
        res.sendFile(shell_path);
    });
}
