/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01.js'));
const largeArray = [...Array(1000000).keys()];

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });

  describe('#identity', function () {
    it('is a function', function () {
      expect(_.identity).to.be.a('function');
    });

    it('should take 1 argument', function () {
      expect(_.identity.length).to.equal(1);
    });

    it('returns undefined if called with no arguments', function () {
      let result = _.identity();
      expect(result).to.equal(undefined);
    });

    it('returns the value of the argument passed to the function', function () {
      let result = _.identity('hello');
      expect(result).to.equal('hello');

      result = _.identity(123);
      expect(result).to.equal(123);

      result = _.identity(12.34);
      expect(result).to.equal(12.34);

      let input = [1, 2, 3];
      result = _.identity(input);
      expect(result).to.equal(input);

      input = {a: 1, b: 2, c: 3};
      result = _.identity(input);
      expect(result).to.equal(input);

      let date = new Date();
      result = _.identity(date);
      expect(result).to.equal(date);
    });
    it('returns true or false if called within an expression', function () {
      let str = 'hello';
      let result = (str === _.identity('hello'));
      expect(result).to.equal(true);

      let arr = [1, 2, 3];
      result = (arr === _.identity([1, 2, 3]));
      expect(result).to.equal(false);

      let obj = {a: 1, b: 2, c: 3};
      result = (obj === _.identity({a: 1, b: 2, c: 3}));
      expect(result).to.equal(false);

      let int = 123;
      result = (int === _.identity(123));
      expect(result).to.equal(true);

      let dec = 12.34;
      result = (dec === _.identity(12.34));
      expect(result).to.equal(true);

      let date = new Date();
      result = (date === _.identity(date));
      expect(result).to.equal(true);
    });
  });

  describe('#first', function () {
    it('is a function', function () {
      expect(_.first).to.be.a('function');
    });

    it('should take at least 1 argument', function () {
      expect(_.first.length).to.be.at.least(1);
    });

    it('returns undefined if no arguments passed to function', function () {
      let result = _.first();
      expect(result).to.equal(undefined);
    });

    it('returns undefined if function recieves an empty array argument', function () {
      let result = _.first([]);
      expect(result).to.equal(undefined);
    });

    it('returns undefined if function recieves an empty string argument', function () {
      let result = _.first('');
      expect(result).to.equal(undefined);
    });

    it('returns an empty array if 1st argument is an array and 2nd argument is zero or less', function () {
      let result = _.first([1, 2, 3], 0);
      expect(result).to.eql([]);

      result = _.first([1, 2, 3], -2);
      expect(result).to.eql([]);
    });

    it('returns an empty array if 1st argument is a string and 2nd argument is zero or less', function () {
      let result = _.first('1223', 0);
      expect(result).to.eql([]);

      result = _.first('1223', -2);
      expect(result).to.eql([]);
    });

    it('returns undefined if first argument is not an array/string and second argument is undefined', function () {
      let result = _.first(123);
      expect(result).to.equal(undefined);

      result = _.first(12.23);
      expect(result).to.equal(undefined);

      result = _.first({a: 1, b: 2});
      expect(result).to.equal(undefined);

      result = _.first(new Date());
      expect(result).to.equal(undefined);

      result = _.first(function () { console.log('hello'); });
      expect(result).to.equal(undefined);
    });

    it('returns empty array if first argument is not an array/string and second argument is defined', function () {
      let result = _.first(123, 0);
      expect(result).to.eql([]);

      result = _.first(12.23, 1);
      expect(result).to.eql([]);

      result = _.first({a: 1, b: 2}, new Date());
      expect(result).to.eql([]);

      result = _.first(new Date(), {a: 1, b: 2});
      expect(result).to.eql([]);

      result = _.first(function () { console.log('hello'); }, [1, 2, 3]);
      expect(result).to.eql([]);
    });

    it('returns the first element of an array', function () {
      let result = _.first([1, 2, 3]);
      expect(result).to.equal(1);

      result = _.first(['H', 'E', 'L', 'L', 'O']);
      expect(result).to.equal('H');
    });

    it('returns the first n elements of an array', function () {
      let result = _.first([1, 2, 3, 4], 1);
      expect(result).to.eql([1]);

      result = _.first([1, 2, 3, 4], 2);
      expect(result).to.eql([1, 2]);

      result = _.first([1, 2, 3, 4], 3);
      expect(result).to.eql([1, 2, 3]);

      result = _.first([1, 2, 3, 4], 4);
      expect(result).to.eql([1, 2, 3, 4]);

      result = _.first(['H', 'E', 'L', 'L', 'O'], 1);
      expect(result).to.eql(['H']);

      result = _.first(['H', 'E', 'L', 'L', 'O'], 3);
      expect(result).to.eql(['H', 'E', 'L']);

      result = _.first(['H', 'E', 'L', 'L', 'O'], 5);
      expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
    });

    it('returns the first element of a string', function () {
      let result = _.first('1234');
      expect(result).to.equal('1');

      result = _.first('HELLO');
      expect(result).to.equal('H');
    });

    it('returns the first n elements of a string', function () {
      let result = _.first('1234', 1.5);
      expect(result).to.eql(['1']);

      result = _.first('1234', 2);
      expect(result).to.eql(['1', '2']);

      result = _.first('1234', 3);
      expect(result).to.eql(['1', '2', '3']);

      result = _.first('1234', 4);
      expect(result).to.eql(['1', '2', '3', '4']);

      result = _.first('HELLO', 1);
      expect(result).to.eql(['H']);

      result = _.first('HELLO', 3);
      expect(result).to.eql(['H', 'E', 'L']);

      result = _.first('HELLO', 5);
      expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
    });

    it('returns the passed array if n greater than length of array', function () {
      let result = _.first([1, 2, 3, 4], 5);
      expect(result).to.eql([1, 2, 3, 4]);

      result = _.first(['H', 'E', 'L', 'L', 'O'], 8);
      expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
    });

    it('returns the passed string as an array if n greater than length of string', function () {
      let result = _.first('1234', 5);
      expect(result).to.eql(['1', '2', '3', '4']);

      result = _.first('HELLO', 8);
      expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
    });
  });

  describe('#last', function () {
    it('is a function', function () {
      expect(_.last).to.be.a('function');
    });

    it('should take at least 1 argument', function () {
      expect(_.last.length).to.be.at.least(1);
    });

    it('returns undefined if no arguments passed to function', function () {
      let result = _.last();
      expect(result).to.equal(undefined);
    });

    it('returns undefined if function recieves an empty array argument', function () {
      let result = _.last([]);
      expect(result).to.equal(undefined);
    });

    it('returns undefined if function recieves an empty string argument', function () {
      let result = _.last('');
      expect(result).to.equal(undefined);
    });

    it('returns an empty array if 1st argument is an array and 2nd argument is zero or less', function () {
      let result = _.last([1, 2, 3], 0);
      expect(result).to.eql([]);

      result = _.last([1, 2, 3], -2);
      expect(result).to.eql([]);
    });

    it('returns an empty array if 1st argument is a string and 2nd argument is zero or less', function () {
      let result = _.last('1223', 0);
      expect(result).to.eql([]);

      result = _.last('1223', -2);
      expect(result).to.eql([]);
    });

    it('returns undefined if first argument is not an array/string and second argument is undefined', function () {
      let result = _.last(123);
      expect(result).to.equal(undefined);

      result = _.last(12.23);
      expect(result).to.equal(undefined);

      result = _.last({a: 1, b: 2});
      expect(result).to.equal(undefined);

      result = _.last(new Date());
      expect(result).to.equal(undefined);

      result = _.last(function () { console.log('hello'); });
      expect(result).to.equal(undefined);
    });

    it('returns empty array if first argument is not an array/string and second argument is defined', function () {
      let result = _.last(123, 0);
      expect(result).to.eql([]);

      result = _.last(12.23, 1);
      expect(result).to.eql([]);

      result = _.last({a: 1, b: 2}, new Date());
      expect(result).to.eql([]);

      result = _.last(new Date(), {a: 1, b: 2});
      expect(result).to.eql([]);

      result = _.last(function () { console.log('hello'); }, [1, 2, 3]);
      expect(result).to.eql([]);
    });

    it('returns the last element of an array', function () {
      let result = _.last([1, 2, 3]);
      expect(result).to.equal(3);

      result = _.last(['H', 'E', 'L', 'L', 'O']);
      expect(result).to.equal('O');
    });

    it('returns the last n elements of an array', function () {
      let result = _.last([1, 2, 3, 4], 1);
      expect(result).to.eql([4]);

      result = _.last([1, 2, 3, 4], 2);
      expect(result).to.eql([3, 4]);

      result = _.last([1, 2, 3, 4], 3);
      expect(result).to.eql([2, 3, 4]);

      result = _.last([1, 2, 3, 4], 4);
      expect(result).to.eql([1, 2, 3, 4]);

      result = _.last(['H', 'E', 'L', 'L', 'O'], 1);
      expect(result).to.eql(['O']);

      result = _.last(['H', 'E', 'L', 'L', 'O'], 3);
      expect(result).to.eql(['L', 'L', 'O']);

      result = _.last(['H', 'E', 'L', 'L', 'O'], 5);
      expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
    });

    it('returns the last element of a string', function () {
      let result = _.last('123');
      expect(result).to.equal('3');

      result = _.last('HELLO');
      expect(result).to.equal('O');
    });

    it('returns the last n elements of a string', function () {
      let result = _.last('1234', 1);
      expect(result).to.eql(['4']);

      result = _.last('1234', 2);
      expect(result).to.eql(['3', '4']);

      result = _.last('1234', 3);
      expect(result).to.eql(['2', '3', '4']);

      result = _.last('1234', 4);
      expect(result).to.eql(['1', '2', '3', '4']);

      result = _.last('HELLO', 1);
      expect(result).to.eql(['O']);

      result = _.last('HELLO', 3);
      expect(result).to.eql(['L', 'L', 'O']);

      result = _.last('HELLO', 5);
      expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
    });

    it('returns the passed array if n greater than length of array', function () {
      let result = _.last([1, 2, 3, 4], 5);
      expect(result).to.eql([1, 2, 3, 4]);

      result = _.last(['H', 'E', 'L', 'L', 'O'], 8);
      expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
    });

    it('returns the passed string as an array if n greater than length of string', function () {
      let result = _.last('1234', 5);
      expect(result).to.eql(['1', '2', '3', '4']);

      result = _.last('HELLO', 8);
      expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
    });
  });

  describe('#each', function () {
    it('is a function', function () {
      expect(_.each).to.be.a('function');
    });

    it('should take at least 2 arguments', function () {
      expect(_.each.length).to.be.at.least(2);
    });

    it('returns undefined if no arguments passed to function', function () {
      expect(_.each()).to.equal(undefined);
    });

    it('returns the value passed to the function if it is the sole argument', function () {
      let value = [1, 2, 3];
      expect(_.each(value)).to.equal(value);

      value = '12c';
      expect(_.each(value)).to.equal(value);

      value = {a: '1', b: '2', c: 'c'};
      expect(_.each(value)).to.eql(value);

      value = 123;
      expect(_.each(value)).to.equal(value);

      value = 12.3;
      expect(_.each(value)).to.equal(value);

      value = new Date();
      expect(_.each(value)).to.equal(value);

      value = function (item) { console.log(item); };
      expect(_.each(value)).to.equal(value);

      value = null;
      expect(_.each(value)).to.equal(value);

      value = undefined;
      expect(_.each(value)).to.equal(value);

      value = NaN;
      expect(_.each(value)).to.eql(value);
    });

    it('returns the value of the first argument (list) if the first argument is not an array, string  or object', function () {
      let value = 123;
      let iteratee = function (item) { console.log(item); };
      expect(_.each(value, iteratee)).to.equal(value);

      value = 12.3;
      expect(_.each(value, iteratee)).to.equal(value);

      value = new Date();
      expect(_.each(value, iteratee)).to.equal(value);

      value = function (item) { console.log(item); };
      expect(_.each(value, iteratee)).to.equal(value);

      value = null;
      expect(_.each(value, iteratee)).to.equal(value);

      value = undefined;
      expect(_.each(value, iteratee)).to.equal(value);

      value = NaN;
      expect(_.each(value, iteratee)).to.eql(value);
    });

    it('returns the value of the first argument (list) if the second argument (iteratee) is not a function', function () {
      let list = [1, 2, 3];
      let iteratee = 123;
      expect(_.each(list, iteratee)).to.equal(list);

      list = '12c';
      expect(_.each(list)).to.equal(list);

      list = {a: '1', b: '2', c: 'c'};
      expect(_.each(list)).to.eql(list);
    });

    it('invokes the function as many times as there are items in the array', function () {
      const list = [1, 2, 3];     
      let counter = 0;
      function incrementCounter () {
        counter += 1;
      }
      _.each(list, incrementCounter);
      expect(counter).to.equal(3);
    });

    it('invokes the function as many times as there are items in the string', function () {
      let counter = 0;
      const list = 'abc';
      function incrementCounter () {
        counter += 1;
      }
      _.each(list, incrementCounter);
      expect(counter).to.equal(3);
    });

    it('invokes the function as many times as there are properties in the object', function () {
      const list = {a: 1, b: 2, c: 3};
      let counter = 0;
      function incrementCounter () {
        counter++;
      }
      _.each(list, incrementCounter);
      expect(counter).to.equal(3);
    });

    it('passes each element of the array as the first argument to the iteratee', function () {
      const newArray = [];
      const list = [1, 2, 3];

      function pushElementToArray (element) {
        newArray.push(element);
      }
      _.each(list, pushElementToArray);
      expect(newArray).to.eql(list);
    });

    it('passes each element of the string as the first argument to the iteratee', function () {
      let newStr = '';
      const str = 'HELLO THERE';

      function copyCharsInString (char) {
        newStr += char;
      }
      _.each(str, copyCharsInString);
      expect(newStr).to.eql(str);
    });

    it('Passes each index of the object as the first argument to the iteratee', function () {
      const objKeys = [];
      const obj = {a: 1, b: 2, c: 3, d: 4};
      const result = ['a', 'b', 'c', 'd'];

      function putKeyInArray (key) {
        objKeys.push(key);
      }
      _.each(Object.keys(obj), putKeyInArray);
      expect(objKeys).to.eql(result);
    });

    it('binds a context to the iteratee if one is passed', function () {
      const context = {a: 1, b: 2, c: 3};
      _.each([1,2,3,4,5], function () {
        // the value of 'this' in here should be the context object
        this.a = 'changed!';
      }, context);
      expect(context).to.eql({a: 'changed!', b: 2, c: 3});
    });
  });

  describe('#indexOf', function () {
    it('is a function', function () {
      expect(_.indexOf).to.be.a('function');
     });
    it('should take at least 2 arguments', function () {
      expect(_.indexOf.length).to.be.at.least(2);
    });
    it('should return -1 if 1st argument passed to function is not an array or a string', function () {
      let arr = 123;
      let value = 1;
      expect(_.indexOf(arr, value)).to.equal(-1);

      value = undefined;
      expect(_.indexOf(arr, value)).to.equal(-1);

      value = NaN;
      expect(_.indexOf(arr, value)).to.equal(-1);

      value = 10.234;
      expect(_.indexOf(arr, value)).to.equal(-1);

      value = new Date();
      expect(_.indexOf(arr, value)).to.equal(-1);

      value = {a: 1, b: 2};
      expect(_.indexOf(arr, value)).to.equal(-1);

      value = function () {console.log('hello'); };
      expect(_.indexOf(arr, value)).to.equal(-1);

      value = null;
      expect(_.indexOf(arr, value)).to.equal(-1);
    });

    it('should return -1 is only one argument passed to the function', function () {
      const arr = [1, 2, 'a', 'b'];
      expect(_.indexOf(arr)).to.equal(-1);
    });
    
    it('should return the index of the element contained in the array', function () {
      const array = [10, 2, 1, 4, 56, 29, 'a', 'Z', 0, 'h', 'I', '|', '@', 43, 12, 64, 72, 1001];
      expect(_.indexOf(array, 1)).to.equal(2);
      expect(_.indexOf(array, 29)).to.equal(5);
      expect(_.indexOf(array, 'Z')).to.equal(7);
      expect(_.indexOf(array, '@')).to.equal(12);
      expect(_.indexOf(array, 64)).to.equal(15);  
      expect(_.indexOf(array, 1001)).to.equal(17);    
    });

    it('should return -1 if element does not exist in array', function () {
      const array = [10, 2, 1, 4, 56, 29, 'a', 'Z', 0, 'h', 'I', '|', '@'];
      expect(_.indexOf(array, 6)).to.equal(-1);
      expect(_.indexOf(array, 30)).to.equal(-1);
      expect(_.indexOf(array, 'y')).to.equal(-1);
      expect(_.indexOf(array, '-')).to.equal(-1);
      expect(_.indexOf(array, 65)).to.equal(-1);  
      expect(_.indexOf(array, 1000)).to.equal(-1);    
    });

    it('should search for the first matching value in the array after a given index', function () {
      const array = [4, 2, 1, 4, 56, 29, 'a', 'Z', 0, 'h', 'I', '|', '@', 56, 'I', '|', 72, 1001];
      expect(_.indexOf(array, 4, 0)).to.equal(0);
      expect(_.indexOf(array, 4, 2)).to.equal(3);
      expect(_.indexOf(array, 4, 4)).to.equal(-1);     
      expect(_.indexOf(array, 'I', 10)).to.equal(10);
      expect(_.indexOf(array, 'I', 11)).to.equal(14);
      expect(_.indexOf(array, '@', 6)).to.equal(12);
      expect(_.indexOf(array, '@', 13)).to.equal(-1);
      expect(_.indexOf(array, 56, 5)).to.equal(13);  
      expect(_.indexOf(array, 1001, 17)).to.equal(17);    
      expect(_.indexOf(array, 1001, 20)).to.equal(-1); 
    });

    it('should invoke the faster binarySearch algorithm (isSorted === true) returning the index position where the first instance of the number is found for large sorted arrays', function () {
      expect(_.indexOf(largeArray, 0, true)).to.equal(0);
      expect(_.indexOf(largeArray, 250000, true)).to.equal(250000);
      expect(_.indexOf(largeArray, 124000, true)).to.equal(124000);
      expect(_.indexOf(largeArray, 333000, true)).to.equal(333000);
      expect(_.indexOf(largeArray, 449000, true)).to.equal(449000);
      expect(_.indexOf(largeArray, 750000, true)).to.equal(750000);
      expect(_.indexOf(largeArray, 999999, true)).to.equal(999999);
    });

    it('should invoke the faster binarySearch algorithm (isSorted === true) returning -1 if the element is not found for large sorted arrays', function () {
      expect(_.indexOf(largeArray, -1, true)).to.equal(-1);
      expect(_.indexOf(largeArray, 10000000, true)).to.equal(-1);
      expect(_.indexOf(largeArray, 10000001, true)).to.equal(-1);
    });
  });

  describe('#filter', function () {
    it('is a function', function () {
      expect(_.filter).to.be.a('function');
     });

    it('should take at least 2 arguments', function () {
      expect(_.filter.length).to.be.at.least(2);
    });

    it('should return an empty array if list is not of type array, string or object irrespective of number of arguments passed to the function', function () {
      let value = 123;
      let func = function (element) { return element > 10;};
      expect(_.filter(value, func)).to.eql([]);
      expect(_.filter(value)).to.eql([]);

      value = 1234.56;
      expect(_.filter(value, func)).to.eql([]);
      expect(_.filter(value)).to.eql([]);

      value = function (a) {return a * 2;};
      expect(_.filter(value, func)).to.eql([]);
      expect(_.filter(value)).to.eql([]);

      value = new Date();
      expect(_.filter(value, func)).to.eql([]);
      expect(_.filter(value)).to.eql([]);

      value = undefined;
      expect(_.filter(value, func)).to.eql([]);
      expect(_.filter(value)).to.eql([]);

      value = NaN;
      expect(_.filter(value, func)).to.eql([]);      
      expect(_.filter(value)).to.eql([]);

      value = null;
      expect(_.filter(value, func)).to.eql([]); 
      expect(_.filter(value)).to.eql([]); 

    });

    it('should return an array if only one argument passed to the function which is of type array, string or object', function () {
      let list = '12c';
      let result = ['1', '2', 'c'];
      expect(_.filter(list)).to.eql(result);

      list = ['1','2','c'];
      expect(_.filter(list)).to.eql(result);

      list = {a: '1', b: '2', c: 'c'};
      expect(_.filter(list)).to.eql(result);
    });

    it('returns array of values from an array where each value passes the truth test', function () {
      const list = [1, 2, 3, 4, 5, 6];
      const result = [2, 4, 6];

      function numDivByTwo (number) {
        return number % 2 === 0;
      }

      const numbers = _.filter(list, numDivByTwo);
      expect(numbers).to.eql(result);
    });

    it('returns array of values from an object where each value passes the truth test', function () {
      const list = {a: 'A', b: 'b', c: 'c', d: 'D', e: 'e'};
      const result = ['A', 'D'];

      function findUpperCaseChars (char) {
        return char === char.toUpperCase();
      }
      const upperChars = _.filter(list, findUpperCaseChars);
      expect(upperChars).to.eql(result);
    });

    it('returns array of values from a string where each value passes the truth test', function () {
      const list = 'aAbbccdDee';
      const result = ['a', 'b', 'b', 'c', 'c', 'd', 'e', 'e'];

      function findLowerCaseChars (char) {
        return char === char.toLowerCase();
      }

      const lowerChars = _.filter(list, findLowerCaseChars);
      expect(lowerChars).to.eql(result);
    });

    it('binds a context to the predicate', function () {
      const context = {a: 1, b: 2, c: 3};
      _.filter([1,2,3,4,5], function () {
        // the value of 'this' in here should be the context object
        this.a = 'changed!';
      }, context);
      expect(context).to.eql({a: 'changed!', b: 2, c: 3});
    });
  });

  describe('#reject', function () {
    it('is a function', function () {
      expect(_.reject).to.be.a('function');
     });

    it('should take at least 2 arguments', function () {
      expect(_.reject.length).to.be.at.least(2);
    });

    it('returns an empty array if 1 argument or less passed to the function', function () {
      let value = [1, 2, 3];
      expect(_.reject(value)).to.eql([]);

      value = {a: 1, b: 2, c: 3};
      expect(_.reject(value)).to.eql([]);

      value = '123';
      expect(_.reject(value)).to.eql([]);

      value = 123;
      expect(_.reject(value)).to.eql([]);

      value = 1234.56;
      expect(_.reject(value)).to.eql([]);

      value = function (a) {return a * 2;};
      expect(_.reject(value)).to.eql([]);

      value = new Date();
      expect(_.reject(value)).to.eql([]);

      value = undefined;
      expect(_.reject(value)).to.eql([]);

      value = NaN;   
      expect(_.reject(value)).to.eql([]);

      value = null;
      expect(_.reject(value)).to.eql([]); 
    });

    it('should return an empty array if list is not of type array, string or object', function () {
      let value = 12;
      const func = function (a) {return a < 2;};
      expect(_.reject(value, func)).to.eql([]);

      value = 1234.56;
      expect(_.reject(value, func)).to.eql([]);      

      value = function (a) {return a * 2;};
      expect(_.reject(value, func)).to.eql([]);

      value = new Date();
      expect(_.reject(func)).to.eql([]);

      value = undefined;
      expect(_.reject(func)).to.eql([]);

      value = NaN;   
      expect(_.reject(func)).to.eql([]);

      value = null;
      expect(_.reject(func)).to.eql([]); 
    });

    it('should return an array if only one argument passed to the function which is of type array, string or object', function () {
      let list = '12c';
      let result = [];
      expect(_.reject(list)).to.eql(result);

      list = ['1','2','c'];
      expect(_.reject(list)).to.eql(result);

      list = {a: '1', b: '2', c: 'c'};
      expect(_.reject(list)).to.eql(result);
    });

    it('returns array of values from an array where each value DOES NOT pass the truth test', function () {
      const list = [1, 2, 3, 4, 5, 6];
      const result = [1, 3, 5];

      function numDivByTwo (number) {
        return number % 2 === 0;
      }

      const numbers = _.reject(list, numDivByTwo);
      expect(numbers).to.eql(result);
    });

    it('returns array of values from an object where each value DOES NOT pass the truth test', function () {
      const list = {a: 'A', b: 'b', c: 'c', d: 'D', e: 'e'};
      const result = ['b', 'c', 'e'];

      function findUpperCaseChars (char) {
        return char === char.toUpperCase();
      }
      const upperChars = _.reject(list, findUpperCaseChars);
      expect(upperChars).to.eql(result);
    });

    it('returns array of values from a string where each value DOES NOT pass the truth test', function () {
      const list = 'aAbbccdDee';
      const result = ['A', 'D'];

      function findLowerCaseChars (char) {
        return char === char.toLowerCase();
      }

      const lowerChars = _.reject(list, findLowerCaseChars);
      expect(lowerChars).to.eql(result);
    });

    it('binds a context to the predicate', function () {
      const context = {a: 1, b: 2, c: 3};
      _.reject([1,2,3,4,5], function () {
        // the value of 'this' in here should be the context object
        this.a = 'changed!';
      }, context);
      expect(context).to.eql({a: 'changed!', b: 2, c: 3});
    });
  });

  describe('#uniq', function () {
    it('is a function', function () {
      expect(_.uniq).to.be.a('function');
     });

    it('should take at least 1 argument', function () {
      expect(_.uniq.length).to.be.at.least(1);
    });

    it('should return an empty array 1st argument is not of type array or string', function () {
      let value = 12;
      expect(_.uniq(value)).to.eql([]);

      value = 1234.56;
      expect(_.uniq(value)).to.eql([]);   

      value = {a: 1, b: 1, c: 2};
      expect(_.uniq(value)).to.eql([]);   

      value = function (a) {return a * 2;};
      expect(_.uniq(value)).to.eql([]);

      value = new Date();
      expect(_.uniq(value)).to.eql([]);

      value = undefined;
      expect(_.uniq(value)).to.eql([]);

      value = NaN;   
      expect(_.uniq(value)).to.eql([]);

      value = null;
      expect(_.uniq(value)).to.eql([]); 
    });

    it('for an unsorted array argument, returns a duplicate-free version of the array', function () {
      const list = [1, 1, 2, 3, 4, 1, 4, 3, 10];
      const result = [1, 2, 3, 4, 10];
      const sorted = false;
      expect(_.uniq(list, sorted)).to.eql(result);
    });

    it('for an unsorted string argument, returns a duplicate-free array version of the string elements', function () {
      const list = '1123414310';
      const result = ['1', '2', '3', '4', '0'];
      const sorted = false;
      expect(_.uniq(list, sorted)).to.eql(result);
    });

    it('defaults the value of the parameter isSorted to false if passed an array or string argument and returns a duplicate free version in a new array' , function () {
      const array = [1, 1, 2, 3, 4, 1, 4, 3, 10];
      let result = [1, 2, 3, 4, 10];
      expect(_.uniq(array)).to.eql(result);

      const string = '1123414310';
      result = ['1', '2', '3', '4', '0'];
      expect(_.uniq(string)).to.eql(result);
    });

    it('for a sorted array, returns a duplicate-free version of the array', function () {
      const list = [1, 1, 1, 2, 3, 3, 4, 4, 5, 6, 6, 6, 6, 10];
      const result = [1, 2, 3, 4, 5, 6, 10];
      const sorted = true;
      expect(_.uniq(list, sorted)).to.eql(result);
    });

    it('for a sorted string, returns a duplicate-free array version of the string elements', function () {
      const list = 'aaaaabbchhhijAAZ';
      const result = ['a', 'b', 'c', 'h', 'i', 'j', 'A', 'Z'];
      const sorted = false;
      expect(_.uniq(list, sorted)).to.eql(result);
    });

    it('computes unique items based on a transformation for an array, via an iteratee function.', function () {
      const people = [
        {name: 'Barney Rubble', age: 1032},
        {name: 'Fred Flintstone', age: 1032},
        {name: 'Mildred Rubble', age: 1024},
        {name: 'Wilmar Flintstone', age: 1026}
      ];
      const result = [
        {name: 'Barney Rubble', age: 1032},
        {name: 'Mildred Rubble', age: 1024},
        {name: 'Wilmar Flintstone', age: 1026}
      ];
      function returnAge (person) {
        return person.age;
      }

      const uniqueAges = _.uniq(people, true, returnAge);
      expect(uniqueAges).to.eql(result);

    });
  });

  describe('#map', function () {
    it('is a function', function () {
      expect(_.map).to.be.a('function');
     });

    it('should take at least 2 arguments', function () {
      expect(_.map.length).to.be.at.least(2);
    });

    it('should return an empty array if list is not of type array, string or object', function () {
      let value = 12;
      const func = function (a) {return a < 2;};
      expect(_.map(value, func)).to.eql([]);

      value = 1234.56;
      expect(_.map(value, func)).to.eql([]);      

      value = function (a) {return a * 2;};
      expect(_.map(value, func)).to.eql([]);

      value = new Date();
      expect(_.map(func)).to.eql([]);

      value = undefined;
      expect(_.map(func)).to.eql([]);

      value = NaN;   
      expect(_.map(func)).to.eql([]);

      value = null;
      expect(_.map(func)).to.eql([]); 
    });

    it('should return an array (containing all values) if passed an array, object or string but no iteratee', function () {
      let list = [1, 2, 3, 4, 5, 6];
      let result = [1, 2, 3, 4, 5, 6];
      expect(_.map(list)).to.eql(result); 

      list = '123456';
      result = ['1', '2', '3', '4', '5', '6'];
      expect(_.map(list)).to.eql(result); 
      
      list = {a: 'A', b: 'b', c: 'c', d: 'D', e: 'e'};
      result = ['A','b','c','D','e'];
      expect(_.map(list)).to.eql(result); 
    });

    it('returns a transformation of the original array whilst leaving the original array unmutated', function () {
      const list = [1, 2, 3, 4, 5, 6];
      const result = [2, 4, 6, 8, 10, 12];

      function doubleNum (number) {
        return number *= 2;
      }

      const numbers = _.map(list, doubleNum);
      expect(numbers).to.eql(result);
      expect(numbers).to.not.eql(list);
    });

    it('returns a transformed array whilst leaving the original object unmutated', function () {
      const list = {a: 'A', b: 'b', c: 'c', d: 'D', e: 'e'};
      const result = ['a','b','c','d','e'];

      function convertToLowerCase (char) {
        return char.toLowerCase();
      }
      const lowerChars = _.map(list, convertToLowerCase);
      expect(lowerChars).to.eql(result);
      expect(lowerChars).to.not.eql(list);
    });

    it('returns an array transformation whilst leaving the original string unmutated', function () {
      const list = 'aAbbccdDee';
      const result = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E'];

      function convertToUpperCase (char) {
        return char.toUpperCase();
      }

      const upperChars = _.map(list, convertToUpperCase);
      expect(upperChars).to.eql(result);
      expect(upperChars).to.not.eql(list);
    });

    it('binds a context to the iteratee', function () {
      const context = {a: 1, b: 2, c: 3};
      _.map([1,2,3,4,5], function () {
        // the value of 'this' in here should be the context object
        this.a = 'changed!';
      }, context);
      expect(context).to.eql({a: 'changed!', b: 2, c: 3});
    });
  });

  describe('#contains', function () {
    it('is a function', function () {
      expect(_.contains).to.be.a('function');
    });

    it('should take at least 2 arguments', function () {
      expect(_.contains.length).to.be.at.least(2);
    });

    it('should return false if less than 2 arguments passed to the function', function () {
      const array = [1, 2, 3];
      expect(_.contains(array)).to.equal(false);

      const obj = {a: 1, b: 2, c: 3};
      expect(_.contains(obj)).to.equal(false);
    });

    it('should return false if first argument is not an array or an object', function () {
      let value = 12;
      expect(_.contains(value, 12)).to.equal(false);

      value = 1234.56;
      expect(_.contains(value, 1234.56)).to.equal(false);

      value = '123456';
      expect(_.contains(value, '1')).to.equal(false);   

      value = function (a) {return a * 2;};
      expect(_.contains(value, 'function')).to.equal(false);

      value = new Date();
      expect(_.contains(value, new Date())).to.equal(false);

      value = undefined;
      expect(_.contains(value, undefined)).to.equal(false);

      value = NaN;   
      expect(_.contains(value, NaN)).to.equal(false);

      value = null;
      expect(_.contains(value, null)).to.equal(false); 
    }); 
    
    it('should return true if value exists in the array', function () {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      let result = _.contains(arr, 1);
      expect(result).to.equal(true);

      result = _.contains(arr, 4);
      expect(result).to.equal(true);

      result = _.contains(arr, 6);
      expect(result).to.equal(true);

      result = _.contains(arr, 9);
      expect(result).to.equal(true);
    });  

    it('should return false if value does NOT exist in the array', function () {
      const arr = [1, 2, 3, 4, 6, 7, 8, 9];
      let result = _.contains(arr, -1);
      expect(result).to.equal(false);

      result = _.contains(arr, 10);
      expect(result).to.equal(false);

      result = _.contains(arr, 5);
      expect(result).to.equal(false);

      result = _.contains(arr, 8.50);
      expect(result).to.equal(false);
    });    

    it('should return true if value exists in the object ', function () {
      const obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9};
      let result = _.contains(obj, 1);
      expect(result).to.equal(true);

      result = _.contains(obj, 4);
      expect(result).to.equal(true);

      result = _.contains(obj, 6);
      expect(result).to.equal(true);

      result = _.contains(obj, 9);
      expect(result).to.equal(true);
    });

    it('should return false if value does NOT exist in the object', function () {
      const obj = {a: 1, b: 2, c: 3, d: 4, f: 6, g: 7, h: 8, i: 9};
      let result = _.contains(obj, -1);
      expect(result).to.equal(false);

      result = _.contains(obj, 10);
      expect(result).to.equal(false);

      result = _.contains(obj, 5);
      expect(result).to.equal(false);

      result = _.contains(obj, 8.50);
      expect(result).to.equal(false);
    });

    it('should return true if value exists in the array from a specified start index', function () {
      const arr = [1, 2, 3, 4, 2, 'a', 'a', 'z', 5, 1, 6, 4, 6, 6.5, 7, 7, 8, 9, 'y', 'z', 'Z'];
      let startIndex = 2;
      let result = _.contains(arr, 3, startIndex);
      expect(result).to.equal(true);

      startIndex = 4;
      result = _.contains(arr, 'a', startIndex);
      expect(result).to.equal(true);

      startIndex = 10;
      result = _.contains(arr, 'z', startIndex);
      expect(result).to.equal(true);

      startIndex = 11;
      result = _.contains(arr, 6, startIndex);
      expect(result).to.equal(true);

      startIndex = 0;
      result = _.contains(arr, 'Z', startIndex);
      expect(result).to.equal(true);
    });  
    
    it('should return false if value does NOT exist in the array from a specified start index', function () {
      const arr = [1, 2, 3, 4, 2, 'a', 'a', 'z', 5, 1, 6, 4, 6, 6.5, 7, 7, 8, 9, 'y', 'z', 'Z'];
      let startIndex = 0;
      let result = _.contains(arr, 1.5, startIndex);
      expect(result).to.equal(false);

      startIndex = 16;
      result = _.contains(arr, 'Y', startIndex);
      expect(result).to.equal(false);

      startIndex = 5;
      result = _.contains(arr, 2, startIndex);
      expect(result).to.equal(false);

      startIndex = 7;
      result = _.contains(arr, 'a', startIndex);
      expect(result).to.equal(false);

      startIndex = 20;
      result = _.contains(arr, 'z', startIndex);
      expect(result).to.equal(false);
    });     

    it('should return true if value exists in the object from a specified start index', function () {
      const obj = {a: 1, b: 2, c: 3, d: 4, e: 2, f: 'a', g: 'a', h: 'z', i: 5, j: 1, k: 6, l: 4, m: 6,
        n: 6.5, o: 7, p: 7, q: 8, r: 9, s: 'y', t: 'z', u: 'Z'};

      let startIndex = 2;
      let result = _.contains(obj, 3, startIndex);
      expect(result).to.equal(true);

      startIndex = 4;
      result = _.contains(obj, 'a', startIndex);
      expect(result).to.equal(true);

      startIndex = 10;
      result = _.contains(obj, 'z', startIndex);
      expect(result).to.equal(true);

      startIndex = 11;
      result = _.contains(obj, 6, startIndex);
      expect(result).to.equal(true);

      startIndex = 0;
      result = _.contains(obj, 'Z', startIndex);
      expect(result).to.equal(true);
    });   

    it('should return false if value does NOT exist in the object from a specified start index', function () {
      const obj = {a: 1, b: 2, c: 3, d: 4, e: 2, f: 'a', g: 'a', h: 'z', i: 5, j: 1, k: 6, l: 4, m: 6,
        n: 6.5, o: 7, p: 7, q: 8, r: 9, s: 'y', t: 'z', u: 'Z'};

      let startIndex = 0;
      let result = _.contains(obj, 1.5, startIndex);
      expect(result).to.equal(false);

      startIndex = 16;
      result = _.contains(obj, 'Y', startIndex);
      expect(result).to.equal(false);

      startIndex = 5;
      result = _.contains(obj, 2, startIndex);
      expect(result).to.equal(false);

      startIndex = 7;
      result = _.contains(obj, 'a', startIndex);
      expect(result).to.equal(false);

      startIndex = 20;
      result = _.contains(obj, 'z', startIndex);
      expect(result).to.equal(false);
    });
  });

  describe('#pluck', function () {
    it('is a function', function () {
      expect(_.pluck).to.be.a('function');
    });

    it('should take at least 2 arguments', function () {
      expect(_.pluck.length).to.be.at.least(2);
    });

    it('should return an empty array if first argument is not an array, string or object', function () {
      let value = 12;
      expect(_.pluck(value, 12)).to.eql([]);

      value = 1234.56;
      expect(_.pluck(value, 1234.56)).to.eql([]); 

      value = function (a) {return a * 2;};
      expect(_.pluck(value, 'function')).to.eql([]);

      value = new Date();
      expect(_.pluck(value, new Date())).to.eql([]);

      value = undefined;
      expect(_.pluck(value, undefined)).to.eql([]);

      value = NaN;   
      expect(_.pluck(value, NaN)).to.eql([]);

      value = null;
      expect(_.pluck(value, null)).to.eql([]); 
    }); 
    
  });
}); 