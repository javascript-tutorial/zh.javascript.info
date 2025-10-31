
console.log(Math.PI);

let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

console.log( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/

Math.PI = 3; // Error，因为其 writable: false

console.log(Math.PI);
// 3.141592653589793

// Error，因为 configurable: false
// Object.defineProperty(Math, "PI", { writable: true });
// TypeError: Cannot redefine property: PI




let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // 正常工作
console.log(user);
// { name: 'Pete' }

delete user.name; // Error
console.log(user);
// { name: 'Pete' }
