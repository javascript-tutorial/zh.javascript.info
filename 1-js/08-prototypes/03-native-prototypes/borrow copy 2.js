
let obj = {
  0: "Hello",
  1: "world!",
  length: 3,
};

// console.log( obj.join(',') );
// TypeError: obj.join is not a function


obj.join = Array.prototype.join;

console.log( obj.join(',') ); 
// Hello,world!,
