const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));
// const sinon = require('sinon');

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });
  
  describe('#once', function () {
    it('is a function', function () {
        expect(_.once).to.be.a('function');
    });

    it('should take one arguments', function () {
      expect(_.once.length).to.equal(1);
    });

    it('returns a function', function () {
        let result = _.once (function () {  });
        expect(result).to.be.a('function');
    });
  });
});