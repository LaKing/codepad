/*ßoilerplate */

ß.app.get('/projectfiles', function(req,res) {

	res.send('<pre>' + JSON.stringify(ß.projectfiles, null, 2) + '</pre>');	
  
});
