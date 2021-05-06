// most likeley you will customize this file.

module.exports = function convert_items(parameters) {
    
  	// source
  	var s = [{
    	label : "Test invoice",
      	comment: "Just a simple input",
        quantity: 1,
        unit: "db",
        vat: 10,
        price: 100
    }];
  
    var r = [];
    var it;
    for (var i = 0; i < s.length; i++) {
        item = s[i];
        r[i] = new ß.szamlazz.Item({
            label: item.label,
            comment: item.comment,
            quantity: item.quantity,
            unit: item.unit,
            vat: item.vat,
            netUnitPrice: item.price // or grossUnitPrice
        });
    }
    return r;
};