
// deprecated
ß.app.post('/session-data', function(req, res, next) {
    req.session.data = req.body;
    res.send('OK');
    ß.debug('+ POST session-data: ' + JSON.stringify(req.body));
});

// internal json based api
ß.app.post('/post-session-data.json', function(req, res, next) {
    req.session.data = req.body;
  	
  	ß.run_hook("post_session_data", req.session);
  
    res.json('OK');
    ß.debug('+ POST session-data: ' + JSON.stringify(req.body));
});