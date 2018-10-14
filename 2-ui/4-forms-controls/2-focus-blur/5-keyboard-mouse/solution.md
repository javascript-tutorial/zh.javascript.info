
我们可以使用 `mouse.onclick` 来处理点击事件，也可以使用 `position:fixed` 来让 id 为 mouse 的元素“可移动的”，然后使用 `mouse.onkeydown` 去处理点击方向键事件。

唯一的缺陷是 `keydown` 仅会触发在聚焦的元素上。所以我们需要为这个元素添加 `tabindex`。因为我们不可以改变 HTML，所以我们可以使用 `mouse.tabIndex` 属性来达到这个目的。

另外我们也可以使用 `mouse.onfocus` 代替 `mouse.onclick`。
