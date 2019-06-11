importance: 4

---

# 用回调函数加载 images

通常，图像在被创建时就会被加载，因此当我们在页面中添加 `<img>` 时，用户不会立即看到图像。浏览器首先会加载它。

我们可以像这样“提前”创建来立即显示图像：

```js
let img = document.createElement('img');
img.src = 'my.jpg';
```

浏览器开始加载图像然后保存在缓存中。之后，当相同图像出现在文档中时（无论怎样），它会立即显示。

**创建一个从 `source` 数组中加载所有图像，并在准备就绪时运行 `callback` 的 `preloadImages(sources, callback)` 函数。**

例如，这将在加载图像之后显示一个 `alert`：

```js
function loaded() {
  alert("Images loaded")
}

preloadImages(["1.jpg", "2.jpg", "3.jpg"], loaded);
```

如果出现错误，函数仍会认为图像已经“被加载”。

换句话说，当所有图像被加载或出现错误输出时，`callback` 就会被执行。

比如，当我们计划显示一个包含许多可滚动图像的图库，并希望确保所有的图像都被加载时，这个函数是非常有用的。

在源文档中，你可以找到指向测试图像的链接，以及检查它们是否已被加载的代码。它应该输出 `300`。
