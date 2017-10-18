const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#filter', function () {
	it('is a function', function () {
		expect(_.filter).to.be.a('function');
	});

	it('should take at least 2 arguments', function () {
		expect(_.filter.length).to.be.at.least(2);
	});

	it('should return an empty array if list is not of type array, string or object irrespective of number of arguments passed to the function', function () {
		let value = 123;
		let func = function (element) {
			return element > 10;
		};
		expect(_.filter(value, func)).to.eql([]);
		expect(_.filter(value)).to.eql([]);

		value = null;
		expect(_.filter(value, func)).to.eql([]);
		expect(_.filter(value)).to.eql([]);
	});

	it('should return an array if only one argument passed to the function which is of type array, string or object', function () {
		let list = '12c';
		let result = ['1', '2', 'c'];
		expect(_.filter(list)).to.eql(result);

		list = ['1', '2', 'c'];
		expect(_.filter(list)).to.eql(result);

		list = {a: '1', b: '2', c: 'c'};
		expect(_.filter(list)).to.eql(result);
	});

	it('returns array of values from an array where each value passes the truth test', function () {
		const list = [1, 2, 3, 4, 5, 6];
		const result = [2, 4, 6];

		function numDivByTwo (number) {
			return number % 2 === 0;
		}

		const numbers = _.filter(list, numDivByTwo);
		expect(numbers).to.eql(result);
	});

	it('returns array of values from an object where each value passes the truth test', function () {
		const list = {a: 'A', b: 'b', c: 'c', d: 'D', e: 'e'};
		const result = ['A', 'D'];

		function findUpperCaseChars (char) {
			return char === char.toUpperCase();
		}
		const upperChars = _.filter(list, findUpperCaseChars);
		expect(upperChars).to.eql(result);
	});

	it('returns array of values from a string where each value passes the truth test', function () {
		const list = 'aAbbccdDee';
		const result = ['a', 'b', 'b', 'c', 'c', 'd', 'e', 'e'];

		function findLowerCaseChars (char) {
			return char === char.toLowerCase();
		}

		const lowerChars = _.filter(list, findLowerCaseChars);
		expect(lowerChars).to.eql(result);
	});

	it('binds a context to the predicate', function () {
		const context = {a: 1, b: 2, c: 3};
		_.filter(
			[1, 2, 3, 4, 5],
			function () {
				// the value of 'this' in here should be the context object
				this.a = 'changed!';
			},
			context
		);
		expect(context).to.eql({a: 'changed!', b: 2, c: 3});
	});
});
