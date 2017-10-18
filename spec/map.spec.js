const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#map', function () {
	it('is a function', function () {
		expect(_.map).to.be.a('function');
	});

	it('should take at least 2 arguments', function () {
		expect(_.map.length).to.be.at.least(2);
	});

	it('should return an empty array if list is not of type array, string or object', function () {
		let value = 12;
		const func = function (a) {
			return a < 2;
		};
		expect(_.map(value, func)).to.eql([]);

		value = new Date();
		expect(_.map(func)).to.eql([]);

		value = undefined;
		expect(_.map(func)).to.eql([]);
	});

	it('should return an array (containing all values) if passed an array, object or string but no iteratee', function () {
		let list = [1, 2, 3, 4, 5, 6];
		let result = [1, 2, 3, 4, 5, 6];
		expect(_.map(list)).to.eql(result);

		list = '123456';
		result = ['1', '2', '3', '4', '5', '6'];
		expect(_.map(list)).to.eql(result);

		list = {a: 'A', b: 'b', c: 'c', d: 'D', e: 'e'};
		result = ['A', 'b', 'c', 'D', 'e'];
		expect(_.map(list)).to.eql(result);
	});

	it('returns a transformation of the original array whilst leaving the original array unmutated', function () {
		const list = [1, 2, 3, 4, 5, 6];
		const result = [2, 4, 6, 8, 10, 12];

		function doubleNum (number) {
			return (number *= 2);
		}

		const numbers = _.map(list, doubleNum);
		expect(numbers).to.eql(result);
		expect(numbers).to.not.eql(list);
	});

	it('returns a transformed array whilst leaving the original object unmutated', function () {
		const list = {a: 'A', b: 'b', c: 'c', d: 'D', e: 'e'};
		const result = ['a', 'b', 'c', 'd', 'e'];

		function convertToLowerCase (char) {
			return char.toLowerCase();
		}
		const lowerChars = _.map(list, convertToLowerCase);
		expect(lowerChars).to.eql(result);
		expect(lowerChars).to.not.eql(list);
	});

	it('returns an array transformation whilst leaving the original string unmutated', function () {
		const list = 'aAbbccdDee';
		const result = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E'];

		function convertToUpperCase (char) {
			return char.toUpperCase();
		}

		const upperChars = _.map(list, convertToUpperCase);
		expect(upperChars).to.eql(result);
		expect(upperChars).to.not.eql(list);
	});

	it('binds a context to the iteratee', function () {
    const array = [1, 2, 3, 4, 5];
		const context = {multiplier : 3};
		const result = [3, 6, 9, 12, 15];

		const multiplyNums = _.map(
			array,
      function (num) { return num * this.multiplier; },
			context
		);

		expect(multiplyNums).to.eql(result);
	});
});
