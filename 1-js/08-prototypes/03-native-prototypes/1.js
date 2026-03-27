
let obj = {};
console.log( obj ); // "[object Object]" ?

console.log(obj.toString);
console.log(obj.toStringxxx);
/*
{}
[Function: toString]
undefined
*/

console.log(obj.__proto__);
// [Object: null prototype] {}

console.log(obj.__proto__ === Object.prototype); // true

console.log(obj.toString === obj.__proto__.toString); //true
console.log(obj.toString === Object.prototype.toString); //true

console.log(Object.prototype.__proto__); // null
