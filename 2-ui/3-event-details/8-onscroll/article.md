# 滚动

滚动事件允许在页面或元素上滚动时作出反应。我们可以在这里做一些有用的事情。

比如：
- 根据用户在文档中的位置显示/隐藏其他控件或信息。
- 当用户滚动到页面末尾时加载更多的数据。

下面是一个显示当前滚动的小函数：

```js autorun
window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
});
```

```online
动作：

Current scroll = <b id="showScroll">scroll the window</b>
```

`scroll` 事件在 `window` 和可滚动元素上都可以运行。

## 防止滚动

我们怎样让某些东西不可滚动呢？我们不能在 `onscroll` 监听者中通过使用 `event.preventDefault()` 来阻止滚动，因为它在滚动发生**之后**才触发。

但我们可以在导致滚动的事件上使用 `event.preventDefault()` 来阻止滚动。

例如：
- `wheel` 事件 —— 鼠标滚轮（“滚动”触控板也会生成它）。
- `key:pageUp` 和 `key:pageDown` 的 `keydown` 事件。

有时可能会有帮助，但还有很多滚动方式，所以很难处理它们。因此，使用 CSS 让一些东西不可滚动更为可靠，比如 `overflow` 属性。

这里有几个你可以完成的练习，你也可以看它们关于 `onscroll` 的应用。
