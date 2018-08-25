解决方案：

```js
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}
```

注意这里是如何使用箭头函数的。我们知道，箭头函数没有自己的 `this` 和 `arguments`，所以 `f.apply(this, arguments)`从包装器中获取 `this` 和 `arguments`。

如果我们传递一个常规函数，`setTimeout` 将调用它且不带参数和 `this=window`（在浏览器中），所以我们需要编写更多代码来从包装器传递它们：

```js
function delay(f, ms) {

  // added variables to pass this and arguments from the wrapper inside setTimeout
  return function(...args) {
    let savedThis = this;
    setTimeout(function() {
      f.apply(savedThis, args);
    }, ms);
  };

}
```
