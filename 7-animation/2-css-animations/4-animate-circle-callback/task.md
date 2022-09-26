
# 带回调的圆圈动画

在练习 <info:task/animate-circle> 中展示了一个不断变大的圆。

现在假设我们不止需要一个圆，还需要在其中显示一条消息。该消息应该出现在动画结束**之后**（圆变最大时），否则看起来会很丑。

在该练习的解决方案中, 函数 `showCircle(cx, cy, radius)` 画了一个不断变大的圆, 但无法知道它何时结束。

添加一个回调函数作为参数： `showCircle(cx, cy, radius, callback)` 在动画完成时调用。 `callback` 应该接收圆`div`作为一个参数。

这是样例：

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Demo:

[iframe src="solution" height=260]

以 <info:task/animate-circle> 的解决方案为基础。
