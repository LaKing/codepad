/*ßoilerplate */

/// ---- auth ----------
if (ß.basic_auth) {
    ß.app.use(ß.basicAuth(ß.basic_auth));

    console.log("- using basic-auth " + ß.USERS_DIR);
} else console.log("- NOT using basic-auth");
