const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#memoize', function () {
	it('is a function', function () {
		expect(_.memoize).to.be.a('function');
	});

	it('should accept at least one argument', function () {
		expect(_.memoize.length).to.be.at.least(1);
	});

	it('returns a function', function () {
		let result = _.memoize(function () {});
		expect(result).to.be.a('function');

		result = _.memoize(123);
		expect(result).to.be.a('function');
	});

	it('only runs the function when necessary', function () {
		const spy = sinon.stub();
		spy.returns(1);
		const rememberSpy = _.memoize(spy);
		rememberSpy(1);
		expect(spy.callCount).to.equal(1);
		rememberSpy(1);
		expect(spy.callCount).to.equal(1);
		rememberSpy(2);
		expect(spy.callCount).to.equal(2);
	});

	it('should compute the hash key for storing the result when passed a hash function, based on the arguments to the original function.', function () {
		const hashFn = function (item) {
			for (let idx in item) item[idx] = item[idx] += 1;

			return item;
		};
		const spy = sinon.stub();
		const rememberSpy = _.memoize(spy, hashFn);

		spy.returns({a: 3, b: 4, c: 5});

		rememberSpy({a: 2, b: 3, c: 4});
		expect(spy.callCount).to.equal(1);
		rememberSpy({a: 2, b: 3, c: 4});
		expect(spy.callCount).to.equal(1);
		rememberSpy({a: 2, b: 3, c: 4});
		expect(spy.callCount).to.equal(1);

		spy.returns({a: 2, b: 3, c: 4});

		rememberSpy({a: 1, b: 2, c: 3});
		expect(spy.callCount).to.equal(2);
		rememberSpy({a: 1, b: 2, c: 3});
		expect(spy.callCount).to.equal(2);

		spy.returns({a: 10, b: 20, c: 30});

		rememberSpy({a: 9, b: 19, c: 29});
		expect(spy.callCount).to.equal(3);
		rememberSpy({a: 9, b: 19, c: 29});
		expect(spy.callCount).to.equal(3);
	});
});
