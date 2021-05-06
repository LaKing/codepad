console.log("- debug dumps @ ", ß.ansi_link("https://" + ß.HOSTNAME + "/dumps.html"));

ß.app.all("/dumps.html", function (req, res) {
    
    let resmsg = "<html><body>";
    ß.fs.readdir(ß.APPINSPECTOR_SAVEDIR + "/", (err, files) => {
        if (err) {
            đ(err);
            res.end("There was an error. Please refer to the logs.");
            return;
        }
        
        files.forEach((file) => {
            if (file.includes("heap")) resmsg += `<a href="https://${ß.HOSTNAME}/${file}">${file}</a><br>`;
            if (file.includes("cpu")) resmsg += `<a href="https://${ß.HOSTNAME}/profiles/${file}">${file}</a><br>`;
        });
        resmsg += '<br><a href="/cpudump.html">Take new CPU pofile.</a>';
        resmsg += '<br><a href="/memdump.html">Take new memory heap dump.</a>';
        resmsg += "</body></html>";
        res.end(resmsg);
    });
    
});
