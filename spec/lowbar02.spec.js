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

    it('delays invocation of callback for 100ms', function () {
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
    const animals = [
      ['frog', 'dog', 'wolf' ],
      ['cats', 'rats', 'bats'],
      ['lion', 'tiger', 'puma']
    ];

    const sortedAnimals = [
      ['dog', 'frog', 'wolf' ],
      ['bats', 'cats', 'rats'],
      ['lion', 'puma', 'tiger']
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

    it('Returns an empty array if 1st argument is not of type array & not of type object', function () {
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

    it('Invokes the passed method name on each value in the list', function () {
      let result = _.invoke(animals, 'sort');
      expect(result).to.eql(sortedAnimals);
    });

  });

});
