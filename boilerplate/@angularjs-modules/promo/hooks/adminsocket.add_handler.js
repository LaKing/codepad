/*ßoilerplate */

const fs = ß.fs;

//const ss = require('socket.io-stream');

const truncate = require("truncate-utf8-bytes");

const illegalRe = /[\/\?<>\\:\*\|":]/g;
const controlRe = /[\x00-\x1f\x80-\x9f]/g;
const reservedRe = /^\.+$/;
const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
const windowsTrailingRe = /[\. ]+$/;

function sanitize(input, replacement) {
    var sanitized = input.replace(illegalRe, replacement).replace(controlRe, replacement).replace(reservedRe, replacement).replace(windowsReservedRe, replacement).replace(windowsTrailingRe, replacement);
    return truncate(sanitized, 255);
}

function toUri(input) {
    return sanitize(input.toLowerCase(), '').replace(/[őóö]/ig, "o").replace(/[úűü]/ig, "u").replace(/á/ig, "a").replace(/é/ig, "e").replace(/í/ig, "i").replace(/[\s,.:?!]/ig, "-");
}


module.exports = function(socket) {

    var img = '/tmp/' + socket.handshake.session.passport.user + '-promo-image-file.jpg';

    ß.socketiostream(socket).on('upload-promo-image', function(stream) {
        console.log("upload-promo-image");
        stream.pipe(fs.createWriteStream(img));
        console.log("socket-stream id:", socket.id);
    });

    socket.on("save-promo", function(data) {
        console.log("socket-stream-id:", socket.id);
        var uri = toUri(data.promo.name);
        var path = ß.CWD + '/promo/' + uri;
        console.log("SAVE-PROMO", uri, data);

        fs.mkdirp(path, function(err) {
            if (err) return console.log(err);

            fs.writeFile(path + '/data.json', JSON.stringify(data, null, 2), function(err) {
                if (err) console.log(err);
            });

            fs.copy(img, path + '/image.jpg', function(err) {
                if (err) return console.log(err);
                console.log('success!');
                socket.emit('success', '/promo/' + uri);
            });

        });

    });
};
