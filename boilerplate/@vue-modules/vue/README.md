## The @vue module
#### /@vue-modules/vue
vue build runs as a forked process


[`vue-build.js:1`](https://bp-devel.d250.hu:9001/p/@vue-modules/vue/fork/vue-build.js?line=1)

vue inspect is disabled by default, but can be enabled for analisation


[`vue-inspect.js:17`](https://bp-devel.d250.hu:9001/p/@vue-modules/vue/fork/vue-inspect.js?line=17)

vue serve runs as a forked process


[`vue-serve.js:1`](https://bp-devel.d250.hu:9001/p/@vue-modules/vue/fork/vue-serve.js?line=1)

we create a `ß.vue_modules` object, which is a subset of `ß.modules`.


[`vue-modules.js:1`](https://bp-devel.d250.hu:9001/p/@vue-modules/vue/global/vue-modules.js?line=1)

The built files will reside in `ß.VAR/app`


[`index.js:3`](https://bp-devel.d250.hu:9001/p/@vue-modules/vue/index/index.js?line=3)

Based on `ß.vue_modules` we create a subset of node modules for vue


[`vue-init.js:4`](https://bp-devel.d250.hu:9001/p/@vue-modules/vue/init/vue-init.js?line=4)

The `src` folder is actually a unified version of all vue folders


[`vue-init.js:20`](https://bp-devel.d250.hu:9001/p/@vue-modules/vue/init/vue-init.js?line=20)

We need our detagger, a fake module for webpack. It will expose our `ß.lib.multilanguage.process` function.


[`vue-init.js:32`](https://bp-devel.d250.hu:9001/p/@vue-modules/vue/init/vue-init.js?line=32)

The default index build is a single-language, but has hot reload for development. It will work with simlinks to the original sourcefiles. Push only needed if the file-structure changes.


[`vue-config.js:1`](https://bp-devel.d250.hu:9001/p/@vue-modules/vue/start/vue-config.js?line=1)

The `Ł` debug function has been implemented for the vue frontend!


[`vue-debuglog.js:1`](https://bp-devel.d250.hu:9001/p/@vue-modules/vue/start/vue-debuglog.js?line=1)

The most important variables are also exported vie the vue-cli env file


[`vue-env.js:3`](https://bp-devel.d250.hu:9001/p/@vue-modules/vue/start/vue-env.js?line=3)

<pre>
fork
 - vue-build.js
 - vue-inspect.js
 - vue-serve.js
global
 - chaf.js
 - var-vue.js
 - vue-modules.js
index
 - index.js
init
 - await-vue-build.js
 - vue-init.js
start
 - vue-config.js
 - vue-debuglog.js
 - vue-env.js
 - vue-files.js
vue
 - assets
 - components
 - router.js
 - store.js
</pre>

