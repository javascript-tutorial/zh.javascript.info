
# 带回调的圆形动画

在 <info:task/animate-circle> 任务中，显示了一个逐渐变大的圆形动画。

现在假设我们不仅需要一个圆圈，还需要在其中显示一条消息。该消息应在动画完成后（圆已经完全长大了）**出现**，否则它看起来会很难看。

在此任务的解决方案中，`showCircle(cx, cy, radius)` 函数画了一个圆，但是无法跟踪圆形是否已经准备好。 

添加一个回调参数：当动画完成时，可以调用 `showCircle(cx, cy, radius, callback)`。`callback` 应该接受圆形的 `<div>` 作为参数。

这是示例：

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Demo：

[iframe src="solution" height=260]

以 <info:task/animate-circle> 任务的答案作为解决本任务的基础。
