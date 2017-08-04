function simpleSearch (list, num, startIndex) {
    /*
    Simple Search

    Simple search that finds an number in a sorted list. The function takes an array, a search term and an optional startIndex,
    Function returns the index position where the first instance of the number is found. If the number is not found, the function returns -1.
    */
    if (arguments.length < 2 || !Array.isArray(list) && typeof list !== 'string') return -1;

    startIndex = startIndex || 0;

    for (let idx = startIndex; idx < list.length; idx++) {
        if (list[idx] === num) return idx;
    }
    return -1;
}

function binarySearch (list, num) {
        
    /* 
    Binary Search

    splice array into 2 halves
    if last element of first array < num  then number in 1st array
    if first element of second array < num then num in 2nd array

    Function returns the index position where the first instance of the number is found. If the number is not found, the function returns -1.
    */

    if (arguments.length < 2 || !Array.isArray(list)) return -1;

    let startIdx = 0;
    let middleIdx = Math.floor(list.length / 2 - 1);
    let endIdx = list.length - 1;
  
    while (startIdx <= endIdx) {

        if (list[middleIdx] === num) return middleIdx;
        
        // num is in the first half of the array
        if (list[middleIdx] > num)  endIdx = middleIdx - 1;

        // num is in the second half of the array
        else startIdx = middleIdx + 1; 
       
        middleIdx = Math.floor((startIdx + endIdx) / 2);
    }
    return -1;
}

module.exports = {simpleSearch, binarySearch};