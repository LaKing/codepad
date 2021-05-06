/*ßoilerplate */

const drive = ß.google.drive("v3");

module.exports = function(name, folder, callback) {
    if (!callback) callback = function() {};

    // TODO await ß.isDefined('googleapis_authorised');

    ß.jwtClient.authorize(function(err, tokens) {
        if (err) {
            console.log("ERROR in google jwtClientAuth.authorize", err);
            return callback(err, null);
        } else {
          	          
            var request = {
            	auth: ß.jwtClient,
              	mimeType: 'application/vnd.google-apps.spreadsheet',
                name: name,
                parents: [folder]
            };

            drive.files.create(request, function(err, response) {
                if (err) {
                    console.error("ERROR in google drive.files.create", err);
                    return callback(err, null);
                }
				ß.debug_logfs(response);
                if (response.data) console.log("Sucessfully created", response.data);
                callback(null, response.data);
            });
        }
    });
};
