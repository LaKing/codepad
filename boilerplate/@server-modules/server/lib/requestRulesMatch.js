const url = require('url');

module.exports = function(req) {
  	// if not a GET request
    if (req.method !== "GET") return false;
  	// if client did not send an HTTP accept header
	if (!req.headers || typeof req.headers.accept !== 'string') return false;
  	// if the client prefers JSON
    if (req.headers.accept.indexOf('application/json') === 0) return false;
  	// if the file contains a dot
    var pathname = url.parse(req.url).pathname;
    if (pathname.lastIndexOf('.') > pathname.lastIndexOf('/')) return false;

  	return true;
};