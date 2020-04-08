
首先，我们需要选择一种定位球的方法。

我们不能使用 `position:fixed`，因为滚动页面会造成球被移出球场。

所以我们应该使用 `position:absolute`，并且要使定位真正可靠，应该使 `field` 自身具有 `position:absolute`。

然后，球将相对于球场定位：

```css
#field {
  width: 200px;
  height: 150px;
  position: relative;
}

#ball {
  position: absolute;
  left: 0; /* 相对于最接近的祖先（field） */
  top: 0;
  transition: 1s all; /* left/top 的 CSS 动画，使球飞起来 */
}
```

接下来我们需要指定正确的 `ball.style.left/top`。它们现在包含相对于球场的坐标。

这是示意图：

![](move-ball-coords.svg)

我们有 `event.clientX/clientY` —— 点击位置的窗口相对坐标。

要获取点击位置的球场相对坐标 `left`，我们可以减去球场左边缘和边框的宽度：

```js
let left = event.clientX - fieldCoords.left - field.clientLeft;
```

通常情况下，`ball.style.left` 表示“元素的左边缘”（球）。因此，如果我们将其指定为 `left`，那么球的边缘而非球的中心将位于鼠标光标下方。

我们需要将球向左移动球宽度的一半，向上移动球高度的一半，以使其居中。

所以，最后的 `left` 将是：

```js
let left = event.clientX - fieldCoords.left - field.clientLeft - ball.offsetWidth/2;
```

使用相同的逻辑来计算垂直坐标。

请注意，球的宽度/高度必须在我们访问 `ball.offsetWidth` 时就已知。应该在 HTML 或 CSS 中指定。
