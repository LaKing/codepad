if (process.argv.indexOf("--restart-server") >= 0) return;

// @DOC vue build runs as a forked process

/* -- cli-service 3.2.0 --
Usage: vue-cli-service build [options] [entry|pattern]

  Options:

    --mode             specify env mode (default: production)
    --dest             specify output directory (default: dist)
    --modern           build app targeting modern browsers with auto fallback
    --no-unsafe-inline build app without introducing inline scripts
    --target           app | lib | wc | wc-async (default: app)
    --formats          list of output formats for library builds (default: commonjs,umd,umd-min)
    --name             name for lib or web-component mode (default: "name" in package.json or entry filename)
    --no-clean         do not remove the dist directory before building the project
    --report           generate report.html to help analyze bundle content
    --report-json      generate report.json to help analyze bundle content
    --watch            watch for changes
*/

// use a fallback default for codepad contaienrs
const process_env_VAR = process.env.VAR || "/srv/codepad-project/var";
const ß = require(process_env_VAR + "/boilerplate.es5.js");

// we want to tell our IDE that we are waiting for this process
// we already wrote the global pid, so we overwrite it now.
const fs = require('fs');
const await_file = ß.VAR + "/await/fork-vue-build.pid";
fs.writeFileSync(await_file, process.pid.toString());

let MODE = "development";
if (process.env.NODE_ENV === "production") MODE = "production";

console.log("VUE CLI BUILD", MODE);

process.env.VUE_CLI_CONTEXT = ß.VAR + '/vue/index';
process.argv.push("--mode", MODE);
process.argv.push("--no-clean");
process.argv.push("build");

if (MODE === "production" && ß.USE_MULTILANGUAGE) console.log("Multilingual vue apps do not need the index built in production");
else require(ß.VAR + "/vue/node_modules/@vue/cli-service/bin/vue-cli-service.js");
