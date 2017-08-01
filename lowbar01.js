const _ = {};

_.identity = function (value) {
  return value;
};

_.first = function (array, n) {
  if (arguments.length === 0) return undefined;

  if (array.length === undefined || array.length === 0) return n !== undefined ? [] : undefined;

  if (n < 1) return [];

  if (typeof array === 'string') array = array.split('');

  return n !== undefined ? array.slice(0, n) : array[0];
};

_.last = function (array) {
  if (arguments.length === 0) return undefined;
  
  return array[array.length - 1];
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
