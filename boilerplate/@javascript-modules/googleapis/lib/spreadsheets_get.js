/*ßoilerplate */
const sheets = ß.google.sheets("v4");

module.exports = function(spreadsheetId, callback) {
    if (!callback) callback = function() {};

    // TODO await ß.isDefined('googleapis_authorised');

    ß.jwtClient.authorize(function(err, tokens) {
        if (err) {
            console.log("ERROR in google jwtClientAuth", err);
            return callback(err, null);
        } else {
            var request = {
                spreadsheetId: spreadsheetId,
                ranges: [],
                auth: ß.jwtClient
            };

            sheets.spreadsheets.get(request, function(err, response) {
                if (err) {
                    console.error("ERROR in googleapis spreadsheets.get", err);
                    return callback(err, null);
                }

                callback(null, response.data);
            });
        }
    });
};
