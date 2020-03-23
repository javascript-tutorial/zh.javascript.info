importance: 5

---

# 创建一个通知

编写一个函数 `showNotification(options)`：该函数创建一个带有给定内容的通知 `<div class="notification">`。该通知应该在 1.5 秒后自动消失。

参数：

```js
// shows an element with the text "Hello" near the right-top of the window
showNotification({
  top: 10, // 10px from the top of the window (by default 0px)
  right: 10, // 10px from the right edge of the window (by default 0px)
  html: "Hello!", // the HTML of notification
  className: "welcome" // an additional class for the div (optional)
});
```

[demo src="solution"]


使用 CSS 定位在给定的 top/right 坐标处显示元素。源文档已经提供了必要的样式。
