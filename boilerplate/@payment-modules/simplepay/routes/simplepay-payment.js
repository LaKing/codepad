/* jshint esversion: 9 */

// @DOC The frontend simplepay component initiates a payment with a post-request

ß.app.post("/simplepay-payment.json", function(req, res) {
    let request_data = req.body;
    // use the language on the payment page
    request_data.lang = req.session.lang;
    
    ß.lib.simplepay.create_start(request_data, function(err, response_data) {
        if (err) {
            đ(err);
            res.json(err);
            return;
        }

        let simplepay = {
            ...request_data,
            ...response_data
        };

        simplepay.status = "STARTED";
        delete simplepay.salt;
        delete simplepay.sdkVersion;
        delete simplepay.methods;
        delete simplepay.timeout;

      	ß.lib.simplepay.session_payment(req.session, simplepay);

        //You may customize responses, response reactions
        res.json(response_data);
    });
});

/*

request_data

{ total: 11000, currency: 'HUF', lang: 'en' }

response_data

{ salt: 'kBdZnBaqA6yVZYl3xLDBKAALbuK4N5mQ',
merchant: 'S117001',
orderRef: 'l0sqrhpsvtni3qt5',
currency: 'HUF',
transactionId: 10273745,
timeout: '2020-04-24T07:23:17+02:00',
total: 11000,
paymentUrl:
'https://sandbox.simplepay.hu/pay/pay/pspHU/uRfr4bQbjTK_6vuWmiAeSNsjyc7iQwpfwSvu7MK04jrJIbWGDq' }


        "total": 11000,
        "currency": "HUF",
        "lang": "en",
        
        "salt": "8pxuy0m9sxv2qtd5kt4zu798m9t8dxc3",
        "merchant": "S117001",
        "orderRef": "uvxzbj61bxsecgyb",
        "customerEmail": "tester@D250.hu",
        "language": "HU",
        "sdkVersion": "SimplePayV2.1_Payment_PHP_SDK_2.0.7_190701:dd236896400d7463677a82a47f53e36e",
        "methods": [
          "CARD"
        ],
        "timeout": "2020-04-25T05:13:11+02:00",
        "url": "https://bp-devel.d250.hu/payment-complete"



        "salt": "PhFMtiRVSDTf6c3Aq3wKjqJWsfoCacD6",
        "merchant": "S117001",
        "orderRef": "uvxzbj61bxsecgyb",
        "currency": "HUF",
        "transactionId": 10274860,
        "timeout": "2020-04-25T05:13:11+02:00",
        "total": 11000,
        "paymentUrl": "https://sandbox.simplepay.hu/pay/pay/pspHU/021mhHhbrZMeAn0R18Weau0jhwLgjQK.wS9jKiomEm3Kd2c2Bm"
      
*/
