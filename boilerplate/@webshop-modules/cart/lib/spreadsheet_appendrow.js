module.exports = function spreadsheet_appendrow(parameters) {
    var invoice = parameters.invoice;
    var cart = parameters.data.cart;
    var billing = parameters.session.user_profile.billing;
    var shipping = parameters.session.user_profile.shipping;
    var shipping_type = parameters.data.cart.shipping_type;
    var invoiceId = invoice.invoiceId;

    var spreadsheetId = "1pgApzD0puo_sjXoAkw_St20Mw1VQPbWYhFeBxKXUWKk";
    var range = "orders!A1:Z1000";

    var r = [ß.HOSTNAME, ß.date(), ß.time(), invoiceId];

    var cart_str = "";
    if (cart.items)
        cart.items.forEach(f => {
            cart_str += `${f.count}x ${f.product_code} ${f.selected_subtype || ""}\n`;
        });

    r.push(cart_str);

    r.push(billing.email);
    r.push(billing.phone);
    r.push(billing.name);
    r.push(billing.country);
    r.push(billing.city);
    r.push(billing.zip);
    r.push(billing.address);
    r.push(billing.taxnumber);
    r.push(shipping.name);
    r.push(shipping.country);
    r.push(shipping.city);
    r.push(shipping.zip);
    r.push(shipping.address);
    r.push(shipping.phone);
    r.push(shipping.email);
    r.push(shipping.comment);
    r.push(shipping_type.name);

    r.push(ł(parameters, "paypal.order.payer.email_address") || "-");
    r.push(ł(parameters, "paypal.order.id") || "-");
  
    r.push(ł(parameters, "simplepay.transactionId") || "-");
    r.push(ł(parameters, "simplepay.orderRef") || "-");
    r.push(ł(parameters, "simplepay.method") || "-");
    r.push(ł(parameters, "simplepay.status") || "-");
  
    ß.lib.googleapis.spreadsheets_append_rows(spreadsheetId, range, [r], function(err, values) {
        if (!err) return;
        // retry
        setTimeout(function() {
            ß.lib.googleapis.spreadsheets_append_rows(spreadsheetId, range, [r], function(error, values) {
                if (error) return ß.err("Could not use google spreadsheet appendrows. (second try)");
            });
        }, 20000);
    });
};
