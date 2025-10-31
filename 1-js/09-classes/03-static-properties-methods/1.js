
class User {
  static staticMethod() {
    console.log(this === User);
  }
}

User.staticMethod(); // true
