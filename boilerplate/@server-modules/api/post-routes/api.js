let error400 = "<b>400 Bad API request. Sorry.</b>";
if (ß.ERROR400HTML) error400 = ß.ERROR400;
// if there was no match on all our routes, then use the fallback url
ß.api.use(function api_index(req, res, next) {
  	res.status(400).end(error400);
});

ß.app.use('/api', ß.api);