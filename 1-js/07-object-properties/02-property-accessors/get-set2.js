
let user = {
  name: "John",
  surname: "Smith"
};

Object.defineProperty(user, 'fullName', {
  get() {
    console.log("get fullname");
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    console.log("set fullname");
    [this.name, this.surname] = value.split(" ");
  }
});

console.log(user.fullName); // John Smith

for(let key in user) console.log(key); // name, surname
