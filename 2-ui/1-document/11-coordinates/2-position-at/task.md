importance: 5

---

# 在元素旁边显示一个注释

基于 `anchor` 元素的上边（`"top"`），右边（`"right"`）或者底部（`"bottom"`）的 `position`，创建一个 `positionAt(anchor, position, elem)` 函数来定位 `elem` 元素。

<<<<<<< HEAD
使用这个函数构建一个 `showNote(anchor, position, html)` 函数，它使用类 `"note"` 和文本 `html` 标签在 anchor 位置旁边显示一个元素。
=======
Call it inside the function `showNote(anchor, position, html)` that shows an element with the class `"note"` and the text `html` at the given position near the anchor.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

注释像下面这样显示：

[iframe src="solution" height="350" border="1" link]

附：在这个任务中注释元素应该会有 `position:fixed` CSS 配置。
