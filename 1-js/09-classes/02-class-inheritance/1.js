
function f(phrase) {
  return class {
    sayHi() { console.log(phrase); }
  };
}

class User extends f("Hello") {}

new User().sayHi(); // Hello
