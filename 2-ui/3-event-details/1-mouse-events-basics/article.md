# 鼠标事件基础

鼠标事件不仅来自于 "mouse manipulators"，而且还在触摸设备上被模拟，以便可以让它们相互兼容。

在本章，我们将详细介绍鼠标事件及其属性。

## 鼠标事件类型

我们可以将鼠标事件分成两类：“简单”和“复杂”

### 简单事件

最常用的简单事件是：

`mousedown/mouseup`
: 在元素上单击/释放鼠标按钮。

`mouseover/mouseout`
: 鼠标指针从一个元素上移入/出。

`mousemove`
: 鼠标每次移动到元素上时都会触发事件。

...还有其他几种事件类型，我们稍后会讨论它们。

### 复杂事件

`click`
: 如果使用鼠标左键，则在 `mousedown` 及 `mouseup` 相继触发后触发该事件。

`contextmenu`
: 如果使用鼠标右键，则在 `mousedown` 后触发。

`dblclick`
: 在对元素进行双击后触发。

复杂事件是由简单事件组成的，因此理论上我们可以没有它们而运转。但它们的存在却给我们提供了极大的便利。

### 事件顺序

一个动作可能会触发多个事件。

比如，在按下鼠标按钮时，单击会首先触发 `mousedown`，然后释放鼠标按钮时，会触发 `mouseup` 和 `click`。

在单个动作触发多个事件时，它们的顺序是固定的。也就是说会遵循 `mousedown` -> `mouseup` -> `click` 的顺序。事件按照相同的顺序被处理：`onmouseup` 在 `onclick` 运行之前完成。

```online
单击以下按钮，你会看到事件。也可以尝试双击。

在测试台下面记录所有鼠标事件，如果它们之间有超过 1 秒的延迟，那么它们会被规则分开。

我们还可以看出 `which` 属性允许检测鼠标按钮。

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## 获取按钮：which

与单击相关的事件始终具有 `which` 属性，该属性允许获取准确的鼠标按钮。 

它不用于 `click`和 `contextmenu` 事件，因为前者只发生在左键，而后者只发生在右击。

但如果我们跟踪 `mousedown` 和 `mouseup`，那么我们就需要它，因为这些事件在任意鼠标按钮按下时都会触发，所以 `which` 允许区分 "right-mousedown" 和 "left-mousedown"。

有三个可能的值：

- `event.which == 1` —— 左按钮
- `event.which == 2` —— 中间按钮
- `event.which == 3` —— 右按钮

中间按钮现在有些特殊，所有很少被使用。

## 组合键: shift、alt、ctrl 和 meta

所有的鼠标事件都包含有关按下的组合键信息。

属性：

- `shiftKey`
- `altKey`
- `ctrlKey`
- `metaKey` (`key:Cmd` for Mac)

比如，下述按钮仅仅在 `key:Alt+Shift`+click 上有效：

```html autorun height=60
<button id="button">Alt+Shift+Click on me!</button>

<script>
  button.onclick = function(event) {
*!*
    if (event.altKey && event.shiftKey) {
*/!*
      alert('Hooray!');
    }
  };
</script>
```

```warn header="注意：在 Mac 上我们通常使用 `Cmd` 而不是 `Ctrl`"
在 Windows 和 Linux 上修改键是 `key:Alt`、`key:Shift` 和 `key:Ctrl`。在 Mac 上还有：`key:Cmd`，它对应于属性 `metaKey`。

在大多数情况下，当 Windows/Linux 使用 `key:Ctrl` 时，Mac 的用户会使用 `key:Cmd`。因此当 Windows 用户按下 `key:Ctrl+Enter` 或 `key:Ctrl+A` 时，Mac 用户会按下 `key:Cmd+Enter` 或 `key:Cmd+A` 等，大多数 app 使用 `key:Cmd` 而不是 `key:Ctrl`。

因此如果我们想支持 `key:Ctrl`+click，那么对于 Mac 用户来说，使用 `key:Cmd`+click 也是有意义的。这对于 Mac 用户来说非常舒服。

即使我们想迫使 Mac 用户使用 `key:Ctrl`+click —— 也非常困难。问题在于：Mac 上左击 `key:Ctrl` 被解释为**右击**，它会生成 `contextmenu` 事件，而不是像 Windows/Linxu 的 `click` 事件。

因此如果我们想让所有操作系统的用户感觉舒适，那么我们应该和 `ctrlKey` 一起使用 `metaKey`。

对于 JS 代码，这意味着我们应该检查 `if (event.ctrlKey || event.metaKey)`。
```

```warn header="还有移动设备"
键盘组合是工作流的一个补充。所以如果用户使用键盘操作 —— 它也能工作。
如果你的设备没有 —— 那么还有另一个方法也可以实现。
```

## 坐标：clientX/Y，pageX/Y

所有的鼠标事件都有两种形式的坐标：

1. 对于窗口而言：`clientX` 和 `clientY`。
2. 对于文档而言：`pageX` 和 `pageY`。

比如，如果我们有一个 500 x 500 的窗口，鼠标在左上方，那么 `clientX` 和 `clientY` 都是 `0`。如果鼠标在中间，那么 `clientX` 和 `clientY` 就是 `250`。和它在文档中的位置无关。它们类似于 `position:fixed`。

````online
将鼠标移动到输入字段上，可以看到 `clientX/clientY`（它在 `iframe` 中，因此坐标是相对于 `iframe` 而言的）：

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````

文档相对坐标是从文档的左上角而不是窗口中计算出来的。
坐标 `pageX`，`pageY` 与文档级别上的 `position:absolute` 非常相似。

你可以在本章中阅读到更多关于坐标的内容 <info:coordinates>。

## Mousedown 没有选择

鼠标点击有一个让人不安的副作用。双击可以选择文本。

如果我们想自己处理点击事件，那么“额外”的选择就显得多余了。

比如，对下面的文本双击，除了我们的触发事件之外，还会选择文本：

```html autorun height=50
<b ondblclick="alert('dblclick')">Double-click me</b>
```

还有 CSS 方法可以终止选择：[CSS UI 草案](https://www.w3.org/TR/css-ui-4/) 中的 `user-select` 属性。

大多数浏览器都支持它的前缀：

```html autorun height=50
<style>
  b {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

Before...
<b ondblclick="alert('Test')">
  Unselectable
</b>
...After
```

如果现在你双击“不可选”，它就不会被选中了。看起来好像起作用了。

...但有一个潜在的问题！文本变得无法被选中。即使用户从“之前”开始选择，“之后”结束，选择也会跳过“不可选择”部分。我们真的想让文本不可选么？

<<<<<<< HEAD
大部分时间，我们不会那么做。用户可能有合理的理由来选择文本，以便进行复制或其他需要。如果我们不让他那么做那么可能不太方便。所以这个解决方案没那么好。
=======
Most of time, we don't. A user may have valid reasons to select the text, for copying or other needs. That may be inconvenient if we don't allow them to do it. So this solution is not that good.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

我们只是想阻止双击进行选择，仅此而已。

文本选择是 `mousedown` 事件的默认浏览器操作。因此其他比较好的解决方案是处理 `mousedown` 并阻止它发生，就像这样：

```html autorun height=50
Before...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Double-click me
</b>
...After
```

现在，在双击时不选择粗体元素。

内部文字仍然可以被选中。但选择却不应该从文本自身开始，而是应该在文字之前或之后开始。通常情况下，都是正常的。

````smart header="取消选择"
我们可以在事件处理器中用 "post-factum" 取消它，而不是**阻止**选择它。

这是方法：

```html autorun height=50
Before...
<b ondblclick="*!*getSelection().removeAllRanges()*/!*">
  Double-click me
</b>
...After
```

如果你双击粗体元素，则会出现所选内容，然后立即删除，不过看起来不太好。
````

````smart header="防止复制"
如果我们想要禁用选择以保护内容不被复制粘贴，那么我们可以使用另一个事件：`oncopy`。

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then you can get everything from the page source though.
</div>
```
如果你试图在 `<div>` 中复制一段文本，这是行不通的，因为默认操作 `oncopy` 是被阻止的。

当然，这不能阻止用户打开 HTML 源代码，但并不是每个人都知道如何做到这一点。
````

## 总结

鼠标事件有如下属性：

- 按钮：`which`。
- 修饰符键（`true` 如果被按压）：`altKey`、`ctrlKey`、`shiftKey` 和 `metaKey`（Mac）。
  - 如果想要处理 `key:Ctrl`，那么不要忘记 Mac 用户，他们使用的是 `key:Cmd`，所以最好检查 `if (e.metaKey || e.ctrlKey)`。

- 窗口相对坐标：`clientX/clientY`。
- 文档相对坐标：`pageX/pageY`。

处理文本选择虽然也是不必要的点击副作用，但是却很重要。

还有几种可以做到这一点的方法，比如：
1. CSS 属性 `user-select:none`（带有浏览器前缀）完全禁用文本选择。
2. 使用 `getSelection().removeAllRanges()` 取消选择后的内容。
3. 处理 `mousedown` 并阻止默认操作（通常是最好的选择）。
