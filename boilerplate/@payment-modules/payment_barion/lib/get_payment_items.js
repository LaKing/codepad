/*ßoilerplate */

const paymentlib = ß.lib.payment.paymentlib;

// refer to http://plezervikt.org/docs/barion-nodejs/global.html#BarionItem
module.exports = function(p) {
    var r = [];
    for (var i = 0; i < p.items.length; i++) {

        r[i] = {};
        r[i].Name = p.items[i].name;
        r[i].Description = p.items[i].info;
        r[i].Quantity = p.items[i].qty;
        if (!p.items[i].unit) r[i].Unit = "db";
        else r[i].Unit = p.items[i].unit;
        r[i].UnitPrice = paymentlib.get_item_brutto_unitprice(p.items[i]);
        r[i].ItemTotal = paymentlib.get_item_brutto_sum(p.items[i]);
    }
    return r;
};
