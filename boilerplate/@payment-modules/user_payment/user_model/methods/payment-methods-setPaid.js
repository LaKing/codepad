/*ßoilerplate */

ß.userSchema.methods.setPaid = function(paymentid) {
    for (var i = 0; i < this.payments.length; i++) {
        if (String(this.payments[i]._id) === paymentid) {
            this.payments[i].paid = true;
            this.markModified("payments");
            this.save();
            return true;
        }
    }
    return false;
};
