/*ßoilerplate */
const sheets = ß.google.sheets("v4");

// however, if using google's imgserviceaccount, the spreadsheet will be created there - i think

module.exports = function(callback) {
    if (!callback) callback = function() {};

    // TODO await ß.isDefined('googleapis_authorised');

    ß.jwtClient.authorize(function(err, tokens) {
        if (err) {
            console.log("ERROR in google jwtClientAuth", err);
            return callback(err, null);
        } else {
            var request = {
                auth: ß.jwtClient
            };

            sheets.spreadsheets.create(request, function(err, response) {
                if (err) {
                    console.error("ERROR in googleapis spreadsheet.values.get", err);
                    return callback(err, null);
                }

                console.log("Sucessfully created spreeadsheet", JSON.stringify(response, null, 2));
                callback(null, response.data.spreadsheetId);
            });
        }
    });
};
