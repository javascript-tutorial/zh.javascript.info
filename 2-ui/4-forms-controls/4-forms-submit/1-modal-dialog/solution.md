可以使用一个覆盖整个窗口的半透明 `<div id="cover-div">` 来实现模态框窗口，如下所示：

```css
#cover-div {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.3;
}
```

由于 `<div>` 遮盖了所有的元素，所以它会获取到所有的点击，而它下面的元素就无法获取这些点击了。

我们也可以设置 `body.style.overflowY='hidden'` 来阻止页面的滚动。

表单元素不应该在 `<div>` 中，而应在它下边，因为我们不想让表单具有 `opacity` 属性。
