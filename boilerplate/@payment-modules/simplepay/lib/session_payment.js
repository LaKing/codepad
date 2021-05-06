module.exports = function(session, simplepay) {
    // create a reference in the session
    if (!session.simplepay) session.simplepay = [];

    // so the payment object is now put last in to the session.
    session.simplepay.push(simplepay);
};
