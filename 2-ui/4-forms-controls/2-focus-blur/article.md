# 聚焦：focus/blur

当一个元素被用户点击或使用键盘上的 `key:Tab` 选中时，该元素会被聚焦。当网页加载时 HTML `autofocus` 属性也可以让一个焦点落在元素上，不仅如此，还有其它途径可以获取焦点。

<<<<<<< HEAD
聚焦通常表示：“这里准备好接受数据了”，而这也正是我们运行代码去初始化或加载一些东西的时候。
=======
Focusing on an element generally means: "prepare to accept the data here", so that's the moment when we can run the code to initialize the required functionality.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

失去焦点的时刻可能更为重要。它可能发生在用户点击网页其它地方或者点击 `key:Tab` 跳转到下一个表单域，亦或是其它途径的时候。

失去焦点通常表示：“数据已经完成输入了”，所以我们可以运行代码来检查它，甚至可以是保存到服务器上。

<<<<<<< HEAD
当操作聚焦事件的时候有一些重要的特性需要注意。我们会尽量在这里介绍。
=======
There are important peculiarities when working with focus events. We'll do the best to cover them further on.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

## focus/blur 事件

当元素聚焦时它的 `focus` 事件被触发，还有当元素失去焦点的时候它的 `blur` 事件被触发。

让我们使用它们去校验一个输入字段。

在下面的例子中：

- `blur` 事件处理器会检查这个域有没有输入邮箱，如果没有的话展示一个错误信息。
- `focus` 事件处理器隐藏错误信息（当失去焦点的时候 `blur` 事件处理器还会再检查一遍）：

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
    // remove the "error" indication, because the user wants to re-enter something
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

<<<<<<< HEAD
在现代的 HTML 中，可以使用 `required`、`pattern` 等诸多输入属性校验表单输入内容，并且这些属性在很多时候满足了我们的使用需求。JavaScript 可以让我们以更灵活的方式去实现。如果数据是正确的，我们可以把它自动发送到服务器上。
=======
Modern HTML allows to do many validations using input attributes: `required`, `pattern` and so on. And sometimes they are just what we need. JavaScript can be used when we want more flexibility. Also we could automatically send the changed value to the server if it's correct.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09


## focus/blur 方法

方法 `elem.focus()` 和 `elem.blur()` 可以设置和移除元素上的焦点。

举个例子，如果输入值无效，我们可以让焦点一直保留在这个输入域上：

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
      // show the error
      this.classList.add("error");
*!*
      // ...and put the focus back
      input.focus();
*/!*
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

这在除了火狐（[bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)）之外的其它浏览器都可以正常工作。

如果我们输入一些无效数据到这个输入域里，或者当我们尝试使用 `key:Tab` 和点击其它远离 `<input>` 的地方，那么 `onblur` 事件处理器会把焦点重新设置到这个输入域里。

请注意，我们不可以通过在 `onblur` 事件处理器里调用 `event.preventDefault()` 来“阻止失去焦点”，因为 `onblur` 事件处理器是在元素失去焦点的**之后**运行的。

```warn header="JavaScript 导致的焦点丢失"
很多种原因可以导致失去焦点。

其中之一是用户点击了其它的地方。当然 JavaScript 本身也会导致这种事情发生，举个例子：

- 一个 `alert` 对话框会争夺焦点，所以这会导致元素失去焦点（触发 `blur` 事件），还有当这个 `alert` 对话框消失的时候，焦点重新回到原元素上（触发`focus`事件）。
- 如果一个元素被移出 DOM，那么它会导致焦点丢失。就算它被重新添加到 DOM，焦点也不会回到它身上。

有时候这些特性导致发生的 `focus/blur` 事件处理器会让人苦恼 — 它们在不被需要的时候发生。

<<<<<<< HEAD
最好的秘诀就是当使用这些事件的时候小心点。如果我们想要追踪用户发起的去焦事件，那么我们自己应该避免去触发它们。
=======
The best recipe is to be careful when using these events. If we want to track user-initiated focus-loss, then we should avoid causing it ourselves.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
```
## 允许在任何元素上聚焦：tabindex

默认情况下，很多元素不支持获取焦点。

list 标签在不同的浏览器表现不同，但有一件事总是正确的：`focus/blur` 保证支持那些用户可以交互的元素：比如 `<button>`、`<input>`、`<select>` 和 `<a>` 等等。

从另一方面说，为了格式化某些东西而存在的元素像 `<div>`、`<span>` 和 `<table>` — 默认是不能被聚焦的。`elem.focus()` 方法不能作用于它们，而且 `focus/blur` 事件也绝不会被触发。

使用 HTML 属性 `tabindex` 可以改变这种默认情况。

这个属性的目的是当使用 `key:Tab` 在元素之间切换的时候指定它们的排列顺序。

也就是说：如果我们有两个元素，第一个有属性 `tabindex="1"`，第二个有 `tabindex="2"`，然后当焦点在第一个元素的时候，按下 `key:Tab` 键，会让焦点移动到第二个元素身上。

这里有两个特别的值：

- `tabindex="0"` 让元素成为最后一个。
- `tabindex="-1"` 意味着 `key:Tab` 应该忽略这个元素。

**任何元素如果有属性 `tabindex`，它将会支持聚焦。**

举个例子，这里有个列表。点击第一个项目然后按下 `key:Tab`：

```html autorun no-beautify
Click the first item and press Tab. Keep track of the order. Please note that many subsequent Tabs can move the focus out of the iframe with the example.
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

顺序就像这样：`1 - 2 - 0`（0 总是最后一个）。正常情况下，`<li>` 元素不支持被聚焦，但 `tabindex` 使这成为可能，顺带还会触发事件和使 `:focus` 样式生效。

```smart header="`elem.tabIndex` 也一样有效"
我们可以通过 JavaScript 使用 `elem.tabIndex` 来添加 `tabindex` 属性。效果是一样的。
```

## focus/blur 委托

`focus` 和 `blur` 事件是不会向上冒泡的。

举个例子，我们不可以为了高亮 `<form>` 而把 `onfocus` 事件处理器放在它身上，像这样：

```html autorun height=80
<!-- on focusing in the form -- add the class -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

上面的例子并不会如我们所愿，因为当用户使 `<input>` 元素聚焦的时候，这个 `focus` 事件只会在这个 input 元素上触发。它不会向上冒泡。所以 `form.onfocus` 永远不会触发。

有两个解决方案。

首先，有一个遗留下来的有趣的特性：`focus/blur` 不会向上冒泡，但是在捕获阶段会向下传播。

这样可以生效：

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  // put the handler on capturing phase (last argument true)
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
*/!*
</script>
```

其次，有 `focusin` 和 `focusout` 事件可以使用 — 恰好和 `focus/blur` 事件很像，只不过它们会向上冒泡。

值得注意的是它们必须使用 `elem.addEventListener` 来指定，而不是 `on<event>`。

所以这里有另一个可以工作的版本：

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

元素获得/失去焦点会触发 `focus` 和 `blur` 事件。

它们的特性是：
- 它们不向上冒泡。但是可以在捕获阶段触发或者使用 `focusin/focusout`。
- 大多数元素默认不支持聚焦。使用 `tabindex` 可以让它们变成可聚焦的。

可以通过 `document.activeElement` 来访问正在被聚焦的元素。
