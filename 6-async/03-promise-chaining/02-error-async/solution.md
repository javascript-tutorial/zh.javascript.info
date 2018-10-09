答案是: **不会，它不会触发**:

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

就像本章讲的，函数代码被一个“隐式的 `try..catch`”包围。所以所有的同步错误都会被处理。

但是 promise 不能处理那些非执行代码运行时而是之后产生的错误。
