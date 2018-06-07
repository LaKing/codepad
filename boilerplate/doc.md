# The global ßoiler mechanism

## THE ß-variable
This is the primary global variable, visible in the global scope. 
Frequently used node_modules can be attached directly.
for example ß.fs is reference to the fs-extra
Instead of fs = require('fs') you can use ß.fs
By default, ß.fs refers to the the fs-extra package, so that you can use mkdirp, and readJson functions. 
you may specify your superglobal node_modules, like underscore, or async.js in the global-node_modules.js file in your project-root.
A note on logging. According to https://stackoverflow.com/questions/41502564/journalctl-user-units-output-disappears
user-services do not appear on unit logs. As a workaround use journalctl without unit definitions. For example jurnalctl -f

# The global ßoilerplate modules

## admin - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains static frontend assets.
- contains route definitions for the frontend.

  boiler-lib-functions:
```javascript
    ß.lib.admin.check_if_admin(id);
    ß.lib.admin.is_master_password(password);
```
  hook.functions:
```javascript
    adminsocket.delete-user(socket);
    adminsocket.get-users(socket);
    adminsocket.save-page(socket);
    adminsocket.save-user(socket);
    adminsocket.save-user-profile(socket);
```

## angularjs - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains static frontend assets.
- contains route definitions for the frontend.


## animate - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.


## bootstrap3 - boilerplate module

- uses npm packages.
- contains static frontend assets.
- contains route definitions for the frontend.


## debug - boilerplate module


  hook.functions:
```javascript
    socket.test(socket);
```

## favicon - boilerplate module

- uses npm packages.
- contains static frontend assets.
- backend start process functions.


## fontawesome4 - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.


## frontend - boilerplate module

- contains multilingual public frontend files.
- contains route definitions for the frontend.


## googleapis - boilerplate module

- activation based on a condition.
- uses npm packages.

  exposes into the global ß scope:
```javascript
    ß.google
const
if
ß.jwtClient
```
  boiler-lib-functions:
```javascript
    ß.lib.googleapis.calendar_list_events(calendarId, callback);
    ß.lib.googleapis.calendar_update_event(calendarId, eventId, resource, callback);
    ß.lib.googleapis.drive_list(callback);
    ß.lib.googleapis.spreadsheets_list(spreadsheetId, range, callback);
```

## jquery - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.


## language - boilerplate module

- defines keys the user model.
- backend init process functions.
- backend server process functions.
- backend start process functions.

  boiler-lib-functions:
```javascript
    ß.lib.language.change_handler();
    ß.lib.language.development();
    ß.lib.language.get_by_req(req);
    ß.lib.language.render_editor_file(lang, file);
    ß.lib.language.render_file(lang, file);
    ß.lib.language.request_handler();
    ß.lib.language.transpile(folder);
    ß.lib.language.update_user_lang(session, callback);
```

## logging - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains route definitions for the frontend.
- backend start process functions.

  boiler-lib-functions:
```javascript
    ß.lib.logging.get_logs_json(file, callback);
```
  hook.functions:
```javascript
    adminsocket_log.data(data);
```

## moment - boilerplate module

- uses npm packages.

  exposes into the global ß scope:
```javascript
    ß.moment
```

## mongo_express - boilerplate module

- backend start process functions.

  exposes into the global ß scope:
```javascript
    
    ß.mongo_express
ß.mongo_express_config
```

## mongoose - boilerplate module

- uses npm packages.
- backend init process functions.
- backend start process functions.

  exposes into the global ß scope:
```javascript
    ß.mongoose
ß.mongoose_collections
```
  boiler-lib-functions:
```javascript
    ß.lib.mongoose.config_mongodb();
    ß.lib.mongoose.define(name);
```
  hook.functions:
```javascript
```

## nodemailer - boilerplate module

- uses npm packages.
- backend init process functions.


## offline - boilerplate module

- contains static frontend assets.


## passport - boilerplate module

- uses npm packages.
- defines keys the user model.
- defines methods for the user model.
- contains multilingual public frontend files.
- contains route definitions for the frontend.
- backend init process functions.

  exposes into the global ß scope:
```javascript
    ß.passport
ß.bcrypt
```
  boiler-lib-functions:
```javascript
    ß.lib.passport.isLoggedIn(req, res, next);
```
  hook.functions:
```javascript
    user_registration.send_hash(user);
```
  calling hooks:
```javascript
    ß.run_hooks("user_registration",newUser);
ß.run_hooks("user_login",user);
ß.run_hooks("user_registration",newUser);
ß.run_hooks("user_registration",luser);
```

## passport_facebook - boilerplate module

- uses npm packages.
- defines keys the user model.
- contains route definitions for the frontend.

  boiler-lib-functions:
```javascript
    ß.lib.passport_facebook.config_auth();
```

## passport_google - boilerplate module

- uses npm packages.
- defines keys the user model.
- contains route definitions for the frontend.

  boiler-lib-functions:
```javascript
    ß.lib.passport_google.config_auth();
```

## passport_hash - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.

  boiler-lib-functions:
```javascript
    ß.lib.passport_hash.hash(str);
    ß.lib.passport_hash.send(id);
    ß.lib.passport_hash.verify(req, res, callback);
```

## payment - boilerplate module

- defines keys the user model.
- defines methods for the user model.
- contains multilingual public frontend files.
- contains static frontend assets.
- contains route definitions for the frontend.
- backend init process functions.
- backend start process functions.

  boiler-lib-functions:
```javascript
    ß.lib.payment.calculate_parameters(session, q);
    ß.lib.payment.initialize_payment(session, callback);
    ß.lib.payment.paymentlibmodule.exports = that;;
    ß.lib.payment.payment_success(ref);
    ß.lib.payment.purge(user);
    ß.lib.payment.render_page(req, res, next);
```
  calling hooks:
```javascript
    ß.run_hooks('payment_success',ref);
```

## payment_barion - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains route definitions for the frontend.
- backend init process functions.

  boiler-lib-functions:
```javascript
    ß.lib.payment_barion.get_payment_items(p);
    ß.lib.payment_barion.process_callback(ref, paymentId, callback);
    ß.lib.payment_barion.render_page(req, res, next);
```

## payment_braintree - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains static frontend assets.
- contains route definitions for the frontend.
- backend init process functions.

  exposes into the global ß scope:
```javascript
    ß.braintree
```
  boiler-lib-functions:
```javascript
    ß.lib.payment_braintree.prepare_token(req, res, next, callback);
    ß.lib.payment_braintree.render_page(req, res, next);
```

## payment_simplepay - boilerplate module

- contains multilingual public frontend files.
- contains route definitions for the frontend.
- backend init process functions.

  boiler-lib-functions:
```javascript
    ß.lib.payment_simplepay.check_ipn_validation(data);
    ß.lib.payment_simplepay.generate_formdata(p);
    ß.lib.payment_simplepay.make_ipn_response(data);
    ß.lib.payment_simplepay.render_page(req, res, next);
```

## profile - boilerplate module

- defines keys the user model.
- contains multilingual public frontend files.

  hook.functions:
```javascript
    socket.save-profile(socket);
```

## promo - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains route definitions for the frontend.

  hook.functions:
```javascript
    adminsocket.add_handler(socket);
```

## server - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.
- backend init process functions.
- backend server process functions.
- backend start process functions.

  exposes into the global ß scope:
```javascript
    ß.express
    ß.socketiostream
```
  boiler-lib-functions:
```javascript
    ß.lib.server.config_mongodb();
    ß.lib.server.serve_static(folder);
```
  hook.functions:
```javascript
```
  calling hooks:
```javascript
    ß.run_hooks('socket',socket);
ß.run_hooks('adminsocket',socket);
```
Static assets like css files can be placed in any module or the project root, in a /static folder
Data representing assets like json files can be placed in any module or the project root, in a /data folder

## session - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains route definitions for the frontend.

  exposes into the global ß scope:
```javascript
    ß.session
```
  boiler-lib-functions:
```javascript
    ß.lib.session.update_user(session, user);
```
  hook.functions:
```javascript
    socket.session-data(socket);
```
  calling hooks:
```javascript
    ß.run_hooks("session_update_user",session,user);
```

## settings - boilerplate module

- backend init process functions.

  exposes into the global ß scope:
```javascript
    ß.settings_file
```
  boiler-lib-functions:
```javascript
    ß.lib.settings.readSync();
```
  hook.functions:
```javascript
    adminsocket.get-settings(socket);
    adminsocket.save-settings(socket);
```

## smartforms - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains static frontend assets.
- contains route definitions for the frontend.
- backend start process functions.

  boiler-lib-functions:
```javascript
    ß.lib.smartforms.get_smartform_schema(file);
```

## szamlazz - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.
- backend init process functions.

  exposes into the global ß scope:
```javascript
    ß.szamlazz
```
  boiler-lib-functions:
```javascript
    ß.lib.szamlazz.get_client(payment);
    ß.lib.szamlazz.get_seller(payment);
    ß.lib.szamlazz.makeInvoice(userid, paymentid);
```
  hook.functions:
```javascript
    payment_success.make_invoice(ref);
```
  calling hooks:
```javascript
    ß.run_hooks('invoice_created',{
```

## verify - boilerplate module

- uses npm packages.

  boiler-lib-functions:
```javascript
    ß.lib.verify.email(address, callback);
```

