
// Not sure if the Purge function really makes sence. After all, the session will expire sooner or later ...

function purge(sessions_i) {
    let sid = sessions_i._id;
    let session = sessions_i.session;

    const now = new Date();

    if (!session.simplepay) return;
  
    for (let i in session.simplepay) {
        if (session.simplepay[i].timeout) {
            let idate = new Date(session.simplepay[i].timeout);
            if (now > idate) {
                session.simplepay = session.simplepay.splice(i, 1);
            }
        }
    }
  
    ß.session_store.set(sid, session);
}

module.exports = function() {
    ß.session_store.all(function(err, sessions) {
        if (err) return đ(err);

        // so look at all sessions
        for (let i in sessions) {
            // that have a simplepay property array
            if (sessions[i].session.simplepay) purge(sessions[i]);
        }
    });
};
