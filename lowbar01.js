const _ = {};

_.identity = function (value) {
  return value;
};

_.first = function (array) {
  return array[0];
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
