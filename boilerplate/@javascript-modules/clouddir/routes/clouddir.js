ß.app.all("/clouddir.json", function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
  	
  	ß.lib.clouddir.build();

    return res.json(ß.CLOUDDIR);
});
