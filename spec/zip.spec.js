const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#zip', function () {
	it('is a function', function () {
		expect(_.zip).to.be.a('function');
	});

	it('should return an empty array if no arguments passed to the function', function () {
		expect(_.zip()).to.eql([]);
	});

	it('should return an empty array if first argument is not an array', function () {
		let value = 12;
		expect(_.zip(value)).to.eql([]);

		value = {a: 1, b: 2, c: 3};
		expect(_.zip(value)).to.eql([]);
	});

	it('merges together the values of two arrays with the values at the corresponding position', function () {
		const arr1 = [4, 5, 6];
		const arr2 = [7, 8, 9];
		const result = [[4, 7], [5, 8], [6, 9]];
		expect(_.zip(arr1, arr2)).to.eql(result);
	});

	it('merges together the values of several arrays of objects with the values at the corresponding position', function () {
		const arr1 = [{a: 1}, {b: 2}, {c: 3}];
		const arr2 = [{d: 'foo'}, {e: 'bar'}, {f: 'baz'}];
		const arr3 = [{a: 'dog', b: 'cat'}, {c: 'bat', d: 'rat'}, {e: 'frog', f: 'toad', g: 'newt'}];
		const result = [
			[{a: 1}, {d: 'foo'}, {a: 'dog', b: 'cat'}],
			[{b: 2}, {e: 'bar'}, {c: 'bat', d: 'rat'}],
			[{c: 3}, {f: 'baz'}, {e: 'frog', f: 'toad', g: 'newt'}]
		];
		expect(_.zip(arr1, arr2, arr3)).to.eql(result);
	});

	it('merges together the values of several arrays of differing lengths with the values at the corresponding position', function () {
		const arr = [];
		const arr1 = [1, 2, 3, 4, 100];
		const arr2 = [4];
		const arr3 = [7, 8, 9];
		const arr4 = [{a: 1}, {b: 2}, {c: 3}, {d: 5}];
		const arr5 = [{d: 'foo'}, {e: 'bar'}];
		const arr6 = [{a: 'dog', b: 'cat'}, {c: 'bat', d: 'rat'}, {e: 'frog', f: 'toad', g: 'newt'}];
		const result = [
			[undefined, 1, 4, 7, {a: 1}, {d: 'foo'}, {a: 'dog', b: 'cat'}],
			[undefined, 2, undefined, 8, {b: 2}, {e: 'bar'}, {c: 'bat', d: 'rat'}],
			[undefined, 3, undefined, 9, {c: 3}, undefined, {e: 'frog', f: 'toad', g: 'newt'}],
			[undefined, 4, undefined, undefined, {d: 5}, undefined, undefined],
			[undefined, 100, undefined, undefined, undefined, undefined, undefined]
		];
		expect(_.zip(arr, arr1, arr2, arr3, arr4, arr5, arr6)).to.eql(result);
	});

	it('merges together the values of several strings of differing lengths with the values at the corresponding position', function () {
		const str = '123';
		const str1 = 'abc';
		const str2 = '45';
		const str3 = 'd';
		const str4 = '';
		const result = [
			['1', 'a', '4', 'd', undefined],
			['2', 'b', '5', undefined, undefined],
			['3', 'c', undefined, undefined, undefined]
		];
		expect(_.zip(str, str1, str2, str3, str4)).to.eql(result);
	});

	it('continues to merge arrays whilst handling non-array types also passed as arguments', function () {
		const arr = [1, 2, 3];
		const arr1 = 'foo';
		const arr2 = [4, 5];
		const arr3 = 1;
		const arr4 = true;
		const arr5 = {a: 'foo', b: 'bar'};
		const arr6 = NaN;
		const result = [
			[1, 'f', 4, undefined, undefined, undefined, undefined],
			[2, 'o', 5, undefined, undefined, undefined, undefined],
			[3, 'o', undefined, undefined, undefined, undefined, undefined]
		];
		expect(_.zip(arr, arr1, arr2, arr3, arr4, arr5, arr6)).to.eql(result);
	});
});
