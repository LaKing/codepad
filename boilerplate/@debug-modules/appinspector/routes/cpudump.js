ß.app.all("/cpudump.html", function (req, res) {
    //res.write("Generating CPU profile ...");
    ß.lib.appinspector.cpuprofiler("none", "none", (name) => {
    	let resmsg = "<html><head>";
        resmsg+=  `<meta http-equiv='refresh' content='0; URL=https://${ß.HOSTNAME}/profiles/${name}'>`;
        resmsg+= "</head></html>";
        res.end(resmsg);
    });
});
