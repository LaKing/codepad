//	ß.lib.passport_loginlog.by_id(id);

module.exports = function(user) {
    if (!user) return ß.err("No user. Could not log to loginlog");

    //user.loginlog.addToSet(new Date());

  var now = new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var day = now.getDate();
    if (day < 10) day = "0" + day;

    var hour = now.getHours();
    var stamp = year + "-" + month + "-" + day + ":" + hour;

    if (user.loginlog.indexOf(stamp) < 0) {
        user.loginlog.push(stamp);
        user.save(function(err) {
            if (err) return đ(err);
        });
    }
};
