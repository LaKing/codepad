ß.app.all("/datadir.json", function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
  	
  	if (ß.DEBUG) ß.lib.datadir.build();

    return res.json(ß.DATADIR);
});
