if (ß.DEBUG)
    ß.app.all("/simplepay-purge.json", function(req, res) {
        ß.lib.simplepay.purge();
        res.json("OK");
    });
