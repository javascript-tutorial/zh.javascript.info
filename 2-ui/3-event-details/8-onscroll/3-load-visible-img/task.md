importance: 4

---

# 加载可视化图像

<<<<<<< HEAD
假设我们有一个速度较慢并希望节省自己移动流量客户。
=======
Let's say we have a slow-speed client and want to save their mobile traffic.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

为此，我们决定不立即显示图像，而是将其替换为占位符，如下所示：

```html
<img *!*src="placeholder.svg"*/!* width="128" height="128" *!*data-src="real.jpg"*/!*>
```

因此，起初的所有图像都是 `placeholder.svg`。当页面滚动到用户可以看到图像位置时 —— 我们就会将 `src` 更改为 `data-src` 的 `src`，然后加载图像。

这是 `iframe` 中的一个示例：

[iframe src="solution"]

滚动它可以看到图像的“按需”加载。

要求：
- 当页面被加载时，屏幕上的图像应该在滚动之前立即加载。
- 某些图像可能很常规，没有 `data-src` 属性。代码不能改动它们。
- 一旦图像被加载，它就不应该在滚动时重新加载。

P.S. 如果你有能力，可以创建一个更高级的解决方案，来“预加载”位于当前（之后）位置的图像。

P.P.S. 只有垂直滚动会被处理，水平滚动则不会。
