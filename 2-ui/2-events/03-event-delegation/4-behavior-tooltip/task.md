importance: 5

---

# 提示工具行为

为提示工具行为编写 JavaScript 代码。

当鼠标移入带有 `data-tooltip` 的元素时,提示工具应该出现在它上面，移出时则隐藏起来

带有注释的 HTML 示例：
```html
<button data-tooltip="the tooltip is longer than the element">Short button</button>
<button data-tooltip="HTML<br>tooltip">One more button</button>
```

运行结果如下：

[iframe src="solution" height=200 border=1]

<<<<<<< HEAD
在这个任务中，我们假设所有具有 `data-tooltip` 的元素中只有文本。没有嵌套标签。
=======
In this task we assume that all elements with `data-tooltip` have only text inside. No nested tags (yet).
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

详细资料：

- 提示工具不应超出窗口边缘。通常，它应该在元素的上方，但是如果元素位于页面顶部，并且没有提示工具的空间，则在其下面。
- 提示工具由 `data-tooltip` 属性中指定。它可以是任意 HTML。

你需要两个事件：
- `mouseover` 当指针出现在元素上时触发。
- `mouseout` 当指针移出元素时触发。

请使用事件委托：在 `document` 上设置两个处理器，以跟踪带有 `data-tooltip` 的元素中所有的 "over" 和 "out"，并从那里管理提示工具。

在实现了该行为后，即使是不熟悉 JavaScript 的人也可以添加带注释的元素。

<<<<<<< HEAD
P.S. 为了保持自然和简单：一次只能出现一个提示工具。
=======
P.S. Only one tooltip may show up at a time.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477
