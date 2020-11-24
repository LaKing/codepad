const git = ß.git;
const fs = ß.fs;
const dir = ß.PROJECTDIR;

function send_ahead(req) {
    let theme = ß.THEME;
    const username = ß.lib.basicauth.username_by_req(req);
    if (ß.settings[username]) if (ß.settings[username].theme) theme = ß.settings[username].theme;

    var res_send = "";
    res_send += "<!doctype html>";
    res_send += "<title>Git commits</title>";
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

ß.app.get("/commits/*", function (req, res, next) {
    // do we have a git repo at all?
    if (!ß.GIT_DIR) {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.write(send_ahead(req));
        res.write("<br>[No .git directory in the project]<br><br></body>");
        res.end();
        return;
    }

    // at least we have a repo to go for ...
    let projectfile = "/" + req.params[0];
    if (!projectfile) return res.end("No file argument");

    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.write(send_ahead(req));
    res.write(ß.now() + " - " + ß.git_commits.length + " commits<br>");
    res.flush();

    ß.lib.git.path_commits(projectfile, function (err, commits) {
        res.write("<p>Last ~" + commits.length + " git commits of ");
        res.write('<a class="CodeMirror-guttermarker" href="/p/' + projectfile + '" style="text-decoration: underline">' + projectfile + "</a> </p>");

        for (let commit of commits) {
            let date_stamp = new Date(commit.timestamp * 1000);

            res.write(
                "<i>" +
                    ß.now(date_stamp) +
                    "</i> <b>" +
                    commit.name +
                    '</b> <a class="CodeMirror-guttermarker" href="/git/' +
                    commit.oid +
                    projectfile +
                    '" >' +
                    commit.message +
                    "</a><br>"
            );
        }

        res.write("<br>");
        res.write("[end]<br><br></body>");

        res.end();
    });
});
