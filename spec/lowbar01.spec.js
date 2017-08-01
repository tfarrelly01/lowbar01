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
      var result = _.identity();
      expect(result).to.equal(undefined);
    });
  });

}); 