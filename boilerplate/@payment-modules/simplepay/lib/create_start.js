const https = require("https");

function random8() {
    return Math.random()
        .toString(36)
        .substr(2, 8);
}

/* @DOC
	
    As the first step, the simplepay method's `create_start` will create the remote payment.
    As a result, we will recieve an object with the paymentUrl property, that we should redirect to.
    So we will send a post-request to simplepay
    
*/

var simplepay_hostname = "secure.simplepay.hu";
if (ß.DEBUG || ß.MODE !== "production") simplepay_hostname = "sandbox.simplepay.hu";

module.exports = function(data, callback) {
    if (!data) data = {};
    if (!callback) callback = Ł;

    // calculate timeout
    const now = new Date();
    now.setHours(now.getHours() + 3);
    const timeout = now.toISOString().split(".")[0] + "+02:00";

    // if the input data object has any missing fields buest guess them
    if (!data.salt) data.salt = random8() + random8() + random8() + random8();
    if (!data.merchant) data.merchant = ß.simplepay_config.merchant;
    if (!data.orderRef) data.orderRef = random8() + random8();
    if (!data.customerEmail) data.customerEmail = "tester@D250.hu";
    if (!data.language) data.language = "HU";
    if (!data.currency) data.currency = "HUF";
    if (!data.sdkVersion) data.sdkVersion = "SimplePayV2.1_Payment_PHP_SDK_2.0.7_190701:dd236896400d7463677a82a47f53e36e";
    if (!data.methods) data.methods = ["CARD"];
    if (!data.timeout) data.timeout = timeout;
    if (!data.url) data.url = "https://" + ß.HOSTNAME + "/simplepay-return.html";
    if (!data.total) data.total = "1000"; // Strangely its a string.

    var simplepay_url = "secure.simplepay.hu";
    if (ß.DEBUG || ß.MODE !== "production") simplepay_url = "sandbox.simplepay.hu";

    // do it!
    const data_string = JSON.stringify(data);
    const options = {
        hostname: simplepay_hostname,
        port: 443,
        path: "/payment/v2/start",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": data_string.length,
            Signature: ß.lib.simplepay.get_hash(ß.simplepay_config.secretKey, data_string)
        }
    };

    const req = https.request(options, res => {
        //console.log(`statusCode: ${res.statusCode}`);
        res.on("data", d => {
            // we assume we get our data at once.
            if (d.errorCodes) ß.err("Simplepay error: " + d.errorCodes);
            callback(null, JSON.parse(d.toString()));
        });
    });

    req.on("error", error => {
        ß.err("There was an error in a simplepay transaction.");
        console.error(error);
    });

    req.write(data_string);
    req.end();
};
