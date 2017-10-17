const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

  describe('#invoke', function () {
    const sortedAnimals = [
      ['dog', 'frog', 'wolf' ],
      ['bats', 'cats', 'rats'],
      ['lion', 'puma', 'tiger']
    ];
    
    const joinedAnimals = [
      'dog,frog,wolf',
      'bats,cats,rats',
      'lion,puma,tiger'
    ];

    const joinedAnimals1 = [
      'dog:::frog:::wolf',
      'bats:::cats:::rats',
      'lion:::puma:::tiger'
    ];

    const reverseSortedAnimals = [
      ['wolf', 'frog', 'dog'],
      ['rats', 'cats', 'bats'],
      ['tiger', 'puma', 'lion']
    ];

    const reverseAnimals = [ 
      ['wolf', 'dog', 'frog'],
      ['bats', 'rats', 'cats'],
      ['puma', 'tiger', 'lion']
    ];

    it('is a function', function () {
      expect(_.invoke).to.be.a('function');
    });

    it('should take at least two arguments', function () {
      expect(_.invoke.length).to.be.at.least(2);
    });

    it('returns an empty array if no arguments are passed to the function', function () {
      expect(_.invoke()).to.eql([]);
    });

    it('returns an empty array if 1st argument is not of type array & not of type object', function () {
      let arg = 123;
      const result = [];
      const method = function () {};
      expect(_.invoke(arg, method)).to.eql(result);

      arg = null;
      expect(_.invoke(arg, method)).to.eql(result);
    });

    it('invokes the passed method name (sort) on each value in the list', function () {
      // repeated as array is mutated when passed to a sort method
      const animals = [
        ['frog', 'dog', 'wolf' ],
        ['cats', 'rats', 'bats'],
        ['lion', 'tiger', 'puma']
      ];
      let result = _.invoke(animals, 'sort');
      expect(result).to.eql(sortedAnimals);
    });

    it('invokes the passed method name (join) on each value in the list', function () {
      let result = _.invoke(sortedAnimals, 'join');
      expect(result).to.eql(joinedAnimals);
    });

    it('invokes the passed function declaration on each value in the list', function () {
      // repeated as array is mutated when passed to a sort method
      const animals = [
        ['frog', 'dog', 'wolf' ],
        ['cats', 'rats', 'bats'],
        ['lion', 'tiger', 'puma']
      ];
      const func = function () { 
        return this.reverse();
      };
      let result = _.invoke(animals, func);
      expect(result).to.eql(reverseAnimals);
    });

    it('invokes the passed method name (sort) including additional passed arguments on each value in the list', function () {
      // repeated as array is mutated when passed to a sort method
      const animals = [
        ['frog', 'dog', 'wolf' ],
        ['cats', 'rats', 'bats'],
        ['lion', 'tiger', 'puma']
      ];
      const iteratee = function (a, b) {
        return a < b;
      };
      const result = _.invoke(animals, 'sort', iteratee);
      expect(result).to.eql(reverseSortedAnimals);
    });

    it('invokes the passed method name (join) including additional passed arguments on each value in the list', function () {
      const delimiter = ':::';
      const result = _.invoke(sortedAnimals, 'join', delimiter);
      expect(result).to.eql(joinedAnimals1);
    });

    it('handles a string list if passed to an appropriate method', function () {
      const result = [['1'], ['2'], ['3']];
      const delimiter = ' ';

      let list = '123';
      let value = _.invoke(list, 'split');
      expect(result).to.eql(result);

      list = '123';
      value = _.invoke(list, 'split', delimiter);
      expect(value).to.eql(result);
    });
  });
