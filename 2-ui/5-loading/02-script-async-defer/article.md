
# 脚本：async，defer

现代的网站中，脚本往往比 HTML 更“重”：它们的大小通常更大，处理时间也更长。

当浏览器加载 HTML 时遇到 `<script>...</script>` 标签，浏览器就不能继续构建 DOM。它必须立刻执行此脚本。对于外部脚本 `<script src="..."></script>` 也是一样的：浏览器必须等脚本下载完，并执行结束，之后才能继续处理剩余的页面。

这会导致两个重要的问题：

1. 脚本不能访问到位于它们下面的 DOM 元素，因此，脚本无法给它们添加处理程序等。
2. 如果页面顶部有一个笨重的脚本，它会“阻塞页面”。在该脚本下载并执行结束前，用户都不能看到页面内容：

```html run height=100
<p>...content before script...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- This isn't visible until the script loads -->
<p>...content after script...</p>
```

这里有一些解决办法。例如，我们可以把脚本放在页面底部。此时，它可以访问到它上面的元素，并且不会阻塞页面显示内容：

```html
<body>
  ...all content is above the script...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

但是这种解决方案远非完美。例如，浏览器只有在下载了完整的 HTML 文档之后才会注意到该脚本（并且可以开始下载它）。对于长的 HTML 文档来说，这样可能会造成明显的延迟。

这对于使用高速连接的人来说，这不值一提，他们不会感受到这种延迟。但是这个世界上仍然有很多地区的人们所使用的网络速度很慢，并且使用的是远非完美的移动互联网连接。

幸运的是，这里有两个 `<script>` 特性（attribute）可以为我们解决这个问题：`defer` 和 `async`。

## defer

`defer` 特性告诉浏览器不要等待脚本。相反，浏览器将继续处理 HTML，构建 DOM。脚本会“在后台”下载，然后等 DOM 构建完成后，脚本才会执行。

这是与上面那个相同的示例，但是带有 `defer` 特性：

```html run height=100
<p>...content before script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- 立即可见 -->
<p>...content after script...</p>
```

换句话说：

- 具有 `defer` 特性的脚本不会阻塞页面。
- 具有 `defer` 特性的脚本总是要等到 DOM 解析完毕，但在 `DOMContentLoaded` 事件之前执行。

下面这个示例演示了上面所说的第二句话：

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!"));
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...content after scripts...</p>
```

1. 页面内容立即显示。
2. `DOMContentLoaded` 事件处理程序等待具有 `defer` 特性的脚本执行完成。它仅在脚本下载且执行结束后才会被触发。

**具有 `defer` 特性的脚本保持其相对顺序，就像常规脚本一样。**

假设，我们有两个具有 `defer` 特性的脚本：`long.js` 在前，`small.js` 在后。

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

浏览器扫描页面寻找脚本，然后并行下载它们，以提高性能。因此，在上面的示例中，两个脚本是并行下载的。`small.js` 可能会先下载完成。

……但是，`defer` 特性除了告诉浏览器“不要阻塞页面”之外，还可以确保脚本执行的相对顺序。因此，即使 `small.js` 先加载完成，它也需要等到 `long.js` 执行结束才会被执行。

当我们需要先加载 JavaScript 库，然后再加载依赖于它的脚本时，这可能会很有用。

```smart header="`defer` 特性仅适用于外部脚本"
如果 `<script>` 脚本没有 `src`，则会忽略 `defer` 特性。
```

## async

`async` 特性与 `defer` 有些类似。它也能够让脚本不阻塞页面。但是，在行为上二者有着重要的区别。

`async` 特性意味着脚本是完全独立的：

- 浏览器不会因 `async` 脚本而阻塞（与 `defer` 类似）。
- 其他脚本不会等待 `async` 脚本加载完成，同样，`async` 脚本也不会等待其他脚本。
- `DOMContentLoaded` 和异步脚本不会彼此等待：
    - `DOMContentLoaded` 可能会发生在异步脚本之前（如果异步脚本在页面完成后才加载完成）
    - `DOMContentLoaded` 也可能发生在异步脚本之后（如果异步脚本很短，或者是从 HTTP 缓存中加载的）

换句话说，`async` 脚本会在后台加载，并在加载就绪时运行。DOM 和其他脚本不会等待它们，它们也不会等待其它的东西。`async` 脚本就是一个会在加载完成时执行的完全独立的脚本。就这么简单，现在明白了吧？

下面是一个类似于我们在讲 `defer` 时所看到的例子：`long.js` 和 `small.js` 两个脚本，只是现在 `defer` 变成了 `async`。

它们不会等待对方。先加载完成的（可能是 `small.js`）—— 先执行：

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...content after scripts...</p>
```

- 页面内容立刻显示出来：加载写有 `async` 的脚本不会阻塞页面渲染。
- `DOMContentLoaded` 可能在 `async` 之前或之后触发，不能保证谁先谁后。
- 较小的脚本 `small.js` 排在第二位，但可能会比 `long.js` 这个长脚本先加载完成，所以 `small.js` 会先执行。虽然，可能是 `long.js` 先加载完成，如果它被缓存了的话，那么它就会先执行。换句话说，异步脚本以“加载优先”的顺序执行。

当我们将独立的第三方脚本集成到页面时，此时采用异步加载方式是非常棒的：计数器，广告等，因为它们不依赖于我们的脚本，我们的脚本也不应该等待它们：

```html
<!-- Google Analytics 脚本通常是这样嵌入页面的 -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

## 动态脚本

此外，还有一种向页面添加脚本的重要的方式。

我们可以使用 JavaScript 动态地创建一个脚本，并将其附加（append）到文档（document）中：

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

当脚本被附加到文档 `(*)` 时，脚本就会立即开始加载。

**默认情况下，动态脚本的行为是“异步”的。**

也就是说：
- 它们不会等待任何东西，也没有什么东西会等它们。
- 先加载完成的脚本先执行（“加载优先”顺序）。

如果我们显式地设置了 `script.async=false`，则可以改变这个规则。然后脚本将按照脚本在文档中的顺序执行，就像 `defer` 那样。

在下面这个例子中，`loadScript(src)` 函数添加了一个脚本，并将 `async` 设置为了 `false`。

因此，`long.js` 总是会先执行（因为它是先被添加到文档的）：

```js run
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// long.js 先执行，因为代码中设置了 async=false
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```

如果没有 `script.async=false`，脚本则将以默认规则执行，即加载优先顺序（`small.js` 大概会先执行）。

同样，和 `defer` 一样，如果我们要加载一个库和一个依赖于它的脚本，那么顺序就很重要。


## 总结

`async` 和 `defer` 有一个共同点：加载这样的脚本都不会阻塞页面的渲染。因此，用户可以立即阅读并了解页面内容。

但是，它们之间也存在一些本质的区别：

|         | 顺序 | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | **加载优先顺序**。脚本在文档中的顺序不重要 —— 先加载完成的先执行 | 不相关。可能在文档加载完成前加载并执行完毕。如果脚本很小或者来自于缓存，同时文档足够长，就会发生这种情况。 |
| `defer` | **文档顺序**（它们在文档中的顺序） | 在文档加载和解析完成之后（如果需要，则会等待），即在 `DOMContentLoaded` 之前执行。 |

在实际开发中，`defer` 用于需要整个 DOM 的脚本，和/或脚本的相对执行顺序很重要的时候。

`async` 用于独立脚本，例如计数器或广告，这些脚本的相对执行顺序无关紧要。

```warn header="没有脚本的页面应该也是可用的"
请注意：如果你使用的是 `defer` 或 `async`，那么用于将在脚本加载完成 **之前** 先看到页面。

在这种情况下，某些图形组件可能尚未初始化完成。

因此，请记得添加一个“正在加载”的提示，并禁用尚不可用的按钮。以让用户可以清楚地看到，他现在可以在页面上做什么，以及还有什么是正在准备中的。
```
