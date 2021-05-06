/*ßoilerplate */
const ejsfile = ß.get_module_path('filetree','public/filetree.ejs');

ß.app.get('/files', function(req, res) {
  
    let theme = ß.THEME;
  	let username = ß.lib.basicauth.username_by_req(req);
    if (ß.settings[username]) if (ß.settings[username].theme) theme = ß.settings[username].theme;
  
    ß.run_hook("projectfiles_update");
  
    res.render(ejsfile, {
        theme: theme
    });
});
