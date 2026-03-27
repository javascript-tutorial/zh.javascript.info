
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    console.log("in getter");
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    console.log("in setter");
    [this.name, this.surname] = value.split(" ");
  }
};

// set fullName 将以给定值执行
user.fullName = "Alice Cooper";

console.log(user.name); // Alice
console.log(user.surname); // Cooper
console.log(user.fullName)