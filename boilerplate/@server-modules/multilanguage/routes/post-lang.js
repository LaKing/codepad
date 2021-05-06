// To allow /en uri as language choosing.

function express_handler(lang) {
    ß.app.get("/" + lang, function(req, res) {
        if (!req.session) {
            đ("ERROR req.session is undefined in post-lang");
            return res.status(500).end("ERROR");
        }
        //set session lang
        req.session.lang = lang;
        // set user session
        ß.run_hook("update_user_lang", req.session);
        res.redirect("/");
    });
    ß.app.post("/post-lang-" + lang + ".json", function(req, res) {
        if (!req.session) {
            đ("ERROR req.session is undefined in post-lang");
            return res.status(500).json("ERROR");
        }
        //set session lang
        req.session.lang = lang;
        // set user session
        res.json("OK");
        ß.run_hook("update_user_lang", req.session);
    });
}

// for each language
if (ß.PAGES)
    Object.keys(ß.PAGES).forEach(function(page) {
        if (ß.PAGES[page].lang === page) express_handler(page);
    });
