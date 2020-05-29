<<<<<<< HEAD
该解决方案包括两部分：

1. 无论 `.observe(handler)` 何时被调用，我们都需要在某个地方记住 handler，以便以后可以调用它。我们可以使用 Symbol 作为属性键，将 handler 直接存储在对象中。
2. 我们需要一个带有 `set` 陷阱的 proxy 来在发生任何更改时调用 handler。 
=======
The solution consists of two parts:

1. Whenever `.observe(handler)` is called, we need to remember the handler somewhere, to be able to call it later. We can store handlers right in the object, using our symbol as the property key.
2. We need a proxy with `set` trap to call handlers in case of any change.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
<<<<<<< HEAD
  // 1. 初始化 handler 存储
  target[handlers] = [];

  // 将 handler 函数存储到数组中，以便于之后调用
=======
  // 1. Initialize handlers store
  target[handlers] = [];

  // Store the handler function in array for future calls
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

<<<<<<< HEAD
  // 2. 创建一个 proxy 以处理更改
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // 将操作转发给对象
      if (success) { // 如果在设置属性时没有出现 error
        // 调用所有 handler
=======
  // 2. Create a proxy to handle changes
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // forward the operation to object
      if (success) { // if there were no error while setting the property
        // call all handlers
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John";
```
