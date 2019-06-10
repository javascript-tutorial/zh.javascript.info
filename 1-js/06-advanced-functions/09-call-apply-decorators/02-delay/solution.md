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

注意这里是如何使用箭头函数的。我们知道，箭头函数没有自己的 `this` 和 `arguments`，所以 `f.apply(this, arguments)`从包装器中获取 `this` 和 `arguments`。

<<<<<<< HEAD
如果我们传递一个常规函数，`setTimeout` 将调用它且不带参数和 `this=window`（在浏览器中），所以我们需要编写更多代码来从包装器传递它们：
=======
If we pass a regular function, `setTimeout` would call it without arguments and `this=window` (assuming we're in the browser).

We still can pass the right `this` by using an intermediate variable, but that's a little bit more cumbersome:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // store this into an intermediate variable
    setTimeout(function() {
      f.apply(savedThis, args); // use it here
    }, ms);
  };

}
```
