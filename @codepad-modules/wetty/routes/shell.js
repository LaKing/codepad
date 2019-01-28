const shell_path = ß.get_module_path('wetty','public/wetty/index.html');
ß.app.get('/shell', function(req, res) {
    res.sendFile(shell_path);
});