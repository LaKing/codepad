/*ßoilerplate */
const sheets = ß.google.sheets("v4");

// create a new sheet if not exists by title

module.exports = function(spreadsheetId, new_sheet, callback) {
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

                // check if response.data.seets has an element with title of new_sheet
                if (new_sheet.properties)
                    if (new_sheet.properties.title)
                        for (let i = 0; i < response.data.sheets.length; i++) {
                            if (response.data.sheets[i].properties)
                                if (response.data.sheets[i].properties.title)
                                    if (response.data.sheets[i].properties.title === new_sheet.properties.title) return callback(null, response.data.sheets[i]);
                        }
                // modify the request object for the update
                request.resource = {};
                request.resource.requests = [
                    {
                        addSheet: new_sheet
                    }
                ];
                // create a new sheet
                sheets.spreadsheets.batchUpdate(request, function(err, update_response) {
                    if (err) {
                        console.error("ERROR in googleapis spreadsheets.batchUpdate", err);
                        return callback(err, null);
                    }

                    callback(null, update_response.data);
                });
            });
        }
    });
};
