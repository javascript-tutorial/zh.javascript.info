
let user = {
    _name: "Guest",
    get name() {
      return this._name;
    }
  };
  
  let userProxy = new Proxy(user, {
    get(target, prop, receiver) {

        // console.log("t ", target.__proto__, " rcv ", receiver.__proto__);
        // console.log("t ", target.prototype, " rcv ", receiver.__proto__);
        // console.log(target); // this one ok
        // console.log(receiver.prototype);
        //RangeError: Maximum call stack size exceeded

        // return receiver[prop];
        // RangeError: Maximum call stack size exceeded

      return target[prop]; // (*) target = user
    }
  });
  
  let admin = {
    __proto__: userProxy,
    _name: "Admin"
  };
  
  // 期望输出：Admin
  console.log(admin.name); // 输出：Guest (?!?)