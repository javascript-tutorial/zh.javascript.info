在任务 <info:task/animate-ball> 中，我们只有一个动画属性。现在多了一个 `elem.style.left`。

水平坐标由另一个定律改变：它不会“反弹”，而是逐渐增加使球逐渐向右移动。

我们可以为它多写一个 `animate`。

作为时间函数，我们可以使用 `linear`，但像 `makeEaseOut(quad)` 这样的函数看起来要好得多。

代码：

```js
let height = field.clientHeight - ball.clientHeight;
let width = 100;

// 设置 top 动画（弹跳）
animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw: function(progress) {
    ball.style.top = height * progress + 'px'
  }
});

// 设置 left 动画（向右移动）
animate({
  duration: 2000,
  timing: makeEaseOut(quad),
  draw: function(progress) {
    ball.style.left = width * progress + "px"
  }
});
```
