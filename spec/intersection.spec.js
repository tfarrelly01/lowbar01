const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

  describe('#intersection', function () {
    it('is a function', function () {
      expect(_.intersection).to.be.a('function');
    });

    it('should expect at least one argument', function () {
      expect(_.intersection.length).to.be.at.least(1);
    });

    it('should return an empty array if no arguments passed to the function', function () {
      expect(_.intersection()).to.eql([]);
    });

    it('should return an empty array if 1st argument is not an array or string data type', function () {
      let value = 12;
      expect(_.intersection(value)).to.eql([]);

      value = {a: 'aa', b: 'bb', c: 'cc'};
      expect(_.intersection(value)).to.eql([]); 
    });

    it('should return an array containing all elements present in each of the two seperate arrays', function () {
      const arr1 = [1, 2, 'a', 10, 'fred', 'z', 'bob', false, undefined];
      const arr2 = [1, 3, 'a', 11, 'bob', 'bill', 15, true, undefined];
      const result = [1, 'a', 'bob', undefined];

      expect(_.intersection(arr1, arr2)).to.eql(result);
    });

    it('should return an array containing all elements present in each array passed to the function', function () {
      const arr1 = [1, 2, 'a', 10, 'fred', 'z', 'bob', true, false, undefined, null, NaN];
      const arr2 = [1, 3, 'a', 11, 'bob', 'bill', 15, true, undefined, NaN, false];
      const arr3 = [1, 1, 'a', 'bob', 'bill', 36, true, undefined, null, NaN];      
      const arr4 = [1, 3, 'a', 18, 'bob', 'amy', 25, true, undefined, NaN];
      const arr5 = [1, 3, 'a', 'z', 'bob', 'jim', 15, true, undefined, false, NaN, null];
      const arr6 = [1, 3, 'a', 11, 'bob', 'bill', 15, true, undefined, true, NaN];
      const result = [1, 'a', 'bob', true, undefined, NaN];

      expect(_.intersection(arr1, arr2, arr3, arr4, arr5, arr6)).to.eql(result);
    });

    it('should return an array if first argument is a string', function () {
      const str = '12aze';
      const arr = ['1', 'z', 'b'];
      const arr1 = [1, 2];
      const result = ['1', '2', 'a', 'z', 'e'];
      const result1 = ['1', 'z'];
      const result2 = [];

      expect(_.intersection(str)).to.eql(result);
      expect(_.intersection(str, arr)).to.eql(result1);
      expect(_.intersection(str, arr1)).to.eql(result2);
    });

    it('should return an array if arguments are a mixture of arrays and strings', function () {
      const str1 = '123d';
      const str2 = '2acd';
      const arr1 = ['2', 'b', 'd'];
      const arr2 = ['1', '2', 'd',];
      const result = ['2', 'd'];

      expect(_.intersection(arr1, str1, arr2, str2)).to.eql(result);
      expect(_.intersection(str1, arr1, str2, arr2)).to.eql(result);
    });

  });