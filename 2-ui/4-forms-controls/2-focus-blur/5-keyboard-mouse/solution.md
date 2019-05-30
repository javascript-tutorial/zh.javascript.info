
<<<<<<< HEAD
我们可以使用 `mouse.onclick` 来处理点击事件，并通过 `position:fixed` 让元素“可移动”，然后使用 `mouse.onkeydown` 去处理点击方向键事件。
=======
We can use `mouse.onclick` to handle the click and make the mouse "moveable" with `position:fixed`, then `mouse.onkeydown` to handle arrow keys.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

唯一的缺陷是 `keydown` 仅会触发在聚焦的元素上。所以我们需要为这个元素添加 `tabindex`。因为我们不可以改变 HTML，所以我们可以使用 `mouse.tabIndex` 属性来达到这个目的。

另外我们也可以使用 `mouse.onfocus` 代替 `mouse.onclick`。
