`onscroll` 处理器应该检查哪些图像是可见的，然后显示它们。

我们还希望在页面加载时运行它，以便在任何滚动之前立即检测图像可见性并加载它们。

如果我们把它放在 `<body>` 底部，那么它会在页面内容被加载时运行。

```js
// ...页面内容如上所述...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // 顶部可见或底部可见
  let topVisible = coords.top > 0 && coords.top < windowHeight;
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}

*!*
showVisible();
window.onscroll = showVisible;
*/!*
```

对于可视化图像，我们可以使用 `img.dataset.src` 并将其赋值 `img.src`（如果还没有这样做）。

P.S. 解决方案还有一个 `isVisible` 的变体，即位于 1 个页面上方/下方的 “预加载”图像（页面高度是 `document.documentElement.clientHeight`）。
