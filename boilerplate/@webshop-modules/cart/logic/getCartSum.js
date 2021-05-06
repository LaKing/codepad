// bejön egy cart object amiben van items meg egy shipping type

module.exports = function getCartSum(cart) {
    //shipping
    let value = 0;

    //  use ł ?
    if (cart.shipping_type) if (cart.shipping_type.huf) value += cart.shipping_type.huf;

    if (cart.items)
        for (let i in cart.items) {
            let count = cart.items[i].count || 1;
            let huf = cart.items[i].huf || 0;
            value += count * huf;
        }

    return value;
};
