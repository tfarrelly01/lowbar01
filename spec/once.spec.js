const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#once', function () {
	it('is a function', function () {
		expect(_.once).to.be.a('function');
	});

	it('should take one argument', function () {
		expect(_.once.length).to.equal(1);
	});

	it('returns a function', function () {
		let result = _.once(function () {});
		expect(result).to.be.a('function');

		result = _.once(123);
		expect(result).to.be.a('function');

		result = _.once([1, 2, 3]);
		expect(result).to.be.a('function');

		result = _.once({a: 1, b: 2, c: 3});
		expect(result).to.be.a('function');

		result = _.once(null);
		expect(result).to.be.a('function');
	});

	it('should only run the function once', function () {
		const spy = sinon.spy();
		const spiedOnce = _.once(spy);
		spiedOnce();
		spiedOnce();
		spiedOnce();
		expect(spy.callCount).to.equal(1);
	});

	it('should invoke the original function with correct this and passed arguments', function () {
		const callbackSpy = sinon.spy();
		const spiedOnce = _.once(callbackSpy);
		const obj = {};

		spiedOnce.call(obj, 1, 2, 3);

		expect(callbackSpy.calledOn(obj)).to.equal(true);
		expect(callbackSpy.calledWith(1, 2, 3)).to.equal(true);
	});

	it('should return the value returned from the original function', function () {
		const callbackSpy = sinon.stub().returns('Hello World');
		const spiedOnce = _.once(callbackSpy);

		expect(spiedOnce()).to.equal('Hello World');
	});
});
