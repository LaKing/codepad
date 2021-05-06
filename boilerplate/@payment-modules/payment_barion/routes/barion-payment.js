/*ßoilerplate */

const app = ß.app;
const barion_locales = ["hu-HU", "en-US", "de-DE", "fr-FR", "es-ES", "sk-SK", "sl-SI"];
const HOSTNAME = ß.HOSTNAME;

app.post("/barion-payment", function(req, res) {
    if (!req.user) return res.send("NO");

    var userId = req.session.passport.user;
    var language = req.session.lang || ß.DEFAULT_LANG || "en";

    ß.User.findById(req.session.passport.user, function(err, user) {
        if (err) {
            console.log("ERROR in barion-payment", err);
            res.send("Mission Failed. Error.");
            return;
        }
        if (!user) {
            console.log("ERROR in barion-payment - no ruser");
            res.send("Mission Failed. No user.");
            return;
        }

        var userEmail = "test@" + ß.HOSTNAME;
        if (user.profile) if (user.profile.email) userEmail = user.profile.email;

        var p = ß.lib.payment.paymentlib.calculate_item_totals(req.session.payment);
        var locale = "en-US";

        for (var l = 0; l < barion_locales.length; l++) {
            if (barion_locales[l].substring(0, 2) === language) locale = barion_locales[l];
        }

        // TODO@LAB ref-et hozzáadni?
        var ref = userId + "-" + req.session.payment._id;

        var paymentStartOptionsWithObject = {
            CallbackUrl: "https://" + HOSTNAME + "/barion-callback?ref=" + ref,
            RedirectUrl: "https://" + HOSTNAME + "/barion-return?ref=" + ref,
            POSKey: ß.barion_config.POSKey,
            PaymentType: "Immediate",
            GuestCheckOut: true,
            FundingSources: ["All"],
            //PaymentRequestId: "D250b3efb3f443328c246b13dcbaffff",
            Locale: locale,
            Currency: p.currency,
            Transactions: [
                {
                    //POSTransactionId: "aaaa-aaaa-aaaa-aaaa-0000",
                    Payee: ß.barion_config.payee,
                    Total: p.brutto,
                    Items: ß.lib.payment_barion.get_payment_items(p)
                }
            ]
        };

        ß.barion.startPayment(paymentStartOptionsWithObject, function(err, data) {
            if (err) {
                res.status(200).send("ERROR in barion.startPayment");
                return console.log("ERROR in barion.startPayment", err);
            }
            //console.log(data);

            // req.session.payment.barion_data = data;
            // data.PaymentId: '315fd8e5b9c44c07b839b6d1131ac6e8',
            // data.PaymentRequestId: 'D250b3efb3f443328c246b13dcbaffff',
            // data.Status: 'Prepared',
            req.session.payment.barion = {};
            req.session.payment.barion.status = data.Status;
            req.session.payment.barion.PaymentId = data.paymentId;

            var result = {};
            result.redirect = data.GatewayUrl;
            res.send(result);
        });
    });
});
