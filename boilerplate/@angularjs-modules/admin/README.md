## The @admin module
#### /@angularjs-modules/admin
The hook function `socket.emit('admin-delete-user', id)` deletes the appropriate user by the given id.  
   If the id belongs to an admin then it won't be removed, otherwise the user will be deleted.  
   In the end updated users are emitted back via `socket.emit('users', data)`.


[`adminsocket.delete-user.js:3`](https://bp-devel.d250.hu:9001/p/@angularjs-modules/admin/hooks/adminsocket.delete-user.js?line=3)

The hook function `socket.emit('get-users', arg)` finds the appropriate user/users by the given argument and emits these users back via `socket.emit('users', data)`.


[`adminsocket.get-users.js:3`](https://bp-devel.d250.hu:9001/p/@angularjs-modules/admin/hooks/adminsocket.get-users.js?line=3)

The hook function `socket.emit('admin-save-user-profile', data)` updates the given user profile, billing and shipping informations on the profile page.


[`adminsocket.save-user-profile.js:3`](https://bp-devel.d250.hu:9001/p/@angularjs-modules/admin/hooks/adminsocket.save-user-profile.js?line=3)

The hook function `socket.emit('admin-save-user', data)` saves and updates the given user datas.  
   This searches for the user by `data._id`.


[`adminsocket.save-user.js:3`](https://bp-devel.d250.hu:9001/p/@angularjs-modules/admin/hooks/adminsocket.save-user.js?line=3)

The lib-function `ß.lib.admin.check_if_admin(id)` checks if the user with the given passport id has admin-level permissions on the website.  
Those id's can be set in the `config/admin-passports.json` file or, in debug mode if the file exists `config/admin-passports.debug.json` is used.


[`check_if_admin.js:3`](https://bp-devel.d250.hu:9001/p/@angularjs-modules/admin/lib/check_if_admin.js?line=3)

The lib-function `ß.lib.admin.is_master_password(password)` checks whether the given password is listed in the passwords config file `config/admin-passwords.json`.  
   Note that there is no username associated with the password, the admin user has access right to every passport id account.


[`is_master_password.js:3`](https://bp-devel.d250.hu:9001/p/@angularjs-modules/admin/lib/is_master_password.js?line=3)

<pre>
hooks
 - adminsocket.delete-user.js
 - adminsocket.get-users.js
 - adminsocket.save-page.js
 - adminsocket.save-user-profile.js
 - adminsocket.save-user.js
lib
 - check_if_admin.js
 - is_master_password.js
public
 - admin-navigation.html
 - admin-settings.html
 - admin-users.html
 - admin.adminController.js
 - admin.editorController.js
 - admin.ejs
 - admin.promoController.js
 - admin.settingsController.js
 - admin.usersController.js
routes
 - admin-index.js
 - admin-jsoneditor.js
static
 - admin.css
</pre>

