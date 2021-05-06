
module.exports = function(base_path, file_path) {
    // @DOC clouddir txt files are prepared for vue

    var content = ß.fs.readFileSync(base_path + file_path, "UTF8");
    var div_class = "vue-include";

    var dir = ß.path.dirname(ß.VAR + "/vue-include/" + file_path);
    ß.fs.ensureDirSync(dir);
    //if (ß.fs.exsistSync(ß.VAR + "/vue-include/" + file_path + ".vue")) return ß.err("[vue-include html]Wont overwrite " + file_path + ".vue");
    ß.fs.writeFileSync(ß.VAR + "/vue-include/" + file_path + ".vue", '<template><div class="' + div_class + '">' + content.replace(/(?:\r\n|\r|\n)/g, '<br>') + "</div></template>");
};
