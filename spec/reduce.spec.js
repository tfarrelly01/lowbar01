const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#reduce', function () {
	it('is a function', function () {
		expect(_.reduce).to.be.a('function');
	});

	it('should take at least 2 arguments', function () {
		expect(_.reduce.length).to.be.at.least(2);
	});

	it('should return undefined if one of zero arguments passed to the function', function () {
		let result = undefined;
		expect(_.reduce()).to.equal(result);
		expect(_.reduce([1, 2, 3])).to.equal(result);
	});

	it('should return undefined if first argument is not an array, string or object', function () {
		let result = undefined;
		let iteratee = function (memo, num) {
			return memo + num;
		};
		expect(_.reduce(new Date(), iteratee)).to.eql(result);
		expect(_.reduce(123, iteratee)).to.eql(result);
		expect(_.reduce(true, iteratee)).to.eql(result);
		expect(_.reduce(NaN, iteratee)).to.eql(result);
	});

	it('returns the initial value of memo if the _.identity method is used as the iteratee for an array', function () {
		const memo = {};
		const array = [1, 2, 3];
		expect(_.reduce(array, _.identity, memo)).to.equal(memo);
	});

	it('reduces an array to a single value, passing each element to an iteratee function', function () {
		const nums = [1, 2, 3];
		const result = 12;
		let memo = 0;
		const doubleAndAddNums = function (acc, num) {
			return acc + num * 2;
		};

		expect(_.reduce(nums, doubleAndAddNums, memo)).to.equal(result);
	});

	it('reduces an array of objects to a single value, passing each element to an iteratee function', function () {
		const developers = [
			{firstName: 'Harry', lastName: 'K.', age: 22, language: 'JavaScript'},
			{firstName: 'Kseniya', lastName: 'T.', age: 49, language: 'Ruby'},
			{firstName: 'Jing', lastName: 'X.', age: 34, language: 'JavaScript'},
			{firstName: 'Piotr', lastName: 'B.', age: 52, language: 'JavaScript'}
		];
		const result = 39.25;
		let memo = 0;
		const getAverageAge = function (acc, dev, i, developers) {
			return (acc += dev.age / developers.length);
		};
		expect(_.reduce(developers, getAverageAge, memo)).to.equal(result);
	});

	it('returns the initial value of memo if the _.identity method is used as the iteratee for a string', function () {
		const memo = {};
		const string = '123';
		expect(_.reduce(string, _.identity, memo)).to.equal(memo);
	});

	it('reduces a string, passing each element to an iteratee function', function () {
		const string = 'AaBBzBbZzbbCcccYZzZ';
		const result = 'zZzZzZ';
		let memo = '';
		const getTheZs = function (acc, char) {
			return char.toUpperCase() === 'Z' ? (acc += char) : acc;
		};

		expect(_.reduce(string, getTheZs, memo)).to.equal(result);
	});

	it('returns the initial value of memo if the _.identity method is used as the iteratee for an object', function () {
		const memo = [];
		const obj = {a: 1, b: 2, c: 3};
		expect(_.reduce(obj, _.identity, memo)).to.equal(memo);
	});

	it('reduces an object, passing each element to an iteratee function', function () {
		const obj = {a: 1, b: 2, c: 3, d: 'not a number', e: 'not a number either'};
		const result = 6;
		let memo = 0;
		const addOnlyNums = function (acc, item) {
			return typeof item === 'number' ? (acc += item) : acc;
		};

		expect(_.reduce(obj, addOnlyNums, memo)).to.equal(result);
	});
  
  it('binds context to iteratee and reduces list with a context object', function () {
    const array = [1, 2, 3, 4, 5];
		const context = {multiplier : 3};
		const result = 45;
    let memo = 0;

		const multiplyNums = _.reduce(
			array,
      function (sum, num) { return sum + num * this.multiplier; },
      memo,
			context
		);

		expect(multiplyNums).to.eql(result);
	});
});
