// To server restart via URL request.

if (ß.MODE === "development") {
    console.log("- server restart via url @ ", ß.ansi_link("https://" + ß.HOSTNAME + "/restart.server"));
    ß.app.all("/restart.server", function(req, res) {
        res.send('<a href="/">Home</a> RESTART_SERVER <script>window.close();</script>');
      	//res.redirect("https://" + ß.HOSTNAME + ":9000/logs");
      	setTimeout(function(){ ß.restart_server_process(); }, 1000);
    });
}
