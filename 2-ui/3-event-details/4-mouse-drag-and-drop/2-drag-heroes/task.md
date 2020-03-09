importance: 5

---

# 在领域周围拖动 superhero

这个任务可以帮助你检查对拖放和 DOM 一些方面的理解程度。

使所有元素都具有类 `draggable` —— 可拖。就像章节里的球。

要求：

<<<<<<< HEAD
- 使用事件委托来跟踪拖动的开始：`document` 用于 `mousedown` 的单个处理器。
- 如果将元素拖动到窗口的顶部/底部 —— 页面就会允许进一步的向上/向下滚动。
- 没有水平滚动。
- 即使鼠标迅速移动，可拖动的元素也不应离开窗口。
=======
- Use event delegation to track drag start: a single event handler on `document` for `mousedown`.
- If elements are dragged to top/bottom window edges -- the page scrolls up/down to allow further dragging.
- There is no horizontal scroll (this makes the task a bit simpler, adding it is easy).
- Draggable elements or their parts should never leave the window, even after swift mouse moves.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

这个示例太大了，不适合放在这里，但这里有相应的链接。

[demo src="solution"]
