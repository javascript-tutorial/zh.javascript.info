
# 带有回调的圆形动画

在 <info:task/animate-circle> 任务中，显示了一个正在变大的圆形动画。

假设我们现在不只是需要一个圆形，还要在其中显示信息。信息应该在动画完整出现**之后**出现（圆形已经完全长大了），否则圆形会看起来很难看。

在此任务的解决方案中，`showCircle(cx, cy, radius)` 函数画了一个圆形，但却没有给出如何跟踪圆形是否已经准备好。 

添加一个回调参数：当动画完成时，可以调用 `showCircle(cx, cy, radius, callback)`。`callback` 应该将圆形的 `<div>`  作为参数。

这是示例：

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

案例：

[iframe src="solution" height=260]

以 <info:task/animate-circle> 任务作为解决问题的基础。
