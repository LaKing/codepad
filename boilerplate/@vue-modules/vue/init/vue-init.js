
if (process.argv.indexOf("--restart-server") >= 0) return;

if (!ß.VUE_FILES) ß.VUE_FILES = {};

// @DOC The vue source tree is built up at the init stage
ß.lib.vue.uplink_source_tree();

// @DOC We need our detagger, a fake module for webpack. It will expose our `ß.lib.multilanguage.process` function.
const destination = ß.VAR + "/vue";
var str = "";
const br = "\n";

str += br + "var process_data = require('./process.js');";
// the webpack relalted function
str += br + "function processChunk (source, map) {";
str += br + "  this.cacheable();";
// there is no argument, we return then without doing anything
str += br + "  if (!this.query) return this.callback(null, source, map);";
// there is a language tag passed as argument over webpack
str += br + "  const tag = this.query.substring(1);";
// return
str += br + "  this.callback(null, process_data(tag, source), map);";
str += br + "}";
// we will have to export this file in an node_module folder, so webpack can consume it
str += br + "module.exports = processChunk;";

ß.fs.mkdirpSync(destination + "/node_modules/webpack-detagger.js");
ß.fs.writeFileSync(destination + "/node_modules/webpack-detagger.js/index.js", str);
ß.link(ß.get_module_path("multilanguage", "/lib/process.js"), destination + "/node_modules/webpack-detagger.js/process.js");