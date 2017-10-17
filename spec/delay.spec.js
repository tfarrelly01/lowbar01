const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#delay', function () {
	let clock;

	before(function () {
		clock = sinon.useFakeTimers();
	});
	after(function () {
		clock.restore();
	});

	it('is a function', function () {
		expect(_.delay).to.be.a('function');
	});

	it('should take two arguments', function () {
		expect(_.delay.length).to.equal(2);
	});

	it('returns undefined if no arguments passed to function', function () {
		let result = undefined;
		expect(_.delay()).to.equal(result);
	});

	it('returns undefined if first argument is not a function', function () {
		let result = undefined;
		let wait = 0;

		let func = 123;
		expect(_.delay(func, wait)).to.equal(result);

		func = 123.45;
		expect(_.delay(func, wait)).to.equal(result);
	});

	it('delays invocation of callback for specified period', function () {
		let callback = sinon.spy();
		let wait = 100;

		_.delay(callback, wait);

		clock.tick(1);
		expect(callback.callCount).to.equal(0);
		expect(callback.notCalled).to.equal(true);
		expect(callback.called).to.equal(false);

		clock.tick(98);
		expect(callback.callCount).to.equal(0);
		expect(callback.notCalled).to.equal(true);
		expect(callback.called).to.equal(false);

		clock.tick(100);
		expect(callback.callCount).to.equal(1);
		expect(callback.notCalled).to.equal(false);
		expect(callback.called).to.equal(true);

		clock.tick(101);
		expect(callback.callCount).to.equal(1);
		expect(callback.notCalled).to.equal(false);
		expect(callback.called).to.equal(true);
	});
});
