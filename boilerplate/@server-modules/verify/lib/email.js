/*ßoilerplate */

/* @DOC

	The verify module's email-verify checks the validation of email addresses via SMTP connection.
	It fails if there is no domain, or no address that can recieve a message.

*/

const verifier = require("email-verify");
/*  https://github.com/EmailVerify/email-verify#readme
The callback is a function(err, info) that has an info object:
{
  success: boolean
  info: string
  addr: the address being verified
  code: info code saying things on verification status
  banner: how server advertize itself
}
*/
var infoCodes = verifier.infoCodes;

var options = {};
/*
The options are:
{
  port : integer, port to connect with defaults to 25
  sender : email, sender address, defaults to name@example.org
  timeout : integer, socket timeout defaults to 0 which is no timeout
  fqdn : domain, used as part of the HELO, defaults to mail.example.org
  dns: ip address, or array of ip addresses (as strings), used to set the servers of the dns check,
  ignore: set an ending response code integer to ignore, such as 450 for greylisted emails
}
*/
// make sure options have some reasonable defaults
if (ß.VERIFY_EMAIL_OPTIONS) options = ß.VERIFY_EMAIL_OPTIONS;
if (!options.sender) options.sender = "test@" + ß.HOSTNAME;
if (!options.fqdn) options.fqdn = ß.HOSTNAME;

/*  We mostly need the bool value, but pass the whole info object.
 * 
 *	returns callback(err, info.success, info)
 *	err - an eror object
 * 	info.success - bool
 *	info - string
 * 
 */
module.exports = function(address, callback) {
    if (address.split("@")[1] === ß.HOSTNAME) return callback(null, true, "@localhost");

    verifier.verify(address, options, function(err, info) {
        if (err) return callback(err, false, "");

        if (!info.success) ß.debug("Verify failed on " + address + "Info: " + info.info + " #code:" + info.code);
        callback(null, info.success, info);
    });
};
