let last = {};

function log(data) {
    ß.fs.appendFile(ß.BPLOG +  "/ops-" + ß.date() + ".log", data, function (err) {
        if (err) return đ(err);
    });
}


module.exports = function (username, operation, projectfile) {
    let d = ß.date();
    if (!ß.ops[d]) ß.ops[d] = {};
    if (!ß.ops[d][username]) ß.ops[d][username] = {};

    // filter frequent duplicates
    if (!last[username]) last[username] = {};
    if (last[username].operation === operation && last[username].projectfile === projectfile) return;
    last[username].operation = operation;
    last[username].projectfile = projectfile;

    if (!ß.ops[d][username][projectfile]) ß.ops[d][username][projectfile] = {};
    if (!ß.ops[d][username][projectfile][operation]) ß.ops[d][username][projectfile][operation] = [];
	let t = ß.time();
    ß.ops[d][username][projectfile][operation].push(t);
  	log(t + ' ' + username + ' ' + operation + ' ' + projectfile + '\n');
};
