`onscroll` 处理器应该检查哪些图像是可见的，然后显示它们。

<<<<<<< HEAD
我们还希望在页面加载时运行它，以便在任何滚动之前立即检测图像可见性并加载它们。

如果我们把它放在 `<body>` 底部，那么它会在页面内容被加载时运行。
=======
We also want to run it when the page loads, to detect immediately visible images and load them.

The code should execute when the document is loaded, so that it has access to its content.

Or put it at the `<body>` bottom:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

```js
// ...页面内容如上所述...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

<<<<<<< HEAD
  // 顶部可见或底部可见
=======
  // top elem edge is visible?
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // bottom elem edge is visible?
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}
```

The `showVisible()` function uses the visibility check, implemented by `isVisible()`, to load visible images:

```js
function showVisible() {
  for (let img of document.querySelectorAll('img')) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = '';
    }
  }
}

*!*
showVisible();
window.onscroll = showVisible;
*/!*
```

<<<<<<< HEAD
对于可视化图像，我们可以使用 `img.dataset.src` 并将其赋值 `img.src`（如果还没有这样做）。

P.S. 解决方案还有一个 `isVisible` 的变体，即位于 1 个页面上方/下方的“预加载”图像（页面高度是 `document.documentElement.clientHeight`）。
=======
P.S. The solution also has a variant of `isVisible` that "preloads" images that are within 1 page above/below the current document scroll.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
