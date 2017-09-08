// require doesnt work - commented out and identify funcion coipied

// const path = require('path');
// const _ = require(path.join(__dirname, '..', './lowbar01'));

const identity = function (value) {

  // Returns the same value that is used as the argument. 
  // This function looks useless, but can be used as a default iteratee.
  return value;
};

function simpleSearch (list, item, startIndex) {
    /*
    Simple Search

    Simple search that finds an item in a sorted list. The function takes an array, a search term and an optional startIndex,
    Function returns the index position where the first instance of the item is found. If the item is not found, the function returns -1.
    */
    if (arguments.length < 2 || !Array.isArray(list) && typeof list !== 'string') return -1;

    startIndex = startIndex || 0;

    // (list[idx] !== list[idx] && item !== item) is required to check for NaN === NaN
    // which returns false when using === operator
    for (let idx = startIndex; idx < list.length; idx++) {
        if (list[idx] === item || (list[idx] !== list[idx] && item !== item)) return idx;
    }
    return -1;
}

function binarySearch (list, item, insertAtIndex, iteratee) {    
    /* 
    Binary Search

    splice array into 2 halves
    if last element of first array < item  then item in 1st array
    if first element of second array < item then item in 2nd array

    Function returns the index position where the first instance of the item is found. If the item is not found, the function returns -1.

    If 'insertAtIndex' is passed into the function with a value of true then the function returns the index at which the value searched for should be inserted into the array.

    If an 'iteratee' function is passed this is used to compute the sort ranking of each value, including the value passed. The 'iteratee' can also be the string name of a property (e.g. within an array of objects)
    */
    if (arguments.length < 2 || !Array.isArray(list) && typeof list !== 'string') return -1;

    insertAtIndex = insertAtIndex || false;
    iteratee = iteratee || identity;

    const searchItem = typeof iteratee === 'string' ? item[iteratee] : iteratee(item); 

    let startIdx = 0;
    let middleIdx = Math.floor(list.length / 2 - 1);
    let endIdx = list.length - 1;
  
    while (startIdx <= endIdx) {

        let currElement = list[middleIdx];
        const currItem = typeof iteratee === 'string' ? currElement[iteratee] : iteratee(currElement);

        // (currItem !== currItem && searchItem !== searchItem) is required to check for NaN === NaN
        // which returns false when using === operator
        if (currItem === searchItem || (currItem !== currItem && searchItem !== searchItem)) 
            return insertAtIndex ? middleIdx + 1 : middleIdx;

        // searchItem is in the first half of the array
        if (currItem > searchItem)  endIdx = middleIdx - 1;

        // searchItem is in the second half of the array
        else startIdx = middleIdx + 1; 
       
        middleIdx = Math.floor((startIdx + endIdx) / 2);
    }
    return insertAtIndex ? middleIdx + 1 : -1;
}

module.exports = {simpleSearch, binarySearch};