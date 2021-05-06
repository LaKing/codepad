/*ßoilerplate */

// we guess the language the user prefers ...
// by default we choose the chosen language in a session variable

module.exports = function(req) {
    const language = ß.language;

    if (!req.session) {
        console.log("ERROR req.session is undefined in a request get_by_req");
        return language.default;
    }
  
    if (req.session.lang) return req.session.lang;

    // now guess what language to use
    var lang = language.default;

    // compare accepted languages with the language list
    var la = req.acceptsLanguages();
    for (var i = 0; i < la.length; i++) {
        for (var j = 0; j < language.list.length; j++) {
            if (la[i] === language.list[j]) {
                // we found an accepted languade
                lang = la[i];
                if (req.session) req.session.lang = lang;
                return lang;
            }
        }
    }
    // no match, we stay at the default.
    //console.log("language default", lang);
    if (req.session) req.session.lang = lang;
    return lang;
};
