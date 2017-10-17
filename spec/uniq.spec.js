const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#uniq', function () {
	it('is a function', function () {
		expect(_.uniq).to.be.a('function');
	});

	it('should take at least 1 argument', function () {
		expect(_.uniq.length).to.be.at.least(1);
	});

	it('should return an empty array 1st argument is not of type array or string', function () {
		let value = 12;
		expect(_.uniq(value)).to.eql([]);
	});

	it('for an unsorted array argument, returns a duplicate-free version of the array', function () {
		const list = [1, 1, 2, 3, 4, 1, 4, 3, 10];
		const result = [1, 2, 3, 4, 10];
		expect(_.uniq(list)).to.eql(result);
	});

	it('for an unsorted string argument, returns a duplicate-free array version of the string elements', function () {
		const list = '1123414310';
		const result = ['1', '2', '3', '4', '0'];
		expect(_.uniq(list)).to.eql(result);
	});

	it('for a sorted array, returns a duplicate-free version of the array', function () {
		const list = [1, 1, 1, 2, 3, 3, 4, 4, 5, 6, 6, 6, 6, 10];
		const result = [1, 2, 3, 4, 5, 6, 10];
		const sorted = true;
		expect(_.uniq(list, sorted)).to.eql(result);
	});

	it('for a sorted string, returns a duplicate-free array version of the string elements', function () {
		const list = 'aaaaabbchhhijAAZ';
		const result = ['a', 'b', 'c', 'h', 'i', 'j', 'A', 'Z'];
		const sorted = true;
		expect(_.uniq(list, sorted)).to.eql(result);
	});

	it('computes unique items based on a transformation for an unsorted array of objects, via an iteratee function.', function () {
		const people = [
			{name: 'Barney Rubble', age: 1032},
			{name: 'Mildred Rubble', age: 1024},
			{name: 'Fred Flintstone', age: 1032},
			{name: 'Wilmar Flintstone', age: 1026}
		];

		const result = [
			{name: 'Barney Rubble', age: 1032},
			{name: 'Mildred Rubble', age: 1024},
			{name: 'Wilmar Flintstone', age: 1026}
		];

		function returnAge (person) {
			return person.age;
		}

		const uniqueAges = _.uniq(people, false, returnAge);
		expect(uniqueAges).to.eql(result);
	});

	it('computes unique items based on a transformation for a sorted array of objects, via an iteratee function.', function () {
		const students = [
			{surname: 'Davies', forename: 'A', GCSEPasses: 10},
			{surname: 'Davies', forename: 'A', GCSEPasses: 10},
			{surname: 'Davies', forename: 'A', GCSEPasses: 8},
			{surname: 'Davies', forename: 'B', GCSEPasses: 9},
			{surname: 'Smith', forename: 'C', GCSEPasses: 7},
			{surname: 'Smith', forename: 'C', GCSEPasses: 7},
			{surname: 'Smith', forename: 'J', GCSEPasses: 7},
			{surname: 'Smith', forename: 'N', GCSEPasses: 6},
			{surname: 'Taylor', forename: 'J', GCSEPasses: 8},
			{surname: 'Taylor', forename: 'J', GCSEPasses: 8},
			{surname: 'Taylor', forename: 'J', GCSEPasses: 8}
		];

		const result = [
			{surname: 'Davies', forename: 'A', GCSEPasses: 10},
			{surname: 'Davies', forename: 'A', GCSEPasses: 8},
			{surname: 'Davies', forename: 'B', GCSEPasses: 9},
			{surname: 'Smith', forename: 'C', GCSEPasses: 7},
			{surname: 'Smith', forename: 'J', GCSEPasses: 7},
			{surname: 'Smith', forename: 'N', GCSEPasses: 6},
			{surname: 'Taylor', forename: 'J', GCSEPasses: 8}
		];

		function getStudentName (student) {
			return student.forename + student.surname + '' + student.GCSEPasses;
		}
		const nonDuplicates = _.uniq(students, true, getStudentName);
		expect(nonDuplicates).to.eql(result);
	});
});
