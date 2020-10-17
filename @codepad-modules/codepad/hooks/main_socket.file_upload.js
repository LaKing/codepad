module.exports = function (socket) {
    socket.on("file_upload", (data, callback) => {
        // file.name // the file's name including extension
        // file.size // the size in bytes
        // file.type // file type ex. 'application/pdf'

        let filepath = data.path + "/" + data.name;

        ß.fs.writeFile(ß.PROJECTDIR + "/" + filepath, data.file, (err) => {
            if (err) {
                đ(err);
                ß.msg(socket.username + " file-upload-error ", filepath);
                ß.lib.projectfiles.oplog(socket.username, "file-upload-error", filepath);
                return callback(filepath, false);
            }
            ß.msg(socket.username + " file-upload ", filepath);
            ß.lib.projectfiles.oplog(socket.username, "file-upload", filepath);
            callback(filepath, true);
        });
    });
};
