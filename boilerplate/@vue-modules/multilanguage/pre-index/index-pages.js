// @DOC Express middleware to make sure the right index page is served when requesting

function check(arg) {
    for (let p in ß.PAGES) {
        if ("/" + ß.PAGES[p].filename === arg) return true;
    }
    return false;
}

ß.app.use(function(req, res, next) {

    // we consider all GET requests that match the rules, and are not processed before
    if (req.url !== '/index.html')
  	  if (ß.lib.server.requestRulesMatch(req) === false) return next();

    // in case we already have a valid entry-point
    if (check(req.url)) return next();

  	// we shall assume here that there is an index.html if there are no languages
    req.url = "/index.html";
  	// otherwise go for a language
    if (req.session.lang) if (ß.PAGES[req.session.lang]) req.url = "/" + ß.PAGES[req.session.lang].filename;

    next();
});
