# lowbar01
Re-implementation of various methods from the Underscore JS Library 

## Goal
The Lowbar01 project involves re-implementing core methods from the popular `Underscore JS` library as if I were its author. The list of methods below have been developed to mimic the functionality provided by the corresponding methods from the Underscore library

1. identity
2. first
3. last
4. each
5. indexOf
6. filter
7. reject
8. uniq
9. map
10. contains
11. pluck
12. reduce
13. every
14. some
15. extends
16. defaults
17. once
18. memoize
19. shuffle
20. invoke
21. sortBy (using my own sort algorithm!)
22. zip
23. sortedIndex
24. flatten
25. intersection
26. difference
27. throttle
28. delay


## References

whilst developing the project I have referenced the following API's;

1. [Underscore](http://underscorejs.org/)
2. [The Mocha Test Framework](https://mochajs.org/)
3. [The Chai Assertion Library](http://chaijs.com/)
4. [Sinon - spies, stubs & mocks](http://sinonjs.org/)

## Installation Instructions

You will need to install Node.js to use the function library. Type the command below to check if you already have node installed:

`$ node -v`

If node is already installed the output of the command will display the version (e.g. v7.9.0). If you need to install node please follow link (http://nodejs.org/en/).

To install all dependencies please enter the following command into the terminal once you have navigated to the root directory:

`$ npm install`

To run the test suite please enter the following command into the terminal

`$ npm test`

## Usage.

To access the functions within your own javascript projects use either the `require` or `include` (ES6) commands to include the library within you javascript program, e.g. if your javascript program was located in the same folder as the function library.

```javascript
const _ = require('./lowbar01');
```

### Code snippet - using _.map with arrays and objects

```javascript
// require the lowbar01 function library
const _ = require('./lowbar01');

_.map([1, 2, 3], function(num){ return num * 3; });
// returns  [3, 6, 9]

_.map({a: 1, b: 2, c: 3}, function(num, key){ return num * 3; });
// returns [3, 6, 9]

```
