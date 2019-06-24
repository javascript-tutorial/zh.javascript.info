<<<<<<< HEAD
为了达到反弹效果，我们可以在带有 `position:relative` 属性的区域内，给小球使用 `top` 和 `position:absolute` CSS 属性。

field 区域的底部坐标是 `field.clientHeight`。`top` 属性给出了球顶部的坐标，在最底部时达到 `field.clientHeight - ball.clientHeight`。

因此，我们将 `top` 从 `0` 变化到 `field.clientHeight - ball.clientHeight` 来设置动画。

现在为了获得“弹跳”效果，我们可以在 `easeOut` 模式下使用时序函数 `bounce`。

这是动画的最终代码：
=======
To bounce we can use CSS property `top` and `position:absolute` for the ball inside the field with `position:relative`.

The bottom coordinate of the field is `field.clientHeight`. The CSS `top` property refers to the upper edge of the ball. So it should go from `0` till `field.clientHeight - ball.clientHeight`, that's the final lowest position of the upper edge of the ball.

To to get the "bouncing" effect we can use the timing function `bounce` in `easeOut` mode.

Here's the final code for the animation:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

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
