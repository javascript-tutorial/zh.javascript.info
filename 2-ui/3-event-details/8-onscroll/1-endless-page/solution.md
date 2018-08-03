解决方案的核心是在页面结束时向页面添加更多日期（或者在实际中加载更多的内容）。

我们可以立即调用它，然后将其添加为 `window.onscroll` 处理器。

最重要的问题是：“如何检测到页面被滚动到了底部？”

我们使用窗口相对坐标

文档在 `<html>` 标记中表示（并包含），即 `document.documentElement`。

我们可以获取整个文档的窗口相对坐标作为 `document.documentElement.getBoundingClientRect()`。`bottom` 属性将是文档结束的窗口相对坐标。

例如，如果整个 HTML 文档的高度是 2000px，那么：

```js
// 当我们在页面顶部时
//窗口相对顶部 = 0
document.documentElement.getBoundingClientRect().top = 0

// 窗口相对底部 = 2000
// 文档很长，所以可能会远远超出窗口底部
document.documentElement.getBoundingClientRect().bottom = 2000
```

如果我们向下滚动 `500px`，那么：

```js
// 文档在窗口上方 500px
document.documentElement.getBoundingClientRect().top = -500
// 文档底部 500px
document.documentElement.getBoundingClientRect().bottom = 1500
```

当我们滚动到结束时，假设窗口高度为 `600px`：


```js
// 文档顶部在窗口500 px 之上
document.documentElement.getBoundingClientRect().top = -1400
// 文档底部为 500px 
document.documentElement.getBoundingClientRect().bottom = 600
```

请注意，底部不是 0，因为它永远不会到达窗口顶部。底部坐标的最低限度是窗口高度，我们不能再向上滚动了。

窗口的高度是 `document.documentElement.clientHeight`。

我们希望文档底部不超过 `100px`。

这是函数：

```js
function populate() {
  while(true) {
    // 文档底部
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    // 如果它大于窗口高度 100px，那么我们就不会在页面后面
    // （查看上述示例，大的底部意味着我们需要滚动得更多）
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

    // 否则，我们会添加更多数据
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}
```
