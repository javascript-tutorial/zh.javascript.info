
let obj = {
  0: "Hello",
  1: "world!",
  2: "you",
  length: 2,
};

// console.log( obj.join(',') );
// TypeError: obj.join is not a function


obj.join = Array.prototype.join;

console.log( obj.join(',') ); // Hello,world!
