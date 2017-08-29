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

});