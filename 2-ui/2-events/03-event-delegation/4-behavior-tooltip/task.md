importance: 5

---

# 工具提示行为

为工具提示行为编写 JavaScript 代码。

当鼠标移入带有 `data-tooltip` 的元素时，工具提示应该出现在它上面，当它移出时，就隐藏起来。

带有注释的 HTML 示例：
```html
<button data-tooltip="the tooltip is longer than the element">Short button</button>
<button data-tooltip="HTML<br>tooltip">One more button</button>
```

应该像这样运行：

[iframe src="solution" height=200 border=1]

在这个任务中，我们假设所有具有 `data-tooltip` 的元素中只有文本。没有嵌套标签。

详细资料：

- 工具提示不应跨窗口边缘。通常，它应该在元素的上方，但是如果元素位于页面顶部，并且没有工具提示的空间，那么在它下面。
- 工具提示在 `data-tooltip` 属性中给定。它可以是任意 HTML。

你需要两个时间：
- `mouseover` 当指针出现在元素上时触发。
- `mouseout` 当指针移出元素时触发。

请使用事件委托：在 `document` 上设置两个处理器，以跟踪带有 `data-tooltip` 的元素中所有的 “over” 和 “out”，并从那里管理工具提示。

在实现了该行为后，即使是不熟悉 JavaScript 的人也可以添加带注释的元素。

P.S. 为了保持自然和简单：一次只能出现一个工具提示。
