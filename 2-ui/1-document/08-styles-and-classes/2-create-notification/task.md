importance: 5

---

# 创建一个通知

编写一个函数 `showNotification(options)`：该函数创建一个带有给定内容的通知 `<div class="notification">`。该通知应该在 1.5 秒后自动消失。

参数：

```js
// 在窗口的右上角附近显示一个带有文本 "Hello" 的元素
showNotification({
  top: 10, // 距窗口顶部 10px（默认为 0px）
  right: 10, // 距窗口右边缘 10px（默认为 0px）
  html: "Hello!", // 通知中的 HTML
  className: "welcome" // div 的附加类（可选）
});
```

[demo src="solution"]


使用 CSS 定位在给定的 top/right 坐标处显示元素。源文档已经提供了必要的样式。
