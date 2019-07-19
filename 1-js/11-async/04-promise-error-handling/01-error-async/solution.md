答案是：**不，它不会触发**：

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

正如本章所述，函数代码周围有个“隐式 `try..catch`”。所以所有同步错误都被处理。

但是这里的错误并不是在执行阶段生成的，而是在执行阶段之后才生成错误。所以 promise 无法处理它。
