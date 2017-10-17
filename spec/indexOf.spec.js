const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));
const largeArray = [...Array(1000000).keys()];

describe('#indexOf', function () {
	it('is a function', function () {
		expect(_.indexOf).to.be.a('function');
	});

	it('should take at least 2 arguments', function () {
		expect(_.indexOf.length).to.be.at.least(2);
	});

	it('should return -1 if 1st argument passed to function is not an array or a string', function () {
		let arr = 123;
		let value = 1;
		expect(_.indexOf(arr, value)).to.equal(-1);

		value = undefined;
		expect(_.indexOf(arr, value)).to.equal(-1);
	});

	it('should return -1 is only one argument passed to the function', function () {
		const arr = [1, 2, 'a', 'b'];
		expect(_.indexOf(arr)).to.equal(-1);
	});

	it('should return the index of the element contained in the array', function () {
		const array = [10, 2, 1, 4, 56, 29, 'a', 'Z', 0, 'h', 'I', '|', '@', 43, 12, 64, 72, 1001];
		expect(_.indexOf(array, 1)).to.equal(2);
		expect(_.indexOf(array, 29)).to.equal(5);
		expect(_.indexOf(array, '@')).to.equal(12);
		expect(_.indexOf(array, 1001)).to.equal(17);
	});

	it('should return -1 if element does not exist in array', function () {
		const array = [10, 2, 1, 4, 56, 29, 'a', 'Z', 0, 'h', 'I', '|', '@'];
		expect(_.indexOf(array, 6)).to.equal(-1);
		expect(_.indexOf(array, 30)).to.equal(-1);
		expect(_.indexOf(array, '-')).to.equal(-1);

	});

	it('should search for the first matching value in the array after a given index', function () {
		const array = [4, 2, 1, 4, 56, 29, 'a', 'Z', 0, 'h', 'I', '|', '@', 56, 'I', '|', 72, 1001];
		expect(_.indexOf(array, 4, 0)).to.equal(0);
		expect(_.indexOf(array, 4, 2)).to.equal(3);
		expect(_.indexOf(array, 4, 4)).to.equal(-1);
		expect(_.indexOf(array, 'I', 10)).to.equal(10);
		expect(_.indexOf(array, 'I', 11)).to.equal(14);
		expect(_.indexOf(array, '@', 6)).to.equal(12);
		expect(_.indexOf(array, '@', 13)).to.equal(-1);
		expect(_.indexOf(array, 1001, 17)).to.equal(17);
		expect(_.indexOf(array, 1001, 20)).to.equal(-1);
	});

	it('should invoke the faster binarySearch algorithm (isSorted === true) returning the index position where the first instance of the number is found for large sorted arrays', function () {
		expect(_.indexOf(largeArray, 0, true)).to.equal(0);
		expect(_.indexOf(largeArray, 250000, true)).to.equal(250000);
		expect(_.indexOf(largeArray, 333000, true)).to.equal(333000);
		expect(_.indexOf(largeArray, 750000, true)).to.equal(750000);
		expect(_.indexOf(largeArray, 999999, true)).to.equal(999999);
	});

	it('should invoke the faster binarySearch algorithm (isSorted === true) returning -1 if the element is not found for large sorted arrays', function () {
		expect(_.indexOf(largeArray, -1, true)).to.equal(-1);
		expect(_.indexOf(largeArray, 10000000, true)).to.equal(-1);
		expect(_.indexOf(largeArray, 10000001, true)).to.equal(-1);

		let arr = [1, 2, 3, 5, 6, 8, 11, 12, 15, 17, 20];
		expect(_.indexOf(arr, 10, true)).to.equal(-1);
	});
});
