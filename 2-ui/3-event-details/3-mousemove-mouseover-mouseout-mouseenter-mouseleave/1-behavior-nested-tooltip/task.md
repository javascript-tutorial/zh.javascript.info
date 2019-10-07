importance: 5

---

# 改进工具提示行为

<<<<<<< HEAD
编写一个带有 `data-tooltip` 属性元素提示工具的 JavaScript 函数。
=======
Write JavaScript that shows a tooltip over an element with the attribute `data-tooltip`. The value of this attribute should become the tooltip text.
>>>>>>> 71ff8f81b05e2438a3c56507888e06c528a71182

就像任务 <info:task/behavior-tooltip>，但这里可以嵌套带有注释的元素。下面显示了嵌套最深的工具提示。

<<<<<<< HEAD
比如：
=======
Only one tooltip may show up at the same time.

For instance:
>>>>>>> 71ff8f81b05e2438a3c56507888e06c528a71182

```html
<div data-tooltip="Here – is the house interior" id="house">
  <div data-tooltip="Here – is the roof" id="roof"></div>
  ...
  <a href="https://en.wikipedia.org/wiki/The_Three_Little_Pigs" data-tooltip="Read on…">Hover over me</a>
</div>
```

在 iframe 中的结果：

[iframe src="solution" height=300 border=1]
<<<<<<< HEAD

P.S. 提示：同一时间只显示一个工具提示。
=======
>>>>>>> 71ff8f81b05e2438a3c56507888e06c528a71182
