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

    res.write("<br><b>## OPEN FILES</b><br><br>");

    // files
    for (let i in ß.projectfiles) {
        if (!ß.projectfiles[i].file) continue;

        let users = {};

        // check for files at users
        if (ß.projectfiles[i].at)
            // i is projectfile index

            for (let u in ß.projectfiles[i].at) {
                // u is username

                for (let s in ß.projectfiles[i].at[u]) {
                    // s is the socket id of the last edit

                    // is that socket still here?
                    for (let x in ß.io.of("/p").sockets) {
                        if (ß.io.of("/p").sockets[x].id === s) {
                            // yes: add it to our object to be sent
                            users[u] = true;
                        }
                    }
                }
            }
		// okay, now users has all usernames that are currently online, we can form a response
        if (Object.keys(users).length > 0) {
            res.write('<a class="CodeMirror-guttermarker" href="/p' + i + '" style="text-decoration: underline">' + i + "</a><br>");
            for (let u of Object.keys(users)) {
                res.write("<b>" + u + "</b><br>");
            }
        }
    }

    res.write("<br><b>## EDIT HISTORY</b><br><br>");

    for (let d in ß.ops) {
        for (let username in ß.ops[d]) {
            res.write("# <i>" + d + "</i> <b>" + username + "</b><br>");
            for (let projectfile in ß.ops[d][username]) {
                res.write('<a class="CodeMirror-guttermarker" href="/p' + projectfile + '" style="text-decoration: underline">' + projectfile + "</a><br>");
                for (let operation in ß.ops[d][username][projectfile]) {
                    let a = ß.ops[d][username][projectfile][operation];
                    res.write("<i>" + operation + "</i>: " + a[a.length - 1] + "<br>");
                }
                res.write("<br>");
            }
            res.write("<br><br>");
        }
    }

    res.end();
});
