## The @multilanguage module
#### /@server-modules/multilanguage
The language module can be used to create multilingual page versions, with inline translations.  
This has been implemented for simple bilingual apps, where english and other languages shall be supported.  
The locale specific versions are then rendered for each language in the build process.  
  
The `ß.DEFAULT_LANG` variable defines what language should be used, in a fallback to a default.


[`default.js:1`](https://bp-devel.d250.hu:9001/p/@server-modules/multilanguage/global/default.js?line=1)

We guess the language the user prefers by the request accepted languages list.


[`lang.js:1`](https://bp-devel.d250.hu:9001/p/@server-modules/multilanguage/lib/lang.js?line=1)

A string or document might be processed by the language module.    
   The process will then discard irrelevant language chunks, and select the selected ones for the specific language.    
     
   The following string will be rendered as 'Hello world' in english and hungarian languages.  
   `##&en Hello World! ##&hu Hello Világ! ##`


[`process.js:1`](https://bp-devel.d250.hu:9001/p/@server-modules/multilanguage/lib/process.js?line=1)

The `user.lang` is stored in the user database.


[`language-keys.js:1`](https://bp-devel.d250.hu:9001/p/@server-modules/multilanguage/user_model/keys/language-keys.js?line=1)

<pre>
global
 - default.js
lib
 - lang.js
 - process.js
pre-routes
 - sessionlang.js
routes
 - post-lang.js
user_model
 - keys
</pre>

