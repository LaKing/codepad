function random(items) {
    return items[Math.floor(Math.random() * items.length)];
}

module.exports = function() {
    var ad = ["ld", "ng", "nt", "lf", "br", "kr", "pr", "fr", "gr", "tr", "rt", "st", "x", "q", "w"];
    var aa = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "V", "Z"];
    var ar = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "z"];
    var bb = ["a", "e", "i", "o", "u"];
    var bc = ["A", "E", "I", "O", "U"];
    var w1 = random([random(bc) + random(ad.concat(ar)), random(aa) + random(bb) + random(ar)]) + random(bb) + random(ad.concat(ar)) + random(bb);
    var w2 = random([random(bc) + random(ad.concat(ar)), random(aa) + random(bb) + random(ar)]) + random(bb) + random(ad.concat(ar)) + random(bb);
    return w1 + '-' + w2;
};
