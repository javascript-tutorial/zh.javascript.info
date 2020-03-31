`onscroll` 处理程序应该检查哪些图像是可见的，并显示它们。

我们还希望在页面加载时运行它，以检测即将可见的图像并加载它们。

该代码应该在文档加载完成时执行，以便可以访问文档内容。

或者将该代码放在 `<body>` 底部：

```js
// ...页面内容在上面...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // 顶部元素边缘可见吗？
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // 底部元素边缘可见吗？
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}
```

`showVisible()` 函数使用通过 `isVisible()` 实现的可见性检查，来加载可见图像：

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

P.S. 此解决方案还有一个 `isVisible` 的变体，可以“预加载”当前文档滚动上方/下方 1 页内的图像
