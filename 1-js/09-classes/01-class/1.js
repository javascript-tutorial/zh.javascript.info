
class User {

  constructor(name) {
    console.log("constr");
    this.name = name;
  }

  sayHi() {
    console.log(this.name);
  }

}

// 用法：
let user = new User("John");
user.sayHi();

console.log(typeof user); // object
console.log(typeof User); // function  !!

// class 是一个函数
console.log(typeof User); // function

// ...或者，更确切地说，是 constructor 方法
console.log(User === User.prototype.constructor); // true

// 方法在 User.prototype 中，例如：
console.log(User.prototype.sayHi); // sayHi 方法的代码 (only shows in browser)

// 在原型中实际上有两个方法
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
