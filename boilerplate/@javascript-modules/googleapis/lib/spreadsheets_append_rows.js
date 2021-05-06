/*ßoilerplate */

const sheets = ß.google.sheets("v4");

// EXAMPLE for arguments
// var spreadsheetId = "1-F1xj5vyiCFIMb0O3lUJjrd2TJ5eOirFeGt5hZGg2ew";
// var range = "Menu!A1:E10";
// var data = [
//     [1, 2, 3],
//     [4, 5, 6]
// ];

// data is an array of arrays
module.exports = function(spreadsheetId, range, data, callback) {
    if (!callback) callback = function() {};

    // TODO await ß.isDefined('googleapis_authorised');

    ß.jwtClient.authorize(function(err, tokens) {
        if (err) {
            console.log("ERROR in google jwtClientAuth", err);
            return callback(err, null);
        } else {
            var request = {
                spreadsheetId: spreadsheetId,
                range: range,
                valueInputOption: "RAW",
                insertDataOption: "INSERT_ROWS",
                resource: {
                    majorDimension: "ROWS",
                    values: data
                },
                auth: ß.jwtClient
            };

            sheets.spreadsheets.values.append(request, function(err, response) {
                if (err) {
                    console.error("ERROR in googleapis spreadsheet.values.append", err);
                    return callback(err, null);
                }

                console.log("Sucessfully appended", Object.entries(response.data.updates).join("; "));
                callback(null, response.data.values);
            });
        }
    });
};
