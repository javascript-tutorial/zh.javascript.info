答案是：**不，它不会被触发**：

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

正如本章所讲，函数代码周围有个“隐式的 `try..catch`”。所以，所有同步错误都会得到处理。

但是这里的错误并不是在 executor 运行时生成的，而是在稍后生成的。因此，promise 无法处理它。
