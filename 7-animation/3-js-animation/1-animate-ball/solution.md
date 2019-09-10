为了达到反弹效果，我们可以在带有 `position:relative` 属性的区域内，给小球使用 `top` 和 `position:absolute` CSS 属性。

field 区域的底部坐标是 `field.clientHeight`。`top` 属性给出了球顶部的坐标，在最底部时达到 `field.clientHeight - ball.clientHeight`。

因此，我们将 `top` 从 `0` 变化到 `field.clientHeight - ball.clientHeight` 来设置动画。

现在为了获得“弹跳”效果，我们可以在 `easeOut` 模式下使用时序函数 `bounce`。

这是动画的最终代码：

```js
let to = field.clientHeight - ball.clientHeight;

animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw(progress) {
    ball.style.top = to * progress + 'px'
  }
});
```
