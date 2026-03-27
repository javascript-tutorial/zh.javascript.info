
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    console.log("setter ", value, " for ", this);
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    console.log("getter for ", this);
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

console.log(user);
console.log(admin);

console.log(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // (**)

console.log(admin.fullName); // Alice Cooper，admin 的内容被修改了
console.log(user.fullName);  // John Smith，user 的内容被保护了
