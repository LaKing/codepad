module.exports = function(parameters) { 
var dir = ß.CWD + "/orderlog/" + ß.date();
  	ß.fs.ensureDir(dir, function(err) {
     if (err) return đ(err);
          let i = parameters?.session?.user_profile?.billing?.email; //ł(parameters, "session.user_profile.billing.email")
        
          ß.fs.writeJson(dir + "/" + i + "_" + ß.time() + ".json", parameters);
    });
};