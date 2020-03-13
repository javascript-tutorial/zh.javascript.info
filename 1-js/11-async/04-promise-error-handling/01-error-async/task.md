# setTimeout 中的错误

你怎么看？`.catch` 会被触发么？解释你的答案。

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
