const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
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
