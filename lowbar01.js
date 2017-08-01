const _ = {};

_.identity = function (value) {
  // Returns the same value that is used as the argument. 
  // This function looks useless, but can be used as a default iteratee.
  return value;
};

_.first = function (array, n) {
  // Returns the first element of an array/string. Passing n will return the first n elements
  // of the array/string.
  if (arguments.length === 0) return undefined;

  if (array.length === undefined || array.length === 0) return n !== undefined ? [] : undefined;

  if (n < 1) return [];

  if (typeof array === 'string') array = array.split('');

  return n !== undefined ? array.slice(0, n) : array[0];
};

_.last = function (array, n) {
  // Returns the last element of an array/string. Passing n will return the last n elements
  // of the array/string.
  if (arguments.length === 0) return undefined;

  if (array.length === undefined || array.length === 0) return n !== undefined ? [] : undefined;

  if (n < 1) return [];

  if (typeof array === 'string') array = array.split('');

  return n !== undefined ? array.slice(-n) : array[array.length - 1];
};

_.each = function (list, iteratee) {
  // Iterates over a list of elements, passing each in turn to an iteratee function. The iteratee is 
  // bound to the context object, if one is passed. Each invocation of iteratee is called with three
  // arguments: 
  // If list is a javaScript array iteratee's arguments are (element, index, list). 
  // If list is a JavaScript object, iteratee's arguments are (value, key, list)
  // The list is returned for optional chaining.

  if (arguments.length === 0) return undefined;

  if (typeof list !== 'object' && !Array.isArray(list) && typeof list !== 'string'
  || typeof iteratee !== 'function') return list;

  if (Array.isArray(list) || typeof list === 'string') {
    for (let i = 0; i < list.length; i++) iteratee(list[i], i, list);
  } else {
    for (let prop in list) iteratee(list[prop], prop, list);
  }
  
  return list;
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
