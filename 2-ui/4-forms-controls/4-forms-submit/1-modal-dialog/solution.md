模态框窗口可以使用一个半透明的 `<div id="cover-div">` 来覆盖整个窗口， 就像这样：

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

由于 `<div>` 遮盖了所有的元素，所以它能获取到所有的点击事件，而它下面的页面就不能了。

我们也可以设置 `body.style.overflowY='hidden'` 来阻止页面的滚动。

表单元素不应该在 `<div>` 内部，而应是并列关系，因为我们不想让表单也有 `opacity` 属性。
