const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#first', function () {
	it('is a function', function () {
		expect(_.first).to.be.a('function');
	});

	it('should take at least 1 argument', function () {
		expect(_.first.length).to.be.at.least(1);
	});

	it('returns undefined if no arguments passed to function', function () {
		let result = _.first();
		expect(result).to.equal(undefined);
	});

	it('returns undefined if function recieves an empty array argument', function () {
		let result = _.first([]);
		expect(result).to.equal(undefined);
	});

	it('returns undefined if function recieves an empty string argument', function () {
		let result = _.first('');
		expect(result).to.equal(undefined);
	});

	it('returns the first element of an array', function () {
		let result = _.first([1, 2, 3]);
		expect(result).to.equal(1);

		result = _.first(['H', 'E', 'L', 'L', 'O']);
		expect(result).to.equal('H');
	});

	it('returns the first n elements of an array', function () {
		let result = _.first([1, 2, 3, 4], 2);
		expect(result).to.eql([1, 2]);

		result = _.first([1, 2, 3, 4], 4);
		expect(result).to.eql([1, 2, 3, 4]);

		result = _.first(['H', 'E', 'L', 'L', 'O'], 3);
		expect(result).to.eql(['H', 'E', 'L']);

		result = _.first(['H', 'E', 'L', 'L', 'O'], 5);
		expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
	});

	it('returns the first element of a string', function () {
		let result = _.first('1234');
		expect(result).to.equal('1');

		result = _.first('HELLO');
		expect(result).to.equal('H');
	});

	it('returns the first n elements of a string', function () {
		let result = _.first('1234', 2);
		expect(result).to.eql(['1', '2']);

		result = _.first('HELLO', 3);
		expect(result).to.eql(['H', 'E', 'L']);
	});

	it('returns the passed array if n greater than length of array', function () {
		let result = _.first([1, 2, 3, 4], 5);
		expect(result).to.eql([1, 2, 3, 4]);

		result = _.first(['H', 'E', 'L', 'L', 'O'], 8);
		expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
	});

	it('returns the passed string as an array if n greater than length of string', function () {
		let result = _.first('1234', 5);
		expect(result).to.eql(['1', '2', '3', '4']);

		result = _.first('HELLO', 8);
		expect(result).to.eql(['H', 'E', 'L', 'L', 'O']);
	});
});
