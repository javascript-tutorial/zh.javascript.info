# 浏览器默认行为

许多事件会自动触发浏览器执行某些行为。

例如：

- 点击一个链接 —— 触发导航（navigation）到该 URL。
- 点击表单的提交按钮 —— 触发提交到服务器的行为。
- 在文本上按下鼠标按钮并移动 —— 选中文本。

如果我们使用 JavaScript 处理一个事件，那么我们通常不希望发生相应的浏览器行为。而是想要实现其他行为进行替代。

## 阻止浏览器行为

有两种方式来告诉浏览器我们不希望它执行默认行为：

- 主流的方式是使用 `event` 对象。有一个 `event.preventDefault()` 方法。
- 如果处理程序是使用 `on<event>`（而不是 `addEventListener`）分配的，那返回 `false` 也同样有效。

在下面这个示例中，点击链接不会触发导航（navigation），浏览器不会执行任何操作：

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Click here</a>
or
<a href="/" onclick="event.preventDefault()">here</a>
```

在下一个示例中，我们将使用此技术来创建 JavaScript 驱动的菜单。

```warn header="从处理程序返回 `false` 是一个例外"
事件处理程序返回的值通常会被忽略。

唯一的例外是从使用 `on<event>` 分配的处理程序中返回的 `return false`。

在所有其他情况下，`return` 值都会被忽略。并且，返回 `true` 没有意义。
```

### 示例：菜单

考虑一个网站菜单，如下所示：

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

下面经过 CSS 渲染的外观：

[iframe height=70 src="menu" link edit]

菜单项是通过使用 HTML 链接 `<a>` 实现的，而不是使用按钮 `<button>`。这样做有几个原因，例如：

- 许多人喜欢使用“右键单击” —— “在一个新窗口打开链接”。如果我们使用 `<button>` 或 `<span>`，这个效果就无法实现。
- 搜索引擎在建立索引时遵循 `<a href="...">` 链接。

所以我们在标记（markup）中使用了 `<a>`。但通常我们打算处理 JavaScript 中的点击。因此，我们应该阻止浏览器默认行为。

像这样：

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...可以从服务器加载，UI 生成等

*!*
  return false; // 阻止浏览器行为（不前往访问 URL）
*/!*
};
```

如果我们省略 `return false`，那么在我们的代码执行完毕后，浏览器将执行它的“默认行为” —— 导航至在 `href` 中的 URL。

顺便说一句，这里使用事件委托会使我们的菜单更灵活。我们可以添加嵌套列表并使用 CSS 对其进行样式设置来实现 "slide down" 的效果。

````smart header="后续事件"
某些事件会相互转化。如果我们阻止了第一个事件，那就没有第二个事件了。

例如，在 `<input>` 字段上的 `mousedown` 会导致在其中获得焦点，以及 `focus` 事件。如果我们阻止 `mousedown` 事件，在这就没有焦点了。

尝试点击下面的第一个 `<input>` —— 会发生 `focus` 事件。但是如果你点击第二个，则没有聚焦。

```html run autorun
<input value="Focus works" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Click me">
```

这是因为浏览器行为在 `mousedown` 上被取消。如果我们用另一种方式进行输入，则仍然可以进行聚焦。例如，可以使用 `key:Tab` 键从第一个输入切换到第二个输入。但鼠标点击则不行。
````

## 处理程序选项 "passive"

`addEventListener` 的可选项 `passive: true` 向浏览器发出信号，表明处理程序将不会调用 `preventDefault()`。

为什么需要这样做？

移动设备上会发生一些事件，例如 `touchmove`（当用户在屏幕上移动手指时），默认情况下会导致滚动，但是可以使用处理程序的 `preventDefault()` 来阻止滚动。

因此，当浏览器检测到此类事件时，它必须首先处理所有处理程序，然后如果没有任何地方调用 `preventDefault`，则页面可以继续滚动。但这可能会导致 UI 中不必要的延迟和“抖动”。

`passive: true` 选项告诉浏览器，处理程序不会取消滚动。然后浏览器立即滚动页面以提供最大程度的流畅体验，并通过某种方式处理事件。

对于某些浏览器（Firefox，Chrome），默认情况下，`touchstart` 和 `touchmove` 事件的 `passive` 为 `true`。


## event.defaultPrevented

如果默认行为被阻止，那么 `event.defaultPrevented` 属性为 `true`，否则为 `false`。

这儿有一个有趣的用例。

你还记得我们在 <info:bubbling-and-capturing> 一章中讨论过的 `event.stopPropagation()`，以及为什么停止冒泡是不好的吗？

有时我们可以使用 `event.defaultPrevented` 来代替，来通知其他事件处理程序，该事件已经被处理。

我们来看一个实际的例子。

默认情况下，浏览器在 `contextmenu` 事件（单击鼠标右键）时，显示带有标准选项的上下文菜单。我们可以阻止它并显示我们自定义的菜单，就像这样：

```html autorun height=50 no-beautify run
<button>Right-click shows browser context menu</button>

<button *!*oncontextmenu="alert('Draw our menu'); return false"*/!*>
  Right-click shows our context menu
</button>
```

现在，除了该上下文菜单外，我们还想实现文档范围的上下文菜单。

右键单击时，应该显示最近的上下文菜单：

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

问题是，当我们点击 `elem` 时，我们会得到两个菜单：按钮级和文档级（事件冒泡）的菜单。

如何修复呢？其中一个解决方案是：“当我们在按钮处理程序中处理鼠标右键单击事件时，我们阻止其冒泡”，使用 `event.stopPropagation()`：

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

现在按钮级菜单如期工作。但是代价太大，我们永远拒绝了任何外部代码对右键点击信息的访问，包括收集统计信息的计数器等。这是非常不明智的。

另一个替代方案是，检查 `document` 处理程序是否阻止了浏览器的默认行为？如果阻止了，那么该事件已经得到了处理，我们无需再对此事件做出反应。


```html autorun height=80 no-beautify run
<p>Right-click for the document menu (added a check for event.defaultPrevented)</p>
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

现在一切都可以正常工作了。如果我们有嵌套的元素，并且每个元素都有自己的上下文菜单，那么这也是可以运行的。只需确保检查每个 `contextmenu` 处理程序中的 `event.defaultPrevented`。

```smart header="event.stopPropagation() 和 event.preventDefault()"
正如我们所看到的，`event.stopPropagation()` 和 `event.preventDefault()`（也被认为是 `return false`）是两个不同的东西。它们之间毫无关联。
```

```smart header="嵌套的上下文菜单结构"
还有其他实现嵌套上下文菜单的方式。其中之一是拥有一个具有 `document.oncontextmenu` 处理程序的全局对象，以及使我们能够在其中存储其他处理程序的方法。

该对象将捕获任何右键单击，浏览存储的处理程序并运行适当的处理程序。

但是，每段需要上下文菜单的代码都应该了解该对象，并使用它的帮助，而不是使用自己的 `contextmenu` 处理程序。
```

## 总结

有很多默认的浏览器行为：

- `mousedown` —— 开始选择（移动鼠标进行选择）。
- 在 `<input type="checkbox">` 上的 `click` —— 选中/取消选中的 `input`。
- `submit` —— 点击 `<input type="submit">` 或者在表单字段中按下 `key:Enter` 键会触发该事件，之后浏览器将提交表单。
- `keydown` —— 按下一个按键会导致将字符添加到字段，或者触发其他行为。
- `contextmenu` —— 事件发生在鼠标右键单击时，触发的行为是显示浏览器上下文菜单。
- ……还有更多……

如果我们只想通过 JavaScript 来处理事件，那么所有默认行为都是可以被阻止的。

想要阻止默认行为 —— 可以使用 `event.preventDefault()` 或 `return false`。第二个方法只适用于通过 `on<event>` 分配的处理程序。

`addEventListener` 的 `passive: true` 选项告诉浏览器该行为不会被阻止。这对于某些移动端的事件（像 `touchstart` 和 `touchmove`）很有用，用以告诉浏览器在滚动之前不应等待所有处理程序完成。

如果默认行为被阻止，`event.defaultPrevented` 的值会变成 `true`，否则为 `false`。

```warn header="保持语义，不要滥用"
从技术上来说，通过阻止默认行为并添加 JavaScript，我们可以自定义任何元素的行为。例如，我们可以使链接 `<a>` 像按钮一样工作，而按钮 `<button>` 也可以像链接那样工作（重定向到另一个 URL 等）。

但我们通常应该保留 HTML 元素的语义。例如 `<a>` 应该表现为导航（navigation），而不是按钮。

除了“只是一件好事”之外，这还会使你的 HTML 具有更好的可访问性。

另外，如果我们考虑使用带有 `<a>` 的示例，那么请注意：浏览器允许我们在新窗口中打开此类链接（通过右键单击它们以及其他方式）。大家都喜欢这么做。但是，如果我们使用 JavaScript 让按钮行为表现得像链接，甚至使用 CSS 将其样式设置成看起来也像链接，即使这样，但仍然无法在按钮上使用特定于 `<a>` 的浏览器功能。
```
