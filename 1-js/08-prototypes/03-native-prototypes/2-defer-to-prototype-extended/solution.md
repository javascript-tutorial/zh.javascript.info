

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// check it
function f(a, b) {
  alert( a + b );
}

<<<<<<< HEAD
f.defer(1000)(1, 2); // 1 秒后显示 3
```

请注意：我们在 `f.apply` 中使用 `this` 以使装饰者适用于对象方法。

因此，如果将包装器函数作为对象方法调用，那么 `this` 将会被传递给原始方法 `f`。
=======
f.defer(1000)(1, 2); // shows 3 after 1 sec
```

Please note: we use `this` in `f.apply` to make our decoration work for object methods.

So if the wrapper function is called as an object method, then `this` is passed to the original method `f`.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  }
}

user.sayHi = user.sayHi.defer(1000);

user.sayHi();
```
