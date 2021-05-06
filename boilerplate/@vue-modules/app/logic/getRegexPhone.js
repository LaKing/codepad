// Based on https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s03.html
module.exports = function() {
  return /^\+?[0-9]?()[0-9](\s|\S)(\d[0-9]{8,9})$/;
};