/*jshint esnext: true */

module.exports = function(path, callback) {
  ß.fs.realpath(ß.projectdir + '/' + path, function(err, realpath) {
  	//Ł(path, err, realpath);  
    if (err) return callback(err, ß.projectdir + '/' + path);
    return callback(err, realpath);
  });
};