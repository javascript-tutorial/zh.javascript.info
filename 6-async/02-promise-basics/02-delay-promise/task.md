
# 延迟 promise

内置 `setTimeout` 函数会使用回调函数。创建一个基于 promise 的替代产物。

`delay(ms)` 函数会返回一个 promise。这个 promise 应该在 `ms` 毫秒之后被处理。因此我们可以在这之后调用 `.then`，就像这样：

```js
function delay(ms) {
  // your code
}

delay(3000).then(() => alert('runs after 3 seconds'));
```
