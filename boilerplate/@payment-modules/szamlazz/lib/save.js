module.exports = function(result) {
  	
  	if (!ß.szamlazz_config.save_path) return;
  	if (!result.pdf) return;
  
    var filename = result.invoiceId + ".pdf";
    var save_path = ß.szamlazz_config.save_path;

    // use the userid if we have one
    if (result.userid) save_path = ß.szamlazz_config.save_path + "/" + userid + "/invoice";

    var path = save_path + "/" + filename;
    var file = result.pdf;
  
    ß.fs.mkdirp(save_path, function(err) {
        if (err) return đ(err);
        ß.fs.writeFile(path, file, function(err) {
            if (err) return đ(err);
            ß.msg("Szamlazz invoice saved to " + path);
            result.path = path;
            ß.run_hook("invoice_saved", result);
        });
    });
};
