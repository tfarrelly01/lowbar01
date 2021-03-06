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
  // Returns the index at which value can be found in the array, or -1 if value is not present in the 
  // array. If working with a large array, and that array is already sorted, pass true for isSorted to // use a faster binary search, or, pass a number as the third argument in order to look for the 
  // first matching value in the array after the given index.

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
  // Produces a duplicate-free version of the array, using === to test object equality. Only the first // occurence of each value is kept. If you know in advance that the array is sorted, passing true  
  // for isSorted will run a faster algorithm. To compute unique items based on a transformation
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

  if (Array.isArray(list) || typeof list === 'string') 
    return simpleSearch(list, value, fromIndex) != -1;

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
    for (let i = 0; i < list.length; i++) if (!predicate(list[i], i, list)) return false;

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
    for (let i = 0; i < list.length; i++) if (predicate(list[i], i, list)) return true;

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

_.shuffle = function (list) {
  // Returns a shuffled copy of a list, using the Fisher-Yates shuffle algorithm.

  // If list is an object copy values into an array. If list is an array then create a copy
  // so as not to mutate the argument. If list is a string convert to an array.
  // Otherwise return an empty array
  let copyOfList;
  if (typeof list === 'object' 
    && list !== null && !(list instanceof Date)) copyOfList = Object.values(list);

  else if (typeof list === 'string') copyOfList = list.split('');
  else if (Array.isArray(list)) copyOfList = list.slice();
  else return [];

  let listLength = copyOfList.length;
  let shuffled = [];

  while (listLength) {
    let randomIndex = Math.floor(Math.random() * listLength--);
    let element = copyOfList.splice(randomIndex, 1);
    shuffled.push(element[0]);
  }

  return shuffled;
};

_.invoke = function (list, method) {
  // invokes the passed method on each value in the list. Any additional arguments passed to invoke 
  // are forwarded on to the method invocation.

  let isFunction = typeof method === 'function';
  let args = [].slice.call(arguments, 2);

  return _.map(list, function (item) {
    let func = isFunction ? method : item[method];

    return func === undefined ? func : func.apply(item, args);
  });
};

_.sortBy = function (list, iteratee, context) {
  // Returns a sorted copy of list (array, string or object), in ascending order by the results of 
  // running each value through iteratee. iteratee may also be the string name of the property to 
  // sort by 

  // If list is an object copy values into an array. If list is an array then create a copy
  // so as not to mutate the argument. If list is a string convert to an array.
  // Otherwise return an empty array
  let copyOfList;
  if (Array.isArray(list)) copyOfList = list.slice();
  else if (typeof list === 'string') copyOfList = list.split('');
  else if (typeof list === 'object' && list !== null && !(list instanceof Date)) 
      copyOfList = Object.values(list);
  else return [];

  iteratee = iteratee || _.identity;

  if (context) iteratee = iteratee.bind(context);

  const mapListToSort = function (item) { 
      return {element: item, sortby: typeof iteratee === 'string' ? item[iteratee] : iteratee(item)};
  };
  const compareFunction = function (a, b) { 
    return (a.sortby < b.sortby) ? -1 : (a.sortby > b.sortby) ? 1 : 0; 
  };

  let sortedList = _.map(copyOfList, mapListToSort).sort(compareFunction);
  
  return _.pluck(sortedList, 'element');
};

_.zip = function () {
  // Zips together multiple lists into a single array — elements that share an index go together.

  // put all arguments into an array
  let args = [].slice.call(arguments);

  const zippedArray = Array(_.reduce(args, function (acc, curr) { 
      return (!Array.isArray(curr) && typeof curr !== 'string') || acc >= curr.length 
          ? acc 
          : curr.length;
        }, 0));

  return _.map(zippedArray, function (array, idx) {
        return _.pluck(args, idx);
      });
};

_.sortedIndex = function (list, value, iteratee, context) {
  // Uses a binary search algorithm to determine the index at which a value should be inserted into 
  // the list in order to maintain the list's sorted order. Pass an iteratee function to compute the 
  // sort ranking of each value, including the value passed. The iteratee can also be the string name of 
  // a property (i.e. array of objects)

  // function must be passed at least 2 arguments with the first argument of type array or string
  if (arguments.length <= 1 || !Array.isArray(list) && typeof list !== 'string') return 0;

  if (context) iteratee = iteratee.bind(context);

  return binarySearch(list, value, true, iteratee);
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

_.intersection = function (array) {
  // Returns an array containing every item shared between all passed-in arrays / string arguments.

  if (arguments.length === 0 || !Array.isArray(array) & typeof array !== 'string') return [];

  // store all arguments passed into function into an array and get array length
  const args = [].slice.call(arguments);
  const noOfArgs  = args.length;

  const result = [];

  // iterate through each element of the first array / string
  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    // Check if element has already been included in the result array. If present then do not search
    // the other arrays / strings. More efficient as there is no need to perform the search
    if (_.contains(result, item)) continue;

    // iterate through each subsequent array
    let noOfIterations = 0;
    for (let j = 1; j < noOfArgs; j++) {
      // for each array / string - args[j]
      // call _.contains to check if item is present in array / string - args[j]
      // if item not present then break out of for loop as item not present in every array / string
      if (!_.contains(args[j], item)) break;

      noOfIterations += 1;
    }
    // if noOfIterations === noOfArgs - 1 then item present in every array /string 
    // so push item into result array
    if (noOfIterations === noOfArgs  - 1) result.push(item);
  }
  return result;
};

_.difference = function (array) {
  // Takes the difference between one array and a number of other arrays. Only the elements present in // just the first array will remain.
  
  // store all arguments (other than the 1st argument) in an array
  let args = [].slice.call(arguments, 1);

  // shallow flatten arg array down to a single array keeping any original array nesting
  let flattenedArgs = _.flatten(args, true);

  // if value in array is not present in the flattened array then keep the value
  return _.reject(array, function (value) {
      return _.contains(flattenedArgs, value);
    });
};

_.throttle = function (func, wait, options) {

  // Returns a new, throttled version of the passed function, that, when invoked repeatedly,
  // will only call the original function at most once per every wait milliseconds.
  // By default, throttle will execute the function as soon as you call it for the first time. The 
  // leading-edge call can be disabled by passing in the option {leading: false}. The trailing-edge  
  // execution of the function can also be disabled by passing in the option {trailing: false} 

  // ensure that 1st argument is a function else default to _.identity
  func = (typeof func === 'function') ? func : _.identity; 

  // ensure that the 2nd argument is a +ve integer else default to 0
  wait = (parseInt(wait) === wait && wait > 0) ? wait : 0; 

  // ensure that the options object is populated with default values if no options or incomplete
  // options arguments passed to function
  options = options || {};
  options.leading = options.hasOwnProperty('leading') ? options.leading : options.leading = true;
  options.trailing = options.hasOwnProperty('trailing') ? options.trailing : options.trailing = true;

  let args = [].slice.call(arguments);
  let delayFuncCall = false;

  // returns a throttled function
  return function () {
    // Execute user function if we are not delaying invocation or there is no wait period
    if (!delayFuncCall || wait === 0) {

      // only execute function if options.leading set to true (this is default behaviour)
      if (options.leading) func.apply(null, args);     

      // prevent future invocations
      delayFuncCall = true;
      setTimeout(function () {
          // only execute function if options.trailing set to true (this is default behaviour)
          // after the wait period of time
          if (options.trailing) func.apply(null, args); 

          // Allow future invocations
          delayFuncCall = false;
        }, wait);
    }
  };
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