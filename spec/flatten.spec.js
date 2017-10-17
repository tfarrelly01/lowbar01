const path = require('path');
const expect = require('chai').expect;

const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#flatten', function () {
	it('is a function', function () {
		expect(_.flatten).to.be.a('function');
	});

	it('should take at least 1 argument', function () {
		expect(_.flatten.length).to.be.at.least(1);
	});

	it('should return an empty array if no arguments passed to the function', function () {
		expect(_.flatten()).to.eql([]);
	});

	it('should return an array', function () {
		expect(_.flatten()).to.eql([]);
	});

	it('should return an empty array if argument passed to the function is not an array', function () {
		let value = 12;
		expect(_.flatten(value)).to.eql([]);

		value = '123456';
		expect(_.flatten(value)).to.eql([]);

		value = {a: 1, b: 2, c: 3};
		expect(_.flatten(value)).to.eql([]);

		value = function (a) {
			return a * 2;
		};
		expect(_.flatten(value)).to.eql([]);
	});

	it('should process a nested array and return a flattened array', function () {
		const array = [1, [2], [3, [[4]]]];
		const result = [1, 2, 3, 4];
		expect(_.flatten(array)).to.eql(result);
	});

	it('should process a deeply nested array and return a flattened array', function () {
		const array = [
			1,
			[1.5, [2, [2.5, 2.6, [2.51, 2.52, [2.521, 2.522]]]]],
			[3, [[4, ['five', 'six', [null, NaN, [undefined, [true, [false]]]]]]]]
		];
		const result = [
      1, 1.5, 2, 2.5, 2.6, 2.51, 2.52, 2.521, 2.522, 3, 4, 'five', 'six', null,
			NaN, undefined, true, false
		];
		expect(_.flatten(array)).to.eql(result);
	});

	it('flattens nested array to a single level if the second argument (shallow) passed to the function is set to true.', function () {
		const array = [1, [2], [3, [[4]]]];
		const shallow = true;
		const result = [1, 2, 3, [[4]]];
		expect(_.flatten(array, shallow)).to.eql(result);
	});

	it('flattens deeply nested array to a single level if the second argument (shallow) passed to the function is set to true.', function () {
		const array = [
			1,
			[1.5, [2, [2.5, 2.6, [2.51, 2.52, [2.521, 2.522]]]]],
			[3, [[4, ['five', 'six', [null, NaN, [undefined, [true, [false]]]]]]]]
		];

		const shallow = true;

		const result = [
			1,
			1.5,
			[2, [2.5, 2.6, [2.51, 2.52, [2.521, 2.522]]]],
			3,
			[[4, ['five', 'six', [null, NaN, [undefined, [true, [false]]]]]]]
		];

		let output = _.flatten(array, shallow);
		expect(output).to.eql(result);
	});	
});
