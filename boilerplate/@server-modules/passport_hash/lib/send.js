/*ßoilerplate */



module.exports = function(id, callback) {

  	if (!callback) callback = function() {};
  
    const transporter = ß.transporter;
  	if (!transporter) {
     	console.log('ERROR No ß.transporter for EMAIL sending @passport_hash. Module nodemailer enabled?');
    	return callback(new Error('ERROR No transporter.'));
    }
    const User = ß.User;
    const lib = ß.lib;
    const HOSTNAME = ß.HOSTNAME;

    User.findById(id, function(err, user) {
        if (err) return console.log(err);
        if (!user) return console.log("Error. Local-verification - user could not be located for ", id);
        
        //Ł(user, typeof user.local.email);
        
        if (user.local.email) {        
            if (user.local.email.indexOf('@') < 0) {
              console.log("Invalid email address ", user.local.email);
              return callback(new Error('ERROR Invalid email address.'));
            }
        } else {
          console.log("ERROR No local email address ", user.local.email);
          return callback(new Error('ERROR No local address.'));
        }        
        var link = "https://" + HOSTNAME + "/hash/" + user.local.email.toLowerCase() + "/" + id + '/' + lib.passport_hash.hash(user.local.email);

        var subject = "Login to " + HOSTNAME;
        var html = '';
        var test = '';

        var text = '';

        if (user.local.verified == false) subject = ß.translate(user.lang, "##&en Confirm registration to ##&hu Regisztráció megerősítése ##") + ' ' + HOSTNAME;

		text += ß.translate(user.lang, "##&en Please visit the following link, to log in ##&hu Kérjük lépjen be ennek a linknek s használatával: ##");

        html += '<h2>' + subject + '</h2><br><b>' + text + '</b><a href = "' + link + '">' + link + '</a><br><br>';

        if (ß.mail_string) html += ß.mail_string;

        let mailOptions = {
            from: 'webmaster@' + HOSTNAME,
            to: user.local.email, // list of receivers
            subject: subject, // Subject line
            html: html, // html body
            text: text + ' ' + link, // plain text body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('ERROR in passport_hash send sendMail command.', error);
                return callback(error);
            }
            console.log('Verification Message sent:', user.local.email, info.messageId, link);
            return callback(null);
        });
    });
};
