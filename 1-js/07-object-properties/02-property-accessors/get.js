
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    console.log("in getter");
    return `${this.name} ${this.surname}`;
  }
};

console.log(user.fullName); // John Smith

user.fullName = "Test"; // Error（属性只有一个 getter）
console.log(user.fullName); // John Smith
