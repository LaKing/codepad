function send_ahead(req) {
    let theme = ß.THEME;
    const username = ß.lib.basicauth.username_by_req(req);
    if (ß.settings[username]) if (ß.settings[username].theme) theme = ß.settings[username].theme;

    var res_send = "";
    res_send += "<!doctype html>";
    res_send += "<title>Operations</title>";
    res_send += '<meta charset="utf-8" />';
    res_send += '<link rel="stylesheet" href="/codemirror/theme/' + theme + '.css">';
    res_send += '<script type="text/javascript">';
    res_send += "    window.onload = toBottom;";
    res_send += "    function toBottom() {";
    res_send += "        window.scrollTo(0, document.body.scrollHeight);";
    res_send += "    }";
    res_send += "</script>";
    res_send += '<body class="cm-s-' + theme + ' CodeMirror" style="font-family: Monaco, \'Lucida Console\', monospace; margin: 20px;">';

    return res_send;
}

ß.app.get("/ops", function (req, res, next) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.write(send_ahead(req));

    for (let d in ß.ops) {
        for (let username in ß.ops[d]) {
            res.write("<b>" + d + " " + username + "</b><br>");
            for (let projectfile in ß.ops[d][username]) {
                res.write('<a class="CodeMirror-guttermarker" href="/p' + projectfile + '" style="text-decoration: underline">' + projectfile + "</a><br>");
                for (let operation in ß.ops[d][username][projectfile]) {
                  	let a = ß.ops[d][username][projectfile][operation];
                    res.write("<i>" + operation + "</i>: " + a[a.length -1 ] + "<br>");
                }
              	res.write("<br>");
            }
          	res.write("<br><br>");
        }
    }

    res.end();
});
