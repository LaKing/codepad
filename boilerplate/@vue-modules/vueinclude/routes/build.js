// this is just a quick rebuilder, not meant for production
// curl -k https://localhost/vueinclude_build

if (ß.DEBUG)
    ß.app.all("/vueinclude_build", function(req, res, next) {
        res.setHeader("Content-Type", "text/html");
        ß.lib.vueinclude.build(ß.CLOUDDIR_PATH);
        res.end("OK - vue-include build");
    });
