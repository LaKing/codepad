// we have this mechanism against brute force attacks
var o = {};

module.exports = function login_delay(email, ip, callback) {
    // we save the number of failed attempts
    if (!o[email]) o[email] = 1;
    else console.log("Possible brute-force attack on", email, o[email], "ip:", ip);

    // and increase the timeout seconds as more requests come in
    o[email]++;
    var timeout = o[email] * 1000;

    setTimeout(function() {
        // but decrease when they timeout, so that not so agressive attemts resolve
        if (o[email]) {
            o[email]--;
            if (o[email] <= 1) delete o[email];
        }

        // and finally let the user get the result
        callback();
    }, timeout);
};
