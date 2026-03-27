
let user = {
    _name: "Guest",
    get name() {
      return this._name;
    }
  };
  
  let userProxy = new Proxy(user, {
    get(target, prop, receiver) { // receiver = admin
      return Reflect.get(target, prop, receiver); // (*)
    }
  });
  
  
  let admin = {
    __proto__: userProxy,
    _name: "Admin"
  };
  
  console.log(admin.name); // Admin
