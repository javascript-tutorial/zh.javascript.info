importance: 5

---

# 创建通知

<<<<<<< HEAD
编写 `showNotification(options)` 通知函数：`<div class="notification">` 包含给定内容。通知应该在 1.5 秒后自动消失。
=======
Write a function `showNotification(options)` that creates a notification: `<div class="notification">` with the given content. The notification should automatically disappear after 1.5 seconds.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

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


使用 CSS 定位在给定 top/right 坐标处显示元素。源文档已经提供了必要的样式。
