/*ßoilerplate */

/*
npm install szamlazz.js

Vezetéknév Teszter
Keresztnév Eszter
Email tester@d250.hu
Azonosító tester@d250.hu

https://www.szamlazz.hu/szamla/docs/SzamlaAgent.zip

*/

// TODO@LAB elektronikus nyugta implementálása

//const HOSTNAME = require("os").hostname();

const fs = ß.fs;
const szamlazz = ß.szamlazz;

function convertItems(s) {
    var r = [];
    var it;
    for (var i = 0; i < s.length; i++) {
        it = s[i];
        r[i] = new szamlazz.Item({
            label: it.code + " " + it.name,
            comment: it.info,
            quantity: it.qty,
            unit: it.unit,
            vat: it.vat,
            netUnitPrice: it.net
        });
    }
    return r;
}

function convertBuyer(user) {
    var r = {
        name: "Ismeretlen Név",
        country: "Magyarország",
        zip: "0000",
        city: "Budapest",
        address: "Ismeretlen cím.",
        issuerName: "",
        identifier: 1,
        phone: "",
        comment: ""
    };

    if (user.profile) {
        r.name = user.profile.email || "unknown-user@" + ß.HOSTNAME;
        r.name = user.profile.name || "Ismeretlen Felhasználó";
    }

    if (user.billing) {
        if (user.billing.name) r.name = user.billing.name;
        if (user.billing.zip) r.zip = user.billing.zip;
        if (user.billing.city) r.city = user.billing.city;
        if (user.billing.address) r.address = user.billing.address;
        if (user.billing.taxNumber) r.taxNumber = user.billing.taxNumber;
        if (user.billing.phone) r.phone = user.billing.phone;
    }

    return r;
}

module.exports = function(userid, paymentid) {
    // TODO@LAB ha nincs kitöltve Billing, akkor elektronikus nyugtát kellene adni!

    ß.User.findById(userid, function(err, user) {
        if (err) return console.log("ERROR in payment ", userid, paymentid, err);
        if (!user) return console.log("ERROR szamlazz USER not found", userid);

        var payment = user.getPayment(paymentid);
        if (!payment.items) return console.log("NO payment items");

        // pass payment as argument, it may have infos about how to configure the client/seller
        const szamlazzClient = ß.lib.szamlazz.get_client(payment);
        const seller = ß.lib.szamlazz.get_seller(payment);

        let buyer = new szamlazz.Buyer(convertBuyer(user));

        let invoice = new szamlazz.Invoice({
            paymentMethod: szamlazz.PaymentMethod.CreditCard, // optional, default: BankTransfer
            currency: szamlazz.Currency.Ft, // optional, default: Ft
            language: szamlazz.Language.Hungarian, // optional, default: Hungarian
            seller: seller, // the seller, required
            buyer: buyer, // the buyer, required
            items: ß.lib.szamlazz.convert_items(payment.items) // the sold items, required
        });

        szamlazzClient.issueInvoice(invoice, (e, result) => {
            if (e) {
                console.log("ERROR @ szamlazzClient.issueInvoice", e.message, e.code); // handle errors
                return console.log("ERROR at invocie creation.");
            }

            if (result.pdf) {
                fs.mkdirp(ß.CWD + "/user/" + userid + "/invoice", function(err) {
                    if (err) return console.log("Could not create invoice folder.", err);
                    var file = ß.CWD + "/user/" + userid + "/invoice/" + paymentid + ".pdf";
                    // a Buffer with the pdf data is available if requestInvoiceDownload === true
                    fs.writeFile(file, result.pdf, err => {
                        if (err) throw err;
                        ß.msg("The invoice has been saved to " + file);
                        //console.log("https://" + HOSTNAME + '/' + userid + '-' + paymentid + '.pdf');
                        ß.run_hook("invoice_created", {
                            user: user,
                            userid: userid,
                            paymentid: paymentid,
                            file: file
                        });
                    });
                });
            }
        });
    });
};
