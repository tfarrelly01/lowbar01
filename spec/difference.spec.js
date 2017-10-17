const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#difference', function () {
	it('is a function', function () {
		expect(_.difference).to.be.a('function');
	});

	it('should expect at least one argument', function () {
		expect(_.difference.length).to.be.at.least(1);
	});

	it('should return an empty array if no arguments passed to the function', function () {
		expect(_.difference()).to.eql([]);
	});

	it('should return an empty array if first argument is not an array, object or string', function () {
		let value = 12;
		expect(_.difference(value)).to.eql([]);
  });

	it('should return an array if one argument is passed to the function of type array, string or object', function () {
		const arr = ['1', '2', '3'];
		const obj = {a: '1', b: '2', c: '3'};
		const str = '123';

		const result = ['1', '2', '3'];

		expect(_.difference(arr)).to.eql(result);
		expect(_.difference(obj)).to.eql(result);
		expect(_.difference(str)).to.eql(result);
	});

	it('should return an array if a second argument is passed to the function which is not an array', function () {
		const arr = ['a', 'b', 'c'];
		const obj = {a: 'a', b: 'b', c: 'c'};
		const str = 'abc';

		const secondArgStr = '134';
		const secondArgObj = {a: 1, b: 3, c: 4};
		const secondArgNum = 12.34;

		const result = ['a', 'b', 'c'];

		expect(_.difference(arr, secondArgStr)).to.eql(result);
		expect(_.difference(arr, null)).to.eql(result);

		expect(_.difference(obj, secondArgObj)).to.eql(result);
		expect(_.difference(obj, NaN)).to.eql(result);

		expect(_.difference(str, secondArgNum)).to.eql(result);
		expect(_.difference(str, undefined)).to.eql(result);
	});

	it('should return the difference between 2 arrays', function () {
		const arr = [1, 2, 3];
		const arr1 = [2, 5, 6, 10];
		const result = [1, 3];

		expect(_.difference(arr, arr1)).to.eql(result);
	});

	it('should return the difference between the first array and mulitiple other arrays passed to the function', function () {
		const arr = [1, 2, 3, 10, 15, 16, 20, 'tom', 'ted'];
		const arr1 = [2, 5, 6, 10];
		const arr2 = [10, 11, 12, 19];
		const arr3 = [19, 15, 16];
		const arr4 = ['tom', 1];
		const result = [3, 20, 'ted'];

		expect(_.difference(arr, arr1, arr2, arr3, arr4)).to.eql(result);
	});

	it('should return the difference if an object is passed as the first argument to the function', function () {
		const arr = {a: 1, b: 2, c: 3, e: 'bill', f: 'fred'};
		const arr1 = [2, 5, 6, 10, 'fred'];
		const arr2 = ['Bill', 1];
		const result = [3, 'bill'];

		expect(_.difference(arr, arr1, arr2)).to.eql(result);
	});

	it('should return the difference if a string is passed as the first argument to the function', function () {
		const arr = '123abcd';
		const arr1 = ['2', '5', '3', '10', 'd'];
		const arr2 = ['b', 'a'];
		const result = ['1', 'c'];

		expect(_.difference(arr, arr1, arr2)).to.eql(result);
	});

	it('ignores non-array types passed as other arguments', function () {
		const arr = [1, 2, 3, 'bill', 'bob'];
		const arr1 = 'foo';
		const arr2 = [1, 5];
		const arr3 = 1;
		const arr4 = true;
		const arr5 = {a: 'foo', b: 'bar'};
		const arr6 = NaN;
		const arr7 = [3, 'bill'];
    
		const result = [2, 'bob'];

		expect(_.difference(arr, arr1, arr2, arr3, arr4, arr5, arr6, arr7)).to.eql(result);
	});
});
