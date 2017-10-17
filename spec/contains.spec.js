const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

const obj = {
	a: 1, b: 2, c: 3, d: 4, e: 2, f: 'a', g: 'a', h: 'z', i: 5, j: 1, k: 6, l: 4, m: 6, n: 6.5,
	o: 7, p: 7, q: 8, r: 9, s: 'y', t: 'z', u: 'Z'
};
const arr = [1, 2, 3, 4, 2, 'a', 'a', 'z', 5, 1, 6, 4, 6, 6.5, 7, 7, 8, 9, 'y', 'z', 'Z'];
const str = '123456789';

describe('#contains', function () {
	it('is a function', function () {
		expect(_.contains).to.be.a('function');
	});

	it('should take at least 2 arguments', function () {
		expect(_.contains.length).to.be.at.least(2);
	});

	it('should return false if less than 2 arguments passed to the function', function () {
		expect(_.contains(arr)).to.equal(false);
		expect(_.contains(obj)).to.equal(false);
	});

	it('should return false if first argument is not an array, string or object', function () {
		let value = 12;
		expect(_.contains(value, 12)).to.equal(false);

		value = function (a) {
			return a * 2;
		};
		expect(_.contains(value, 'function')).to.equal(false);
	});

	it('should return true if value exists in the array', function () {
		let result = _.contains(arr, 1);
		expect(result).to.equal(true);

		result = _.contains(arr, 6);
		expect(result).to.equal(true);
	});

	it('should return false if value does NOT exist in the array', function () {
		let result = _.contains(arr, -1);
		expect(result).to.equal(false);

		result = _.contains(arr, 10);
		expect(result).to.equal(false);
	});

	it('should return true if value exists in the string', function () {
		let result = _.contains(str, '1');
		expect(result).to.equal(true);

		result = _.contains(str, '9');
		expect(result).to.equal(true);
	});

	it('should return false if value does NOT exist in the string', function () {
		let result = _.contains(str, '0');
		expect(result).to.equal(false);

		result = _.contains(str, 'a');
		expect(result).to.equal(false);
	});

	it('should return true if value exists in the object ', function () {
		let result = _.contains(obj, 4);
		expect(result).to.equal(true);

		result = _.contains(obj, 9);
		expect(result).to.equal(true);
	});

	it('should return false if value does NOT exist in the object', function () {
		let result = _.contains(obj, -1);
		expect(result).to.equal(false);

		result = _.contains(obj, 100);
		expect(result).to.equal(false);
	});

	it('should return true if value exists in the array from a specified start index', function () {
		let startIndex = 2;
		let result = _.contains(arr, 3, startIndex);
		expect(result).to.equal(true);

		startIndex = 4;
		result = _.contains(arr, 'a', startIndex);
		expect(result).to.equal(true);
	});

	it('should return false if value does NOT exist in the array from a specified start index', function () {
		let startIndex = 0;
		let result = _.contains(arr, 1.5, startIndex);
		expect(result).to.equal(false);

		startIndex = 16;
		result = _.contains(arr, 'Y', startIndex);
		expect(result).to.equal(false);
	});

	it('should return true if value exists in the string from a specified start index', function () {
		let startIndex = 0;
		let result = _.contains(str, '3', startIndex);
		expect(result).to.equal(true);

		startIndex = 6;
		result = _.contains(str, '9', startIndex);
		expect(result).to.equal(true);
	});

	it('should return false if value does NOT exist in the string from a specified start index', function () {
		let startIndex = 0;
		let result = _.contains(str, '0', startIndex);
		expect(result).to.equal(false);

		startIndex = 5;
		result = _.contains(str, 'P', startIndex);
		expect(result).to.equal(false);
	});

	it('should return true if value exists in the object from a specified start index', function () {
		let startIndex = 4;
		let result = _.contains(obj, 'a', startIndex);
		expect(result).to.equal(true);

		startIndex = 0;
		result = _.contains(obj, 'Z', startIndex);
		expect(result).to.equal(true);
	});

	it('should return false if value does NOT exist in the object from a specified start index', function () {
		let startIndex = 0;
		let result = _.contains(obj, 1.5, startIndex);
		expect(result).to.equal(false);

		startIndex = 20;
		result = _.contains(obj, 'z', startIndex);
		expect(result).to.equal(false);
	});
});
