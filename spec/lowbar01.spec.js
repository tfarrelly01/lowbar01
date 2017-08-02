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
      const value = [1, 2, 3];
      expect(_.each(value)).to.equal(value);
    });

    it('returns the value of the first argument (list) if the first argument is not an array, string  or object', function () {
      let list = 123;
      let iteratee = function (item) { console.log(item); };
      expect(_.each(list, iteratee)).to.equal(list);

      list = 12.3;
      expect(_.each(list, iteratee)).to.equal(list);

      list = new Date();
      expect(_.each(list, iteratee)).to.equal(list);

      list = function (item) { console.log(item); };
      expect(_.each(list, iteratee)).to.equal(list);
    });

    it('returns the value of the first argument (list) if the second argument (iteratee) is not a function', function () {
      const list = [1, 2, 3];
      const iteratee = 123;
      expect(_.each(list, iteratee)).to.equal(list);
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

    it('returns array of values from an array that pass the truth test', function () {
      const list = [1, 2, 3, 4, 5, 6];
      const result = [2, 4, 6];

      function numDivByTwo (number) {
        return number % 2 === 0;
      }

      const numbers = _.filter(list, numDivByTwo);
      expect(numbers).to.eql(result);
    });

    it('returns array of values from an object that pass the truth test', function () {
      const list = {a: 'A', b: 'b', c: 'c', d: 'D', e: 'e'};
      const result = ['A', 'D'];

      function findUpperCaseChars (char) {
        return char === char.toUpperCase();
      }
      const upperChars = _.filter(list, findUpperCaseChars);
      expect(upperChars).to.eql(result);
    });
  });

}); 