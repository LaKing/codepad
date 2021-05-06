const szamlazz = ß.szamlazz;

module.exports = function(parameters) {
    const seller = new ß.szamlazz.Seller(ß.szamlazz_config.seller);

    let buyer = new szamlazz.Buyer(ß.lib.szamlazz.convert_buyer(parameters));
    let items = ß.lib.szamlazz.convert_items(parameters);
	
  	if (items.lenth <1) return console.log("ERROR in szamlazz - no items");
  
    return new szamlazz.Invoice({
        paymentMethod: szamlazz.PaymentMethod.CreditCard,
        currency: szamlazz.Currency.Ft,
        language: szamlazz.Language.Hungarian,
        seller: seller,
        buyer: buyer,
        items: items
    });
};
