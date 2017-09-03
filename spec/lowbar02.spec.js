const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));
const sinon = require('sinon');

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });
  
  describe('#once', function () {
    it('is a function', function () {
      expect(_.once).to.be.a('function');
    });

    it('should take one argument', function () {
      expect(_.once.length).to.equal(1);
    });

    it('returns a function', function () {
      let result = _.once (function () {  });
      expect(result).to.be.a('function');

      result = _.once(123);
      expect(result).to.be.a('function');

      result = _.once([1, 2, 3]);
      expect(result).to.be.a('function');

      result = _.once({a: 1, b: 2, c: 3});
      expect(result).to.be.a('function');

      result = _.once(null);
      expect(result).to.be.a('function');
    });

    it('should only run the function once', function () {
        const spy = sinon.spy();
        const spiedOnce = _.once(spy);
        spiedOnce();
        spiedOnce();
        spiedOnce();
        expect(spy.callCount).to.equal(1);
    });   
  
    it('should invoke the original function with correct this and passed arguments', function () {
      const callbackSpy = sinon.spy();
      const spiedOnce = _.once(callbackSpy);
      const obj = {};

      spiedOnce.call(obj, 1, 2, 3);

      expect(callbackSpy.calledOn(obj)).to.equal(true);
      expect(callbackSpy.calledWith(1, 2, 3)).to.equal(true);
    });

    it('should return the value returned from the original function', function () {
      const callbackSpy = sinon.stub().returns('Hello World');
      const spiedOnce = _.once(callbackSpy);

      expect(spiedOnce()).to.equal('Hello World');
    });
  });

  describe('#memoize', function () {
    it('is a function', function () {
      expect(_.memoize).to.be.a('function');
    });

    it('should accept at least one argument', function () {
      expect(_.memoize.length).to.be.at.least(1);
    });

    it('returns a function', function () {
      let result = _.memoize (function () {  });
      expect(result).to.be.a('function');

      result = _.memoize(123);
      expect(result).to.be.a('function');
    });

    it('only runs the function when necessary', function () {
      const spy = sinon.stub();
      spy.returns(1);
      const rememberSpy = _.memoize(spy);
      rememberSpy(1);
      expect(spy.callCount).to.equal(1);
      rememberSpy(1);
      expect(spy.callCount).to.equal(1);
      rememberSpy(2);
      expect(spy.callCount).to.equal(2);
    });

    it('should compute the hash key for storing the result when passed a hash function, based on the arguments to the original function.', function () {
      const hashFn = function (item) {
        for (let idx in item) item[idx] = item[idx] += 1;

        return item;
      };
      const spy = sinon.stub();
      const rememberSpy = _.memoize(spy, hashFn);

      spy.returns({a: 3, b: 4, c: 5});

      rememberSpy({a: 2, b: 3, c: 4});
      expect(spy.callCount).to.equal(1);
      rememberSpy({a: 2, b: 3, c: 4});
      expect(spy.callCount).to.equal(1);
      rememberSpy({a: 2, b: 3, c: 4});
      expect(spy.callCount).to.equal(1);

      spy.returns({a: 2, b: 3, c: 4});

      rememberSpy({a: 1, b: 2, c: 3});
      expect(spy.callCount).to.equal(2);
      rememberSpy({a: 1, b: 2, c: 3});
      expect(spy.callCount).to.equal(2);

      spy.returns({a: 10, b: 20, c: 30});

      rememberSpy({a: 9, b: 19, c: 29});
      expect(spy.callCount).to.equal(3);
      rememberSpy({a: 9, b: 19, c: 29});
      expect(spy.callCount).to.equal(3);
    });
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

    it('should return an zero if no arguments passed to the function', function () {
      expect(_.sortedIndex()).to.equal(0);
    });

    it('should return an zero if first argument is not an array, object or string', function () {
      let value = 12;
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
  });
  
  describe('#flatten', function () {
    it('is a function', function () {
      expect(_.flatten).to.be.a('function');
    });

    it('should take at least 1 argument', function () {
      expect(_.flatten.length).to.be.at.least(1);
    });

    it('should return an empty array if no arguments passed to the function', function () {
      expect(_.flatten()).to.eql([]);
    });

    it('should return an array', function () {
      expect(_.flatten()).to.eql([]);
    });

    it('should return an empty array if argument passed to the function is not an array', function () {
      let value = 12;
      expect(_.flatten(value)).to.eql([]);

      value = 1234.56;
      expect(_.flatten(value)).to.eql([]);

      value = '123456';
      expect(_.flatten(value)).to.eql([]);   

      value = {a: 1, b: 2, c: 3};
      expect(_.flatten(value)).to.eql([]); 

      value = function (a) {return a * 2;};
      expect(_.flatten(value)).to.eql([]);

      value = new Date();
      expect(_.flatten(value)).to.eql([]);

      value = undefined;
      expect(_.flatten(value)).to.eql([]);

      value = NaN;   
      expect(_.flatten(value)).to.eql([]);

      value = null;
      expect(_.flatten(value)).to.eql([]); 
    }); 
    
    it('should process a nested array and return a flattened array', function () {
      const array = [1, [2], [3, [[4]]]]; 
      const result = [1, 2, 3, 4];
      expect(_.flatten(array)).to.eql(result); 
    });

    it('should process a deeply nested array and return a flattened array', function () {
      const array = [1, [1.5, [2, [2.5, 2.6, [2.51, 2.52, [2.521, 2.522]]]]], [3, [[4, ['five', 'six', [null, NaN, [undefined, [true, [false]]]]]]]]]; 
      const result = [1, 1.5, 2, 2.5, 2.6, 2.51, 2.52, 2.521, 2.522,  3, 4, 'five', 'six', null, NaN, undefined, true, false];
      expect(_.flatten(array)).to.eql(result); 
    });
     
    it('flattens nested array to a single level if the second argument (shallow) passed to the function is set to true.', function () {
      const array = [1, [2], [3, [[4]]]]; 
      const shallow = true;
      const result = [1, 2, 3, [[4]]];
      expect(_.flatten(array, shallow)).to.eql(result); 
    });

    it('flattens deeply nested array to a single level if the second argument (shallow) passed to the function is set to true.', function () {
      const array = [1, [1.5, [2, [2.5, 2.6, [2.51, 2.52, [2.521, 2.522]]]]], [3, [[4, ['five', 'six', [null, NaN, [undefined, [true, [false]]]]]]]]]; 

      const shallow = true;

      const result = [1, 1.5, [2, [2.5, 2.6, [2.51, 2.52, [2.521, 2.522]]]], 3, [[4, ['five', 'six', [null, NaN, [undefined, [true, [false]]]]]]]]; 

      let output = _.flatten(array, shallow);
      expect(output).to.eql(result); 
    });
  }); 

  describe('#intersection', function () {
    it('is a function', function () {
      expect(_.intersection).to.be.a('function');
    });

    it('should expect at least one argument', function () {
      expect(_.intersection.length).to.be.at.least(1);
    });

    it('should return an array', function () {
      const arr = [1, 2, 3];
      expect(Array.isArray(_.intersection(arr))).to.equal(true);
    });

    it('should return an empty array if no arguments passed to the function', function () {
      expect(_.intersection()).to.eql([]);
    });

    it('should return an empty array if 1st argument is not an array or string data type', function () {
      let value = 12;
      expect(_.intersection(value)).to.eql([]);

      value = 1234.56;
      expect(_.intersection(value)).to.eql([]);

      value = {a: 1, b: 2, c: 3};
      expect(_.intersection(value)).to.eql([]); 

      value = function (a) {return a * 2;};
      expect(_.intersection(value)).to.eql([]);

      value = new Date();
      expect(_.intersection(value)).to.eql([]);

      value = undefined;
      expect(_.intersection(value)).to.eql([]);

      value = NaN;   
      expect(_.intersection(value)).to.eql([]);

      value = null;
      expect(_.intersection(value)).to.eql([]);     

      value = true;   
      expect(_.intersection(value)).to.eql([]);

      value = false;
      expect(_.intersection(value)).to.eql([]); 
    });

    it('should return original array if only one array argument passed to the function', function () {
      const arr = [1, 3, 5, 7];
      const result = [1, 3, 5, 7];
      expect(_.intersection(arr)).to.eql(result);
    });

    it('should return an array containing all elements present in each of the two seperate arrays', function () {
      const arr1 = [1, 2, 'a', 10, 'fred', 'z', 'bob', false, undefined];
      const arr2 = [1, 3, 'a', 11, 'bob', 'bill', 15, true, undefined];
      const result = [1, 'a', 'bob', undefined];

      expect(_.intersection(arr1, arr2)).to.eql(result);
    });

    it('should return an array containing all elements present in each array passed to the function', function () {
      const arr1 = [1, 2, 'a', 10, 'fred', 'z', 'bob', true, false, undefined, null, NaN];
      const arr2 = [1, 3, 'a', 11, 'bob', 'bill', 15, true, undefined, NaN, false];
      const arr3 = [1, 1, 'a', 'bob', 'bill', 36, true, undefined, null, NaN];      
      const arr4 = [1, 3, 'a', 18, 'bob', 'amy', 25, true, undefined, NaN];
      const arr5 = [1, 3, 'a', 'z', 'bob', 'jim', 15, true, undefined, false, NaN, null];
      const arr6 = [1, 3, 'a', 11, 'bob', 'bill', 15, true, undefined, true, NaN];
      const result = [1, 'a', 'bob', true, undefined, NaN];

      expect(_.intersection(arr1, arr2, arr3, arr4, arr5, arr6)).to.eql(result);
    });

    it('should return an array if first argument is a string', function () {
      const str = '12aze';
      const arr = ['1', 'z', 'b'];
      const arr1 = [1, 2];
      const result = ['1', '2', 'a', 'z', 'e'];
      const result1 = ['1', 'z'];
      const result2 = [];

      expect(_.intersection(str)).to.eql(result);
      expect(_.intersection(str, arr)).to.eql(result1);
      expect(_.intersection(str, arr1)).to.eql(result2);
    });

    it('should return an array if arguments are a mixture of arrays and strings', function () {
      const str1 = '123d';
      const str2 = '2acd';
      const arr1 = ['2', 'b', 'd'];
      const arr2 = ['1', '2', 'd',];
      const result = ['2', 'd'];

      expect(_.intersection(arr1, str1, arr2, str2)).to.eql(result);
      expect(_.intersection(str1, arr1, str2, arr2)).to.eql(result);
    });
  });

  describe('#difference', function () {
    it('is a function', function () {
      expect(_.difference).to.be.a('function');
    });

    it('should expect at least one argument', function () {
      expect(_.difference.length).to.be.at.least(1);
    });

    it('should return an empty array if no arguments passed to the function', function () {
      expect(_.difference()).to.eql([]);
    });

    it('should return an array', function () {
      expect(_.difference()).to.eql([]);
    });

    it('should return an empty array if first argument is not an array, object or string', function () {
      let value = 12;
      expect(_.difference(value)).to.eql([]);

      value = 1234.56;
      expect(_.difference(value)).to.eql([]); 

      value = function (a) {return a * 2;};
      expect(_.difference(value)).to.eql([]);

      value = new Date();
      expect(_.difference(value)).to.eql([]);

      value = undefined;
      expect(_.difference(value)).to.eql([]);

      value = NaN;   
      expect(_.difference(value)).to.eql([]);

      value = null;
      expect(_.difference(value)).to.eql([]);     

      value = true;
      expect(_.difference(value)).to.eql([]); 

      value = false;
      expect(_.difference(value)).to.eql([]); 
    });

    it('should return an array if one argument is passed to the function of type array, string or object', function () {
      const arr = ['1', '2', '3'];
      const obj = {a: '1', b: '2', c: '3'};
      const str = '123';
      const result = ['1', '2', '3'];

      expect(_.difference(arr)).to.eql(result);
      expect(_.difference(obj)).to.eql(result);
      expect(_.difference(str)).to.eql(result);            
    });

    it('should return an array if a second argument is passed to the function which is not an array', function () {
      const arr = ['a', 'b', 'c'];
      const obj = {a: 'a', b: 'b', c: 'c'};
      const str = 'abc';

      const secondArgStr = '134';
      const secondArgObj = {a: 1, b: 3, c: 4};
      const secondArgNum = 12.34;

      const result = ['a', 'b', 'c'];

      expect(_.difference(arr, secondArgStr)).to.eql(result);
      expect(_.difference(arr, secondArgObj)).to.eql(result);
      expect(_.difference(arr, secondArgNum)).to.eql(result);
      expect(_.difference(arr, null)).to.eql(result);

      expect(_.difference(obj, secondArgStr)).to.eql(result);
      expect(_.difference(obj, secondArgObj)).to.eql(result);
      expect(_.difference(obj, secondArgNum)).to.eql(result);
      expect(_.difference(obj, NaN)).to.eql(result);

      expect(_.difference(str, secondArgStr)).to.eql(result);
      expect(_.difference(str, secondArgObj)).to.eql(result); 
      expect(_.difference(str, secondArgNum)).to.eql(result); 
      expect(_.difference(str, undefined)).to.eql(result); 
    });

    it('should accept a variable number of array arguments', function () {
      const arr = [1, 2, 3];
      const arr1 = [4, 5, 6, 10];
      const arr2 = [7, 8, 9];
      const arr3 = 1;
      expect(Array.isArray(_.difference(arr))).to.equal(true);
      expect(Array.isArray(_.difference(arr, arr1))).to.equal(true); 
      expect(Array.isArray(_.difference(arr, arr1, arr2))).to.equal(true);
      expect(Array.isArray(_.difference(arr, arr1, arr2, arr3))).to.equal(true);
    });

    it('should return the difference between 2 arrays', function () {
      const arr = [1, 2, 3];
      const arr1 = [2, 5, 6, 10];
      const result = [1, 3];

      expect(_.difference(arr, arr1)).to.eql(result);
    });

    it('should return the difference between the first array and mulitiple other arrays passed to the function', function () {
      const arr = [1, 2, 3, 10, 15, 16, 20, 'tom', 'ted'];
      const arr1 = [2, 5, 6, 10];
      const arr2 = [10, 11, 12, 19];
      const arr3 = [19, 15, 16];
      const arr4 = ['tom', 1];
      const result = [3, 20, 'ted'];

      expect(_.difference(arr, arr1, arr2, arr3, arr4)).to.eql(result);
    });

    it('should return the difference if an object is passed as the first argument to the function', function () {
      const arr = {a: 1, b: 2, c: 3, e: 'bill', f: 'fred'};
      const arr1 = [2, 5, 6, 10, 'fred'];
      const arr2 = ['Bill', 1];
      const result = [3,'bill'];

      expect(_.difference(arr, arr1, arr2)).to.eql(result);  
    });

    it('should return the difference if a string is passed as the first argument to the function', function () {
      const arr = '123abcd';
      const arr1 = ['2', '5', '3', '10', 'd'];
      const arr2 = ['b', 'a'];
      const result = ['1','c'];

      expect(_.difference(arr, arr1, arr2)).to.eql(result);  
    });

    it('ignores non-array types passed as other arguments', function () {
      const arr = [1, 2, 3, 'bill', 'bob'];
      const arr1 = 'foo';
      const arr2 = [1, 5];
      const arr3 = 1;
      const arr4 = true;
      const arr5 = {a: 'foo', b: 'bar'};
      const arr6 = NaN;
      const arr7 = [3, 'bill'];
      const result = [2, 'bob'];

      expect(_.difference(arr, arr1, arr2, arr3, arr4, arr5, arr6, arr7)).to.eql(result);
    });
  });

  describe('#delay', function () {
    let clock;

    before(function () { clock = sinon.useFakeTimers(); });
    after(function () { clock.restore(); });

    it('is a function', function () {
      expect(_.delay).to.be.a('function');
    });

    it('should take two arguments', function () {
      expect(_.delay.length).to.equal(2);
    });

    it('returns undefined if no arguments passed to function', function () {
      let result = undefined;
      expect(_.delay()).to.equal(result);
    });
    
    it('returns undefined if first argument is not a function', function () {
      let result = undefined;
      let wait = 0;

      let func = 123;
      expect(_.delay(func, wait)).to.equal(result);

      func = 123.45;
      expect(_.delay(func, wait)).to.equal(result);

      func = 'string';
      expect(_.delay(func, wait)).to.equal(result);
      
      func = [1, 2, 3];
      expect(_.delay(func, wait)).to.equal(result);

      func = {a: 1, b: 2, c: 3};
      expect(_.delay(func, wait)).to.equal(result);

      func = true;
      expect(_.delay(func, wait)).to.equal(result);

      func = false;
      expect(_.delay(func, wait)).to.equal(result);

      func = undefined;
      expect(_.delay(func, wait)).to.equal(result);

      func = NaN;
      expect(_.delay(func, wait)).to.equal(result);

      func = null;
      expect(_.delay(func, wait)).to.equal(result);

      func = new Date();
      expect(_.delay(func, wait)).to.equal(result);
    });

    it('delays invocation of callback for specified period', function () {
      let callback = sinon.spy();
      let wait = 100;

      _.delay(callback, wait);

      clock.tick(1);
      expect(callback.callCount).to.equal(0);
      expect(callback.notCalled).to.equal(true);
      expect(callback.called).to.equal(false);

      clock.tick(98);
      expect(callback.callCount).to.equal(0);
      expect(callback.notCalled).to.equal(true);
      expect(callback.called).to.equal(false);

      clock.tick(100);
      expect(callback.callCount).to.equal(1);
      expect(callback.notCalled).to.equal(false); 
      expect(callback.called).to.equal(true);

      clock.tick(101);
      expect(callback.callCount).to.equal(1);
      expect(callback.notCalled).to.equal(false);  
      expect(callback.called).to.equal(true);
    });
  });

});
