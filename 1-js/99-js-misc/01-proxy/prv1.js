
class User {
    #name = "Guest";
  
    getName() {
      return this.#name;
    }
  }
  
  let user = new User();

//   console.log(user.#name);
console.log(user.getName());
// Guest
  

  user = new Proxy(user, {});

  console.log(user.getName()); // Error
  // TypeError: Cannot read private member #name from an object whose class did not declare it
