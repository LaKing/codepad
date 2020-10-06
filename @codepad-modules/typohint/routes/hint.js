// partyally based on the search implementation

function send_ahead(req) {
    let theme = ß.THEME;
    const username = ß.lib.basicauth.username_by_req(req);
    if (ß.settings[username]) if (ß.settings[username].theme) theme = ß.settings[username].theme;

    var res_send = "";
    res_send += "<!doctype html>";
    res_send += "<title>hint page for typo's</title>";
    res_send += '<meta charset="utf-8" />';
    res_send += '<link rel="stylesheet" href="/codemirror/theme/' + theme + '.css">';
    res_send += '<link rel="stylesheet" type="text/css" href="/index.css" />';
    res_send += '<script type="text/javascript">';
    res_send += "    window.onload = toBottom;";
    res_send += "    function toBottom() {";
    res_send += "        window.scrollTo(0, document.body.scrollHeight);";
    res_send += "    }";
    res_send += "</script>";
    res_send += '<body class="cm-s-' + theme + ' CodeMirror" style="font-family: Monaco, \'Lucida Console\', monospace; margin: 20px;">';

    return res_send;
}

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("&nbsp;") + "#" + num;
}

function searchlink(term) {
	return '<b><a class="CodeMirror-guttermarker" href="/search?find=' + term + '" style="text-decoration: none">' + term + "</a></b>";
}

ß.app.get("/hint", function (req, res, next) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.write(send_ahead(req));
    res.write(ß.now() + "<p>Typographical error - automatic guessing - hints</p> <br><br>");

    for (let file in ß.projectfiles) {
        if (ß.projectfiles[file].typohint)
            if (ß.projectfiles[file].typohint.length > 0) {
                res.write('<br /><br /><b><a class="CodeMirror-guttermarker" href="/p' + file + '" style="text-decoration: underline">' + file + "</a> </b><br />");

                // parse the array
                for (let n in ß.projectfiles[file].typohint) {
                    let o = ß.projectfiles[file].typohint[n];

                    // line indicator
                    let link = "/p/" + file + "?line=" + o.line;
                    var textline = '<b><a class="CodeMirror-guttermarker" href="' + link + '" style="text-decoration: none">' + zeroPad(o.line, 5) + "</a> "+ searchlink(o.word) +"</b>";
                    var text = "";
                    for (let w in o.wsdb) {
                        text += ' | ' + searchlink(w);
                    }

                    res.write(textline + " ? " + text.substring(2) + "<br />");
                }
            }
    }
    res.write("<br>");
    res.write("[end]<br><br>");
    res.end();
});
