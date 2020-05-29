importance: 5

---

# 捕获元素中的链接

<<<<<<< HEAD
使所有包含 `id="contents"` 的元素内的链接询问用户是否真的要离开。如果用户不想离开，那就不离开。
=======
Make all links inside the element with `id="contents"` ask the user if they really want to leave. And if they don't then don't follow.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

像这样：

[iframe height=100 border=1 src="solution"]

细节：

<<<<<<< HEAD
- 元素内的 HTML 可以被随时动态加载或重新生成，因此，我们无法找到所有链接并为其添加处理程序。这里使用事件委托。
- 内容中可能有嵌套的标签。链接中也是，例如 `<a href=".."><i>...</i></a>`。
=======
- HTML inside the element may be loaded or regenerated dynamically at any time, so we can't find all links and put handlers on them. Use event delegation.
- The content may have nested tags. Inside links too, like `<a href=".."><i>...</i></a>`.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
