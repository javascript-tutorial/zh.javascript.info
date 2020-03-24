解决方案实际上很简单：

- 在 `.note` 的 CSS 中，使用 `position:absolute` 代替 `position:fixed`。
- 使用在 <info:coordinates> 一章中所讲的函数 [getCoords()](info:coordinates#getCoords) 来获取相对于文档的坐标。
