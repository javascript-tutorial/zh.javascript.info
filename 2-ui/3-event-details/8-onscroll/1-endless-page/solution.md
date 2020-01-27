解决方案的核心是在页面结束时向页面添加更多日期（或者在实际中加载更多的内容）。

我们可以立即调用它，然后将其添加为 `window.onscroll` 处理器。

最重要的问题是：“如何检测到页面被滚动到了底部？”

我们使用窗口相对坐标。

`<html>` 标签表示（并包含）文档，即 `document.documentElement`。

<<<<<<< HEAD
我们可以通过 `document.documentElement.getBoundingClientRect()` 获取整个文档相对于窗口的坐标。`bottom` 属性将是文档结束的窗口相对坐标。

例如，如果整个 HTML 文档的高度是 2000px，那么：

```js
// 当我们在页面顶部时
// 相对于窗口的 top = 0
=======
We can get window-relative coordinates of the whole document as `document.documentElement.getBoundingClientRect()`, the `bottom` property will be window-relative coordinate of the document bottom.

For instance, if the height of the whole HTML document is `2000px`, then:

```js
// when we're on the top of the page
// window-relative top = 0
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38
document.documentElement.getBoundingClientRect().top = 0

// 窗口相对底部 = 2000
// 文档很长，所以可能会远远超出窗口底部
document.documentElement.getBoundingClientRect().bottom = 2000
```

如果我们向下滚动 `500px`，那么：

```js
// 文档顶部在窗口上方 500px
document.documentElement.getBoundingClientRect().top = -500
// 文档底部距离窗口近了 500px
document.documentElement.getBoundingClientRect().bottom = 1500
```

当我们滚动到末尾时，假设窗口高度为 `600px`：


```js
<<<<<<< HEAD
// 文档顶部在窗口 -1400 px 之上
document.documentElement.getBoundingClientRect().top = -1400
// 文档底部为 600 px 
document.documentElement.getBoundingClientRect().bottom = 600
```

请注意，底部不是 0，因为它永远不会到达窗口顶部。底部坐标的最低限度是窗口高度，我们不能再滚动了。

窗口的高度是 `document.documentElement.clientHeight`。

我们希望文档底部在窗口高度加上 `100px` 以内。
=======
// document top is above the window 1400px
document.documentElement.getBoundingClientRect().top = -1400
// document bottom is below the window 600px
document.documentElement.getBoundingClientRect().bottom = 600
```

Please note that the `bottom` can't be `0`, because it never reaches the window top. The lowest limit of the `bottom` coordinate is the window height (we assumed it to be `600`), we can't scroll it any more up.

We can obtain the window height as `document.documentElement.clientHeight`.

For our task, we need to know when the document bottom is not no more than `100px` away from it (that is: `600-700px`, if the height is `600`).
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

这是函数：

```js
function populate() {
  while(true) {
    // 文档底部
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

<<<<<<< HEAD
    // 如果它比窗口高度还大 100px，那么我们就不是在页面的底部
    // （查看上述示例，大的底部意味着我们需要进行更多滚动）
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

    // 否则，我们会添加更多数据
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
=======
    // if the user scrolled far enough (<100px to the end)
    if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
      // let's add more data
      document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
    }
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38
  }
}
```
