ß.app.post("/post_order.json", function(req, res) {
  
    let parameters = {};
    parameters.bank_transfer = {};
    parameters.session = req.session;
  	parameters.data = req.session.data;

    ß.msg("Recieved order with banktransfer", ł(parameters, "session.user_profile.billing.email"));
  
  	ß.alf.app.sale(parameters);
   
  	let response = {};
 	response.message = "Köszönjük. Rendelését fogadtuk.";
    response.dispatch = "cart/clear";

    res.json(response);
});