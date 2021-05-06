module.exports = function(session) {
  	if (!session) return;
    if (!session.passport) return;
    if (!session.passport.user) return;
  	var is_admin = ß.lib.passport_admin.check_if_admin(session.passport.user);
	if (is_admin) session.is_admin = true;
};