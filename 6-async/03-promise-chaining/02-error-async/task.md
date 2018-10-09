# setTimeout 中的 error

你认为 `.catch` 会不会触发？请解释你的回答？

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
