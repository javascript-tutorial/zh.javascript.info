
let obj = {};

console.log(obj); // [object Object]
console.log(obj.toString()); // 同上
/*
{}
[object Object]
*/

// console.log(obj.prototype);
console.log("_ ", obj.__proto__);
// _  [Object: null prototype] {}



// 方便起见，将 toString 方法复制到一个变量中
let objectToString = Object.prototype.toString;

// 它是什么类型的？
let arr = [];

console.log("tos ", objectToString.call(arr) ); // [object Array]

console.log("_ ", arr.__proto__);
// _  Object(0) []


console.log(objectToString.call(obj));
// [object Object]


let user = {
  [Symbol.toStringTag]: "User"
};

console.log( {}.toString.call(user) ); // [object User]
