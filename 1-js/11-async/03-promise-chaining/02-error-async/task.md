# setTimeout 中的错误

你认为 `.catch` 会不会触发？请解释一下？

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
