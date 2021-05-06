## The @readme module
#### /@server-modules/readme
The README for the project is served under the `/README.html` url.


[`readme.js:7`](https://bp-devel.d250.hu:9001/p/@server-modules/readme/routes/readme.js?line=7)

This module generates a readme automatically from comments that are marked with the `@DOC` tag at start.  
   Both, single-line and multiline comments are supported. When the project is started source files are parsed and marked document comment blocks extracted.


[`autodoc.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/readme/start/autodoc.js?line=3)

<pre>
routes
 - readme.js
start
 - autodoc.js
static
 - github-markdown.css
</pre>

