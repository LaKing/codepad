// Bankszámlaszám
module.exports = function() {
  return /^([0-9]{8}[ \-][0-9]{8}|[0-9]{8}[ \-][0-9]{8}[ \-][0-9]{8})$/;
};