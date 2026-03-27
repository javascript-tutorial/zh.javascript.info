
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// 默认情况下，我们的两个属性都会被列出：
for (let key in user) console.log(key); // name, toString

console.log('after');

Object.defineProperty(user, "toString", {
  enumerable: false
});
for (let key in user) console.log(key); // name

console.log(Object.keys(user)); // name
