const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#each', function () {
	it('is a function', function () {
		expect(_.each).to.be.a('function');
	});

	it('should take at least 2 arguments', function () {
		expect(_.each.length).to.be.at.least(2);
	});

	it('returns undefined if no arguments passed to function', function () {
		expect(_.each()).to.equal(undefined);
	});

	it('returns the value passed to the function if it is the sole argument', function () {
		let value = [1, 2, 3];
		expect(_.each(value)).to.equal(value);

		value = null;
		expect(_.each(value)).to.equal(value);
	});

	it('returns the value of the first argument (list) if the first argument is not an array, string  or object', function () {
		let value = 123;
		let iteratee = function (item) {
			console.log(item);
		};
		expect(_.each(value, iteratee)).to.equal(value);

		value = null;
		expect(_.each(value, iteratee)).to.equal(value);
	});

	it('returns the value of the first argument (list) if the second argument (iteratee) is not a function', function () {
		let list = [1, 2, 3];
		let iteratee = 123;
		expect(_.each(list, iteratee)).to.equal(list);

		list = '12c';
		expect(_.each(list)).to.equal(list);

		list = {a: '1', b: '2', c: 'c'};
		expect(_.each(list)).to.eql(list);
	});

	it('invokes the function as many times as there are items in the array', function () {
		const list = [1, 2, 3];
		let counter = 0;
		function incrementCounter () {
			counter += 1;
		}
		_.each(list, incrementCounter);
		expect(counter).to.equal(3);
	});

	it('invokes the function as many times as there are items in the string', function () {
		let counter = 0;
		const list = 'abc';
		function incrementCounter () {
			counter += 1;
		}
		_.each(list, incrementCounter);
		expect(counter).to.equal(3);
	});

	it('invokes the function as many times as there are properties in the object', function () {
		const list = {a: 1, b: 2, c: 3};
		let counter = 0;
		function incrementCounter () {
			counter++;
		}
		_.each(list, incrementCounter);
		expect(counter).to.equal(3);
	});

	it('passes each element of the array as the first argument to the iteratee', function () {
		const newArray = [];
		const list = [1, 2, 3];

		function pushElementToArray (element) {
			newArray.push(element);
		}
		_.each(list, pushElementToArray);
		expect(newArray).to.eql(list);
	});

	it('passes each element of the string as the first argument to the iteratee', function () {
		let newStr = '';
		const str = 'HELLO THERE';

		function copyCharsInString (char) {
			newStr += char;
		}
		_.each(str, copyCharsInString);
		expect(newStr).to.eql(str);
	});

	it('Passes each index of the object as the first argument to the iteratee', function () {
		const objKeys = [];
		const obj = {a: 1, b: 2, c: 3, d: 4};
		const result = ['a', 'b', 'c', 'd'];

		function putKeyInArray (key) {
			objKeys.push(key);
		}
		_.each(Object.keys(obj), putKeyInArray);
		expect(objKeys).to.eql(result);
	});

	it('binds a context to the iteratee if one is passed', function () {
    const arr = [2, 3, 4, 5, 6];
		const context = {subtract : 2};
    const newArr = [];
    const result = [0, 1, 2, 3, 4];

		_.each(
      arr,
      function (num) { 
        // the value of 'this' in here should be the context object
        newArr.push(num - this.subtract);
      },
      context
		);
		expect(newArr).to.eql(result);
	});
});
