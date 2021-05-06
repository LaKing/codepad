// protection mechanism. Do something only once a day.
var o = {};

module.exports = function(key) {
    let d = ß.date;
    if (o[key] === d) return false;
    o[key] = d;
    return true;
};
