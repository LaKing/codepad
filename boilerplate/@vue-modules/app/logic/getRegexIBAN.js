// IBAN from https://stackoverflow.com/questions/44656264/iban-regex-design
module.exports = function() {
  return /^[A-Z]{2}(?:[ ]?[0-9]){18,20}$/;
};