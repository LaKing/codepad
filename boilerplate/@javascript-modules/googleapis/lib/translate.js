/*ßoilerplate */

// ß.googleapis_scopes = ['https://www.googleapis.com/auth/cloud-translation', 'https://www.googleapis.com/auth/cloud-platform'];
// 'https://www.googleapis.com/auth/translate' is NOT required.

const translate = ß.google.translate("v2");

module.exports = async function(lang, text, callback) {
    if (!callback) callback = function() {};

    var request = {
        //source: 'en',
        target: lang,
        q: text
        // or ... q: ['Hello World', 'How are you?']
    };
  
    await ß.isDefined('googleapis_authorised');
  
    translate.translations.translate(request, function(err, response) {
        if (err) {
            console.error("ERROR in google translate.translations.translate", err);
            return callback(err, null);
        }

        if (response.data.data.translations.length === 1) {
            console.log("Translated-string (" + request.target + ") ", response.data.data.translations[0].translatedText, " ## ", request.q);
            return callback(null, response.data.data.translations[0].translatedText);
        }

        console.log("Translated-array (" + request.target  + ") ", response.data.data.translations);
        return callback(null, response.data.data.translations);
    });
};
