/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01.js'));

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

}); 