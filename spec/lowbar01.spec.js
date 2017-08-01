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

}); 