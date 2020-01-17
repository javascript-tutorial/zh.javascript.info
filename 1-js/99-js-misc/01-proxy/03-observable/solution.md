该解决方案包括两部分：

1. 无论 `.observe(handler)` 何时被调用，我们都需要在某个地方记住 handler，以便以后可以调用它。我们可以使用 Symbol 作为属性键，将 handler 直接存储在对象中。
2. 我们需要一个带 `set` 陷阱的 proxy 来在发生任何更改时调用处理程序。 

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. 初始化 handler 存储数组
  target[handlers] = [];

  // 存储 handler 函数到数组中以便于未来调用
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. 创建代理以处理更改
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // 转发写入操作到目标对象
      if (success) { // 如果设置属性的时候没有报错
        // 调用所有 handler
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
