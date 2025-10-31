
let user = {
    name: "John",
  };
  
  user = new Proxy(user, {
    get(target, prop, receiver) {
      console.log(`GET ${prop}`);
      return Reflect.get(target, prop, receiver); // (1)
    },
    set(target, prop, val, receiver) {
      console.log(`SET ${prop}=${val}`);
      return Reflect.set(target, prop, val, receiver); // (2)
    }
  });
  
  let name = user.name; // 显示 "GET name"
  user.name = "Pete"; // 显示 "SET name=Pete"
  