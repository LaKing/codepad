/*ßoilerplate */

module.exports = function(calendarId, eventId, resource, callback) {
    if (!callback) callback = function() {};

    // TODO await ß.isDefined('googleapis_authorised');

    ß.jwtClient.authorize(function(err, tokens) {
        if (err) {
            console.log("ERROR Google jwtClient.authorize calendar connection failed!", err);
            return callback(err, null);
        } else {
            console.log("Google calendar - Successfully connected!", calendarId);

            let calendar = ß.google.calendar("v3");
            calendar.events.update(
                {
                    auth: ß.jwtClient,
                    calendarId: calendarId,
                    eventId: eventId,
                    resource: resource
                },
                function(err, response) {
                    if (err) console.log("google_calendar - API returned an error in events.update:", err);
                    return callback(err, response);
                }
            );
        }
    });
};
