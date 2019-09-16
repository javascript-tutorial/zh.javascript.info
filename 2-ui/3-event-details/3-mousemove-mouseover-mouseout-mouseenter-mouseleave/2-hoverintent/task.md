importance: 5

---

# "Smart" 工具提示

<<<<<<< HEAD
编写一个函数，仅在访问者将鼠标**移动**到它上面而非**通过**它时，才会显示元素上的工具提示。

换句话说，如果访问者把鼠标移动到元素上，然后停下 —— 显示工具提示。如果访问者将鼠标快速移过元素，那就不需要显示，谁想要多余的内容呢？
=======
Write a function that shows a tooltip over an element only if the visitor moves the mouse *to it*, but not *through it*.

In other words, if the visitor moves the mouse to the element and stops there -- show the tooltip. And if they just moved the mouse through, then no need, who wants extra blinking?
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

从技术上说，我们可以测量鼠标在元素上的经过速度，如果速度很慢，那么我们认为它**在元素上**并显示工具提示，如果速度太快 —— 那么我们就忽略它。

<<<<<<< HEAD
为它创建一个通用对象 `new HoverIntent(options)`，加上 `options`：

- `elem` —— 要跟踪的元素。
- `over` —— 如果鼠标缓慢地移动元素，调用该函数。
- `out` —— 当鼠标离开元素时，调用函数（如果 `over` 被调用过了）。
=======
Make a universal object `new HoverIntent(options)` for it.

Its `options`:
- `elem` -- element to track.
- `over` -- a function to call if the mouse came to the element: that is, it moves slowly or stopped over it.
- `out` -- a function to call when the mouse leaves the element (if `over` was called).
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

在工具提示中使用此类对象的示例：

```js
// 工具提示样本
let tooltip = document.createElement('div');
tooltip.className = "tooltip";
tooltip.innerHTML = "Tooltip";

// 对象将跟踪鼠标，并调用 over/out
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

如果鼠标移动速度超过 "clock"，那么不会发生任何事件，如果速度很慢或者在它们上面停下来，那么就会有一个工具提示。

请注意：当光标在 clock 子元素之间移动时，工具提示不会“一闪而过（blink）”。
