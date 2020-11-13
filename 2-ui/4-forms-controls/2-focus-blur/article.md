# 聚焦：focus/blur

当用户点击某个元素或使用键盘上的 `key:Tab` 键选中时，该元素将会获得聚焦（focus）。还有一个 HTML 特性（attribute）`autofocus` 可以让焦点在网页加载时默认落在一个元素上，此外还有其它途径可以获得焦点。

聚焦到一个元素通常意味着：“准备在此处接受数据”，所以，这正是我们可以运行代码以初始化所需功能的时刻。

失去焦点的时刻（“blur”）可能更为重要。它可能发生在用户点击页面的其它地方，或者按下 `key:Tab` 键跳转到下一个表单字段，亦或是其它途径的时候。

失去焦点通常意味着：“数据已经输入完成”，所以我们可以运行代码来检查它，甚至可以将其保存到服务器上，或进行其他操作。

当处理焦点事件时，有一些重要的特性。我们将尽力把这些内容介绍完整。

## focus/blur 事件

当元素聚焦时，会触发 `focus` 事件，当元素失去焦点时，会触发 `blur` 事件。

让我们使用它们来校验一个 `input` 字段。

在下面这个示例中：

- `blur` 事件处理程序检查这个字段是否输入了电子邮箱，如果没有输入，则显示一个 error。
- `focus` 事件处理程序隐藏 error 信息（在 `blur` 事件处理程序上会被再检查一遍）：

```html run autorun height=60
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Your email please: <input type="email" id="input">

<div id="error"></div>

<script>
*!*input.onblur*/!* = function() {
  if (!input.value.includes('@')) { // not email
    input.classList.add('invalid');
    error.innerHTML = 'Please enter a correct email.'
  }
};

*!*input.onfocus*/!* = function() {
  if (this.classList.contains('invalid')) {
    // 移除 "error" 指示，因为用户想要重新输入一些内容
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

现代 HTML 允许我们使用 `input` 特性（attribute）进行许多验证：`required`，`pattern` 等。有时它们正是我们所需要的。当我们需要更大的灵活性时，可以使用 JavaScript。如果数据是正确的，我们可以把它自动发送到服务器。


## focus/blur 方法

`elem.focus()` 和 `elem.blur()` 方法可以设置和移除元素上的焦点。

例如，如果输入值无效，我们可以让焦点无法离开这个 `input` 字段：

```html run autorun height=80
<style>
  .error {
    background: red;
  }
</style>

Your email please: <input type="email" id="input">
<input type="text" style="width:220px" placeholder="make email invalid and try to focus here">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // not email
      // 显示 error
      this.classList.add("error");
*!*
      // ...将焦点放回来
      input.focus();
*/!*
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

这段代码在除了火狐（[bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)）之外的浏览器上都可以正常工作。

如果我们在 `input` 中输入一些内容，然后尝试使用 `key:Tab` 键或点击远离 `<input>` 的位置，那么 `onblur` 事件处理程序会把焦点重新设置到这个 `input` 字段上。

请注意，我们无法通过在 `onblur` 事件处理程序中调用 `event.preventDefault()` 来“阻止失去焦点”，因为 `onblur` 事件处理程序是在元素失去焦点 **之后** 运行的。

```warn header="JavaScript 导致的焦点丢失"
很多种原因可以导致焦点丢失。

其中之一就是用户点击了其它位置。当然 JavaScript 自身也可能导致焦点丢失，例如：

- 一个 `alert` 会将焦点移至自身，因此会导致元素失去焦点（触发 `blur` 事件），而当 `alert` 对话框被取消时，焦点又回重新回到原元素上（触发 `focus` 事件）。
- 如果一个元素被从 DOM 中移除，那么也会导致焦点丢失。如果稍后它被重新插入到 DOM，焦点也不会回到它身上。

这些特性有时候会导致 `focus/blur` 处理程序发生异常 —— 在不需要它们时触发。

最好的秘诀就是在使用这些事件时小心点。如果我们想要跟踪用户导致的焦点丢失，则应该避免自己造成的焦点丢失。
```
## 允许在任何元素上聚焦：tabindex

默认情况下，很多元素不支持聚焦。

列表（list）在不同的浏览器表现不同，但有一件事总是正确的：`focus/blur` 保证支持那些用户可以交互的元素：`<button>`，`<input>`，`<select>`，`<a>` 等。

另一方面，为了格式化某些东西而存在的元素像 `<div>`，`<span>` 和 `<table>` —— 默认是不能被聚焦的。`elem.focus()` 方法不适用于它们，并且 `focus/blur` 事件也绝不会被触发。

使用 HTML-特性（attribute）`tabindex` 可以改变这种情况。

任何具有 `tabindex` 特性的元素，都会变成可聚焦的。该特性的 `value` 是当使用 `key:Tab`（或类似的东西）在元素之间进行切换时，元素的顺序号。

也就是说：如果我们有两个元素，第一个具有 `tabindex="1"`，第二个具有 `tabindex="2"`，然后当焦点在第一个元素的时候，按下 `key:Tab` 键，会使焦点移动到第二个元素身上。

切换顺序为：从 `1` 开始的具有 `tabindex` 的元素排在前面（按 `tabindex` 顺序），然后是不具有 `tabindex` 的元素（例如常规的 `<input>`）。

具有 `tabindex` 的元素按文档源顺序（默认顺序）切换。

这里有两个特殊的值：

- `tabindex="0"` 会使该元素被与那些不具有 `tabindex` 的元素放在一起。也就是说，当我们切换元素时，具有 `tabindex="0"` 的元素将排在那些具有 `tabindex ≥ 1` 的元素的后面。

    通常，它用于使元素具有焦点，但是保留默认的切换顺序。使元素成为与 `<input>` 一样的表单的一部分。

- `tabindex="-1"` 只允许以编程的方式聚焦于元素。`key:Tab` 键会忽略这样的元素，但是 `elem.focus()` 有效。

举个例子，这里有一个列表。点击第一项，然后按 `key:Tab` 键：

```html autorun no-beautify
点击第一项，然后按 Tab 键。跟踪顺序。请注意，多按几次 Tab 键后，会将焦点移到这个通过 iframe 嵌入的示例的外面。
<ul>
  <li tabindex="1">One</li>
  <li tabindex="0">Zero</li>
  <li tabindex="2">Two</li>
  <li tabindex="-1">Minus one</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

顺序就像这样：`1 - 2 - 0`。通常，`<li>` 不支持聚焦，但 `tabindex` 可以使它能聚焦，使这成为可能，并且还带有事件以及 `:focus` 样式。

```smart header="属性 `elem.tabIndex` 也有效"
我们可以使用 `elem.tabIndex` 通过 JavaScript 来添加 `tabindex`。效果是一样的。
```

## focus/blur 委托

`focus` 和 `blur` 事件不会向上冒泡。

例如，我们不能把 `onfocus` 放在 `<form>` 上来对其进行高亮，像这样：

```html autorun height=80
<!-- on focusing in the form -- add the class -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

上面这个示例并不工作，因为当用户聚焦于 `<input>` 时，`focus` 事件只会在该 `<input>` 上触发。它不会向上冒泡。所以 `form.onfocus` 永远不会触发。

这里有两个解决方案。

方案一，有一个遗留下来的有趣的特性（feature）：`focus/blur` 不会向上冒泡，但会在捕获阶段向下传播。

这样可以生效：

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  // 将处理程序置于捕获阶段（最后一个参数为 true）
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
*/!*
</script>
```

方案二，可以使用 `focusin` 和 `focusout` 事件 —— 与 `focus/blur` 事件完全一样，只是它们会冒泡。

值得注意的是，必须使用 `elem.addEventListener` 来分配它们，而不是 `on<event>`。

所以，这是另一个可行的变体：

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
*/!*
</script>
```

## 总结

在元素获得/失去焦点时会触发 `focus` 和 `blur` 事件。

它们的特点是：
- 它们不会冒泡。但是可以改为在捕获阶段触发，或者使用 `focusin/focusout`。
- 大多数元素默认不支持聚焦。使用 `tabindex` 可以使任何元素变成可聚焦的。

可以通过 `document.activeElement` 来获取当前所聚焦的元素。
