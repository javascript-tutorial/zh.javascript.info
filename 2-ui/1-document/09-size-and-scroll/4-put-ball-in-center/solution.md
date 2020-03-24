小球具有 `position:absolute`。这意味着它的 `left/top` 坐标是从最近的具有定位属性的元素开始测量的，这个元素即 `#field`（因为它有 `position:relative`）。

坐标从场（field）的左上角内侧开始：

![](field.svg)

内部的场（field）的 width/height 是 `clientWidth/clientHeight`。所以场（field）的中心坐标为 `(clientWidth/2, clientHeight/2)`。

……但是，如果我们将 `ball.style.left/top` 设置为这种值，那么在中心的会是球的左上边缘，而不是整个球：

```js
ball.style.left = Math.round(field.clientWidth / 2) + 'px';
ball.style.top = Math.round(field.clientHeight / 2) + 'px';
```

这是它将显示出来的效果：

[iframe height=180 src="ball-half"]

为了使球的中心与场（field）的中心重合，我们应该把球向左移动球宽度的一半，并向上移动球高度的一半：

```js
ball.style.left = Math.round(field.clientWidth / 2 - ball.offsetWidth / 2) + 'px';
ball.style.top = Math.round(field.clientHeight / 2 - ball.offsetHeight / 2) + 'px';
```

**注意：陷阱！**

如果 `<img>` 没有宽/高，代码将无法正常工作：

```html
<img src="ball.png" id="ball">
```

当浏览器还不知道图片的宽/高（图片的尺寸可能来自标签属性或 CSS）的时候它会假设它们的尺寸为 `0`直到图片加载完成。

实际使用过程中，浏览器会在图片第一次加载完成后缓存该图片，方便下次再次访问时立即显示图片。

但是在第一次加载时 `ball.offsetWidth` 的值为 `0`，这会导致错误的坐标出现。

此时我们应该为 `<img>` 添加 `width/height` 属性：

```html
<img src="ball.png" *!*width="40" height="40"*/!* id="ball">
```

...或者在 CSS 中提供尺寸：

```css
#ball {
  width: 40px;
  height: 40px;
}
```
