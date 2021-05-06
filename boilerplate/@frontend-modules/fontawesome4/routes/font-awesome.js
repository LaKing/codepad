/*ßoilerplate */

ß.app.use("/fonts", ß.express.static(ß.resolve_node_module_path("font-awesome/css"), ß.static_options));
ß.app.use("/fonts", ß.express.static(ß.resolve_node_module_path("font-awesome/fonts"), ß.static_options));
ß.app.use(ß.express.static(ß.resolve_node_module_path("font-awesome/css"), ß.static_options));
