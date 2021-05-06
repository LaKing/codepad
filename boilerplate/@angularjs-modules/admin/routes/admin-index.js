/*ßoilerplate */

const lib = ß.lib;

const frontend_files = ß.select_by_prefix(ß.get_frontend_files(), 'app.');
const style_css_files = ß.to_style_html(ß.select_by_extension(frontend_files, '.css'));
const script_js_files = ß.to_script_html(ß.select_by_extension(frontend_files, '.js'));

const admin_frontend_files = ß.select_by_prefix(ß.get_frontend_files(), 'admin.');
const admin_style_css_files = ß.to_style_html(ß.select_by_extension(admin_frontend_files, '.css'));
const admin_script_js_files = ß.to_script_html(ß.select_by_extension(admin_frontend_files, '.js'));

const cb = function() {
    //Ł('session destruction');
};

ß.app.get('/admin', ß.lib.passport.isLoggedIn, function(req, res) {

    req.session.is_admin = false;

    if (req.session.passport)
        if (req.session.passport.user)
            req.session.is_admin = lib.admin.check_if_admin(req.session.passport.user);

    if (req.session.is_admin) {
        res.render(ß.views(req, 'admin.ejs'), {
            HOSTNAME: ß.HOSTNAME,
            lang: req.session.lang,
            styles: style_css_files + admin_style_css_files,
            scripts: script_js_files + admin_script_js_files
        });
    } else {
        req.logout();
        req.session.destroy(cb);
        res.redirect('/login');
    }

});