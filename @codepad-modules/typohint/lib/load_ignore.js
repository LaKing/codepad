module.exports = function () {
    ß.fs.readJson(ß.VAR + "/typohint_ignore.json", "utf8", function (err, data) {
        if (!err) {
            ß.ntc("loaded typohint_ignore db");
            ß.typohint_ignore = data;
          	return;
        }
    });
};
