
let user = {
    name: "John",
    age: 30,
    _password: "myPassword"
  };
  
  user = new Proxy(user, {
    ownKeys(target) {
      return Object.keys(target).filter(key => !key.startsWith('_'));
    }
  });
  
  // "ownKeys" 过滤掉了 _password
  for(let key in user) console.log(key); // name，然后是 age
  
  // 对这些方法的效果相同：
  console.log( Object.keys(user) ); // name,age
  console.log( Object.values(user) ); // John,30
  
  console.log(user);
  // { name: 'John', age: 30, _password: 'myPassword' }

  console.log(user._password);
  // shows too
