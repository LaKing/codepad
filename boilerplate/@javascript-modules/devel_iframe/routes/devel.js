ß.app.get("/devel.html", function(req, res, next) {
    var html = "";
    html += '<html style="background-color: black" scrolling="no">';
    html += '<iframe src="' + ß.EDITOR_SITELINK + '" width="49%" height="97%"></iframe>';
    html += '<iframe src="https://' + ß.HOSTNAME + ':9000" width="49%" height="97%"></iframe>';
    html += "</html>;";

    res.send(html);
});
