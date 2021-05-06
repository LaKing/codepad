/*ßoilerplate */

module.exports = function(ref, paymentId, callback) {

    var user_id = ref.split('-')[0];
    var payment_id = ref.split('-')[1];

    if (!user_id || !payment_id) {
        console.log("ERROR barion process_callback", ref, paymentId);
        return callback(null, "Parameters are missing");
    }

    const BarionError = ß.barion.BarionError;
    const BarionRequestBuilderFactory = ß.barion.BarionRequestBuilderFactory;

    const getPaymentStateRequestBuilder = new BarionRequestBuilderFactory.BarionGetPaymentStateRequestBuilder();
    const getPaymentStateOptionsWithObject = {
        POSKey: ß.barion_config.POSKey,
        PaymentId: paymentId
    };

    ß.barion.getPaymentState(getPaymentStateOptionsWithObject, function(err, data) {
        if (err) {
            console.log("ERROR barion getPaymentState", err);
            return callback(err, 'Failed.');
        }

        if (data.Status === 'Succeeded') ß.lib.payment.payment_success(ref);
        else console.log("BARION_PAYMENT", data.Status);

        return callback(null, 'OK');

    });

};