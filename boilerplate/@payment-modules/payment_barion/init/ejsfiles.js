const ejspath = ß.get_module_path("payment_barion", "public/barion.ejs");
const ejsdata = ß.fs.readFileSync(ejspath, "UTF-8");

var languages = {};
languages[ß.DEFAULT_LANG || 'en'] = true;

if (ß.APP_LANGUAGES) languages = ß.APP_LANGUAGES;

Object.keys(languages).forEach(function(lang) {
  let data = ß.translate(lang, ejsdata);
  ß.fs.mkdirpSync(ß.VAR + '/ejs/' + lang);

  ß.fs.writeFileSync(ß.VAR + "/ejs/" + lang + '/barion.ejs', data);
  
});