解决方案：

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // shows "test" after 1000ms
```

注意这里是如何使用箭头函数的。我们知道，箭头函数没有自己的 `this` 和 `arguments`，所以 `f.apply(this, arguments)` 从包装器中获取 `this` 和 `arguments`。

如果我们传递一个常规函数，`setTimeout` 将调用它且不带参数和 `this=window`（假设我们在浏览器环境）。

<<<<<<< HEAD
我们仍然可以通过使用中间变量来传递正确的 `this`，但这有点麻烦：
=======
If we pass a regular function, `setTimeout` would call it without arguments and `this=window` (assuming we're in the browser).

We still can pass the right `this` by using an intermediate variable, but that's a little bit more cumbersome:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```js
function delay(f, ms) {

  return function(...args) {
<<<<<<< HEAD
    let savedThis = this; // 将 this 存储到中间变量
    setTimeout(function() {
      f.apply(savedThis, args); // 在这儿使用它
=======
    let savedThis = this; // store this into an intermediate variable
    setTimeout(function() {
      f.apply(savedThis, args); // use it here
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
    }, ms);
  };

}
```
