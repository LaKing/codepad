## The @passport_admin module
#### /@server-modules/passport_admin
The hook function for `socket.emit('admin-delete-user', id)` deletes the appropriate user by the given id.  
   If the id belongs to an admin then it won't be removed, otherwise the user will be deleted.  
   In the end updated users are emitted back via `socket.emit('users', data)`.


[`adminsocket.delete-user.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport_admin/hooks/adminsocket.delete-user.js?line=3)

The hook function for `socket.emit('get-users', arg)` finds the appropriate user/users by the given argument and emits these users back via `socket.emit('users', data)`.


[`adminsocket.get-users.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport_admin/hooks/adminsocket.get-users.js?line=3)

The hook function for `socket.emit('admin-save-user-profile', data)` updates the given user profile, billing and shipping informations on the profile page.


[`adminsocket.save-user-profile.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport_admin/hooks/adminsocket.save-user-profile.js?line=3)

The hook function for `socket.emit('admin-save-user', data)` saves and updates the given user datas.  
   This searches for the user by `data._id`.


[`adminsocket.save-user.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport_admin/hooks/adminsocket.save-user.js?line=3)

The lib-function `ß.lib.passport_admin.check_if_admin(id)` checks if the user with the given passport id has admin-level permissions on the website.  
Those id's can be set in the `config/admin-passports.json` file or, in debug mode if the file exists `config/admin-passports.debug.json` is used.


[`check_if_admin.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport_admin/lib/check_if_admin.js?line=3)

The lib-function `ß.lib.passport_admin.isLoggedInAdmin(req, res, next)` checks whether the authenticated user is either admin or not.   
   If the user is not authenticated as admin then redirect to the login page, or inform about the failure.


[`isLoggedInAdmin.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport_admin/lib/isLoggedInAdmin.js?line=3)

The lib-function `ß.lib.admin.is_master_password(password)` checks whether the given password is listed in the passwords config file `config/admin-passwords.json`.  
   Note that there is no username associated with the password, the admin user has access right to every passport id account.  
   The password listed here should be very hard to guess.


[`is_master_password.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport_admin/lib/is_master_password.js?line=3)

<pre>
hooks
 - adminsocket.delete-user.js
 - adminsocket.get-users.js
 - adminsocket.save-user-profile.js
 - adminsocket.save-user.js
lib
 - check_if_admin.js
 - isLoggedInAdmin.js
 - is_master_password.js
</pre>

