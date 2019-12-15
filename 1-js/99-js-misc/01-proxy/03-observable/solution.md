该解决方案包括两部分：

1. 无论 `.observe(handler)` 何时被调用，我们都需要在某个地方记住 handler，以便以后可以调用它。我们可以使用 Symbol 作为属性键，将 handler 直接存储在对象中。
2. 我们需要一个带 `set` 陷阱的 proxy 来在发生任何更改时调用处理程序。 

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. Initialize handlers store
  target[handlers] = [];

  // Store the handler function in array for future calls
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. Create a proxy to handle changes
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // forward the operation to object
      if (success) { // if there were no error while setting the property
        // call all handlers
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
