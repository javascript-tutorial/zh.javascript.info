
let user = {};

Object.defineProperty(user, "name", {
  value: "John"
});

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */

console.log(user);
// {} 


Object.defineProperty(user, "addr", {
  value: "221B",
  enumerable: true,
});
console.log(user);
// { addr: '221B' }

user.name = "rose";
// no effect
console.log(user);
// { addr: '221B' }

user.addr="13F"
// no effect
console.log(user);
// { addr: '221B' }

Object.defineProperty(user, "nick", {
  value: "nnn",
  enumerable: true,
//   configurable: true,
    writable: true,
});
console.log(user);
// { addr: '221B', nick: 'nnn' }

user.nick="mmm";
console.log(user);
// { addr: '221B', nick: 'mmm' }

Object.defineProperty(user, "ROAttr", {
    value : "init val",
    enumerable: true,
    writable: false,
});
console.log(user);
// { addr: '221B', nick: 'mmm', ROAttr: 'init val' }
user.ROAttr = "failing change";
console.log(user);
// { addr: '221B', nick: 'mmm', ROAttr: 'init val' }
