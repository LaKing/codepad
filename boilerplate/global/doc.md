## THE ß-variable
This is the primary global variable, visible in the global scope. 
Frequently used node_modules can be attached directly.
for example ß.fs is reference to the fs-extra
Instead of fs = require('fs') you can use ß.fs
By default, ß.fs refers to the the fs-extra package, so that you can use mkdirp, and readJson functions. 
you may specify your superglobal node_modules, like underscore, or async.js in the global-node_modules.js file in your project-root.
A note on logging. According to https://stackoverflow.com/questions/41502564/journalctl-user-units-output-disappears
user-services do not appear on unit logs. As a workaround use journalctl without unit definitions. For example jurnalctl -f
