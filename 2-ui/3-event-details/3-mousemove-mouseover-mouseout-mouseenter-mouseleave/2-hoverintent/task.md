importance: 5

---

# “智能”工具提示

编写一个函数，该函数仅在访问者将鼠标 **移至** 元素而不是 **移过** 元素的情况下，在该元素上显示工具提示。

换句话说，如果访问者将鼠标移至元素上，并停下来 —— 显示工具提示。如果他们只是将鼠标移过元素，那就没必要显示，谁想要多余的闪烁呢？

从技术上说，我们可以测量元素上的鼠标移动速度，如果速度很慢，那么我们就假定它 **在元素上**，并显示工具提示，如果速度很快 —— 那么我们就忽略它。

为此，我们创建一个通用对象 `new HoverIntent(options)`。

其 `options`：
- `elem` —— 要跟踪的元素。
- `over` —— 鼠标移动到元素上时要调用的函数：即，鼠标在元素上的移动速度很慢，或者停在该元素上。
- `out` —— 当鼠标离开元素时调用的函数（如果 `over` 已经被调用过了）。

在工具提示中使用此类对象的示例：

```js
// 一个简单的工具提示
let tooltip = document.createElement('div');
tooltip.className = "tooltip";
tooltip.innerHTML = "Tooltip";

// 该对象将跟踪鼠标，并调用 over/out
new HoverIntent({
  elem,
  over() {
    tooltip.style.left = elem.getBoundingClientRect().left + 'px';
    tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
    document.body.append(tooltip);
  },
  out() {
    tooltip.remove();
  }
});
```

示例：

[iframe src="solution" height=140]

如果你将鼠标快速地从“时钟”上移动过去，那么什么都不会发生，如果你使用鼠标在“时钟”上慢慢移动，或者停在“时钟”上，则会出现一个工具提示。

请注意：当鼠标指针在“时钟”的元素之间移动时，工具提示不会“闪烁”
