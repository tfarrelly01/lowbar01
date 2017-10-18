const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

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