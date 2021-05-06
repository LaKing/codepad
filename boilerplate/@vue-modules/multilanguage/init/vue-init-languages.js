if (process.argv.indexOf("--restart-server") >= 0) return;

// @DOC each language will use the src folder, but we process them with webpack

// OKAY so we just create a symlink for source.
Object.keys(ß.APP_LANGUAGES).forEach(function(lang) {
  
  const source = ß.VAR + "/vue/src";
  const target = ß.VAR + "/vue/" + lang + "/src";
  ß.fs.mkdirpSync(ß.VAR + "/vue/" + lang);
  ß.fs.symlinkSync(source, target);

});