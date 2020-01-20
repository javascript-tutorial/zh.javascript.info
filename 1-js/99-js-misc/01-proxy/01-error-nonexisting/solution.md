
```js run
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        throw new ReferenceError(`Property doesn't exist: "${prop}"`)
      }
    }
  });
}

user = wrap(user);

alert(user.name); // John
<<<<<<< HEAD
alert(user.age); // ReferenceError: Property doesn't exist
=======
alert(user.age); // ReferenceError: Property doesn't exist "age"
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
```
