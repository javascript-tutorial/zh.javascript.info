
# 基于 promise 的延时

内建函数 `setTimeout` 使用了回调函数。请创建一个基于 promise 的替代方案。

函数 `delay(ms)` 应该返回一个 promise。这个 promise 应该在 `ms` 毫秒后被 resolve，所以我们可以向其中添加 `.then`，像这样：

```js
function delay(ms) {
  // 你的代码
}

delay(3000).then(() => alert('runs after 3 seconds'));
```
