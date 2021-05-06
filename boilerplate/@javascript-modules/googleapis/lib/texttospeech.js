/*ßoilerplate */

// ß.googleapis_scopes = ['https://www.googleapis.com/auth/cloud-platform'];

// https://cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize

const texttospeech = ß.google.texttospeech("v1");

module.exports = async function(lang, text, callback) {
    if (!callback) callback = function() {};
    await ß.isDefined("googleapis_authorised");

    const request = {
        requestBody: {
            input: { text: text },
            // Select the language and SSML Voice Gender (optional)
            voice: { languageCode: lang },
            // Select the type of audio encoding
            audioConfig: { audioEncoding: "MP3" } // LINEAR16 // OGG_OPUS
        }
    };

    texttospeech.text.synthesize(request, function(err, response) {
        if (err) {
            console.error("ERROR in google text-to-speech", err);
            return callback(err, null);
        }

        return callback(null, response.data.audioContent);
    });
};
