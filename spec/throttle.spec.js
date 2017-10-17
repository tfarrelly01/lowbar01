const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#throttle', function () {
	let clock;

	before(function () {
		clock = sinon.useFakeTimers();
	});
	after(function () {
		clock.restore();
	});

	it('is a function', function () {
		expect(_.throttle).to.be.a('function');
	});

	it('should take three arguments', function () {
		expect(_.throttle.length).to.equal(3);
	});

	it('returns a function if first argument is not a function', function () {
		let wait = 0;

		let func = 123;
		expect(typeof _.throttle(func, wait)).to.equal('function');

		func = 123.45;
		expect(typeof _.throttle(func, wait)).to.equal('function');

		func = 'string';
		expect(typeof _.throttle(func, wait)).to.equal('function');

		func = [1, 2, 3];
		expect(typeof _.throttle(func, wait)).to.equal('function');

		func = {a: 1, b: 2, c: 3};
		expect(typeof _.throttle(func, wait)).to.equal('function');

		func = true;
		expect(typeof _.throttle(func, wait)).to.equal('function');

		func = false;
		expect(typeof _.throttle(func, wait)).to.equal('function');

		func = undefined;
		expect(typeof _.throttle(func, wait)).to.equal('function');

		func = NaN;
		expect(typeof _.throttle(func, wait)).to.equal('function');
	});

	it('Invokes the passed-in function immediately', function () {
		const callback = sinon.spy();
		const wait = 100;

		const throttled = _.throttle(callback, wait);

		throttled();
		throttled();

		expect(callback.callCount).to.equal(1);
	});

	it('executes the throttled function once every 100 millisecond period, eventhough the function has been invoked many times during the period ', function () {
		const callback = sinon.spy();
		const wait = 100;

		const throttled = _.throttle(callback, wait);

		throttled();
		expect(callback.callCount).to.equal(1);

		throttled();
		throttled();
		throttled();
		throttled();
		throttled();
		throttled();
		throttled();

		expect(callback.callCount).to.equal(1);
		clock.tick(99);
		expect(callback.callCount).to.equal(1);
		clock.tick(1);
		expect(callback.callCount).to.equal(2);
		clock.tick(1);
		expect(callback.callCount).to.equal(2);
	});

	it('ensure that the wait period is set to zero if the value passed-in to the function is NOT a positive integer', function () {
		const callback = sinon.spy();

		let wait = -1;
		let throttled = _.throttle(callback, wait);
		throttled();
		throttled();
		expect(callback.callCount).to.equal(2);

		wait = 12.45;
		throttled = _.throttle(callback, wait);
		throttled();
		throttled();
		expect(callback.callCount).to.equal(4);

		wait = 'asv';
		throttled = _.throttle(callback, wait);
		throttled();
		throttled();
		expect(callback.callCount).to.equal(6);

		wait = [1, 2, 3];
		throttled = _.throttle(callback, wait);
		throttled();
		throttled();
		expect(callback.callCount).to.equal(8);

		wait = {a: 1, b: 2, c: 3};
		throttled = _.throttle(callback, wait);
		throttled();
		throttled();
		expect(callback.callCount).to.equal(10);

		wait = undefined;
		throttled = _.throttle(callback, wait);
		throttled();
		throttled();
		expect(callback.callCount).to.equal(12);

		wait = null;
		throttled = _.throttle(callback, wait);
		throttled();
		throttled();
		expect(callback.callCount).to.equal(14);

		wait = true;
		throttled = _.throttle(callback, wait);
		throttled();
		expect(callback.callCount).to.equal(15);
	});

	it('disables execution of the leading edge function call if {leading: false} option set', function () {
		const callback = sinon.spy();
		const wait = 100;
		const options = {leading: false};
		const throttled = _.throttle(callback, wait, options);

		throttled();
		expect(callback.callCount).to.equal(0);

		throttled();
		throttled();
		throttled();

		clock.tick(100);
		expect(callback.callCount).to.equal(1);
	});

	it('disables execution of the trailing edge function call if {trailing: false} option set', function () {
		const callback = sinon.spy();
		const wait = 100;
		const options = {trailing: false};
		const throttled = _.throttle(callback, wait, options);

		throttled();
		expect(callback.callCount).to.equal(1);

		throttled();
		throttled();
		throttled();

		clock.tick(100);
		expect(callback.callCount).to.equal(1);
	});

	it('disables execution of the leading and trailing edge function calls if {leading: false, trailing: false} option set', function () {
		const callback = sinon.spy();
		const wait = 100;
		const options = {leading: false, trailing: false};
		const throttled = _.throttle(callback, wait, options);

		throttled();
		expect(callback.callCount).to.equal(0);

		throttled();
		throttled();
		throttled();

		clock.tick(100);
		expect(callback.callCount).to.equal(0);
	});
});
