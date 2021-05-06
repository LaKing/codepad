// skip vue-related operations if only the server restarts. 
if (process.argv.indexOf("--restart-server") >= 0) return;

// first of all, make sure we regenerate all vue related files.
ß.fs.removeSync(ß.VAR + "/vue");