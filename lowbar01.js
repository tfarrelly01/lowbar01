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
  // Produces a duplicate-free version of the array, using === to test object equality. Only the first // occurence of each value is kept. If you know in advance that the array is sorted, passing true  // for isSorted will run a faster algorithm. To compute unique items based on a transformation
  // (sorted or unsorted), pass an iteratee function.

  // Defensive code to mimic the functionality of the actual Underscore uniq method.
  if (arguments.length === 0 || (typeof list !== 'string' && !Array.isArray(list))) return [];

  isSorted = isSorted || false;

  iteratee = iteratee || _.identity;  
  
  let uniqList = [];

  if (isSorted) {
    uniqList = _.filter(list, function (item, i) {
      return i === 0 ? true : iteratee(item) !== iteratee(list[i - 1]);
    });
  } else {
    const mappedItems = _.map(list, function (item) {
      return iteratee(item);
    });
    _.each(mappedItems, function (item, i) {
      if (_.indexOf(mappedItems, item) === i) uniqList.push(list[i]);
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

_.reduce = function (collection, iteratee, memo, context) {
  // The reduce method boils down a list of values into a single value.

  // Defensive code to mimic the functionality of the actual Underscore reduce method.
  if (arguments.length <= 1
    || !Array.isArray(collection) && typeof collection !== 'object' && typeof collection !== 'string')  return undefined;
    
  iteratee = iteratee || _.identity;

  if (context) iteratee = iteratee.bind(context);

  _.each(collection, function (item, i, collection) {
    memo = iteratee(memo, item, i, collection);
  });

  return memo;
};

_.every = function (list,  predicate, context) { 
  // Returns true if all of the values in the list pass the predicate truth test. Short-circuits 
  // and stops traversing the list if a false element is found.

  // Defensive code to mimic the functionality of the actual Underscore every method.
  if (arguments.length <= 1) return true;

  predicate = predicate || _.identity;
  
  if (context) predicate = predicate.bind(context);
  
  if (Array.isArray(list) || typeof list === 'string')
    for (let i = 0; i < list.length; i++) if (!predicate.call(null, list[i], i, list)) return false;

  if (typeof list === 'object') 
    for (let idx in list) if (!predicate(list[idx], idx, list)) return false;

  return true;
};

_.some = function (list,  predicate, context) { 
  // Returns true if any of the values in the list pass the predicate truth test. Short-circuits and // stops traversing the list if a true element is found.

  // Defensive code to mimic the functionality of the actual Underscore some method.
  if (arguments.length <= 1) return true;

  predicate = predicate || _.identity;

  if (context) predicate = predicate.bind(context);

  if (Array.isArray(list) || typeof list === 'string')
    for (let i = 0; i < list.length; i++) if (predicate.call(null, list[i], i, list)) return true;

  if (typeof list === 'object') 
    for (let idx in list) if (predicate(list[idx], idx, list)) return true;

  return false;
};

_.extend = function (destination) {
  // Shallow copy all of the properties in the source objects over to the destination object, and 
  // return the destination object. Any nested objects or arrays are copied by reference, not
  // duplicated. The last source will override properties of the same name in 
  // previous arguments.

  // Defensive code to mimic the functionality of the actual Underscore extend method.
  if (arguments.length === 0) return undefined;
  if (typeof destination !== 'object' || destination === null) return destination;
  
  // Get optional arguments, if any
  let sourceLists = Array.from(arguments).slice(1);
  if (sourceLists.length === 0) return destination;

  _.each(sourceLists, function (list) {
    if (typeof list === 'object' || Array.isArray(list))
      _.each(list, function (item, key) {
        destination[key] = item;
      });
  });

  return destination;
};

_.defaults = function (list) {
  // Fill in undefined properties in object with the first value present in the passed list of 
  // defaults objects.

  // Defensive code to mimic the functionality of the actual Underscore default method.
  if (arguments.length === 0) return undefined;

  let defaultItems = Array.from(arguments).slice(1);

  if (defaultItems.length === 0) return list;

  if (typeof list !== 'object' || Array.isArray(list) 
    || list === null || list instanceof Date) return undefined;
  // End defensive code

  _.each(defaultItems, function (items) {
    if (typeof items === 'object') 
      _.each(items,function (item, key) {
        if (!list[key]) list[key] = item;
      });
 });
  return list;
};

_.once = function (func) {
  // Creates a version of the function that can only be called once. Repeated calls to the modified
  // function will have no effect, returning the value from the original call.
    
  // defensive code
  func = func || _.identity;

  let functionInvoked = false;

  return function () {
    if (!functionInvoked) {
      functionInvoked = true;
      return func.apply(this, arguments);
    }
  };
};

_.memoize = function (func, hashFunc) {
  // Memoizes a given function by caching the computed result, speeding up slow-running 
  // computations. If passed an optional hashFunction, it will be used to compute the hash key for 
  // storing the result, based on the arguments to the original function. 
  func = func || _.identity;

  const cache = {};
  return function () {
    let key = JSON.stringify(hashFunc ? hashFunc.apply(this, arguments) : arguments);

    if (cache[key]) return cache[key]; 
    else return (cache[key] = func.apply(this, arguments));
  };
};

_.invoke = function (list, method) {
  // invokes the passed method on each value in the list. Any additional arguments passed to invoke 
  // are forwarded on to the method invocation.

  let isFunction = typeof method === 'function';
  let args = [].slice.call(arguments, 2);

  return _.map(list, function (item) {
    let func = isFunction ? method : item[method];

    return func === null ? func : func.apply(item, args);
  });
};

_.zip = function () {
  // Zips together multiple lists into a single array — elements that share an index go together.

  // put all arguments into an array
  let args = [].slice.call(arguments);

  // find the length of the longest array
  const longestArray = _.reduce(args, function (acc, curr) { 
    return (!Array.isArray(curr) && typeof curr !== 'string') || acc >= curr.length ? acc : curr.length;
  }, 0);

  let zippedArray = Array(longestArray);

  return  _.map(zippedArray, function (array, idx) {
        return _.pluck(args, idx);
      });
};

_.flatten = function (array, shallow) {
  // Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will 
  // only be flattened a single level
  
  // Defensive code to mimic the actual _.flatten method
  if (arguments.length === 0 || !Array.isArray(array)) return [];

  shallow = shallow || false;

  return _.reduce(array, function (acc, item) {
          return acc.concat(Array.isArray(item) && !shallow ? _.flatten(item, shallow) : item);
        }, []);
};

_.difference = function (array) {
  // Takes the difference between one array and a number of other arrays. Only the elements present in // just the first array will remain.
  
  // store all arguments (other than the 1st argument) in an array
  let args = [].slice.call(arguments, 1);

  // shallow flatten arg array down to a single array keeping any original array nesting
  let flattenedArgs = _.flatten(args, true);

  return _.filter(array, function (value) {
      // if value in array is not present in the flattened array then keep the value
      return !_.contains(flattenedArgs, value);
    });
};

_.delay = function (func, wait) {
  // Invokes function after `wait` milliseconds. Optional argument passed are forwarded to the
  // function when it is invoked

  if (arguments.length === 0 || typeof func !== 'function') return undefined;

  let args = [].slice.call(arguments, 2);
  return setTimeout(function () {
    return func.apply(null, args);
  }, wait);
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
