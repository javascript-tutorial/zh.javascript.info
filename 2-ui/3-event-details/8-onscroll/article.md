# 滚动

`scroll` 事件允许对页面或元素滚动作出反应。我们可以在这里做一些有用的事情。

例如：
- 根据用户在文档中的位置显示/隐藏其他控件或信息。
- 当用户向下滚动到页面末端时加载更多数据。

这是一个显示当前滚动的小函数：

```js autorun
window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
});
```

```online
在运行中：

Current scroll = <b id="showScroll">scroll the window</b>
```

`scroll` 事件在 `window` 和可滚动元素上都可以运行。

## 防止滚动

我们如何使某些东西变成不可滚动？

我们不能通过在 `onscroll` 监听器中使用 `event.preventDefault()` 来阻止滚动，因为它会在滚动发生 **之后** 才触发。

但是我们可以在导致滚动的事件上，例如在 `key:pageUp` 和 `key:pageDown` 的 `keydown` 事件上，使用 `event.preventDefault()` 来阻止滚动。

如果我们向这些事件中添加事件处理程序，并向其中添加 `event.preventDefault()`，那么滚动就不会开始。

启动滚动的方式有很多，使用 CSS 的 `overflow` 属性更加可靠。

有几个练习题，你可以解决或者浏览以下几个任务来看一下 `onscroll` 的应用。
