importance: 5

---

# 工具提示行为

编写工具提示（tooltip）行为的 JavaScript 代码。

当鼠标在带有 `data-tooltip` 的元素的上方时，工具提示应显示在其上方，当鼠标移开时，工具提示将隐藏起来。

带有注释的 HTML 示例：
```html
<button data-tooltip="the tooltip is longer than the element">Short button</button>
<button data-tooltip="HTML<br>tooltip">One more button</button>
```

运行效果如下：

[iframe src="solution" height=200 border=1]

在此任务中，我们假设所有具有 `data-tooltip` 的元素中都只有文本。尚无嵌套标签。

详情：

- 元素和工具提示之间的距离应为 `5px`。
- 如果可能，工具提示应相对于元素居中。
- 工具提示不应与窗口边缘交叉。通常，它应该在元素的上方，但是如果元素位于页面顶部，并且没有工具提示的空间，则应该在元素的下方。
- 工具提示的内容在 `data-tooltip` 属性中给定。它可以是任意 HTML。

在这里你将需要两个事件：
- `mouseover` 当鼠标指针出现在元素上方时触发。
- `mouseout` 当鼠标指针离开元素时触发。

请使用事件委托：在 `document` 上设置两个处理程序，以跟踪带有 `data-tooltip` 的元素中的所有 "over" 和 "out"，并从那里管理工具提示。

在实现了该行为后，即使不熟悉 JavaScript 的人也可以添加带注释的元素。

P.S. 一次只能显示一个工具提示。
