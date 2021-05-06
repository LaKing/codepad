if (process.argv.indexOf("--restart-server") >= 0) return;

// @DOC The default index build is a single-language, but has hot reload for development. It will work with symlinks to the original sourcefiles. Push needed if the file-structure changes.

const br = "\n";
const webpack_dev_server_client = ß.VAR + "/node_modules/webpack-dev-server/client";
const util = require("util");

build_vue_config_js_file();

function build_vue_config_js_file() {
    var str = "";
    const lang = ß.DEFAULT_LANG || "en";
    //str += br + "";
    str += br + "var fs = require('fs');";
    str += br + "var path = require('path');";
    str += br + "var webpack = require('webpack');";
    str += br + "var wp_lang = new webpack.DefinePlugin({'LANG': JSON.stringify('" + lang + "')});";
    str += br + "var wp_build = new webpack.DefinePlugin({'BUILD_MODULE': JSON.stringify('INDEX')});";
    str += br + "var wp_boilerplate = new webpack.ProvidePlugin({ß: ['" + ß.VAR + "/boilerplate.es6.js', 'default']});";
    str += br + "var wp_debuglog_Ł = new webpack.ProvidePlugin({Ł: ['" + ß.VAR + "/debuglog_Ł.js', 'default']});";
    str += br + "var wp_debuglog_ŁOG = new webpack.ProvidePlugin({ŁOG: ['" + ß.VAR + "/debuglog_ŁOG.js', 'default']});";

    str += br + "var wp_leadnull = new webpack.ProvidePlugin({ł: ['" + ß.VAR + "/leadnull.js', 'default']});";

    //str += br + "var wp_test = new webpack.ProvidePlugin({$$$: path.resolve('/srv/codepad-project/lib/test.js')});";

    // since vuetify 2.0.7 the loaderplugin needs to be added here
    str += br + "const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');";
    str += br + "const wp_vuetify = new VuetifyLoaderPlugin();";
  
  	//str += br + "const VueRouterInvokeWebpackPlugin = require('vue-router-invoke-webpack-plugin');";


    str += br;
    str += br + "module.exports = {";
    // str += br + "transpileDependencies: ['vuetify'],";

    if (ß.PAGES) {
        var LANG_PAGES = {};

        // app index used in development
        LANG_PAGES.index = {
            entry: "src/main.js",
            template: "src/index.html",
            filename: "index.html"
        };

        // in live development with hot modules, we only use non-language pages
        Object.keys(ß.PAGES).forEach(function(page) {
            if (ß.PAGES[page].lang) return;
            //console.log("SKIPPING LANGUAGE-SPECIFIC", page, " IN DEFAULT BUILD");
            else LANG_PAGES[page] = ß.PAGES[page];
        });
        str += br + "    pages: " + util.inspect(LANG_PAGES, { depth: Infinity }) + ",";
    }

    str += br + "    configureWebpack: (conf) => {";

    str += br + "        conf.plugins.push(wp_lang);";
    str += br + "        conf.plugins.push(wp_build);";
    str += br + "        conf.plugins.push(wp_boilerplate);";
    str += br + "        conf.plugins.push(wp_debuglog_Ł);";
    str += br + "        conf.plugins.push(wp_debuglog_ŁOG);";
    str += br + "        conf.plugins.push(wp_leadnull);";
  
  	//str += br + "        conf.plugins.push(new VueRouterInvokeWebpackPlugin({dir: 'var/vue/src/views', alias: '@/views', routerDir: 'var/vue/src'}));";
  

    //str += br + "        conf.plugins.push(wp_test);";

    // since vuetify 2.0.7 the loaderplugin needs to be added here
    str += br + "        conf.plugins.push(wp_vuetify);";

    str += br + "        conf.resolve.symlinks = false;";
    str += br + "    },";
    str += br + "    chainWebpack: config => {";
    str += br + "        config.resolve.alias.set('ß', '" + ß.VAR + "/boilerplate.es6.js');";

    //    str += br + "    config.plugin('VuetifyLoaderPlugin').tap(args => [{";
    //    str += br + "      match (originalTag, { kebabTag, camelTag, path, component }) {";
    //    str += br + "        if (kebabTag.startsWith('core-')) {";
    //    str += br + "          return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]";
    //    str += br + "        }";
    //    str += br + "      }";
    //    str += br + "    }])";

    // use preloader language processor
    if (ß.USE_MULTILANGUAGE) {
        str += br + "        config.module.rule('vue').use('webpack-detagger').loader('webpack-detagger').options('" + lang + "').end();";
        str += br + "        config.module.rule('js').test(/.js$/).use('webpack-detagger').loader('webpack-detagger').options('" + lang + "').end();";
    }

    // testing https://stackoverflow.com/questions/50752427/building-deeply-nested-html-with-vue-cli-takes-forever
    //str += br + "        config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => { options.prettify = false; return options })";

    str += br + "    },";
    str += br + "    devServer: {";
    str += br + "        host: '0.0.0.0',";
    str += br + "        port: 9000,";
    str += br + "        disableHostCheck: true,";
    //str += br + "        https: true,";

    str += br + "        https: {";
    let cert_path = ß.get_module_path("server", "cert");
    str += br + "           key: fs.readFileSync('" + cert_path + "/localhost.key'),";
    str += br + "           cert: fs.readFileSync('" + cert_path + "/localhost.crt'),";
    //str += br + "           ca: fs.readFileSync('/path/to/ca.pem'),";
    str += br + "        },";

    //str += br + "        clientLogLevel: 'info',";
    str += br + "        public: 'https://" + ß.HOSTNAME + ":9000',";

    /* 
  	// proxy requests made to the dev server to the live server
    str += br + "           proxy: {";
    str += br + "              context: '/api',";
    str += br + "              target: 'https://" + ß.HOSTNAME + ":9000',";
    str += br + "            }";
  	
  */

    // proxy requests made to the dev server to the live server
    str += br + "           proxy: 'https://" + ß.HOSTNAME + "',";

    str += br + "    },";
    str += br + "    outputDir: '" + ß.VAR + "/app'";
    str += br + "};";
    str += br;

    ß.fs.mkdirpSync(ß.VAR + "/vue/index");
    ß.fs.writeFileSync(ß.VAR + "/vue/index/vue.config.js", str);

    ß.link(ß.VAR + "/vue/src", ß.VAR + "/vue/index/src");

    //ß.link(ß.VAR + '/vue/node_modules', ß.VAR + "/vue/index/node_modules");

    console.log("- vue serve @ ", ß.ansi_link("https://" + ß.HOSTNAME + ":9000"));
}

// something like this might be useful for some custom files
//str += br + "const WebpackFilePreprocessorPlugin = require('webpack-file-preprocessor-plugin');";
//str += br + "function my(input) { console.log(input); return input; }";
//str += br + "var ppp = new WebpackFilePreprocessorPlugin({ debug: true, pattern: /.html$/, process: (source) => my(source.toString())})";
