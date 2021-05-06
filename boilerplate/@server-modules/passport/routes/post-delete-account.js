/*ßoilerplate */

// @DOC The `post-delete-account.json` requests deletes the user completley from the User database.

ß.app.post("/post-delete-account.json", function(req, res) {

    if (!req.session) return res.status(401).json("NO session");
    if (!req.user) return res.status(401).json("NO user");

    const id = req.user._id;
    ß.ntc("delete-account " + id);
    req.logout();
    req.session.destroy(function(err) {
        đ(err);
    });
    ß.lib.passport.delete(id, function(err) {
        if (err) res.status(500).json("ERROR");
        else res.json("OK");
    });
});
