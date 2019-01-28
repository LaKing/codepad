/*ßoilerplate */

var a = [];

ß.lib.projectfiles.update();

// this is wathcin for changes on folders

setInterval(function() {

    // check if there is anyone connected 
    var q = true;
    for (let i in ß.io.sockets.sockets) {
        let socket = ß.io.sockets.sockets[i];
        if (socket.files_socket) q = false;
    }

    if (q) return; // Ł('quitters!');

    // if there are filesockets
    ß.lib.projectfiles.update();

    // check if there is a change
    let b = Object.keys(ß.projectfiles);
    if (a.length == b.length && a.every((v, i) => v === b[i])) return; //Ł('no-updates');
    a = Object.keys(ß.projectfiles);

    // nodejs has no native recursive filewatch for folders

    //Ł('UPDATE');
    // action
    ß.lib.projectfiles.update();
    ß.lib.filetree.send_files();

    //ß.lib.projectfiles.opntc('Filesystem-update');

}, 3000);
