## The @multilanguage module
#### /@vue-modules/multilanguage
We create seperate webpack packers so that we have all languages statically translated.


[`vue-build-languages.js:2`](https://bp-devel.d250.hu:9001/p/@vue-modules/multilanguage/fork/vue-build-languages.js?line=2)

each language will have it's own src folder for the vue build process


[`vue-init-languages.js:1`](https://bp-devel.d250.hu:9001/p/@vue-modules/multilanguage/init/vue-init-languages.js?line=1)

Express middleware to make sure the right index page is served when requesting


[`index-pages.js:1`](https://bp-devel.d250.hu:9001/p/@vue-modules/multilanguage/pre-index/index-pages.js?line=1)

Each nlanguage needs a vue-cli webpack configuration as well.


[`vue-config.js:1`](https://bp-devel.d250.hu:9001/p/@vue-modules/multilanguage/start/vue-config.js?line=1)

<pre>
fork
 - vue-build-languages.js
init
 - language-pages.js
 - vue-init-languages.js
pre-index
 - index-pages.js
start
 - vue-config.js
vue
 - components
</pre>

