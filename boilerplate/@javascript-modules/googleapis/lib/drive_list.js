/*ßoilerplate */

const drive = ß.google.drive("v3");

module.exports = function(callback) {
    if (!callback) callback = function() {};

    // TODO await ß.isDefined('googleapis_authorised');

    ß.jwtClient.authorize(function(err, tokens) {
        if (err) {
            console.log("ERROR in google jwtClientAuth.authorize", err);
            return callback(err, null);
        } else {
          	          
            var request = {
            	auth: ß.jwtClient,
              	fields: "*"
            };

            drive.files.list(request, function(err, response) {
                if (err) {
                    console.error("ERROR in google drive.files.list", err);
                  	ß.logfs(err);
                    return callback(err, null);
                }
				ß.debug_logfs(response);
                if (response.data) console.log("Sucessfully fetched", response.data.files.length);
                callback(null, response.data.files);
            });
        }
    });
};
