const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#reject', function () {
	it('is a function', function () {
		expect(_.reject).to.be.a('function');
	});

	it('should take at least 2 arguments', function () {
		expect(_.reject.length).to.be.at.least(2);
	});

	it('returns an empty array if 1 argument or less passed to the function', function () {
		let value = [1, 2, 3];
		expect(_.reject(value)).to.eql([]);

		value = {a: 1, b: 2, c: 3};
		expect(_.reject(value)).to.eql([]);

		value = '123';
		expect(_.reject(value)).to.eql([]);

		value = null;
		expect(_.reject(value)).to.eql([]);
	});

	it('should return an empty array if list is not of type array, string or object', function () {
		let value = 12;
		const func = function (a) {
			return a < 2;
		};
		expect(_.reject(value, func)).to.eql([]);

		value = function (a) {
			return a * 2;
		};
		expect(_.reject(value, func)).to.eql([]);

		value = null;
		expect(_.reject(func)).to.eql([]);
	});

	it('should return an array if only one argument passed to the function which is of type array, string or object', function () {
		let list = '12c';
		let result = [];
		expect(_.reject(list)).to.eql(result);

		list = ['1', '2', 'c'];
		expect(_.reject(list)).to.eql(result);

		list = {a: '1', b: '2', c: 'c'};
		expect(_.reject(list)).to.eql(result);
	});

	it('returns array of values from an array where each value DOES NOT pass the truth test', function () {
		const list = [1, 2, 3, 4, 5, 6];
		const result = [1, 3, 5];

		function numDivByTwo (number) {
			return number % 2 === 0;
		}

		const numbers = _.reject(list, numDivByTwo);
		expect(numbers).to.eql(result);
	});

	it('returns array of values from an object where each value DOES NOT pass the truth test', function () {
		const list = {a: 'A', b: 'b', c: 'c', d: 'D', e: 'e'};
		const result = ['b', 'c', 'e'];

		function findUpperCaseChars (char) {
			return char === char.toUpperCase();
		}
		const upperChars = _.reject(list, findUpperCaseChars);
		expect(upperChars).to.eql(result);
	});

	it('returns array of values from a string where each value DOES NOT pass the truth test', function () {
		const list = 'aAbbccdDee';
		const result = ['A', 'D'];

		function findLowerCaseChars (char) {
			return char === char.toLowerCase();
		}

		const lowerChars = _.reject(list, findLowerCaseChars);
		expect(lowerChars).to.eql(result);
	});

	it('binds a context to the predicate', function () {
		const context = {a: 1, b: 2, c: 3};
		_.reject(
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
