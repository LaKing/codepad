module.exports = function log(data) {
    ß.fs.appendFile(ß.BPLOG +  "/ops-" + ß.date() + ".log", ß.time() + data + '\n', function (err) {
        if (err) return đ(err);
    });
};