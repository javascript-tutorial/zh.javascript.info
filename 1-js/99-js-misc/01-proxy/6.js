
let user = { };

user = new Proxy(user, {
  ownKeys(target) { // 一旦要获取属性列表就会被调用
    return ['a', 'b', 'c'];
  },

  getOwnPropertyDescriptor(target, prop) { // 被每个属性调用
    return {
      enumerable: true,
      configurable: true,

      writable: true,
      /* ...其他标志，可能是 "value:..." */
    };
  }

});

console.log( Object.keys(user) ); // a, b, c

console.log(user);
// {}

user.a=1;
console.log(user);
// {} !!
