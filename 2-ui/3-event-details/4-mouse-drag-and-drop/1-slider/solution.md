正如我们从 HTML/CSS 中所看到的，滑动条就是一个带有彩色背景的 `<div>`，其中包含一个滑块 —— 另一个具有 `position:relative` 的 `<div>`。

为了对滑块进行定位，我们使用 `position:relative` 来提供相对于其父元素的坐标，在这儿它比 `position:absolute` 更方便。

然后我们通过限制宽度来实现仅水平方向的拖放。
