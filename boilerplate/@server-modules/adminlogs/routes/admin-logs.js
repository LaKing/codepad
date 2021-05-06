/*ßoilerplate */

ß.app.get("/admin-logs.json", ß.lib.passport_admin.isLoggedInAdmin, function(req, res) {
    let logfile = ß.CWD + "/log/" + ß.DATE + "/admin-log";
    ß.lib.logging.get_logs_json(logfile, function(err, data) {
        res.setHeader("Content-Type", "application/json");
        if (err) {
            console.error("ERROR - could not get admin-logs");
            res.send(JSON.stringify({}));
        }
        res.send(JSON.stringify(data));
    });
});
