const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });

  describe('#shuffle', function () {
    it('is a function', function () {
      expect(_.shuffle).to.be.a('function');
    });

    it('should expect one argument', function () {
      expect(_.shuffle.length).to.equal(1);
    });

    it('should return an empty array if no arguments passed to the function', function () {
      expect(_.shuffle()).to.eql([]);
    });

    it('should return an empty array if first argument is not an array, object or string', function () {
      let value = 12;
      expect(_.shuffle(value)).to.eql([]);

      value = 1234.56;
      expect(_.shuffle(value)).to.eql([]); 

      value = function (a) {return a * 2;};
      expect(_.shuffle(value)).to.eql([]);

      value = new Date();
      expect(_.shuffle(value)).to.eql([]);

      value = undefined;
      expect(_.shuffle(value)).to.eql([]);

      value = NaN;   
      expect(_.shuffle(value)).to.eql([]);

      value = null;
      expect(_.shuffle(value)).to.eql([]);     

      value = true;
      expect(_.shuffle(value)).to.eql([]); 

      value = false;
      expect(_.shuffle(value)).to.eql([]); 
    });

    it('should return an array if an array argument is passed-in to the function', function () {
      const arr = [1, 2, 3, 4, 5];
      expect(Array.isArray(_.shuffle(arr))).to.equal(true);
    });

    it('should return an array if an object argument is passed-in to the functon', function () {
      const obj = {a: 1, b: 2, c: 3, d: 4, e: 5};
      expect(Array.isArray(_.shuffle(obj))).to.equal(true);
    });

    it('should return an array if a string argument is passed-in to the function', function () {
      const str = '12345';
      expect(Array.isArray(_.shuffle(str))).to.equal(true);
    });

    it('should return a shuffled array if an array argument is passed-in to the function', function () {
      const arr = [1, 2, 3, 4, 5];
      const arrLength = arr.length;
      const result = _.shuffle(arr);

      expect(result.length).to.equal(arrLength);

      expect(_.intersection(arr, result)).to.eql(arr);
    });

    it('should return a shuffled array if an object argument is passed-in to the function', function () {
      const obj = {a: 1, b: 2, c: 3, d: 4, e: 5};
      const objValues = Object.values(obj);
      const arrLength = objValues.length;
      const result = _.shuffle(obj);

      expect(result.length).to.equal(arrLength);

      expect(_.intersection(objValues, result)).to.eql(objValues);
    });

    it('should return a shuffled array if a string argument is passed-in to the function', function () {
      const str = '12345';
      const arr = str.split('');
      const arrLength = arr.length;
      const result = _.shuffle(str);

      expect(result.length).to.equal(arrLength);

      expect(_.intersection(arr, result)).to.eql(arr);
    });

    it('should return a shuffled array if an array of objects is passed-in to the function', function () {
      const people = [
        {name: 'Barney Rubble', age: 1032},
        {name: 'Mildred Rubble', age: 1024},
        {name: 'Fred Flintstone', age: 1032},
        {name: 'Wilmar Flintstone', age: 1026}
      ];
      const arrLength = people.length;
      const result = _.shuffle(people);

      expect(result.length).to.equal(arrLength);

      expect(_.intersection(people, result)).to.eql(people);
    });

    it('should return a shuffled array if an array of assorted data types is passed-in to the function', function () {
      const junk = [
        {name: 'Barney Rubble', age: 1032},
        1,
        {name: 'Mildred Rubble', age: 1024},
        '2',
        {name: 'Fred Flintstone', age: 1032},
        [1, 2, 4],
        {name: 'Wilmar Flintstone', age: 1026},
        ['Bob', 'fred'],
        102.34,
        null,
        undefined,
        NaN,
        true,
        false,
        new Date(),
        function () {},
        [1, [2, 3, [4]], 5],
        {a: 1, b : {c: 2, d: 3}, c: 4}
      ];
      const arrLength = junk.length;
      const result = _.shuffle(junk);
      expect(result.length).to.equal(arrLength);

      expect(_.intersection(junk, result)).to.eql(junk);
    });
  });

  describe('#invoke', function () {
    const sortedAnimals = [
      ['dog', 'frog', 'wolf' ],
      ['bats', 'cats', 'rats'],
      ['lion', 'puma', 'tiger']
    ];
    
    const joinedAnimals = [
      'dog,frog,wolf',
      'bats,cats,rats',
      'lion,puma,tiger'
    ];

    const joinedAnimals1 = [
      'dog:::frog:::wolf',
      'bats:::cats:::rats',
      'lion:::puma:::tiger'
    ];

    const reverseSortedAnimals = [
      ['wolf', 'frog', 'dog'],
      ['rats', 'cats', 'bats'],
      ['tiger', 'puma', 'lion']
    ];

    const reverseAnimals = [ 
      ['wolf', 'dog', 'frog'],
      ['bats', 'rats', 'cats'],
      ['puma', 'tiger', 'lion']
    ];

    it('is a function', function () {
      expect(_.invoke).to.be.a('function');
    });

    it('should take at least two arguments', function () {
      expect(_.invoke.length).to.be.at.least(2);
    });

    it('returns an empty array if no arguments are passed to the function', function () {
      expect(_.invoke()).to.eql([]);
    });

    it('returns an empty array if 1st argument is not of type array & not of type object', function () {
      let arg = 123;
      const result = [];
      const method = function () {};
      expect(_.invoke(arg, method)).to.eql(result);

      arg = 123.34;
      expect(_.invoke(arg, method)).to.eql(result);

      arg = new Date();
      expect(_.invoke(arg, method)).to.eql(result);

      arg = null;
      expect(_.invoke(arg, method)).to.eql(result);

      arg = NaN;
      expect(_.invoke(arg, method)).to.eql(result);

      arg = undefined;
      expect(_.invoke(arg, method)).to.eql(result);

      arg = true;
      expect(_.invoke(arg, method)).to.eql(result);

      arg = false;
      expect(_.invoke(arg, method)).to.eql(result);
    });

    it('invokes the passed method name (sort) on each value in the list', function () {
      // repeated as array is mutated when passed to a sort method
      const animals = [
        ['frog', 'dog', 'wolf' ],
        ['cats', 'rats', 'bats'],
        ['lion', 'tiger', 'puma']
      ];
      let result = _.invoke(animals, 'sort');
      expect(result).to.eql(sortedAnimals);
    });

    it('invokes the passed method name (join) on each value in the list', function () {
      let result = _.invoke(sortedAnimals, 'join');
      expect(result).to.eql(joinedAnimals);
    });

    it('invokes the passed function declaration on each value in the list', function () {
      // repeated as array is mutated when passed to a sort method
      const animals = [
        ['frog', 'dog', 'wolf' ],
        ['cats', 'rats', 'bats'],
        ['lion', 'tiger', 'puma']
      ];
      const func = function () { 
        return this.reverse();
      };
      let result = _.invoke(animals, func);
      expect(result).to.eql(reverseAnimals);
    });

    it('invokes the passed method name (sort) including additional passed arguments on each value in the list', function () {
      // repeated as array is mutated when passed to a sort method
      const animals = [
        ['frog', 'dog', 'wolf' ],
        ['cats', 'rats', 'bats'],
        ['lion', 'tiger', 'puma']
      ];
      const iteratee = function (a, b) {
        return a < b;
      };
      const result = _.invoke(animals, 'sort', iteratee);
      expect(result).to.eql(reverseSortedAnimals);
    });

    it('invokes the passed method name (join) including additional passed arguments on each value in the list', function () {
      const delimiter = ':::';
      const result = _.invoke(sortedAnimals, 'join', delimiter);
      expect(result).to.eql(joinedAnimals1);
    });

    it('handles a string list if passed to an appropriate method', function () {
      const result = [['1'], ['2'], ['3']];
      const delimiter = ' ';

      let list = '123';
      let value = _.invoke(list, 'split');
      expect(result).to.eql(result);

      list = '123';
      value = _.invoke(list, 'split', delimiter);
      expect(value).to.eql(result);
    });
  });

  describe('#sortBy', function () {
    it('is a function', function () {
      expect(_.sortBy).to.be.a('function');
    });

    it('should expect at least one argument', function () {
      expect(_.sortBy.length).to.be.at.least(1);
    });

    it('should return an empty array if no arguments passed to the function', function () {
      expect(_.sortBy()).to.eql([]);
    });

    it('should return an empty array if first argument is not an array, object or string', function () {
      let value = 12;
      expect(_.sortBy(value)).to.eql([]);

      value = 1234.56;
      expect(_.sortBy(value)).to.eql([]); 

      value = function (a) {return a * 2;};
      expect(_.sortBy(value)).to.eql([]);

      value = new Date();
      expect(_.sortBy(value)).to.eql([]);

      value = undefined;
      expect(_.sortBy(value)).to.eql([]);

      value = NaN;   
      expect(_.sortBy(value)).to.eql([]);

      value = null;
      expect(_.sortBy(value)).to.eql([]);     

      value = true;
      expect(_.sortBy(value)).to.eql([]); 

      value = false;
      expect(_.sortBy(value)).to.eql([]); 
    });

    it('should sort an array argument in ascending order', function () {
      const array = [4, 5, 1, 2, 3, 12, 10];
      const result = [1, 2, 3, 4, 5, 10, 12];

      expect(_.sortBy(array)).to.eql(result);
    });

    it('should sort a string argument in ascending order', function () {
      const string = '45213';
      const result = ['1', '2', '3', '4', '5'];

      expect(_.sortBy(string)).to.eql(result);
    });

    it('should sort an object argument in ascending order', function () {
      const obj = {a: 'Bob', b: 'Ian', c: 'Roger', d: 'Albert', e: 'Fred'};
      const result = ['Albert', 'Bob', 'Fred', 'Ian', 'Roger'];

      expect(_.sortBy(obj)).to.eql(result);
    });

    it('should sort an array in ascending order via the results of passing each value through an iteratee', function () {
      const names = ['Bobby', 'Ian', 'Roger', 'Albert', 'Jonathon', 'Fred'];
      const stringLength = function (value) {
        return value.length;
      };
      const result = ['Ian', 'Fred', 'Bobby', 'Roger', 'Albert', 'Jonathon'];

      expect(_.sortBy(names, stringLength)).to.eql(result);
    });

    it('should sort an object in ascending order via the results of passing each value through an iteratee', function () {
      const names = {a: 'Bobby', b: 'Ian', c: 'Roger', d: 'Albert', e:'Jonathon', f: 'Fred'};
      const reverseString = function (value) {
        return value.split('').reverse().join('');
      };
      const result = ['Fred', 'Ian', 'Jonathon', 'Roger', 'Albert', 'Bobby'];

      expect(_.sortBy(names, reverseString)).to.eql(result);
    });

    it('should sort a string in ascending order via the results of passing each value through an iteratee', function () {
      const str = '521634';
      const modChar = function (value) {
        return '' + Number(value) % 2;
      };
      const result = ['2', '6', '4', '5', '1', '3'];

      expect(_.sortBy(str, modChar)).to.eql(result);
    });

    it('should sort an array of objects in ascending order via the results of passing each value through an iteratee', function () {
      const people = [
        {firstName: 'Barney', lastName: 'Rubble', age: 1032, nationality: 'Caveman'},
        {firstName: 'Mildred', lastName: 'Rubble', age: 1024, nationality: 'Cavewoman'},
        {firstName: 'Fred', lastName: 'Flintstone', age: 1032, nationality: 'Caveman'},
        {firstName: 'Wilmar', lastName: 'Flintstone', age: 1026, nationality: 'Cavewoman'},
        {firstName: 'Elvis', lastName: 'Presley', age: 0, nationality: 'American'},
        {firstName: 'Frank', lastName: 'Sinatra', age: 0, nationality: 'American'},
        {firstName: 'Tom', lastName: 'Jones', age: 81, nationality: 'Welsh'},
        {firstName: 'Annie', lastName: 'Jones', age: 22, nationality: 'Welsh'},
        {firstName: 'Engelbert', lastName: 'Humperdinck', age: 78, nationality: 'English'},
        {firstName: 'Harry', lastName: 'Karl', age: 22, nationality: 'Canadian'},
        {firstName: 'Kseniya', lastName: 'Welcome', age: 49, nationality: 'Nigerian'},
        {firstName: 'Jing', lastName: 'Xing', age: 34, nationality: 'Chinese'},
        {firstName: 'Piotr', lastName: 'Benoit', age: 52, nationality: 'Polish'}
      ];

      const result = [
        {firstName: 'Piotr', lastName: 'Benoit', age: 52, nationality: 'Polish'},
        {firstName: 'Fred', lastName: 'Flintstone', age: 1032, nationality: 'Caveman'},
        {firstName: 'Wilmar', lastName: 'Flintstone', age: 1026, nationality: 'Cavewoman'},
        {firstName: 'Engelbert', lastName: 'Humperdinck', age: 78, nationality: 'English'},
        {firstName: 'Annie', lastName: 'Jones', age: 22, nationality: 'Welsh'},
        {firstName: 'Tom', lastName: 'Jones', age: 81, nationality: 'Welsh'},
        {firstName: 'Harry', lastName: 'Karl', age: 22, nationality: 'Canadian'},
        {firstName: 'Elvis', lastName: 'Presley', age: 0, nationality: 'American'},
        {firstName: 'Barney', lastName: 'Rubble', age: 1032, nationality: 'Caveman'},
        {firstName: 'Mildred', lastName: 'Rubble', age: 1024, nationality: 'Cavewoman'},
        {firstName: 'Frank', lastName: 'Sinatra', age: 0, nationality: 'American'},
        {firstName: 'Kseniya', lastName: 'Welcome', age: 49, nationality: 'Nigerian'},
        {firstName: 'Jing', lastName: 'Xing', age: 34,nationality: 'Chinese'},
      ];

      const sortValues = function (value) {
        return (value.lastName + value.firstName).toUpperCase();
      };

      expect(_.sortBy(people, sortValues)).to.eql(result);
    });

    it('should sort an array of objects in ascending order by the string name of the property to sort by ', function () {
      const stooges = [
        {name: 'moe', age: 40}, 
        {name: 'larry', age: 50}, 
        {name: 'curly', age: 60}
      ];

      const result = [
        {name: 'curly', age: 60}, 
        {name: 'larry', age: 50}, 
        {name: 'moe', age: 40}
      ];

      expect(_.sortBy(stooges, 'name')).to.eql(result);

      expect(_.sortBy(result, 'age')).to.eql(stooges);      
    });

    it('binds a context to the iteratee', function () {
      const context = {a: 1, b: 2, c: 3};

      _.sortBy([1,2,3,4,5], function () {
        // the value of 'this' in here should be the context object
        this.a = 'changed!';
      }, context);

      expect(context).to.eql({a: 'changed!', b: 2, c: 3});
    });
  });

  describe('#zip', function () {
    it('is a function', function () {
      expect(_.zip).to.be.a('function');
    });

    it('should return an empty array if no arguments passed to the function', function () {
      expect(_.zip()).to.eql([]);
    });

    it('should return an array', function () {
      expect(_.zip()).to.eql([]);
    });

    it('should return an empty array if first argument is not an array', function () {
      let value = 12;
      expect(_.zip(value)).to.eql([]);

      value = 1234.56;
      expect(_.zip(value)).to.eql([]);

      value = {a: 1, b: 2, c: 3};
      expect(_.zip(value)).to.eql([]); 

      value = function (a) {return a * 2;};
      expect(_.zip(value)).to.eql([]);

      value = new Date();
      expect(_.zip(value)).to.eql([]);

      value = undefined;
      expect(_.zip(value)).to.eql([]);

      value = NaN;   
      expect(_.zip(value)).to.eql([]);

      value = null;
      expect(_.zip(value)).to.eql([]);     

      value = true;
      expect(_.zip(value)).to.eql([]); 

      value = false;
      expect(_.zip(value)).to.eql([]); 
    });

    it('should accept a variable number of array arguments', function () {
      const arr = [1, 2, 3];
      const arr1 = [4, 5, 6, 10];
      const arr2 = [7, 8, 9];
      const arr3 = 1;
      expect(Array.isArray(_.zip(arr))).to.equal(true);
      expect(Array.isArray(_.zip(arr, arr1))).to.equal(true); 
      expect(Array.isArray(_.zip(arr, arr1, arr2))).to.equal(true);
      expect(Array.isArray(_.zip(arr, arr1, arr2, arr3))).to.equal(true);
    });

    it('merges together the values of two arrays with the values at the corresponding position', function () {
      const arr1 = [4, 5, 6];
      const arr2 = [7, 8, 9];
      const result = [ [4, 7], [5, 8], [6, 9] ];
      expect(_.zip(arr1, arr2)).to.eql(result);
    });

    it('merges together the values of several arrays of objects with the values at the corresponding position', function () {
      const arr1 = [{a: 1}, {b: 2}, {c: 3}];
      const arr2 = [{d: 'foo'}, {e: 'bar'}, {f: 'baz'}];
      const arr3 = [{a: 'dog', b: 'cat'}, {c: 'bat', d: 'rat'}, {e: 'frog', f: 'toad', g: 'newt'}];
      const result = [ 
        [{a: 1}, {d: 'foo'}, {a: 'dog', b: 'cat'}], 
        [{b: 2}, {e: 'bar'}, {c: 'bat', d: 'rat'}], 
        [{c: 3}, {f: 'baz'}, {e: 'frog', f: 'toad', g: 'newt'}] 
      ];
      expect(_.zip(arr1, arr2, arr3)).to.eql(result);
    });

    it('merges together the values of several arrays of differing lengths with the values at the corresponding position', function () {
      const arr = [];
      const arr1 = [1, 2, 3, 4, 100];
      const arr2 = [4];
      const arr3 = [7, 8, 9];
      const arr4 = [{a: 1}, {b: 2}, {c: 3}, {d: 5}];
      const arr5 = [{d: 'foo'}, {e: 'bar'}];
      const arr6 = [{a: 'dog', b: 'cat'}, {c: 'bat', d: 'rat'}, {e: 'frog', f: 'toad', g: 'newt'}];
      const result = [ 
        [undefined, 1, 4, 7, {a: 1}, {d: 'foo'}, {a: 'dog', b: 'cat'}], 
        [undefined, 2, undefined, 8, {b: 2}, {e: 'bar'}, {c: 'bat', d: 'rat'}], 
        [undefined, 3, undefined, 9, {c: 3}, undefined, {e: 'frog', f: 'toad', g: 'newt'}],
        [undefined, 4, undefined, undefined, {d: 5}, undefined, undefined],
        [undefined, 100, undefined, undefined, undefined, undefined, undefined]
      ];
      expect(_.zip(arr, arr1, arr2, arr3, arr4, arr5, arr6)).to.eql(result);
    });

    it('merges together the values of several strings of differing lengths with the values at the corresponding position', function () {
      const str = '123';
      const str1 = 'abc';
      const str2 = '45';
      const str3 = 'd';
      const str4 = '';
      const result = [ 
        ['1', 'a', '4', 'd',undefined], 
        ['2', 'b', '5', undefined, undefined], 
        ['3', 'c', undefined, undefined, undefined]
      ];
      expect(_.zip(str, str1, str2, str3, str4)).to.eql(result);
    });

    it('continues to merge arrays whilst handling non-array types also passed as arguments', function () {
      const arr = [1, 2, 3];
      const arr1 = 'foo';
      const arr2 = [4, 5];
      const arr3 = 1;
      const arr4 = true;
      const arr5 = {a: 'foo', b: 'bar'};
      const arr6 = NaN;
      const result = [ 
        [1, 'f', 4, undefined, undefined, undefined, undefined],
        [2, 'o', 5, undefined, undefined, undefined, undefined],
        [3, 'o', undefined, undefined, undefined, undefined, undefined] 
      ];
      expect(_.zip(arr, arr1, arr2, arr3, arr4, arr5, arr6)).to.eql(result);
    });
  });

  describe('#sortedIndex', function () {
    it('is a function', function () {
      expect(_.sortedIndex).to.be.a('function');
    });

    it('should expect at least two argument', function () {
      expect(_.sortedIndex.length).to.be.at.least(2);
    });

    it('should return zero if one or less arguments passed to the function', function () {
      expect(_.sortedIndex()).to.equal(0);

      let value = [1, 3, 4];
      expect(_.sortedIndex(value)).to.equal(0);

      value  = '134';
      expect(_.sortedIndex(value)).to.equal(0);
      
      value = 12;
      expect(_.sortedIndex(value)).to.equal(0);

      value = 1234.56;
      expect(_.sortedIndex(value)).to.equal(0); 

      value = function (a) {return a * 2;};
      expect(_.sortedIndex(value)).to.equal(0);

      value = {a: 1, b: 2, d: 4};
      expect(_.sortedIndex(value)).to.equal(0);

      value = new Date();
      expect(_.sortedIndex(value)).to.equal(0);

      value = undefined;
      expect(_.sortedIndex(value)).to.equal(0);

      value = NaN;   
      expect(_.sortedIndex(value)).to.equal(0);

      value = null;
      expect(_.sortedIndex(value)).to.equal(0);     

      value = true;
      expect(_.sortedIndex(value)).to.equal(0); 

      value = false;
      expect(_.sortedIndex(value)).to.equal(0); 
    });

    it('should return zero if first argument is not an array, object or string', function () {
      let value = 12;
      let element = 3;
      expect(_.sortedIndex(value, element)).to.equal(0);

      value = 1234.56;
      expect(_.sortedIndex(value, element)).to.equal(0); 

      value = function (a) {return a * 2;};
      expect(_.sortedIndex(value, element)).to.equal(0);

      value = {a: 1, b: 2, d: 4};
      expect(_.sortedIndex(value, element)).to.equal(0);

      value = new Date();
      expect(_.sortedIndex(value, element)).to.equal(0);

      value = undefined;
      expect(_.sortedIndex(value, element)).to.equal(0);

      value = NaN;   
      expect(_.sortedIndex(value, element)).to.equal(0);

      value = null;
      expect(_.sortedIndex(value, element)).to.equal(0);     

      value = true;
      expect(_.sortedIndex(value, element)).to.equal(0); 

      value = false;
      expect(_.sortedIndex(value, element)).to.equal(0); 
    });
    
    it('should return the index at which passed value should be inserted into the passed array', function () {
      let list = [1, 2, 4];
      let value = 3;
      let result = 2;

      expect(_.sortedIndex(list, value)).to.equal(result);
    });

    it('should return the index at which passed value should be inserted into the passed string', function () {
      let list = '124';
      let value = '3';
      let result = 2;

      expect(_.sortedIndex(list, value)).to.equal(result);
    });

    it('should return the index at which passed value should be inserted into an array of objects', function () {
      const stooges =  [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];

      let value = {name: 'larry', age: 50};
      let result = 2;
      expect(_.sortedIndex(stooges, value, 'age')).to.equal(result);

      value = {name: 'larry', age: 61};
      result = 3;
      expect(_.sortedIndex(stooges, value, 'age')).to.equal(result);
    });

    it('should use a binary search and comparator function to determine the smallest index at which an item can be inserted into the list whilst maintaining order', function () {
      const people = [
          {firstName: 'Piotr', lastName: 'Benoit', age: 52, nationality: 'Polish'},
          {firstName: 'Engelbert', lastName: 'Humperdinck', age: 78, nationality: 'English'},
          {firstName: 'Annie', lastName: 'Jones', age: 22, nationality: 'Welsh'},
          {firstName: 'Tom', lastName: 'Jones', age: 81, nationality: 'Welsh'},
          {firstName: 'Harry', lastName: 'Karl', age: 22, nationality: 'Canadian'},
          {firstName: 'Jing', lastName: 'Xing', age: 34,nationality: 'Chinese'},
      ];
      const person = {firstName: 'Kseniya', lastName: 'Welcome', age: 49, nationality: 'Nigerian'};  
      const sortBy = function (value) {
          return (value.lastName + value.firstName).toUpperCase();
      };
      const result = 5;

      expect(_.sortedIndex(people, person, sortBy)).to.equal(result);
    });

    it('binds a context to the iteratee', function () {
      const context = {a: 1, b: 2, c: 3};

      _.sortedIndex([1,2,4,5], 3, function () {
        // the value of 'this' in here should be the context object
        this.a = 'changed!';
      }, context);

      expect(context).to.eql({a: 'changed!', b: 2, c: 3});
    });
  });

});
