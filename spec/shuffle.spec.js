const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

  describe('#shuffle', function () {
    it('is a function', function () {
      expect(_.shuffle).to.be.a('function');
    });

    it('should expect one argument', function () {
      expect(_.shuffle.length).to.equal(1);
    });

    it('should return an empty array if no arguments passed to the function', function () {
      expect(_.shuffle()).to.eql([]);
    });

    it('should return an empty array if first argument is not an array, object or string', function () {
      let value = 12;
      expect(_.shuffle(value)).to.eql([]);

      value = new Date();
      expect(_.shuffle(value)).to.eql([]);
    });

    it('should return an array if an object argument is passed-in to the functon', function () {
      const obj = {a: 1, b: 2, c: 3, d: 4, e: 5};
      expect(Array.isArray(_.shuffle(obj))).to.equal(true);
    });

    it('should return an array if a string argument is passed-in to the function', function () {
      const str = '12345';
      expect(Array.isArray(_.shuffle(str))).to.equal(true);
    });

    it('should return a shuffled array if an array argument is passed-in to the function', function () {
      const arr = [1, 2, 3, 4, 5];
      const arrLength = arr.length;
      const result = _.shuffle(arr);

      expect(result.length).to.equal(arrLength);

      expect(_.intersection(arr, result)).to.eql(arr);
    });

    it('should return a shuffled array if an object argument is passed-in to the function', function () {
      const obj = {a: 1, b: 2, c: 3, d: 4, e: 5};
      const objValues = Object.values(obj);
      const arrLength = objValues.length;
      const result = _.shuffle(obj);

      expect(result.length).to.equal(arrLength);

      expect(_.intersection(objValues, result)).to.eql(objValues);
    });

    it('should return a shuffled array if a string argument is passed-in to the function', function () {
      const str = '12345';
      const arr = str.split('');
      const arrLength = arr.length;
      const result = _.shuffle(str);

      expect(result.length).to.equal(arrLength);

      expect(_.intersection(arr, result)).to.eql(arr);
    });

    it('should return a shuffled array if an array of assorted data types is passed-in to the function', function () {
      const junk = [
        {name: 'Barney Rubble', age: 1032},
        1,
        {name: 'Mildred Rubble', age: 1024},
        '2',
        {name: 'Fred Flintstone', age: 1032},
        [1, 2, 4],
        {name: 'Wilmar Flintstone', age: 1026},
        ['Bob', 'fred'],
        102.34,
        null,
        undefined,
        NaN,
        true,
        false,
        new Date(),
        function () {},
        [1, [2, 3, [4]], 5],
        {a: 1, b : {c: 2, d: 3}, c: 4}
      ];
      const arrLength = junk.length;
      const result = _.shuffle(junk);
      expect(result.length).to.equal(arrLength);

      expect(_.intersection(junk, result)).to.eql(junk);
    });
  });