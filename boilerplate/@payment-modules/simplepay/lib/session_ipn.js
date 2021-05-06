// helper function
function finalize(sid, parameters_simplepay, session, a) {
    let simplepay = { ...session.simplepay[a], ...parameters_simplepay };
    delete simplepay.salt;
    delete simplepay.paymentUrl;

    session.simplepay[a] = simplepay;
    ß.session_store.set(sid, session, function(err) {
        if (err) return đ(err);
        // process further
        ß.msg(parameters_simplepay.status + " simplepay payment " + parameters_simplepay.orderRef);
      	
      	let parameters = {};
      	parameters.session = session;
      	parameters.simplepay = simplepay;
      		
      
        ß.run_hook('simplepay_ipn_session_update', parameters);

    });
}

// this module assumes that we have an entry in the session for the given payment
module.exports = function(parameters_simplepay) {
    // find the session we recieved the ipn for
    ß.session_store.all(function(err, sessions) {
        if (err) return đ(err);

        // so look at all sessions
        for (const i in sessions) {
            // that have a simplepay property array
            if (sessions[i].session.simplepay) {
                let sid = sessions[i]._id;
                let session = sessions[i].session;
                // find the payment in the simplepay array
                for (const a in session.simplepay) {
                    if (session.simplepay[a].orderRef === parameters_simplepay.orderRef) return finalize(sid, parameters_simplepay, session, a);
                }
            }
        }
      
      	ß.msg(parameters_simplepay.status + " simplepay payment " + parameters_simplepay.orderRef + " - not found in sessions.");
        ß.run_hook('simplepay_ipn_session_notfound', parameters_simplepay);
    });
};
