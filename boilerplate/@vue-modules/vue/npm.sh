npm install vue

npm install vue-router

npm install vuex

npm install @vue/cli
npm install @vue/cli-service-global

npm install axios

npm install material-design-icons-iconfont
npm install vue-template-compiler

npm install @fortawesome/fontawesome-free

## npm install vue-router-invoke-webpack-plugin -D


echo "POSTINSTALL sed -i 's/followSymlinks: false/followSymlinks: true/g' node_modules/watchpack/lib/DirectoryWatcher.js"
## we must address an issue with our way of working with symlinks. Hot reload needs to be aware that files may be symlinked.
## watchpack issue 61, https://github.com/webpack/watchpack/issues/61
sed -i 's/followSymlinks: false/followSymlinks: true/g' node_modules/watchpack/lib/DirectoryWatcher.js

## Another issue is at schema-utils/src/validateOptions.js:31
## Causes avj errors. Let's patch it.
cat patch/validateOptions.js > node_modules/webpack-dev-server/node_modules/schema-utils/src/validateOptions.js 

## Introduced at 4.3.1, a require.resolve causes vue-loader to stop function.
## needs a simple patch, the require.resolve is not necessery.
#cat patch/base.js > node_modules/@vue/cli-service/lib/config/base.js

exit
## The second issue that needs a patch
## This appears to be a boilerplate environment specific issue. 
## ERROR  TypeError: it.self.getKeyword is not a function
## TypeError: it.self.getKeyword is not a function
##    at Ajv.generate_errorMessage (/srv/codepad-project/var/vue/node_modules/ajv-errors/lib/dotjs/errorMessage.js:15:27)
##    at Object.useCustomRule (/srv/codepad-project/var/vue/node_modules/ajv/lib/compile/index.js:202:25)
##    at generate_validate (/srv/codepad-project/var/vue/node_modules/ajv/lib/dotjs/validate.js:198:38)
##    at localCompile (/srv/codepad-project/var/vue/node_modules/ajv/lib/compile/index.js:53:22)
##    at Ajv.compile (/srv/codepad-project/var/vue/node_modules/ajv/lib/compile/index.js:42:10)
##    at _compile (/srv/codepad-project/var/vue/node_modules/ajv/lib/ajv.js:294:29)
##    at Ajv.validate (/srv/codepad-project/var/vue/node_modules/ajv/lib/ajv.js:88:33)
##    at validateOptions (/srv/codepad-project/var/vue/node_modules/webpack-dev-server/node_modules/schema-utils/src/validateOptions.js:31:12)
##    at new Server (/srv/codepad-project/var/vue/node_modules/webpack-dev-server/lib/Server.js:57:5)
##    at serve (/srv/codepad-project/var/vue/node_modules/@vue/cli-service/lib/commands/serve.js:165:20)
##
## The third issue that needs a patch
## ERROR  Error: [VuetifyLoaderPlugin Error] No matching rule for vue-loader found.
## Make sure there is at least one root-level rule that uses vue-loader.
## Error: [VuetifyLoaderPlugin Error] No matching rule for vue-loader found.
## Make sure there is at least one root-level rule that uses vue-loader.
##    at VuetifyLoaderPlugin.apply (/srv/codepad-project/var/vue/node_modules/vuetify-loader/lib/plugin.js:18:13)
##    at webpack (/srv/codepad-project/var/vue/node_modules/webpack/lib/webpack.js:51:13)
##    at Promise (/srv/codepad-project/var/vue/node_modules/@vue/cli-service/lib/commands/build/index.js:192:5)
##    at new Promise (<anonymous>)
##    at build (/srv/codepad-project/var/vue/node_modules/@vue/cli-service/lib/commands/build/index.js:191:10)
##    at api.registerCommand (/srv/codepad-project/var/vue/node_modules/@vue/cli-service/lib/commands/build/index.js:88:13)
##    at Service.run (/srv/codepad-project/var/vue/node_modules/@vue/cli-service/lib/Service.js:245:12)
##    at Object.<anonymous> (/srv/codepad-project/var/vue/node_modules/@vue/cli-service/bin/vue-cli-service.js:36:9)
##    at Module._compile (internal/modules/cjs/loader.js:776:30)
##    at Object.Module._extensions..js (internal/modules/cjs/loader.js:787:10)

## vuetify could be updated, but that brings to: https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode