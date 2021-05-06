/*ßoilerplate */

const frontend_files = ß.select_by_prefix(ß.get_frontend_files(), 'app.');
const style_css_files = ß.to_style_html(ß.select_by_extension(frontend_files, '.css'));
const script_js_files = ß.to_script_html(ß.select_by_extension(frontend_files, '.js'));

ß.app.get('/', function(req, res, next) {
    res.render(ß.views(req, 'index.ejs'), {
        HOSTNAME: ß.HOSTNAME,
        lang: ß.lib.language.get_by_req(req),
        styles: style_css_files,
        scripts: script_js_files
    });
});
