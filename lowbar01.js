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

  // Defensive code to mimic the functionality of the actual Underscore first method.
  if (arguments.length === 0) return undefined;
  if (array.length === undefined || array.length === 0) return n !== undefined ? [] : undefined;
  if (n < 1) return [];

  if (typeof array === 'string') array = array.split('');

  return n !== undefined ? array.slice(0, n) : array[0];
};

_.last = function (array, n) {
  // Returns the last element of an array/string. Passing n will return the last n elements
  // of the array/string.

  // Defensive code to mimic the functionality of the actual Underscore last method.
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

  // Defensive code to mimic the functionality of the actual Underscore each method.
  if (arguments.length === 0) return undefined;
  if (typeof list !== 'object' && !Array.isArray(list) && typeof list !== 'string'
      || typeof iteratee !== 'function') return list;

  iteratee = iteratee || _.identity;  

  if (context) iteratee = iteratee.bind(context);

  if (Array.isArray(list) || typeof list === 'string') 
    for (let i = 0; i < list.length; i++) iteratee(list[i], i, list);
  else 
    for (let prop in list) iteratee(list[prop], prop, list);
  
  return list;
};

_.indexOf = function (array, value, isSorted) {
  // Returns the index at which value can be found in the array, or -1 if value is not present in the // array. If working with a large array, and that array is already sorted, pass true for isSorted to // use a faster binary search ... or, pass a number as the third argument in order to look for the // first matching value in the array after the given index.

  // Defensive code to mimic the functionality of the actual Underscore indexOf method.
  if (arguments.length < 2 || !Array.isArray(array) && typeof array !== 'string') return -1;

  isSorted = isSorted || 0;

  return isSorted === true ? binarySearch(array, value) : simpleSearch(array, value, isSorted);  
};

_.filter = function (list, predicate, context) {
  // Looks through each value in the list, returning an array of all the values that pass
  // a truth test (predicate).

  // Defensive code to mimic the functionality of the actual Underscore filter method.
  if ((!Array.isArray(list) && typeof list !== 'object' && typeof list !== 'string')
    || (list === null || list instanceof Date)) return [];

  predicate = predicate || _.identity;  

  if (context) predicate = predicate.bind(context);
  
  let filteredList = [];
  _.each(list, function (item, i, list) {
    if (predicate(item, i, list)) filteredList.push(item);
  });
  return filteredList;
};

_.reject = function (list, predicate, context) {
  // Looks through each value in the list, returning an array WITHOUT all the values that pass
  // a truth test (predicate).

  // Defensive code to mimic the functionality of the actual Underscore reject method.
  if ((!Array.isArray(list) && typeof list !== 'object' && typeof list !== 'string')
    || (list === null || list instanceof Date)) return [];

  predicate = predicate || _.identity;  

  if (context) predicate = predicate.bind(context);

  let rejectedList = [];
  _.each(list, function (item, i, list) {
    if (!predicate(item, i, list)) rejectedList.push(item);
  });
  return rejectedList;
};

_.uniq = function (list, isSorted, iteratee) {
  if (arguments.length === 0 || (typeof list !== 'string' && !Array.isArray(list))) return [];

  isSorted = isSorted || false;

  iteratee = iteratee || _.identity;  
  
  let uniqList = [];

  if (isSorted) {
    uniqList = _.filter(list, function (item, i, list) {
      return i === 0 ? true : iteratee(item) !== iteratee(list[i - 1]);
    });
  } else {
    _.each(list, function (item, i, list) {
      /*
      console.log('list: ', list);
      console.log('iteratee:', iteratee(item));
      console.log('i:', i);
      */
      if (_.indexOf(list, item) === i) uniqList.push(item);
    });
  }

  return uniqList;
};

_.map = function (list, iteratee, context) {
  // Produces a new array of values by mapping each value in list through a transformation function 
  // (iteratee). The iteratee is passed three arguments: the value, then the index (or key) of the
  // iteration, and finally a reference to the entire list.

  // Defensive code to mimic the functionality of the actual Underscore map method.
  if ((arguments.length === 0)
    || (!Array.isArray(list) && typeof list !== 'object' && typeof list !== 'string')
    || (list === null || list instanceof Date)) return [];  

  iteratee = iteratee || _.identity;

  if (context) iteratee = iteratee.bind(context);

  let mappedList = [];
  _.each(list, function (item, i, list) {
    mappedList.push(iteratee(item, i, list));
  });

  return mappedList;
};

_.contains = function (list, value, fromIndex) {
  // Returns true if the value is present in the list.
  // Use fromIndex to start your search at a given index.

  // Defensive code to mimic the functionality of the actual Underscore contains method.
  if (arguments.length < 2 || list === null) return false;

  fromIndex = fromIndex || 0;

  if (Array.isArray(list)) return simpleSearch(list, value, fromIndex) != -1;

  if (typeof list === 'object') {
    let values = Object.values(list);
    return simpleSearch(values, value, fromIndex) != -1;
  }

  return false;
};

_.pluck = function (list, propertyName) {
  // Extracts a list of property values from an array of objects

  // Defensive code to mimic the functionality of the actual Underscore pluck method.
  if ((arguments.length === 0)
    || (!Array.isArray(list) && typeof list !== 'object' && typeof list !== 'string')
    || (list === null || list instanceof Date)) return [];  
  
  return _.map(list, function (item) {
          return item[propertyName];
        });
};

_.reduce = function (collection, iteratee, memo) {

  // Defensive code to deal with eroneous values passed as arguments.
  if ((arguments.length <= 1)
    || (!Array.isArray(collection) && typeof collection !== 'object' && typeof collection !== 'string')
    || (collection === null || collection instanceof Date)) return undefined;  

  iteratee = iteratee || _.identity;
    
  return memo;
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
