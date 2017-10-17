const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#last', function () {
	it('is a function', function () {
		expect(_.last).to.be.a('function');
	});

	it('should take at least 1 argument', function () {
		expect(_.last.length).to.be.at.least(1);
	});

	it('returns undefined if no arguments passed to function', function () {
		let result = _.last();
		expect(result).to.equal(undefined);
	});

	it('returns undefined if function recieves an empty array argument', function () {
		let result = _.last([]);
		expect(result).to.equal(undefined);
	});

	it('returns undefined if function recieves an empty string argument', function () {
		let result = _.last('');
		expect(result).to.equal(undefined);
	});

	it('returns the last element of an array', function () {
		let result = _.last([1, 2, 3]);
		expect(result).to.equal(3);

		result = _.last(['H', 'E', 'L', 'L', 'O']);
		expect(result).to.equal('O');
	});

	it('returns the last n elements of an array', function () {
		let result = _.last([1, 2, 3, 4], 1);
		expect(result).to.eql([4]);

		result = _.last([1, 2, 3, 4], 3);
		expect(result).to.eql([2, 3, 4]);

		result = _.last([1, 2, 3, 4], 4);
		expect(result).to.eql([1, 2, 3, 4]);

		result = _.last(['H', 'E', 'L', 'L', 'O'], 3);
		expect(result).to.eql(['L', 'L', 'O']);

		result = _.last(['H', 'E', 'L', 'L', 'O'], 5);
		expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
	});

	it('returns the last element of a string', function () {
		let result = _.last('123');
		expect(result).to.equal('3');

		result = _.last('HELLO');
		expect(result).to.equal('O');
	});

	it('returns the last n elements of a string', function () {
		let result = _.last('1234', 1);
		expect(result).to.eql(['4']);

		result = _.last('1234', 3);
		expect(result).to.eql(['2', '3', '4']);

		result = _.last('1234', 4);
		expect(result).to.eql(['1', '2', '3', '4']);

		result = _.last('HELLO', 3);
		expect(result).to.eql(['L', 'L', 'O']);

		result = _.last('HELLO', 5);
		expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
	});

	it('returns the passed array if n greater than length of array', function () {
		let result = _.last([1, 2, 3, 4], 5);
		expect(result).to.eql([1, 2, 3, 4]);

		result = _.last(['H', 'E', 'L', 'L', 'O'], 8);
		expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
	});

	it('returns the passed string as an array if n greater than length of string', function () {
		let result = _.last('1234', 5);
		expect(result).to.eql(['1', '2', '3', '4']);

		result = _.last('HELLO', 8);
		expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
	});

});
