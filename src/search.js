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

function binarySearch (list, item, insertAtIndex) {
        
    /* 
    Binary Search

    splice array into 2 halves
    if last element of first array < item  then item in 1st array
    if first element of second array < item then item in 2nd array

    Function returns the index position where the first instance of the item is found. If the item is not found, the function returns -1.
    */
    if (arguments.length < 2 || !Array.isArray(list)) return -1;

    insertAtIndex = insertAtIndex || false;

    let startIdx = 0;
    let middleIdx = Math.floor(list.length / 2 - 1);
    let endIdx = list.length - 1;
  
    while (startIdx <= endIdx) {

        // (list[middleIdx] !== list[middleIdx] && item !== item) is required to check for NaN === NaN
        // which returns false when using === operator
        if (list[middleIdx] === item || (list[middleIdx] !== list[middleIdx] && item !== item)) return middleIdx;
        // item is in the first half of the array
        if (list[middleIdx] > item)  endIdx = middleIdx - 1;

        // item is in the second half of the array
        else startIdx = middleIdx + 1; 
       
        middleIdx = Math.floor((startIdx + endIdx) / 2);
    }
    return insertAtIndex ? middleIdx : -1;
}

module.exports = {simpleSearch, binarySearch};