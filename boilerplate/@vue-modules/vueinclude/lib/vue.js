module.exports = function(base_path, file_path) {
    var src_data = ß.fs.readFileSync(base_path + file_path, "UTF8");
    var dst_data = src_data;

    var dir = ß.path.dirname(ß.VAR + "/vue-include/" + file_path);
    ß.fs.ensureDirSync(dir);
  	//if (ß.fs.exsistSync(ß.VAR + "/vue-include/" + file_path)) return ß.err("[vue-include vue] Wont overwrite " + file_path);
    ß.fs.writeFileSync(ß.VAR + "/vue-include/" + file_path, dst_data);
};
