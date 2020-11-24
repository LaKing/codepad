module.exports = function (event, path, details) {
    path = "/" + path;
	console.log('Raw event info:', event, path, details);
};