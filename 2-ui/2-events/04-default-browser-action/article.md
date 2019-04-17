# 浏览器默认动作

许多事件会自动触发浏览器动作。

例如：

- 单击一个链接 —— 触发到它的 URL。
- 单击表单中的提交按钮 —— 触发提交到服务器的动作。
- 在文本上按下鼠标按键并移动 —— 选中文本。

如果我们用 JavaScript 处理一个事件，我们通常不需要浏览器动作。幸运的是，它是可以阻止的。

## 阻止浏览器动作

有两种方法可以告诉浏览器我们不希望它执行动作：

- 主流的方法是使用 `event` 对象。有一个 `event.preventDefault()` 方法。
- 如果使用 `on<event>`（而不是 `addEventListener`）分发处理器，那么我们只需要从它内部返回 `false` 即可。

<<<<<<< HEAD
在下面的示例中，单击链接不会导致 URL 改变：
=======
In the example below a click to links doesn't lead to URL change:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Click here</a>
or
<a href="/" onclick="event.preventDefault()">here</a>
```

```warn header="没有必要去返回 `true`"
事件处理器返回的值通常会被忽略。
 
唯一的例外 —— 是从使用 `on<event>` 分发的处理器中 `return false`。

在所有其他情况下，返回都是不需要的，也不需要被处理。
```

### 示例：菜单

考虑一个站点菜单，如下所示：

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

下面是一些 CSS 的外观：

[iframe height=70 src="menu" link edit]

菜单项是 `<a>` 链接，而不是按钮。这有几个好处，比如：

- 许多人喜欢使用“右键” —— “打开一个新窗口”。如果我们使用 `<button>` 或者 `<span>`，这些动作都会失效。
- 搜索引擎在索引时遵循 `<a href="...">`。

因为我们在标记中使用 `<a>`。但通常我们打算用 JavaScript 处理单击。因此我们应该阻止浏览器默认动作。

就像这样：

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...可以从服务器和 UI 等加载

*!*
  return false; // prevent browser action (don't go to the URL)
*/!*
};
```

如果我们省略 `return false`，那么在我们的代码执行后，浏览器将执行它的“默认动作” —— 在  `href` 中跟踪 URL。

顺便说一句，这里使用事件委托会使我们的菜单更灵活。我们可以添加嵌套列表并使用 CSS 对其样式设置 "slide down"。


## 阻止进一步的事件

某些事件流入另一个事件。如果我们阻止第一个事件，就没有第二个事件。

例如，在 `<input>` 上的 `mousedown` 会导致在其中获得焦点，也就是 `focus` 事件。如果我们阻止 `mousedown` 事件，就不会有焦点。

尝试点击以下的 `<input>` —— `focus` 事件会发生。这很正常。

但是如果你点击第二个，就会失去焦点。

```html run autorun
<input value="Focus works" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Click me">
```

这是因为浏览器动作在 `mousedown` 上被取消。如果我们用另一种方式进行输入，焦点仍然有用。例如，`key:Tab` 键用于从第一个输入切换到第二个输入。但不要再用鼠标单击了。

## The "passive" handler option

The optional `passive: true` option of `addEventListener` signals the browser that the handler is not going to call `preventDefault()`.

Why that may be needed?

There are some events like `touchmove` on mobile devices (when the user moves their finger across the screen), that cause scrolling by default, but that scrolling can be prevented using `preventDefault()` in the handler.

So when the browser detects such event, it has first to process all handlers, and then if `preventDefault` is not called anywhere, it can proceed with scrolling. That may cause unnecessary delays and "jitters" in the UI.

The `passive: true` options tells the browser that the handler is not going to cancel scrolling. Then browser scrolls immediately providing a maximally fluent experience, and the event is handled by the way.

For some browsers (Firefox, Chrome), `passive` is `true` by default for `touchstart` and `touchmove` events.


## event.defaultPrevented

如果默认动作被阻止，那么 `event.defaultPrevented` 属性为 `true`，否则为 `false`。

还有一个有趣的用例。

你还记得在 <info:bubbling-and-capturing> 章节中，我们讨论过 `event.stopPropagation()` 以及为什么停止冒泡是不好的么？

有时我们可以使用 `event.defaultPrevented` 来代替。

我们来看一个实际的例子，停止冒泡看起来是必须的，但实际上没有它我们也可以做的很好。

默认情况下，`contextmenu` 事件（鼠标右击）上的浏览器显示一个带有标准选项的上下文菜单。我们可以阻止它并显示我们自定义的菜单，就像这样：

```html autorun height=50 no-beautify run
<button>Right-click for browser context menu</button>

<button *!*oncontextmenu="alert('Draw our menu'); return false"*/!*>
  Right-click for our context menu
</button>
```

现在，假设我们用我们自己的选项实现我们自己文档范围的上下文菜单。在文档中，我们可能有其他元素和它们自己的上下文菜单：

```html autorun height=80 no-beautify run
<p>Right-click here for the document context menu</p>
<button id="elem">Right-click here for the button context menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

问题是当我们点击 `elem` 时，我们得到两个菜单：按钮级别（事件冒泡）和文档级别的菜单。

如何修复呢？其中一个解决方案是：“在按钮处理器中，我们全部去处理（按钮级别的）事件，然后停止它。”还要使用 `event.stopPropagation()`：

```html autorun height=80 no-beautify run
<p>Right-click for the document menu</p>
<button id="elem">Right-click for the button menu (fixed with event.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
*!*
    event.stopPropagation();
*/!*
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

现在按钮级别的菜单如期工作。但是代价太大，我们会永远拒绝访问任何外部代码的右击信息，包括收集统计信息的计数器等等。这很不可取。

另一个替代方案是，在文档级处理器中去检测默认动作是否被阻止？如果是这样的话，那么事件就被处理了，我们不需要对它做出反应。


```html autorun height=80 no-beautify run
<p>Right-click for the document menu (fixed with event.defaultPrevented)</p>
<button id="elem">Right-click for the button menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
*!*
    if (event.defaultPrevented) return;
*/!*

    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

现在一切都可以正常工作了。如果我们有嵌套元素，并且每个元素都有自己的上下文菜单，那么这也是可以运行的。只需确保检查每个 `contextmenu` 处理器中的 `event.defaultPrevented`。

```smart header="event.stopPropagation() 和 event.preventDefault()"
正如我们所看到的那样，`event.stopPropagation()` 和 `event.preventDefault()`（也被认为是 `return false`）是两种不同的事情。它们之间毫无联系。
```

```smart header="嵌套的上下文目录结构"
还有一些实现嵌套上下文菜单的替代方法。其中一个是拥有一个特殊的全局对象，它具有处理 `document.oncontextmenu` 的方法，还允许在其中存储各种“低级”处理器方法。

对象将捕获任何右击事件，查看存储的处理器并运行相应的处理器。

但每一段需要上下文菜单的代码都应该了解该对象，并使用它的帮助，而不是使用自己的 `contextmenu` 处理器。
```

## 总结

有许多默认浏览器动作：

- `mousedown` —— 开始选择（移动鼠标进行选择）。
- 在 `<input type="checkbox">` 上 `click` —— 检查/取消选中的 `input`。
- `submit` ——  单击 `<input type="submit">` 或在表单中通过单击 `key:Enter` 触发该事件，并在其后浏览器提交表单。
- `wheel` —— 鼠标滚轮事件的滚动将作为默认动作。
- `keydown` —— 按下按键可能会导致将字符添加到字段，或者触发其他动作。
- `contextmenu` —— 事件发生在右击时，动作是显示浏览器上下文菜单。
- ...还有更多...

如果我们想要通过 JavaScript 来处理事件，那么所有的默认动作都可以被阻止。

想要阻止默认行为 —— 可以使用 `event.preventDefault()` 或者 `return false`。第二个方法只适用于分发了 `on<event>` 的处理器。

<<<<<<< HEAD
如果默认动作被阻止，`event.defaultPrevented` 的值就会变成 `true`，否则会变成 `false`。
=======
The `passive: true` option of `addEventListener` tells the browser that the action is not going to be prevented. That's useful for some mobile events, like `touchstart` and `touchmove`, to tell the browser that it should not wait for all handlers to finish before scrolling.

If the default action was prevented, the value of `event.defaultPrevented` becomes `true`, otherwise it's `false`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```warn header="Stay semantic, don't abuse"
从技术上来说，通过阻止默认动作和添加 JavaScript，我们可以定制任何元素的行为。例如，我们可以使链接 `<a>` 像按钮一样工作，而按钮 `<button>` 也可以作为链接运行（重定向到另一个 URL 等）。

但我们通常应该保留 HTML 元素的语义。例如 `<a>` 应该表现为导航，而不是按钮。

除了“是一件好事”，这使你的 HTML 在可访问性方便表现得更好。

另外，如果我们考虑 `<a>` 的示例，那么请注意：浏览器允许在一个新窗口中打开这样的链接（右击它们以及其他方法）。大家都喜欢这么做。但如果我们使用 JavaScript 让按钮行为表现得像链接，甚至看起来像 CSS 的链接，那么 `<a>` 独特的浏览器特性将仍然不会适用于按钮。
```
