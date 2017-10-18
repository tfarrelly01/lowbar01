
const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });

  describe('#reduce', function () {
    it('is a function', function () {
      expect(_.reduce).to.be.a('function');
    });

    it('should take at least 2 arguments', function () {
      expect(_.reduce.length).to.be.at.least(2);
    });

    it('should return undefined if one of zero arguments passed to the function', function () {
      let result = undefined;
      expect(_.reduce()).to.equal(result);
      expect(_.reduce([1, 2, 3])).to.equal(result);
      expect(_.reduce({a: 1, b: 2, c: 3})).to.equal(result);
      expect(_.reduce('123')).to.equal(result);
    });

    it('should return undefined if first argument is not an array, string or object', function () {
      let result = undefined;
      let iteratee = function (memo, num) { return memo + num; };

      expect(_.reduce(function () {console.log('Hi');}, iteratee)).to.eql(result);
      expect(_.reduce(new Date(), iteratee)).to.eql(result);
      expect(_.reduce(123, iteratee)).to.eql(result);
      expect(_.reduce(123.34, iteratee)).to.eql(result);
      expect(_.reduce(true, iteratee)).to.eql(result);
      expect(_.reduce(false, iteratee)).to.eql(result);
      expect(_.reduce(undefined, iteratee)).to.eql(result);
      expect(_.reduce(null, iteratee)).to.eql(result);
      expect(_.reduce(NaN, iteratee)).to.eql(result);
    });

    it('returns the initial value of memo if the _.identity method is used as the iteratee for an array', function () {
      const memo = {};
      const array = [1, 2, 3];
      expect(_.reduce(array, _.identity, memo)).to.equal(memo);  
    });

    it('reduces an array to a single value, passing each element to an iteratee function', function () {
      const nums = [1, 2, 3];
      const result = 12;
      let memo = 0;
      const doubleAndAddNums = function (acc, num) { return acc + (num * 2);};

      expect(_.reduce(nums, doubleAndAddNums, memo)).to.equal(result);
    }); 

    it('reduces an array of objects to a single value, passing each element to an iteratee function', function () {
      const developers = [
        {firstName: 'Harry', lastName: 'K.', age: 22, language: 'JavaScript'},
        {firstName: 'Kseniya', lastName: 'T.', age: 49, language: 'Ruby'},
        {firstName: 'Jing', lastName: 'X.', age: 34, language: 'JavaScript'},
        {firstName: 'Piotr', lastName: 'B.', age: 52, language: 'JavaScript'}
      ];
      const result = 39.25;
      let memo = 0;
      const getAverageAge = function (acc, dev, i, developers) {
            return acc += dev.age / developers.length;
      };
      expect(_.reduce(developers, getAverageAge, memo)).to.equal(result);
    }); 

    it('returns the initial value of memo if the _.identity method is used as the iteratee for a string', function () {
      const memo = {};
      const string = '123';
      expect(_.reduce(string, _.identity, memo)).to.equal(memo);  
    });

    it('reduces a string, passing each element to an iteratee function', function () {
      const string = 'AaBBzBbZzbbCcccYZzZ';
      const result = 'zZzZzZ';
      let memo = '';
      const getTheZs = function (acc, char) { 
        return char.toUpperCase() === 'Z' ? acc += char : acc;
      };

      expect(_.reduce(string, getTheZs, memo)).to.equal(result);
    }); 

    it('returns the initial value of memo if the _.identity method is used as the iteratee for an object', function () {
      const memo = [];
      const obj = {a: 1, b: 2, c: 3};
      expect(_.reduce(obj, _.identity, memo)).to.equal(memo);  
    });

    it('reduces an object, passing each element to an iteratee function', function () {
      const obj = {a: 1, b: 2, c: 3, d: 'not a number', e: 'not a number either'}; 
      const result = 6;
      let memo = 0;
      const addOnlyNums = function (acc, item) { 
        return typeof item === 'number' ? acc += item : acc;
      };

      expect(_.reduce(obj, addOnlyNums, memo)).to.equal(result);
    }); 

    it('binds a context to the iteratee', function () {
      const context = {a: 1, b: 2, c: 3};
      let memo = [];
      _.reduce([1,2,3,4,5], function () {
        // the value of 'this' in here should be the context object
        this.a = 'changed!';
      }, memo, context);
      expect(context).to.eql({a: 'changed!', b: 2, c: 3});
    });
  });

  describe('#extend', function () {
    it('is a function', function () {
      expect(_.extend).to.be.a('function');
    });

    it('should take at least 1 argument', function () {
      expect(_.extend.length).to.be.at.least(1);
    });

    it('should return undefined if no arguments passed to function', function () {
      expect(_.extend()).to.equal(undefined);
    });

    it('should return the argument if only one argument passed to function', function () {
      let value = {a: 1, b: 2, c: 3};
      expect(_.extend(value)).to.equal(value);

      value = ['a', 1, 'b', 2, 'c' , 3];
      expect(_.extend(value)).to.equal(value);
    });

    it('should return the value of the first argument if more than one argument passed to function and first argument is not an object', function () {
      const secondArg = {a: 1, b: 2, c: 3};
      let firstArg = 123;
      expect(_.extend(firstArg, secondArg)).to.equal(firstArg);

      firstArg = 12.34;
      expect(_.extend(firstArg, secondArg)).to.equal(firstArg);

      firstArg = '123';
      expect(_.extend(firstArg, secondArg)).to.equal(firstArg);

      firstArg = [1, 2, 3];
      expect(_.extend(firstArg, secondArg)).to.equal(firstArg);

      firstArg = function (a) {return a * 2;};
      expect(_.extend(firstArg, secondArg)).to.equal(firstArg);
            
      firstArg = true;
      expect(_.extend(firstArg, secondArg)).to.equal(firstArg); 

      firstArg = false;
      expect(_.extend(firstArg, secondArg)).to.equal(firstArg);
      
      firstArg = undefined;
      expect(_.extend(firstArg, secondArg)).to.equal(firstArg);

      firstArg = NaN;
      expect(_.extend(firstArg, secondArg)).to.eql(firstArg);
      
      firstArg = null;
      expect(_.extend(firstArg, secondArg)).to.equal(firstArg);

      firstArg = new Date();
      expect(_.extend(firstArg, secondArg)).to.equal(firstArg);
    });

    it('returns destination object containing the properties from the source object', function () {
      let destObject = {name: 'Fred Flintstone', age: 51, jobTitle: 'Junior Developer', town: 'BedRock'};
      const sourceObject = {age: 52, jobTitle: 'Senior Developer', language: 'java'};
      const result = {name: 'Fred Flintstone', age: 52, jobTitle: 'Senior Developer', town: 'BedRock', 
      language: 'java'};

      expect(_.extend(destObject, sourceObject)).to.eql(result);
    });
      
    it('returns destination object converting source arguments passed that are of type array', function () {

      const destObject = {};
      const sourceObject1 = [1, 2, 3];
      const result = {'0': 1, '1': 2, '2': 3};

      _.extend(destObject, sourceObject1); 
      expect(destObject).to.eql(result);

      const sourceObject2 = ['bob', 'ted'];
      const result1 = {'0': 'bob', '1': 'ted', '2': 3};

      _.extend(destObject, sourceObject2); 
      expect(destObject).to.eql(result1);
    });

    it('returns destination object containing the properties from two source objects', function () {
      let destObject = {name: 'Fred Flintstone', age: 51, jobTitle: 'Junior Developer', town: 'BedRock'};
      const sourceObject1 = {age: 52, jobTitle: 'Senior Developer', language: 'java'};

      const sourceObject2 = {learning: ['HTML5', 'CSS3'], fullTime: true};

      const result = {name: 'Fred Flintstone', age: 52, jobTitle: 'Senior Developer', town: 'BedRock', 
      language: 'java', learning: ['HTML5', 'CSS3'], fullTime: true};

      expect(_.extend(destObject, sourceObject1, sourceObject2)).to.eql(result);
    });

    it('returns destination object containing the properties from many source objects containing nested objects and arrays', function () {

      const destObject = {
        name: 'Fred Flintstone', 
        age: 51, 
        jobTitle: 'Junior Developer', 
        town: 'BedRock'
      };

      const sourceObject1 = {
        age: 52, 
        jobTitle: 'Senior Developer', 
        language: 'java'
      };

      const sourceObject2 = {learning: ['HTML5', 'CSS3'], fullTime: true};

      const sourceObject3 = {
        learningList: {
          frontEnd: [{web: ['react', 'redux', 'react native'], mobile: {android: true, ios: false}}, 'javascript'], 
          backend: 'C#'
        }
      };

      const sourceObject4 = {
        language: ['java', 'ruby']
      };

      const sourceObject5 = ['PHP', 'ASP', 'Node'];

      const result = {
        '0': 'PHP',
        '1': 'ASP',
        '2': 'Node',
        name: 'Fred Flintstone',
        age: 52,
        jobTitle: 'Senior Developer',
        town: 'BedRock',
        language: [ 'java', 'ruby' ],
        learning: [ 'HTML5', 'CSS3' ],
        fullTime: true,
        learningList: {
          frontEnd: [{web: ['react', 'redux', 'react native'], mobile: {android: true, ios: false}}, 'javascript'], 
          backend: 'C#'
        },
      };

      expect(_.extend(destObject, sourceObject1, sourceObject2, sourceObject3, sourceObject4, sourceObject5)).to.eql(result);
    });

    it('should ignore arguments passed to the function as sources that are not of type object', function () {
      const destObject = {
        name: 'Fred Flintstone', 
        age: 51
      };

      const source1 = 123;
      const source2 = 12.35;
      const source3 = 'asdk';
      const source4 = function (a) { return a / 4; };
      const source5 = undefined;
      const source6 = true;
      const source7 = {jobTitle: 'Junior Developer'};
      const source8 = false;
      const source9 = {town: 'BedRock'};
      const source10 = NaN;
      const source11 = null;
      const source12 = new Date();

      const result = {
        name: 'Fred Flintstone', 
        age: 51, 
        jobTitle: 'Junior Developer', 
        town: 'BedRock'
      };
      _.extend(destObject, source1, source2, source3, source4, source5, source6, source7, source8, source9, source10, source11, source12); 

      expect(destObject).to.eql(result);
    });
  });

  describe('#defaults', function () {
    it('is a function', function () {
      expect(_.defaults).to.be.a('function');
    });

    it('should take at least 1 argument', function () {
      expect(_.defaults.length).to.be.at.least(1);
    });

    it('should return undefined if no arguments passed to function', function () {
      expect(_.defaults()).to.equal(undefined);
    });

    it('should return the argument if only one argument passed to function', function () {
      let value = {a: 1, b: 2, c: 3};
      expect(_.defaults(value)).to.equal(value);
    });

    it('should return undefined if more than one argument passed to function and first argument is not an object', function () {
      const secondArg = {a: 1, b: 2, c: 3};
      let firstArg = 123;
      expect(_.defaults(firstArg, secondArg)).to.equal(undefined);

      firstArg = 12.34;
      expect(_.defaults(firstArg, secondArg)).to.equal(undefined);

      firstArg = '123';
      expect(_.defaults(firstArg, secondArg)).to.equal(undefined);

      firstArg = [1, 2, 3];
      expect(_.defaults(firstArg, secondArg)).to.equal(undefined);

      firstArg = function (a) {return a * 2;};
      expect(_.defaults(firstArg, secondArg)).to.equal(undefined);
            
      firstArg = true;
      expect(_.defaults(firstArg, secondArg)).to.equal(undefined); 

      firstArg = false;
      expect(_.defaults(firstArg, secondArg)).to.equal(undefined);
      
      firstArg = undefined;
      expect(_.defaults(firstArg, secondArg)).to.equal(undefined);

      firstArg = NaN;
      expect(_.defaults(firstArg, secondArg)).to.equal(undefined);
      
      firstArg = null;
      expect(_.defaults(firstArg, secondArg)).to.equal(undefined);

      firstArg = new Date();
      expect(_.defaults(firstArg, secondArg)).to.equal(undefined);
    });

    it('should add additional properties to the object ', function () {
      const iceCream = {flavor: 'chocolate'};
      const result = {flavor: 'chocolate', sprinkles: 'lots'};
    
      _.defaults(iceCream, {flavor: 'vanilla', sprinkles: 'lots'}); 
      expect(iceCream).to.eql(result);
    });

    it('should add additional properties to the list object from 2 default objects passsed to the function', function () {
      const iceCream = {flavor: 'chocolate', cone: 'single'};

      const default1 = {flavor: 'vanilla', sprinkles: 'loads of'};
      const default2 = {flavor: 'chocolate', sprinkles: 'not many', flake: 'yes'};
      
      const result = {flavor: 'chocolate', cone: 'single', sprinkles: 'loads of', flake: 'yes'};
    
      _.defaults(iceCream, default1, default2); 
      expect(iceCream).to.eql(result);
    });

    it('should add additional properties to the object with the first value present in the list from several (default) objects passed to the function', function () {
      const iceCream = {flavor: 'chocolate', cone: 'single'};

      const default1 = {flavor: 'vanilla', sprinkles: 'loads of'};
      const default2 = {flavor: 'chocolate', sprinkles: 'not many', flake: 'yes'};
      const default3 = {flavor: 'chocolate', sprinkles: 'none', flake: 'no', sauce: 'raspberry'};
      const default4 = {flavor: 'rum and raison', sprinkles: 'lots', flake: '2 please', sauce: 'chocolate', cone: 'double'};
      
      const result = {flavor: 'chocolate', cone: 'single', sprinkles: 'loads of', flake: 'yes', sauce: 'raspberry'};
    
      _.defaults(iceCream, default1, default2, default3, default4); 
      expect(iceCream).to.eql(result);
    });

    it('should ignore arguments passed to the function as defaults that are not of type object', function () {
      const iceCream = {flavor: 'chocolate', cone: 'single'};

      const default1 = 123;
      const default2 = {flavor: 'vanilla', sprinkles: 'loads of'};
      const default3 = {flavor: 'chocolate', sprinkles: 'not many', flake: 'yes'};
      
      const result = {flavor: 'chocolate', cone: 'single', sprinkles: 'loads of', flake: 'yes'};
    
      _.defaults(iceCream, default1, default2, default3); 
      expect(iceCream).to.eql(result);
    });

    it('should ignore many arguments passed to the function as defaults that are not of type object', function () {
      const iceCream = {flavor: 'chocolate', cone: 'single'};

      const default1 = 123;
      const default2 = 12.35;
      const default3 = 'asdk';
      const default4 = function (a) { return a / 4; };
      const default5 = undefined;
      const default6 = true;
      const default7 = {flavor: 'vanilla', sprinkles: 'loads of'};
      const default8 = false;
      const default9 = {flavor: 'chocolate', sprinkles: 'not many', flake: 'yes'};
      const default10 = NaN;
      const default11 = null;
      const default12 = new Date();
      
      const result = {flavor: 'chocolate', cone: 'single', sprinkles: 'loads of', flake: 'yes'};
    
      _.defaults(iceCream, default1, default2, default3, default4, default5, default6, default7, default8, default9, default10, default11, default12); 
      expect(iceCream).to.eql(result);
    });
  });
}); 