## THE ß-variable
This is the primary global variable, visible in the global scope. 
Frequently used node_modules can be attached directly.
for example ß.fs is reference to the fs-extra
Each module may have a lib folder with js files, each containing a single exposed function 
Such a function should be defined with module.exports = function(arguments)
These are then named by their filename and can be referred with ß.lib.modulename.functionname (namespaced with module names) or ß.lib.functionname (lib namespace)
lib-function files in modules have precedence over boilerplate modules, thus if defined, wll be overridden.
The function-defining js files may contain private local variables and functions, and any number of arguments. 
Instead of fs = require('fs') you can use ß.fs
By default, ß.fs refers to the the fs-extra package, so that you can use mkdirp, and readJson functions. 
you may specify your superglobal node_modules, like underscore, or async.js in the global-node_modules.js file in your project-root.
Hooks are similar to lib-functions, however, multiple hooks from multiple modules are called when calling ß.run_hooks
Hooks are defined with module.exports = function(arguments) within js files with the naming schema /hooks/hookname.functionname.js
The hookname is the reference for the call, the functionname should be a descriptive custom name.
As always, hooks definied within the project modules take precedence over boilerplate modules. Hooks may have multiple arguments.
A note on logging. According to https://stackoverflow.com/questions/41502564/journalctl-user-units-output-disappears
user-services do not appear on unit logs. As a workaround use journalctl without unit definitions. For example jurnalctl -f
