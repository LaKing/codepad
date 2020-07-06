/*ßoilerplate */

ß.ipcash = {};

ß.fs.inDirsSync(ß.USERS_DIR, function (userdir) {
    if (ß.fs.existsSync(ß.USERS_DIR + "/" + userdir + "/.ip")) {
        let ip = ß.fs.readFileSync(ß.USERS_DIR + "/" + userdir + "/.ip", "UTF8");
        ß.ipcash[ip] = userdir;
    }
});

ß.app.use(function (req, res, next) {
    var ip = req.headers["x-forwarded-for"];// || req.connection.remoteAddress;
    if (ß.ipcash[ip])
        req.auth = {
            user: ß.ipcash[ip],
        };

    next();
});
