/* ßoilerplate */

// @DOC The built files will reside in `ß.VAR/app`

const index_dir = ß.VAR + "/app";
const index_html = ß.fs.readFileSync(ß.get_module_path("vue", "index") + "/index.html", "UTF8");

if (process.argv.indexOf("--restart-server") >= 0) ß.ntc("Skipping forks, restart-server");
else {
    // a clean restart, wipe existing content
    ß.fs.removeSync(index_dir);
    ß.fs.mkdirpSync(index_dir);
    ß.fs.writeFileSync(
        index_dir + "/index.html",
        index_html
        //'<head><META HTTP-EQUIV="refresh" CONTENT="1"></head><body><input type="button" value = "Vue build index .." onclick="history.go(0)" /></body>'
    );
	
  	// for simplicity we create these language html files here.
  	if (ß.APP_LANGUAGES)
    Object.keys(ß.APP_LANGUAGES).forEach(function(lang) {
        // Write a file for the duration of vue build
        ß.fs.writeFileSync(index_dir + "/" + lang + ".html", index_html);
    });
}
// the express index dir will contain our possibly multilingual language pages
ß.app.use(ß.express.static(index_dir, ß.STATIC_OPTIONS));

console.log("- vue build @ ", ß.ansi_link("https://" + ß.HOSTNAME));
