/*ßoilerplate */

module.exports = function(req, res, next) {
    if (!req.user) return res.send("NO");
    const id = req.user._id; //req.session.passport.user

    const User = ß.User;
    const HOSTNAME = ß.HOSTNAME;


  	//var ejsfile = ß.views(req, 'barion.ejs');
	var lang = req.session.lang || ß.DEFAULT_LANG || 'en';
	var ejsfile = ß.VAR + "/ejs/" + lang + '/barion.ejs';

    User.findById(id, function(err, user) {
        if (err) {
            console.log("ERROR in render payment", err);
            res.send("Mission Failed. Error.");
            return;
        }
        if (!user) {
            console.log("ERROR in render payment - no ruser");
            res.send("Mission Failed. No user.");
            return;
        }

        if (user.payments.length < 1) {
            console.log("ERROR in render payment - no payment");
            res.send("Mission Failed. No payment.");
            return;
        }

        var p = ß.lib.payment.calculate_parameters(req.session, user.payments[user.payments.length - 1]);
        res.status(200);
        res.render(ejsfile, {
            lang: req.session.lang.toUpperCase(),
            host: HOSTNAME,
            p: p
        });
    });
};
