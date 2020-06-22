
<<<<<<< HEAD
# 脚本：async，defer

现代的网站中，脚本往往比 HTML 更“重”：它们的大小通常更大，处理时间也更长。

当浏览器加载 HTML 时遇到 `<script>...</script>` 标签，浏览器就不能继续构建 DOM。它必须立刻执行此脚本。对于外部脚本 `<script src="..."></script>` 也是一样的：浏览器必须等脚本下载完，并执行结束，之后才能继续处理剩余的页面。

这会导致两个重要的问题：

1. 脚本不能访问到位于它们下面的 DOM 元素，因此，脚本无法给它们添加处理程序等。
2. 如果页面顶部有一个笨重的脚本，它会“阻塞页面”。在该脚本下载并执行结束前，用户都不能看到页面内容：
=======
# Scripts: async, defer

In modern websites, scripts are often "heavier" than HTML: their download size is larger, and processing time is also longer.

When the browser loads HTML and comes across a `<script>...</script>` tag, it can't continue building the DOM. It must execute the script right now. The same happens for external scripts `<script src="..."></script>`: the browser must wait until the script downloads, execute it, and only after process the rest of the page.

That leads to two important issues:

1. Scripts can't see DOM elements below them, so they can't add handlers etc.
2. If there's a bulky script at the top of the page, it "blocks the page". Users can't see the page content till it downloads and runs:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```html run height=100
<p>...content before script...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- This isn't visible until the script loads -->
<p>...content after script...</p>
```

<<<<<<< HEAD
这里有一些解决办法。例如，我们可以把脚本放在页面底部。此时，它可以访问到它上面的元素，并且不会阻塞页面显示内容：
=======
There are some workarounds to that. For instance, we can put a script at the bottom of the page. Then it can see elements above it, and it doesn't block the page content from showing:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```html
<body>
  ...all content is above the script...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

<<<<<<< HEAD
但是这种解决方案远非完美。例如，浏览器只有在下载了完整的 HTML 文档之后才会注意到该脚本（并且可以开始下载它）。对于长的 HTML 文档来说，这样可能会造成明显的延迟。

这对于使用高速连接的人来说，这不值一提，他们不会感受到这种延迟。但是这个世界上仍然有很多地区的人们所使用的网络速度很慢，并且使用的是远非完美的移动互联网连接。

幸运的是，这里有两个 `<script>` 特性（attribute）可以为我们解决这个问题：`defer` 和 `async`。

## defer

`defer` 特性告诉浏览器它应该继续处理页面，并“在后台”下载脚本，然后等页面加载完成后，再执行此脚本。

这是与上面那个相同的示例，但是带有 `defer` 特性：
=======
But this solution is far from perfect. For example, the browser notices the script (and can start downloading it) only after it downloaded the full HTML document. For long HTML documents, that may be a noticeable delay.

Such things are invisible for people using very fast connections, but many people in the world still have slow internet speeds and use a far-from-perfect mobile internet connection.

Luckily, there are two `<script>` attributes that solve the problem for us: `defer` and `async`.

## defer

The `defer` attribute tells the browser that it should go on working with the page, and load the script "in background", then run the script when it loads.

Here's the same example as above, but with `defer`:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```html run height=100
<p>...content before script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<<<<<<< HEAD
<!-- 立即可见 -->
<p>...content after script...</p>
```

- 具有 `defer` 特性的脚本不会阻塞页面。
- 具有 `defer` 特性的脚本总是要等到 DOM 解析完毕，但在 `DOMContentLoaded` 事件之前执行。

下面这个示例演示了这一过程：
=======
<!-- visible immediately -->
<p>...content after script...</p>
```

- Scripts with `defer` never block the page.
- Scripts with `defer` always execute when the DOM is ready, but before `DOMContentLoaded` event.

The following example demonstrates that:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!")); // (2)
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...content after scripts...</p>
```

<<<<<<< HEAD
1. 页面内容立即显示。
2. `DOMContentLoaded` 等待具有 `defer` 特性的脚本执行完成。`DOMContentLoaded` 仅在脚本 `(2)` 下载且执行结束后才会被触发。

具有 `defer` 特性的脚本保持其相对顺序，就像常规脚本一样。

因此，如果我们有一个长脚本在前，一个短脚本在后，那么后者就会等待前者。
=======
1. The page content shows up immediately.
2. `DOMContentLoaded` waits for the deferred script. It only triggers when the script `(2)` is downloaded and executed.

Deferred scripts keep their relative order, just like regular scripts.

So, if we have a long script first, and then a smaller one, then the latter one waits.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

<<<<<<< HEAD
```smart header="短脚本先下载完成，但是后执行"
浏览器扫描页面寻找脚本，然后并行下载它们，以提高性能。因此，在上面的示例中，两个脚本是并行下载的。`small.js` 可能会先下载完成。

但是规范要求脚本按照文档顺序执行，因此，它需要等到 `long.js` 执行结束才会被执行。
```

```smart header="`defer` 特性仅适用于外部脚本"
如果 `<script>` 脚本没有 `src`，则会忽略 `defer` 特性。
=======
```smart header="The small script downloads first, runs second"
Browsers scan the page for scripts and download them in parallel, to improve performance. So in the example above both scripts download in parallel. The `small.js` probably makes it first.

But the specification requires scripts to execute in the document order, so it waits for `long.js` to execute.
```

```smart header="The `defer` attribute is only for external scripts"
The `defer` attribute is ignored if the `<script>` tag has no `src`.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
```


## async

<<<<<<< HEAD
`async` 特性意味着脚本是完全独立的：

- 页面不会等待异步脚本，它会继续处理并显示页面内容。
- `DOMContentLoaded` 和异步脚本不会彼此等待：
    - `DOMContentLoaded` 可能会发生在异步脚本之前（如果异步脚本在页面完成后才加载完成）
    - `DOMContentLoaded` 也可能发生在异步脚本之后（如果异步脚本很短，或者是从 HTTP 缓存中加载的）
- 其他脚本不会等待 `async` 脚本加载完成，同样，`async` 脚本也不会等待其他脚本。


因此，如果我们有几个 `async` 脚本，它们可能按任意次序执行。总之是先加载完成的就先执行：
=======
The `async` attribute means that a script is completely independent:

- The page doesn't wait for async scripts, the contents are processed and displayed.
- `DOMContentLoaded` and async scripts don't wait for each other:
    - `DOMContentLoaded` may happen both before an async script (if an async script finishes loading after the page is complete)
    - ...or after an async script (if an async script is short or was in HTTP-cache)
- Other scripts don't wait for `async` scripts, and `async` scripts don't wait for them.


So, if we have several `async` scripts, they may execute in any order. Whatever loads first -- runs first:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...content after scripts...</p>
```

<<<<<<< HEAD
1. 页面内容立刻显示出来：`async` 脚本不会阻塞页面。
2. `DOMContentLoaded` 可能在 `async` 之前或之后触发，不能保证谁先谁后。
3. 异步脚本不会等待彼此。较小的脚本 `small.js` 排在第二位，但可能会比 `long.js` 这个长脚本先加载完成，所以 `small.js` 会先执行。这被称为“加载优先”顺序。

当我们将独立的第三方脚本集成到页面时，此时采用异步加载方式是非常棒的：计数器，广告等，因为它们不依赖于我们的脚本，我们的脚本也不应该等待它们：

```html
<!-- Google Analytics 脚本通常是这样嵌入页面的 -->
=======
1. The page content shows up immediately: `async` doesn't block it.
2. `DOMContentLoaded` may happen both before and after `async`, no guarantees here.
3. Async scripts don't wait for each other. A smaller script `small.js` goes second, but probably loads before `long.js`, so runs first. That's called a "load-first" order.

Async scripts are great when we integrate an independent third-party script into the page: counters, ads and so on, as they don't depend on our scripts, and our scripts shouldn't wait for them:

```html
<!-- Google Analytics is usually added like this -->
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
<script async src="https://google-analytics.com/analytics.js"></script>
```


<<<<<<< HEAD
## 动态脚本

我们也可以使用 JavaScript 动态地添加脚本：
=======
## Dynamic scripts

We can also add a script dynamically using JavaScript:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

<<<<<<< HEAD
当脚本被附加到文档 `(*)` 时，脚本就会立即开始加载。

**默认情况下，动态脚本的行为是“异步”的。**

也就是说：
- 它们不会等待任何东西，也没有什么东西会等它们。
- 先加载完成的脚本先执行（“加载优先”顺序）。
=======
The script starts loading as soon as it's appended to the document `(*)`.

**Dynamic scripts behave as "async" by default.**

That is:
- They don't wait for anything, nothing waits for them.
- The script that loads first -- runs first ("load-first" order).
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa


```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";

*!*
script.async = false;
*/!*

document.body.append(script);
```

<<<<<<< HEAD
我们可以通过将 `async` 特性显式地修改为 `false`，以将脚本的加载顺序更改为文档顺序（就像常规脚本一样）：

例如，这里我们添加了两个脚本。在没有设置 `script.async=false` 时，它们执行顺序为加载优先顺序（即 `small.js` 可能先执行）。但是当设置了 `script.async=false` 后，脚本执行顺序就变成了“脚本在文档中的顺序”：
=======
For example, here we add two scripts. Without `script.async=false` they would execute in load-first order (the `small.js` probably first). But with that flag the order is "as in the document":
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa


```js run
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

<<<<<<< HEAD
// long.js 先执行，因为代码中设置了 async=false
=======
// long.js runs first because of async=false
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```


<<<<<<< HEAD
## 总结

`async` 和 `defer` 有一个共同点：加载这样的脚本都不会阻塞页面的渲染。因此，用户可以立即阅读并了解页面内容。

但是，它们之间也存在一些本质的区别：

|         | 顺序 | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | **加载优先顺序**。脚本在文档中的顺序不重要 —— 先加载完成先执行 | 不相关。可能在文档加载完成前加载并执行完毕。如果脚本很小或者来自于缓存，同时文档足够长，就会发生这种情况。 |
| `defer` | **文档顺序**（它们在文档中的顺序） | 在文档加载和解析完成之后（如果需要，则会等待），即在 `DOMContentLoaded` 之前执行。 |

```warn header="没有脚本的页面应该也是可用的"
请注意，如果你使用的是 `defer`，那么该页面在脚本加载之前就“可见”。

因此，用户可以阅读这个页面的内容，但是某些图形组件可能尚未准备好。

所以，我们应该在页面适当位置添加“正在加载”的指示，并且被禁用的按钮也应该这样显示，这样用户就可以清晰地看到什么准备好了，什么还没准备好。
```

在实际开发中，`defer` 用于需要整个 DOM 的脚本，和/或脚本的相对执行顺序很重要的时候。`async` 用于独立脚本，例如计数器或广告，这些脚本的相对执行顺序无关紧要。
=======
## Summary

Both `async` and `defer` have one common thing: downloading of such scripts doesn't block page rendering. So the user can read page content and get acquainted with the page immediately.

But there are also essential differences between them:

|         | Order | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *Load-first order*. Their document order doesn't matter -- which loads first |  Irrelevant. May load and execute while the document has not yet been fully downloaded. That happens if scripts are small or cached, and the document is long enough. |
| `defer` | *Document order* (as they go in the document). |  Execute after the document is loaded and parsed (they wait if needed), right before `DOMContentLoaded`. |

```warn header="Page without scripts should be usable"
Please note that if you're using `defer`, then the page is visible *before* the script loads.

So the user may read the page, but some graphical components are probably not ready yet.

There should be "loading" indications in the proper places, and disabled buttons should show as such, so the user can clearly see what's ready and what's not.
```

In practice, `defer` is used for scripts that need the whole DOM and/or their relative execution order is important. And  `async` is used for independent scripts, like counters or ads. And their relative execution order does not matter.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
