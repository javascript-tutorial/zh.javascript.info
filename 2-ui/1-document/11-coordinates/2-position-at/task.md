importance: 5

---

# 在元素旁显示一个 note

<<<<<<< HEAD
创建一个函数 `positionAt(anchor, position, elem)` 来定位 `elem`，具体取决于 `anchor` 元素附近的 `position`。

`position` 必须具有下列三个字符串中的一个：
- `"top"` — 将 `elem` 定位在 `anchor` 上方
- `"right"` — 将 `elem` 定位在 `anchor` 右侧
- `"bottom"` — 将 `elem` 定位在 `anchor` 下方

`position` 被用在函数 `showNote(anchor, position, html)` 内，该函数使用给定的 `html` 创建一个 "note" 元素，并将其显示在 `anchor` 附近的 `position` 处。

这是一个演示示例：
=======
Create a function `positionAt(anchor, position, elem)` that positions `elem`, depending on `position` near `anchor` element.

The `position` must be a string with any one of 3 values:
- `"top"` - position `elem` right above `anchor`
- `"right"` - position `elem` immediately at the right of `anchor`
- `"bottom"` - position `elem` right below `anchor`

It's used inside function `showNote(anchor, position, html)`, provided in the task source code, that creates a "note" element with given `html` and shows it at the given `position` near the `anchor`.

Here's the demo of notes:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

[iframe src="solution" height="350" border="1" link]
