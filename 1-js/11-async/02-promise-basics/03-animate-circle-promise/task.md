
# 带有 promise 的动画圆形

在 <info:task/animate-circle-callback> 任务的解决方案中重写 `showCircle`，因此它会返回一个 promise 而不是接受一个回调函数。

新的用法：

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

<info:task/animate-circle-callback> 任务作为基础的解决方案。
