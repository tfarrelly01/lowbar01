const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar01'));

describe('#extend', function () {
	it('is a function', function () {
		expect(_.extend).to.be.a('function');
	});

	it('should take at least 1 argument', function () {
		expect(_.extend.length).to.be.at.least(1);
	});

	it('should return undefined if no arguments passed to function', function () {
		expect(_.extend()).to.equal(undefined);
	});

	it('should return the argument if only one argument passed to function', function () {
		let value = {a: 1, b: 2, c: 3};
		expect(_.extend(value)).to.equal(value);

		value = ['a', 1, 'b', 2, 'c', 3];
		expect(_.extend(value)).to.equal(value);
	});

	it('should return the value of the first argument if more than one argument passed to function and first argument is not an object', function () {
		const secondArg = {a: 1, b: 2, c: 3};
		let firstArg = 123;
		expect(_.extend(firstArg, secondArg)).to.equal(firstArg);

		firstArg = '123';
		expect(_.extend(firstArg, secondArg)).to.equal(firstArg);

		firstArg = [1, 2, 3];
		expect(_.extend(firstArg, secondArg)).to.equal(firstArg);

		firstArg = true;
		expect(_.extend(firstArg, secondArg)).to.equal(firstArg);
  });

	it('returns destination object containing the properties from the source object', function () {
		let destObject = {name: 'Fred Flintstone', age: 51, jobTitle: 'Junior Developer', town: 'BedRock'};
		const sourceObject = {age: 52, jobTitle: 'Senior Developer', language: 'java'};
		const result = {
			name: 'Fred Flintstone',
			age: 52,
			jobTitle: 'Senior Developer',
			town: 'BedRock',
			language: 'java'
		};

		expect(_.extend(destObject, sourceObject)).to.eql(result);
	});

	it('returns destination object converting source arguments passed that are of type array', function () {
		const destObject = {};
		const sourceObject1 = [1, 2, 3];
		const result = {'0': 1, '1': 2, '2': 3};

		_.extend(destObject, sourceObject1);
		expect(destObject).to.eql(result);

		const sourceObject2 = ['bob', 'ted'];
		const result1 = {'0': 'bob', '1': 'ted', '2': 3};

		_.extend(destObject, sourceObject2);
		expect(destObject).to.eql(result1);
	});

	it('returns destination object containing the properties from two source objects', function () {
		let destObject = {name: 'Fred Flintstone', age: 51, jobTitle: 'Junior Developer', town: 'BedRock'};
		const sourceObject1 = {age: 52, jobTitle: 'Senior Developer', language: 'java'};

		const sourceObject2 = {learning: ['HTML5', 'CSS3'], fullTime: true};

		const result = {
			name: 'Fred Flintstone',
			age: 52,
			jobTitle: 'Senior Developer',
			town: 'BedRock',
			language: 'java',
			learning: ['HTML5', 'CSS3'],
			fullTime: true
		};

		expect(_.extend(destObject, sourceObject1, sourceObject2)).to.eql(result);
	});

	it('returns destination object containing the properties from many source objects containing nested objects and arrays', function () {
		const destObject = {
			name: 'Fred Flintstone',
			age: 51,
			jobTitle: 'Junior Developer',
			town: 'BedRock'
		};

		const srcObject1 = {
			age: 52,
			jobTitle: 'Senior Developer',
			language: 'java'
		};

		const srcObject2 = {learning: ['HTML5', 'CSS3'], fullTime: true};

		const srcObject3 = {
			learningList: {
				frontEnd: [
					{web: ['react', 'redux', 'react native'], mobile: {android: true, ios: false}},
					'javascript'
				],
				backend: 'C#'
			}
		};

		const srcObject4 = {
			language: ['java', 'ruby']
		};

		const srcObject5 = ['PHP', 'ASP', 'Node'];

		const result = {
			'0': 'PHP',
			'1': 'ASP',
			'2': 'Node',
			name: 'Fred Flintstone',
			age: 52,
			jobTitle: 'Senior Developer',
			town: 'BedRock',
			language: ['java', 'ruby'],
			learning: ['HTML5', 'CSS3'],
			fullTime: true,
			learningList: {
				frontEnd: [
					{web: ['react', 'redux', 'react native'], mobile: {android: true, ios: false}},
					'javascript'
				],
				backend: 'C#'
			}
		};

		expect(_.extend(destObject, srcObject1, srcObject2, srcObject3, srcObject4, srcObject5))
      .to.eql(result);
	});

	it('should ignore arguments passed to the function as sources that are not of type object', function () {
		const destObject = {
			name: 'Fred Flintstone',
			age: 51
		};

		const source1 = 123;
		const source2 = 12.35;
		const source3 = 'asdk';
		const source4 = function (a) {
			return a / 4;
		};
		const source5 = undefined;
		const source6 = true;
		const source7 = {jobTitle: 'Junior Developer'};
		const source8 = false;
		const source9 = {town: 'BedRock'};
		const source10 = NaN;
		const source11 = null;
		const source12 = new Date();

		const result = {
			name: 'Fred Flintstone',
			age: 51,
			jobTitle: 'Junior Developer',
			town: 'BedRock'
		};
		_.extend(
			destObject,
			source1,
			source2,
			source3,
			source4,
			source5,
			source6,
			source7,
			source8,
			source9,
			source10,
			source11,
			source12
		);

		expect(destObject).to.eql(result);
	});
});
