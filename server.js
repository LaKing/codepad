#!/bin/node

// to configure our server, we create the ß object now.
if (!global.ß) global.ß = {};


// @DOC To enter debug mode, pass debug as argument to server.js, then ß.DEBUG will be true.
// or uncomment this line 
ß.DEBUG = true;
//ß.pidfile = "/var/codepad/project.pid";

ß.port = 443;
ß.theme = "material";

require("./boilerplate");

/*
THEMES:

3024-day    ambiance-mobile  blackboard  dracula        elegant       icecoder     liquibyte  mdn-like  neo           paraiso-dark    rubyblue   ssms                     ttcn         xq-light
3024-night  base16-dark      cobalt      duotone-dark   erlang-dark   idea         lucario    midnight  night         paraiso-light   seti       the-matrix               twilight     yeti
abcdef      base16-light     colorforth  duotone-light  gruvbox-dark  isotope      material   monokai   oceanic-next  pastel-on-dark  shadowfox  tomorrow-night-bright    vibrant-ink  zenburn
ambiance    bespin           darcula     eclipse        hopscotch     lesser-dark  mbo        neat      panda-syntax  railscasts      solarized  tomorrow-night-eighties  xq-dark


*/

Ł('ok');
