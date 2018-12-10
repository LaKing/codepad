/*ßoilerplate */

module.exports = function() {

    var projectfiles = {};
    // make a copy, but dont use the editor object for example, only that what is used in the client.

    for (let i in ß.projectfiles) {
        projectfiles[i] = {};
		
        if (ß.projectfiles[i].realpath !== ß.projectdir + i) projectfiles[i].sl = true;
      
        if (ß.projectfiles[i].at)
            for (let u in ß.projectfiles[i].at) {
                for (let s in ß.projectfiles[i].at[u]) {
                    if (ß.io.sockets.sockets[s] != undefined) {
                        // add it to our object to be sent
                        if (!projectfiles[i].at) projectfiles[i].at = {};
                        if (!projectfiles[i].at[u]) projectfiles[i].at[u] = {};
                        if (ß.projectfiles[i].at[u][s]) projectfiles[i].at[u][s] = ß.projectfiles[i].at[u][s];
                    }
                }
            }
    }

    for (let i in ß.io.sockets.sockets) {
        let socket = ß.io.sockets.sockets[i];
        if (socket.files_socket) socket.emit('files', projectfiles);
    }

};
