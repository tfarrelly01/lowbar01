const {simpleSearch, binarySearch} = require('./src/search');
const _ = {};

_.identity = function (value) {
  // Returns the same value that is used as the argument. 
  // This function looks useless, but can be used as a default iteratee.
  return value;
};

_.first = function (array, n) {
  // Returns the first element of an array/string. Passing n will return the first n elements
  // of the array/string.

  // Defensive code to mimic the actual Underscore first method.
  if (arguments.length === 0) return undefined;
  if (array.length === undefined || array.length === 0) return n !== undefined ? [] : undefined;
  if (n < 1) return [];

  if (typeof array === 'string') array = array.split('');

  return n !== undefined ? array.slice(0, n) : array[0];
};

_.last = function (array, n) {
  // Returns the last element of an array/string. Passing n will return the last n elements
  // of the array/string.

  // Defensive code to mimic the actual Underscore last method.
  if (arguments.length === 0) return undefined;
  if (array.length === undefined || array.length === 0) return n !== undefined ? [] : undefined;

  if (n < 1) return [];

  if (typeof array === 'string') array = array.split('');

  return n !== undefined ? array.slice(-n) : array[array.length - 1];
};

_.each = function (list, iteratee, context) {
  // Iterates over a list of elements, passing each in turn to an iteratee function. The iteratee is 
  // bound to the context object, if one is passed. Each invocation of iteratee is called with three
  // arguments: 
  // If list is a javaScript array iteratee's arguments are (element, index, list). 
  // If list is a JavaScript object, iteratee's arguments are (value, key, list)
  // The list is returned for optional chaining.

  // Defensive code to mimic the actual Underscore each method.
  if (arguments.length === 0) return undefined;
  if (typeof list !== 'object' && !Array.isArray(list) && typeof list !== 'string'
      || typeof iteratee !== 'function') return list;

  if (context) iteratee = iteratee.bind(context);

  if (Array.isArray(list) || typeof list === 'string') 
    for (let i = 0; i < list.length; i++) iteratee(list[i], i, list);
  else 
    for (let prop in list) iteratee(list[prop], prop, list);
  
  return list;
};

_.indexOf = function (array, value, isSorted) {
  // Returns the index at which value can be found in the array, or -1 if value is not present in the // array. If working with a large array, and that array is already sorted, pass true for isSorted to // use a faster binary search ... or, pass a number as the third argument in order to look for the // first matching value in the array after the given index.

  // Defensive code to mimic the actual Underscore indexOf method.
  if (arguments.length < 2 || !Array.isArray(array) && typeof array !== 'string') return -1;

  isSorted = isSorted || 0;

  return isSorted === true ? binarySearch(array, value) : simpleSearch(array, value, isSorted);  
};

_.filter = function (list, predicate) {
  // Looks through each value in the list, returning an array of all the values that pass
  // a truth test (predicate).

  // Defensive code to mimic the actual Underscore filter method.
  if ((!Array.isArray(list) && typeof list !== 'object' && typeof list !== 'string')
    || (list === null || list instanceof Date)) return [];

  if (arguments.length < 2) {
    if (typeof list === 'object') return Object.values(list);
    if (typeof list === 'string') return list.split('');
    return list;
  }


  return predicate;
  
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
