/*ßoilerplate */

const p = ß.get_module_path('profile', '/public/profile.json');
const f = ß.lib.smartforms.get_smartform_schema(p);

for (var o in f) {

    ß.userModel[o] = f[o];

}