const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#pluck', function () {
	const singers = [
		{name: 'Elvis Presley', nationality: 'American', deceased: 1977},
		{name: 'Frank Sinatra', nationality: 'American', deceased: 1998},
		{name: 'Tom Jones', nationality: 'Welsh', age: 77},
		{name: 'Engelbert Humperdinck', nationality: 'English', age: 81}
	];

	it('is a function', function () {
		expect(_.pluck).to.be.a('function');
	});

	it('should take at least 2 arguments', function () {
		expect(_.pluck.length).to.be.at.least(2);
	});

	it('should return an empty array if first argument is not an array, string or object', function () {
		let value = 12;
		expect(_.pluck(value, 12)).to.eql([]);

		value = undefined;
		expect(_.pluck(value, undefined)).to.eql([]);
	});

	it('should return an array of values for a given property name', function () {
		let property = 'name';
		let result = ['Elvis Presley', 'Frank Sinatra', 'Tom Jones', 'Engelbert Humperdinck'];
		expect(_.pluck(singers, property)).to.eql(result);

		property = 'deceased';
		result = [1977, 1998, undefined, undefined];
		expect(_.pluck(singers, property)).to.eql(result);
	});

	it('should return an array of values each with a value of undefined if the property name does not exist', function () {
		let result = [undefined, undefined, undefined, undefined];
		expect(_.pluck(singers)).to.eql(result);

		expect(_.pluck(singers, {name: 'Frank Sinatra'})).to.eql(result);

		expect(_.pluck(singers, false)).to.eql(result);
	});

	it('should return an array of values each with a value of undefined if the 1st argument is of type string or object', function () {
		let value = '12345';
		let property = '2';
		let result = [undefined, undefined, undefined, undefined, undefined];
		expect(_.pluck(value)).to.eql(result);
		expect(_.pluck(value, property)).to.eql(result);

		value = {a: 'foo', b: 'bar', c: 'baz'};
		property = 'b';
		result = [undefined, undefined, undefined];
		expect(_.pluck(value)).to.eql(result);
		expect(_.pluck(value, property)).to.eql(result);
	});
});
