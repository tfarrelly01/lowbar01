const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
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
