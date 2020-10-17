module.exports = function () {
    ß.fs.readJson(ß.VAR + "/typohint.json", "utf8", function (err, data) {
        if (!err) {
            ß.ntc("loaded typohint db");
            ß.typohint_db = data;
            return;
        }
        ß.ntc("building typohint db");
        ß.lib.typohint.build_db();
    });
};
