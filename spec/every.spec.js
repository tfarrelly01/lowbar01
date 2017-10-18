const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

// Constant declarations below used by _.every and _.some methods
const lessThanTen = function (elem) { return elem < 10;};
const greaterThanZero = function (elem) { return elem > 0;};
const lessThanSix = function (elem) { return elem < 6;};
const greaterThanNine = function (elem) { return elem > 9;};
const strNums = '123456789';
const arrNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const objNums = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9};

describe('#every', function () {
	it('is a function', function () {
		expect(_.every).to.be.a('function');
	});

	it('should take at least 2 arguments', function () {
		expect(_.every.length).to.be.at.least(2);
	});

	it('should return true if one of zero arguments passed to the function', function () {
		expect(_.every()).to.equal(true);
		expect(_.every([1, 2, 3])).to.equal(true);
		expect(_.every({a: 1, b: 2, c: 3})).to.equal(true);
		expect(_.every('123')).to.equal(true);
	});

	it('should return true if all of the values in the array pass the predicate truth test', function () {
		let result = _.every(arrNums, lessThanTen);
		expect(result).to.equal(true);

		result = _.every(arrNums, greaterThanZero);
		expect(result).to.equal(true);
	});

	it('should return false if one of the values in the array does not pass the predicate truth test', function () {
		let result = _.every(arrNums, lessThanSix);
		expect(result).to.equal(false);

		result = _.every(arrNums, greaterThanNine);
		expect(result).to.equal(false);
	});

	it('should return true if all of the values in the string pass the predicate truth test', function () {
		let result = _.every(strNums, lessThanTen);
		expect(result).to.equal(true);

		result = _.every(strNums, greaterThanZero);
		expect(result).to.equal(true);
	});

	it('should return false if one of the values in the string does not pass the predicate truth test', function () {
		let result = _.every(strNums, lessThanSix);
		expect(result).to.equal(false);

		result = _.every(strNums, greaterThanNine);
		expect(result).to.equal(false);
	});

	it('should return true if all of the values in the object pass the predicate truth test', function () {
		let result = _.every(objNums, lessThanTen);
		expect(result).to.equal(true);

		result = _.every(objNums, greaterThanZero);
		expect(result).to.equal(true);
	});

	it('should return false if one of the values in the object does not pass the predicate truth test', function () {
		let result = _.every(objNums, lessThanSix);
		expect(result).to.equal(false);

		result = _.every(objNums, greaterThanNine);
		expect(result).to.equal(false);
	});

	it('binds a context to the predicate', function () {
		const context = {a: 1, b: 2, c: 3};
		_.every(
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
