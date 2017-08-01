const _ = {};

_.identity = function (value) {
  return value;
};

_.first = function (array, n) {

  if (typeof array === 'string') array = array.split('');

  return n !== undefined ? array.slice(0, n) : array[0];
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
