if (process.argv.indexOf("--restart-server") >= 0) return;

/* -- cli-service 3.2.0 --

  Usage: vue-cli-service inspect [options] [...paths]

  Options:

    --mode                specify env mode (default: development)
    --rule <ruleName>     inspect a specific module rule
    --plugin <pluginName> inspect a specific plugin
    --rules               list all module rule names
    --plugins             list all plugin names
    --verbose             show full function definitions in output


*/
const ß = require(process.env.VAR + "/boilerplate.es5.js");
// @DOC vue inspect is disabled by default, but can be enabled for analisation
if (ß.VUE_INSPECT) {
    let MODE = "development";
    if (process.env.NODE_ENV === "production") MODE = "production";

    console.log("VUE CLI INSPECT");

    process.env.VUE_CLI_CONTEXT = ß.VAR + "/vue/index";
    process.argv.push("--mode", "development");
    process.argv.push("inspect");
    require(ß.VAR + "/vue/node_modules/@vue/cli-service/bin/vue-cli-service.js");
} else process.exit(0);
