function checkIfExistingValue (obj, key, value) {
    return obj.hasOwnProperty(key) && obj[key] === value;
}
var test = [{name : 'jack', sex: 'F'}, {name: 'joe', sex: 'M'}];
console.log(test.some(function (person) { return checkIfExistingValue(person, 'name', 'jack'); })); 