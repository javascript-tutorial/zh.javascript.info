
function Rabbit() {}
// 默认：
// Rabbit.prototype = { constructor: Rabbit }

let rabbit = new Rabbit(); // 继承自 {constructor: Rabbit}

console.log(rabbit.constructor);
// [Function: Rabbit]

console.log(rabbit.constructor == Rabbit); // true (from prototype)
