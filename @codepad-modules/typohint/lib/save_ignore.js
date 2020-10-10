module.exports = function () {
    ß.fs.writeJson(ß.VAR + "/typohint_ignore.json", ß.typohint_ignore, {}, function (err) {
        if (err) return đ(err);
        ß.ntc("wrote typohint ignore");
    });
};