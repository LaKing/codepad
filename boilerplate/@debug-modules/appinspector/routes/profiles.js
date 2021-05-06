const ejsfile = ß.get_module_path("appinspector", "public/dump.ejs");

ß.app.use(ß.express.static(ß.APPINSPECTOR_SAVEDIR, ß.STATIC_OPTIONS));
ß.app.use(ß.express.static(ß.get_module_path('appinspector','node_modules/d3'), ß.STATIC_OPTIONS));
//ß.app.use(ß.express.static(ß.get_module_path('appinspector','node_modules/d3-scale/dist'), ß.STATIC_OPTIONS));

ß.app.all("/profiles/:profilefile", function (req, res) {
    let profilefile = "https://" + ß.HOSTNAME + "/" + req.params.profilefile;
    res.render(ejsfile, {
        PROFILEFILE: profilefile,
    });
});
