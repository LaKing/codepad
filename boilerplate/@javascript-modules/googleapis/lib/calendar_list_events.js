/*ßoilerplate */

//https://stackoverflow.com/questions/44962062/accessing-google-calendar-api-from-node-server

module.exports = function(calendarId, callback) {
    if (!callback) callback = function() {};

    // TODO await ß.isDefined('googleapis_authorised');

    //authenticate request
    ß.jwtClient.authorize(function(err, tokens) {
        if (err) {
            console.log("ERROR Google jwtClient.authorize calendar connection failed!", err);
            return callback(err, null);
        } else {
            //console.log("Google calendar - Successfully connected!", calendarId);
            let calendar = ß.google.calendar("v3");
            calendar.events.list(
                {
                    auth: ß.jwtClient,
                    calendarId: calendarId,
                    singleEvents: true,
                    maxResults: 100,
                    timeMin: new Date().toISOString()
                },
                function(err, response) {
                    if (err) return console.log("ERROR calendar.events.list FAILED", calendarId);
                    console.log("google_calendar.list_events fetched", response.data.items.length, "from", calendarId);
                    return callback(err, response.data);
                }
            );
        }
    });
};
