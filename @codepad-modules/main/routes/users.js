ß.app.all('/users', function(req,res,next) {

    let n = ß.io.of("/p").sockets.size + ß.io.of("/main").sockets.size + ß.io.of("/log").sockets.size;
    
    let users = {};
    
    for (let i in ß.projectfiles) {
        if (!ß.projectfiles[i].file) continue;

        // check for files at users
        if (ß.projectfiles[i].at)
            for (let u in ß.projectfiles[i].at) {
                users[u] = true;
            }
    }
    
   res.send(n + ' sockets. Editing users: ' + Object.keys(users).join(' '));
});