module.exports = function () {
    ß.fs.writeJson(ß.VAR + "/typohint.json", ß.typohint_db, {spaces: 4}, function (err) {
        if (err) return đ(err);
        ß.ntc("wrote typohint db");
    });
};
