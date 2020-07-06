/*ßoilerplate */

// sl - symbolik link
// ro - readonly

module.exports = function() {
    var projectfiles = {};
    // make a copy, but dont use the editor object for example, only that what is used in the client.

  	// TODO there might be roop for optimalisation here, do we really need to send that so often?
  
    // files
    for (let i in ß.projectfiles) {
        if (!ß.projectfiles[i].file) continue;
        projectfiles[i] = {};

        // sl means symbolic link
        if (ß.projectfiles[i].realpath !== ß.PROJECTDIR + i) projectfiles[i].sl = true;
        if (ß.projectfiles[i].readonly) projectfiles[i].ro = true;
        if (ß.projectfiles[i].git) projectfiles[i].git = ß.projectfiles[i].git;

        // check for files at users
        if (ß.projectfiles[i].at)
            // i is projectfile index

            for (let u in ß.projectfiles[i].at) {
                // u is username

                for (let s in ß.projectfiles[i].at[u]) {
                    // s is the socket id of the last edit

                    // is that socket still here?
                    for (let x in ß.io.of("/p").sockets) {
                        if (ß.io.of("/p").sockets[x].id === s) {
                            // yes: add it to our object to be sent
                            if (!projectfiles[i].at) projectfiles[i].at = {};
                            if (!projectfiles[i].at[u]) projectfiles[i].at[u] = {};
                            if (ß.projectfiles[i].at[u][s]) projectfiles[i].at[u][s] = ß.projectfiles[i].at[u][s];
                        }
                    }
                }
            }
    }

    var projectfolders = {};
    // extract relevant folder objects

    // folders
    for (let i in ß.projectfiles) {
        if (!ß.projectfiles[i].folder) continue;
        projectfolders[i] = {};

        // sl means symbolic link
        if (ß.projectfiles[i].realpath !== ß.PROJECTDIR + i) projectfolders[i].sl = true;
        if (ß.projectfiles[i].readonly) projectfolders[i].ro = true;
    }

    ß.io.of("/main").emit("files", projectfiles);
    ß.io.of("/main").emit("folders", projectfolders);

    //Ł("RESULT",  projectfiles);

    //ß.fs.writeFile(ß.CWD + '/projectfiles.json', JSON.stringify(projectfiles, null, 2));
    //ß.fs.writeFile(ß.CWD + '/projectfolders.json', JSON.stringify(projectfolders, null, 2));

    //ß.debug('=> Update files and folders on main');
};
