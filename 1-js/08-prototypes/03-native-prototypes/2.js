
let arr = [1, 2, 3];

console.log(arr);
// [ 1, 2, 3 ]

console.log(arr.__proto__);
// Object(0) []

// 它继承自 Array.prototype？
console.log( arr.__proto__ === Array.prototype ); // true

// 接下来继承自 Object.prototype？
console.log( arr.__proto__.__proto__ === Object.prototype ); // true

// 原型链的顶端为 null。
console.log( arr.__proto__.__proto__.__proto__ ); // null

console.log(Array.prototype);
// Object(0) []

console.log(Array.__proto__);
// {}


console.log(arr.toString());
// 1,2,3

console.log(arr.toString);
// [Function: toString]
// Array.toString()
