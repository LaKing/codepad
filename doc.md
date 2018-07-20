# The global ßoiler mechanism

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

# The global ßoilerplate modules

## angularjs - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.


## basicauth - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.
- backend init process functions.

  boiler-lib-functions:

    ß.lib.basicauth.passwords();


## beautify - boilerplate module

- uses npm packages.

  exposes into the global ß scope:

    ß.beautify

  hook.functions:

    socket.beautify(socket);


## codemirror - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.

  exposes into the global ß scope:

    if


## exec - boilerplate module


  hook.functions:

    socket.exec(socket);


## favicon - boilerplate module

- uses npm packages.
- contains static frontend assets.
- backend start process functions.


## filetree - boilerplate module

- contains  frontend files.
- contains static frontend assets.
- contains route definitions for the frontend.

  boiler-lib-functions:

    ß.lib.filetree.send_files();

  hook.functions:

    socket.files(socket);


## index - boilerplate module

- uses npm packages.
- contains  frontend files.
- contains static frontend assets.
- contains route definitions for the frontend.


## lint - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.


## logs - boilerplate module

- contains  frontend files.
- contains route definitions for the frontend.
- backend start process functions.

  exposes into the global ß scope:

    if

  boiler-lib-functions:

    ß.lib.logs.send_log send_log();
    ß.lib.logs.send_logline send_logs(data);
    ß.lib.logs.send_logs send_logs(data);
    ß.lib.logs.term2html term2html(text, options);

  hook.functions:

    socket.sendlog(socket);


## ot - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.

  hook.functions:

    socket.connection(socket);

  calling hooks:

    ß.run_hooks('edit',socket,this.docId);


## pad - boilerplate module

- contains  frontend files.
- contains static frontend assets.
- contains route definitions for the frontend.


## projectfiles - boilerplate module

- contains route definitions for the frontend.
- backend init process functions.
- backend start process functions.

  exposes into the global ß scope:

    ß.projectfiles
ß.projectdir
ß.file_write_operation_inprogress

  boiler-lib-functions:

    ß.lib.projectfiles.create(entry, callback);
    ß.lib.projectfiles.operation(socket, revision);
    ß.lib.projectfiles.oplog(username, opname, filepath);
    ß.lib.projectfiles.opntc(msg);
    ß.lib.projectfiles.save(projectfile, content);
    ß.lib.projectfiles.update();
    ß.lib.projectfiles.updateSync();

  hook.functions:



## search - boilerplate module

- contains  frontend files.
- contains route definitions for the frontend.

  boiler-lib-functions:

    ß.lib.search.replace(file, search, replace, callback);


## server - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.
- backend server process functions.
- backend start process functions.

  exposes into the global ß scope:

    ß.express
    ß.socketiostream

  boiler-lib-functions:

    ß.lib.server.config_mongodb();
    ß.lib.server.serve_static(folder);

  hook.functions:


  calling hooks:

    ß.run_hooks('socket',socket);

Static assets like css files can be placed in any module or the project root, in a /static folder
Data representing assets like json files can be placed in any module or the project root, in a /data folder

## session - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.

  exposes into the global ß scope:

    ß.session

  boiler-lib-functions:

    ß.lib.session.update_user(session, user);

  hook.functions:

    socket.session-data(socket);

  calling hooks:

    ß.run_hooks("session_update_user",session,user);


## settings - boilerplate module

- backend init process functions.

  exposes into the global ß scope:

    ß.settings_file

  boiler-lib-functions:

    ß.lib.settings.readSync();

  hook.functions:

    adminsocket.get-settings(socket);
    adminsocket.save-settings(socket);


## wetty - boilerplate module

- contains  frontend files.
- contains route definitions for the frontend.
- backend start process functions.

  exposes into the global ß scope:



