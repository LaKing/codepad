let last = {};

module.exports = function (username, operation, projectfile) {
    let d = ß.ops_date;
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
  	ß.lib.projectfiles.log(username + ' ' + operation + ' ' + projectfile);
};
