module.exports = function userlog(username, data) {
    let dir = ß.CWD + "/user.log/" + username;

    ß.fs.ensureDir(dir, function (err) {
        ß.fs.appendFile(dir + "/ops-" + ß.date() + ".log", ß.time() + " " + data + "\n", function (err) {
            if (err) return đ(err);
        });
    });
};
