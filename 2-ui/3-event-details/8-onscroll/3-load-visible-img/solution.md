`onscroll` 处理程序应该检查哪些图像是可见的，并显示它们。

<<<<<<< HEAD
我们还希望在页面加载时运行它，以检测即将可见的图像并加载它们。

该代码应该在文档加载完成时执行，以便可以访问文档内容。

或者将该代码放在 `<body>` 底部：
=======
We also want to run it when the page loads, to detect immediately visible images and load them.

The code should execute when the document is loaded, so that it has access to its content.

Or put it at the `<body>` bottom:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
// ...页面内容在上面...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

<<<<<<< HEAD
  // 顶部元素边缘可见吗？
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // 底部元素边缘可见吗？
=======
  // top elem edge is visible?
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // bottom elem edge is visible?
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}
```

<<<<<<< HEAD
`showVisible()` 函数使用通过 `isVisible()` 实现的可见性检查，来加载可见图像：
=======
The `showVisible()` function uses the visibility check, implemented by `isVisible()`, to load visible images:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

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
P.S. 此解决方案还有一个 `isVisible` 的变体，可以“预加载”当前文档滚动上方/下方 1 页内的图像
=======
P.S. The solution also has a variant of `isVisible` that "preloads" images that are within 1 page above/below the current document scroll.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
