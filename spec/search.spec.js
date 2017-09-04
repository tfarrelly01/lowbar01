const expect = require('chai').expect;
const {simpleSearch, binarySearch} = require('../src/search');
const largeArray = [...Array(1000000).keys()];

describe('simpleSearch', function () {
  it('is a function', function () {
    expect(simpleSearch).to.be.a('function');
  });

  it('should take at least 2 arguments', function () {
    expect(simpleSearch.length).to.be.at.least(2);
  });

  it('should return -1 if less than 2 agruments passsed to the function', function () {
    expect(simpleSearch(largeArray)).to.equal(-1);
  });

  it('should return -1 if first agrument is not an array', function () {
    let value = 123;
    expect(simpleSearch(value, 2)).to.equal(-1);

    value = 123.456;
    expect(simpleSearch(value, 2)).to.equal(-1);

    value = {a: 1, b: 2, c: 3};
    expect(simpleSearch(value, 2)).to.equal(-1);

    value = new Date();
    expect(simpleSearch(value, 2)).to.equal(-1);

    value = '123';
    expect(simpleSearch(value, 2)).to.equal(-1);

    value = function () {console.log('hello');};
    expect(simpleSearch(value, 2)).to.equal(-1); 
  });

  it('should return index 1', function () {
    expect(simpleSearch([1, 2, 3], 2)).to.equal(1);
  });

  it('should return index 2', function () {
    expect(simpleSearch([1, 2, 3, 4, 5], 3)).to.equal(2);
  });

  it('should return index 3', function () {
    expect(simpleSearch([1, 2, 3, 4, 5], 4)).to.equal(3);
  });

  it('should return the index position where the first instance of the number is found', function () {
    expect(simpleSearch(largeArray, 0)).to.equal(0);
    expect(simpleSearch(largeArray, 250000)).to.equal(250000);
    expect(simpleSearch(largeArray, 124000)).to.equal(124000);
    expect(simpleSearch(largeArray, 333000)).to.equal(333000);
    expect(simpleSearch(largeArray, 449000)).to.equal(449000);
    expect(simpleSearch(largeArray, 750000)).to.equal(750000);
    expect(simpleSearch(largeArray, 999999)).to.equal(999999);
  });

  it('should return -1 If the number is not found in the array', function () {
    expect(simpleSearch(largeArray, -1)).to.equal(-1);
    expect(simpleSearch(largeArray, 1000000)).to.equal(-1);
    expect(simpleSearch(largeArray, 1000001)).to.equal(-1);
  });

  it('should search for the first matching value in the array after a given index', function () {
    const array = [4, 2, 1, 4, 56, 29, 'a', 'Z', 0, 'h', 'I', '|', '@', 56, 'I', '|', 72, 1001];
    expect(simpleSearch(array, 4)).to.equal(0);
    expect(simpleSearch(array, 4, 2)).to.equal(3);
    expect(simpleSearch(array, 4, 4)).to.equal(-1);     
    expect(simpleSearch(array, 'I', 10)).to.equal(10);
    expect(simpleSearch(array, 'I', 11)).to.equal(14);
    expect(simpleSearch(array, '@', 6)).to.equal(12);
    expect(simpleSearch(array, '@', 13)).to.equal(-1);
    expect(simpleSearch(array, 56, 5)).to.equal(13);  
    expect(simpleSearch(array, 1001, 17)).to.equal(17);    
    expect(simpleSearch(array, 1001, 20)).to.equal(-1); 
  });

  it('should return the index position where the first instance of the string is found in a string', function () {
    const str = 'abcdefghijklmnopqrstuvwxyz';
    expect(simpleSearch(str, 't')).to.equal(19);
    expect(simpleSearch(str, 'b')).to.equal(1);
    expect(simpleSearch(str, 'z')).to.equal(25);
    expect(simpleSearch(str, 'j')).to.equal(9);
    expect(simpleSearch(str, 'p')).to.equal(15);
  });

  it('should return the index position where the first instance of the string is found in a string', function () {
    const str = 'cdefghijklmnopqrstuvwx';
    expect(simpleSearch(str, 'a')).to.equal(-1);
    expect(simpleSearch(str, 'b')).to.equal(-1);
    expect(simpleSearch(str, 'y')).to.equal(-1);
    expect(simpleSearch(str, 'z')).to.equal(-1);
    expect(simpleSearch(str, '1')).to.equal(-1);
  });
});

describe('binarySearch', function () {
  it('is a function', function () {
    expect(binarySearch).to.be.a('function');
  });

  it('should take at least 2 arguments', function () {
    expect(binarySearch.length).to.be.at.least(2);
  });

  it('should return -1 if less than 2 agruments passsed to the function', function () {
    expect(binarySearch(largeArray)).to.equal(-1);
  });

  it('should return -1 if first agrument is not an array', function () {
    let value = 123;
    expect(binarySearch(value, 2)).to.equal(-1);

    value = 123.456;
    expect(binarySearch(value, 2)).to.equal(-1);

    value = {a: 1, b: 2, c: 3};
    expect(binarySearch(value, 2)).to.equal(-1);

    value = new Date();
    expect(binarySearch(value, 2)).to.equal(-1);

    value = '123';
    expect(binarySearch(value, 2)).to.equal(-1);

    value = function () {console.log('hello');};
    expect(binarySearch(value, 2)).to.equal(-1); 
  });

  it('should return index 1', function () {
    expect(binarySearch([1, 2, 3], 2)).to.equal(1);
  });
    it('should return index 2', function () {
    expect(binarySearch([1, 2, 3, 4, 5], 3)).to.equal(2);
  });
    it('should return index 3', function () {
    expect(binarySearch([1, 2, 3, 4, 5], 4)).to.equal(3);
  });

  it('should return the index position where the first instance of the number is found', function () {
    expect(binarySearch(largeArray, 0)).to.equal(0);
    expect(binarySearch(largeArray, 250000)).to.equal(250000);
    expect(binarySearch(largeArray, 124000)).to.equal(124000);
    expect(binarySearch(largeArray, 333000)).to.equal(333000);
    expect(binarySearch(largeArray, 449000)).to.equal(449000);
    expect(binarySearch(largeArray, 750000)).to.equal(750000);
    expect(binarySearch(largeArray, 999999)).to.equal(999999);
  });

  it('should return -1 If the number is not found in the array', function () {
    expect(binarySearch(largeArray, -1)).to.equal(-1);
    expect(binarySearch(largeArray, 1000000)).to.equal(-1);
    expect(binarySearch(largeArray, 1000001)).to.equal(-1);
  });

  it('should return the index position where the first instance of the string is found in a string', function () {
    const str = 'abcdefghijklmnopqrstuvwxyz';
    expect(binarySearch(str, 't')).to.equal(19);
    expect(binarySearch(str, 'b')).to.equal(1);
    expect(binarySearch(str, 'z')).to.equal(25);
    expect(binarySearch(str, 'j')).to.equal(9);
    expect(binarySearch(str, 'p')).to.equal(15);
  });

  it('should return -1 position where the first instance of the string is found in a string', function () {
    const str = 'cdefghijklmnopqrstuvwx';
    expect(binarySearch(str, 'a')).to.equal(-1);
    expect(binarySearch(str, 'b')).to.equal(-1);
    expect(binarySearch(str, 'y')).to.equal(-1);
    expect(binarySearch(str, 'z')).to.equal(-1);
    expect(binarySearch(str, '1')).to.equal(-1);
  });
});