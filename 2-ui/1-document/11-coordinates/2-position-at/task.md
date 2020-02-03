importance: 5

---

# 在元素旁边显示一个注释

<<<<<<< HEAD
基于 `anchor` 元素的上边（`"top"`），右边（`"right"`）或者底部（`"bottom"`）的 `position`，创建一个 `positionAt(anchor, position, elem)` 函数来定位 `elem` 元素。

使用这个函数构建一个 `showNote(anchor, position, html)` 函数，它使用类 `"note"` 和文本 `html` 标签在 anchor 位置旁边显示一个元素。

注释像下面这样显示：
=======
Create a function `positionAt(anchor, position, elem)` that positions `elem`, depending on `position` near `anchor` element.

The `position` must be a string with any one of 3 values:
- `"top"` - position `elem` right above `anchor`
- `"right"` - position `elem` immediately at the right of `anchor`
- `"bottom"` - position `elem` right below `anchor`

It's used inside function `showNote(anchor, position, html)`, provided in the task source code, that creates a "note" element with given `html` and shows it at the given `position` near the `anchor`.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

Here's the demo of notes:

<<<<<<< HEAD
附：在这个任务中注释元素应该会有 `position:fixed` CSS 配置。
=======
[iframe src="solution" height="350" border="1" link]
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
