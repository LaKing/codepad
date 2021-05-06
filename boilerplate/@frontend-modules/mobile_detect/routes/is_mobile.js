
ß.app.get('/is_mobile', function(req, res) {
    
  md = new ß.MobileDetect(req.headers['user-agent']);
  
  if (md.mobile()) res.send(md.mobile());
  else res.send(false);
  
});
