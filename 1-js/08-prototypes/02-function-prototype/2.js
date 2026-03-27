
function Rabbit() {}
// 默认：
// Rabbit.prototype = { constructor: Rabbit }

console.log( Rabbit.prototype);
// {}
console.log( Rabbit.prototype.constructor);
// [Function: Rabbit]

// !! attention
console.log(Rabbit.constructor);
// [Function: Function]

console.log( Rabbit.prototype.constructor == Rabbit ); // true


console.log(Rabbit.__proto__); // {}
console.log(Rabbit.__proto__ == Function.prototype); // true

console.log(Rabbit.__proto__.prototype); // undefined
console.log(Rabbit.__proto__.constructor); // [Function: Function]

