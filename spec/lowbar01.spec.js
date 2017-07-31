/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01.js'));

describe('_', () => {
  'use strict';

  it('is an object', () => {
    expect(_).to.be.an('object');
  });
  
}); 