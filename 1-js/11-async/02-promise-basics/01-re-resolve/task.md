
# 对 promise 调用两次 resolve？


下列这段代码会输出什么？

```js
let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
```
