/*ßoilerplate */

ß.userSchema.methods.getPayment = function(paymentid) {
    if (this.payments)
        for (var i = 0; i < this.payments.length; i++) {
            if (String(this.payments[i]._id) === paymentid) {
                return this.payments[i];
            }
        }
    return false;
};