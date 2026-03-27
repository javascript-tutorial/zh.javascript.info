
function Rabbit() {}

console.log( Rabbit.prototype.constructor);
// [Function: Rabbit]


Rabbit.prototype = {
  jumps: true
};

console.log( Rabbit.prototype.constructor);
// [Function: Object]

let rabbit = new Rabbit();
console.log(rabbit.constructor === Rabbit); // false
