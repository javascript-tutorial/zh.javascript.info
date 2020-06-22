
<<<<<<< HEAD
我们可以使用 `mouse.onclick` 来处理点击，并将老鼠设置为 `position:fixed`，然后使用 `mouse.onkeydown` 来处理键盘的方向键。
=======
We can use `mouse.onclick` to handle the click and make the mouse "moveable" with `position:fixed`, then `mouse.onkeydown` to handle arrow keys.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

唯一的缺陷是 `keydown` 仅会在聚焦的元素上触发。因此，我们需要向元素添加 `tabindex`。因为我们禁止更改 HTML，所以我们可以使用 `mouse.tabIndex` 属性。

P.S. 我们也可以使用 `mouse.onfocus` 代替 `mouse.onclick`。
