要拖动元素，我们可以使用 `position:fixed`，它使坐标更易于管理。最后，我们应该将其切换回 `position:absolute`，以使元素放置到文档中。

当坐标位于窗口顶端/底端时，我们使用 `window.scrollTo` 来滚动它。

更多细节请见代码注释。
