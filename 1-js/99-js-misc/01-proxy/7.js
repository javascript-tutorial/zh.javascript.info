
let user = {
    name: "John",
    _password: "xxx",

    checkIt(val){
        console.log("check ", val === this._password);
    }

  };
  
  user = new Proxy(user, {

    get(target, prop) {
      if (prop.startsWith('_')) {
        throw new Error("Access denied");
      }
      let value = target[prop];

      //   return value;
      return (typeof value === 'function') ? value.bind(target) : value; // (*)
      // required for own funcs to access _xxx vars
      // yet still, not best solution.

    },

    set(target, prop, val) { // 拦截属性写入
      if (prop.startsWith('_')) {
        throw new Error("Access denied");
      } else {
        target[prop] = val;
        return true;
      }
    },

    deleteProperty(target, prop) { // 拦截属性删除
      if (prop.startsWith('_')) {
        throw new Error("Access denied");
      } else {
        delete target[prop];
        return true;
      }
    },

    ownKeys(target) { // 拦截读取属性列表
      return Object.keys(target).filter(key => !key.startsWith('_'));
    }

  });
  


  console.log(user);
//{ name: 'John', _password: 'xxx' }


  // "get" 不允许读取 _password
  try {
    console.log(user._password); // Error: Access denied
  } catch(e) { console.log(e.message); }
  
  // "set" 不允许写入 _password
  try {
    user._password = "test"; // Error: Access denied
  } catch(e) { console.log(e.message); }
  
  // "deleteProperty" 不允许删除 _password
  try {
    delete user._password; // Error: Access denied
  } catch(e) { console.log(e.message); }
  
  // "ownKeys" 将 _password 过滤出去
  for(let key in user) console.log(key); // name


  user.checkIt("123");
  user.checkIt("xxx");
