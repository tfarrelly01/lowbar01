const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

// Constant declarations below used by _.every and _.some methods
const lessThanTen = function (elem) {
	return elem < 10;
};
const greaterThanZero = function (elem) {
	return elem > 0;
};
const lessThanZero = function (elem) {
	return elem < 0;
};
const greaterThanSix = function (elem) {
	return elem > 6;
};
const greaterThanNine = function (elem) {
	return elem > 9;
};
const strNums = '123456789';
const arrNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const objNums = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9};

describe('#some', function () {
	it('is a function', function () {
		expect(_.some).to.be.a('function');
	});

	it('should take at least 2 arguments', function () {
		expect(_.some.length).to.be.at.least(2);
	});

	it('should return true if one of zero arguments passed to the function', function () {
		expect(_.some()).to.equal(true);
		expect(_.some([1, 2, 3])).to.equal(true);
	});

	it('should return true if an element of the array passes the predicate truth test', function () {
		let result = _.some(arrNums, lessThanTen);
		expect(result).to.equal(true);

		result = _.some(arrNums, greaterThanZero);
		expect(result).to.equal(true);
	});

	it('should return false if all elements in the array fail the predicate truth test', function () {
		let result = _.some(arrNums, greaterThanNine);
		expect(result).to.equal(false);

		result = _.some(arrNums, lessThanZero);
		expect(result).to.equal(false);
	});

	it('should return true if a character in the string passes the predicate truth test', function () {
		let result = _.some(arrNums, lessThanTen);
		expect(result).to.equal(true);

		result = _.some(arrNums, greaterThanZero);
		expect(result).to.equal(true);
	});

	it('should return false if all characters in the string fail the predicate truth test', function () {
		let result = _.some(strNums, greaterThanNine);
		expect(result).to.equal(false);

		result = _.some(strNums, lessThanZero);
		expect(result).to.equal(false);
	});

	it('should return true when a value in the object is found which passes the predicate truth test', function () {
		let result = _.some(objNums, greaterThanSix);
		expect(result).to.equal(true);

		result = _.some(objNums, greaterThanZero);
		expect(result).to.equal(true);
	});

	it('should return false if all values in the object fail the predicate truth test', function () {
		let result = _.some(objNums, lessThanZero);
		expect(result).to.equal(false);

		result = _.some(objNums, greaterThanNine);
		expect(result).to.equal(false);
	});

	it('binds a context to the predicate', function () {
		const context = {a: 1, b: 2, c: 3};
		_.some(
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
