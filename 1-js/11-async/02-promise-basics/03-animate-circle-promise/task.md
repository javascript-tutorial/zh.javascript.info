
# 带有 promise 的圆形动画

重写任务 <info:task/animate-circle-callback> 的解决方案中的 `showCircle` 函数，以使其返回一个 promise，而不接受回调。

新的用法：

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

以任务 <info:task/animate-circle-callback> 的解决方案为基础。
