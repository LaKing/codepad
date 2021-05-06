if (process.argv.indexOf("--restart-server") >= 0) return;

// @DOC vue serve runs as a forked process

/* -- cli-service 3.2.0 --

  Usage: vue-cli-service serve [options] [entry]

  Options:

    --open    open browser on server start
    --copy    copy url to clipboard on server start
    --mode    specify env mode (default: development)
    --host    specify host (default: 0.0.0.0)
    --port    specify port (default: 8080)
    --https   use https (default: false)
    --public  specify the public network URL for the HMR client

*/

// use a fallback default for codepad contaienrs
const process_env_VAR = process.env.VAR || "/srv/codepad-project/var";
const ß = require(process_env_VAR + "/boilerplate.es5.js");

let MODE = "development";
if (process.env.NODE_ENV === "production") MODE = "production";
	
console.log("VUE CLI SERVE", MODE);

process.env.VUE_CLI_CONTEXT = ß.VAR + '/vue/index';
process.argv.push("--mode", MODE);
process.argv.push('serve');

if (MODE === "production" && ß.USE_MULTILANGUAGE) console.log("Multilingual vue apps do not need the index served in production");
else require(ß.VAR + "/vue/node_modules/@vue/cli-service/bin/vue-cli-service.js");


// cd /srv/codepad-project/var/vue/index
// # to invoke directly use something like
// node /srv/codepad-project/var/vue/node_modules/@vue/cli-service/bin/vue-cli-service.js serve /srv/codepad-project/var/vue/index/src
// # or 
// node /srv/codepad-project/@vue-modules/vue/fork/vue-serve.js
// # or
// node /srv/boilerplate/@vue-modules/vue/node_modules/@vue/cli-service/bin/vue-cli-service.js serve 