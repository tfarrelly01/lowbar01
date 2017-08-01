const _ = {};

_.identity = function (value) {
  return value;
};

_.first = function (array, n) {

  if (arguments.length === 0 || array.length === 0) return undefined;

  if (n <= 0) return [];

  if (typeof array === 'string') array = array.split('');

  return n !== undefined 
    ? array.slice(0, n) 
    : array[0];
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
