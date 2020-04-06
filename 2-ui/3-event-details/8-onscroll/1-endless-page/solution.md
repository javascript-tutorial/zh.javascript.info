解决方案的核心是一个函数，当我们在页面末端时，该函数可以向页面添加更多日期（或者在实际开发中是加载更多内容）。

我们可以立即调用它，并将其添加为 `window.onscroll` 处理程序。

最重要的问题是：“如何检测页面滚动到了末端？”

让我们使用相对于窗口的坐标。

文档（document）在 `<html>` 标签中被表示（被包含）为 `document.documentElement`。

<<<<<<< HEAD
我们可以通过 `document.documentElement.getBoundingClientRect()` 来获取整个文档相对于窗口的坐标。`bottom` 属性将是文档末端的相对于窗口的坐标。

例如，如果整个 HTML 文档的高度是 `2000px`，那么：

```js
// 当我们在页面顶端时
// 相对于窗口 top = 0
=======
We can get window-relative coordinates of the whole document as `document.documentElement.getBoundingClientRect()`, the `bottom` property will be window-relative coordinate of the document bottom.

For instance, if the height of the whole HTML document is `2000px`, then:

```js
// when we're on the top of the page
// window-relative top = 0
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622
document.documentElement.getBoundingClientRect().top = 0

// 相对于窗口 bottom = 2000
// 如果文档太长，那么可能会远远超出窗口底部
document.documentElement.getBoundingClientRect().bottom = 2000
```

如果我们向下滚动 `500px`，那么：

```js
// 文档顶端在窗口之方 500px
document.documentElement.getBoundingClientRect().top = -500
// 文档末端相对于窗口近了 500px
document.documentElement.getBoundingClientRect().bottom = 1500
```

当我们滚动到文档末端时，假设窗口高度为 `600px`：


```js
<<<<<<< HEAD
// 文档顶端在窗口上方 -1400px
document.documentElement.getBoundingClientRect().top = -1400
// 文档末端相对于窗口坐标为 600px
document.documentElement.getBoundingClientRect().bottom = 600
```

请注意，`bottom` 不能为 `0`，因为它永远不会到达窗口顶部。`bottom` 坐标的最低限度是窗口高度（我们假设其为 `600`），我们无法再向上滚动了。

我们可以获得窗口的高度为 `document.documentElement.clientHeight`。

对于本任务，我们需要知道何时文档末端距窗口底部不超过 `100px`（即，如果窗口高度为 `600px`，则为 `600-700px`）。
=======
// document top is above the window 1400px
document.documentElement.getBoundingClientRect().top = -1400
// document bottom is below the window 600px
document.documentElement.getBoundingClientRect().bottom = 600
```

Please note that the `bottom` can't be `0`, because it never reaches the window top. The lowest limit of the `bottom` coordinate is the window height (we assumed it to be `600`), we can't scroll it any more up.

We can obtain the window height as `document.documentElement.clientHeight`.

For our task, we need to know when the document bottom is not no more than `100px` away from it (that is: `600-700px`, if the height is `600`).
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622

所以，函数如下：

```js
function populate() {
  while(true) {
    // 文档末端
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

<<<<<<< HEAD
    // 如果用户将页面滚动了足够远（文档末端距窗口底部 <100px）
    if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
      // 让我们添加更多数据
=======
    // if the user scrolled far enough (<100px to the end)
    if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
      // let's add more data
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622
      document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
    }
  }
}
```
