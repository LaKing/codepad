/*ßoilerplate */



// To allow /en uri as language choosing.
function express_language_change_handler(lang) {

    const app = ß.app;

    app.get('/' + lang, function(req, res) {
        if (!req.session) console.log("ERROR req.session is undefined");
        else req.session.lang = lang;
        ß.lib.language.update_user_lang(req.session);
        res.redirect('/');
    });

    app.post('/' + lang, function(req, res) {
        if (!req.session) console.log("ERROR req.session is undefined");
        else req.session.lang = lang;
        ß.lib.language.update_user_lang(req.session);
    });

}

// this iterates in all languages    
module.exports = function() {

    const language = ß.language;

    for (var l = 0; l < language.list.length; l++) {
        express_language_change_handler(language.list[l]);
    }

};