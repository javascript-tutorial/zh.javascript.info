
class User {
    #name = "Guest";
  
    getName() {
      return this.#name;
    }
  }
  
  let user = new User();
  
  user = new Proxy(user, {
    get(target, prop, receiver) {
      let value = Reflect.get(...arguments);
      return typeof value == 'function' ? value.bind(target) : value;
    }
  });
  
  console.log(user.getName()); // Guest
  