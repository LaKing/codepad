
setInterval(function() {
    // check if there is anyone connected
    if (Object.keys(ß.io.of("/main").sockets).length < 1) return;

    ß.lib.projectfiles.check();

    if (ß.filetree_changed === false) return;
  	ß.filetree_changed = false;

    ß.lib.projectfiles.send_files();
    
}, 500);