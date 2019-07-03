importance: 5

---

# 在元素中捕获链接

<<<<<<< HEAD
在所有包含 `id="contents"` 属性元素的链接（在触发单击事件时）询问用户是否真的想离开当前页面。 
=======
Make all links inside the element with `id="contents"` ask the user if they really want to leave. And if they don't then don't follow.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

就像这样：

[iframe height=100 border=1 src="solution"]

细节：

- 元素中的 HTML 可以随时动态加载或者重新生成，因此我们无法找到所有链接并将处理器放在它们身上。这里使用事件委托。
- 内容可能有嵌套标签。内部链接也是这样，比如 `<a href=".."><i>...</i></a>`。
