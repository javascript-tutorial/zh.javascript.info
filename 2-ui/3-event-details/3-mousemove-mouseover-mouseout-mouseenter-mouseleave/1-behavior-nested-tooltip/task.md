importance: 5

---

# 改进的工具提示行为

编写 JavaScript，在带有 `data-tooltip` 特性（attribute）的元素上显示一个工具提示。该特性的值应该成为工具提示的文本。

与任务 <info:task/behavior-tooltip> 类似，但这里可以嵌套带有注解（annotated）的元素。并且显示的是嵌套最深的工具提示。

同一时间只能显示一个工具提示。

例如：

```html
<div data-tooltip="这是房子的内部" id="house">
  <div data-tooltip="这里是屋顶" id="roof"></div>
  ...
  <a href="https://en.wikipedia.org/wiki/The_Three_Little_Pigs" data-tooltip="Read on…">鼠标悬浮在我上</a>
</div>
```

在 iframe 中的结果：

[iframe src="solution" height=300 border=1]
