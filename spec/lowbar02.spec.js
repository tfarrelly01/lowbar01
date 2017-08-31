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

});
