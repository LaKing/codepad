// if there was no match on all our routes, then use the fallback url.
// Some help here about req.url with routes https://github.com/expressjs/express/issues/3800
    
// while altering the request url, the first character is stripped off, and the rest is appended to the router base path.
ß.admin.use(function rewrite(req, res, next) {
  	// this will allow us to use /admin uri.the first character will be removed.
    if (req.url === "/") req.url = "#.html";
    next();
});

// while altering the request url, it is appended to the router base path.
ß.admin.use(function admin_index(req, res, next) {
    // not a file, not a post request, etc ..
    if (ß.lib.server.requestRulesMatch(req) === false) return next();
    // we want to set /admin/* ...
    req.url = ".html";
    next();
});

ß.app.use("/admin", ß.admin);
