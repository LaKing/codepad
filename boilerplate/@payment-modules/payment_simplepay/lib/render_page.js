/*ßoilerplate */

module.exports = function(req, res, next) {
	
  	if (!req.user) return res.send('NO');
  
    const generate_simplepay_formdata = ß.lib.payment_simplepay.generate_formdata;

    var ejsfile = ß.views(req, 'simplepay.ejs');
    
  	const id = req.user._id; //req.session.passport.user
    ß.User.findById(id, function(err, user) {
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
            console.log("ERROR in render payment - no ruser");
            res.send("Mission Failed. No payment.");
            return;
        }

        var p = ß.lib.payment.calculate_parameters(req.session, user.payments[user.payments.length - 1]);
        res.status(200);
        res.render(ejsfile, {
            lang: req.session.lang.toUpperCase(),
            host: ß.HOSTNAME,
            p: p,
            f: generate_simplepay_formdata(p)
        });
    });
};
