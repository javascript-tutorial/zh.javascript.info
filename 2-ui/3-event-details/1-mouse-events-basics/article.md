# 鼠标事件

在本章中，我们将详细介绍鼠标事件及其属性。

请注意：此类事件不仅可能来自于“鼠标设备”，还可能来自于对此类操作进行了模拟以实现兼容性的其他设备，例如手机和平板电脑。

## 鼠标事件类型

我们已经见过了其中一些事件：

`mousedown/mouseup`
: 在元素上点击/释放鼠标按钮。

`mouseover/mouseout`
: 鼠标指针从一个元素上移入/移出。

`mousemove`
: 鼠标在元素上的每个移动都会触发此事件。

`click`
: 如果使用的是鼠标左键，则在同一个元素上的 `mousedown` 及 `mouseup` 相继触发后，触发该事件。

`dblclick`
: 在短时间内双击同一元素后触发。如今已经很少使用了。

`contextmenu`
: 在鼠标右键被按下时触发。还有其他打开上下文菜单的方式，例如使用特殊的键盘按键，在这种情况下它也会被触发，因此它并不完全是鼠标事件。

……还有其他几种事件，我们稍后会学习它们。

## 事件顺序

从上面的列表中我们可以看到，一个用户操作可能会触发多个事件。

例如，点击鼠标左键，在鼠标左键被按下时，会首先触发 `mousedown`，然后当鼠标左键被释放时，会触发 `mouseup` 和 `click`。

在单个动作触发多个事件时，事件的顺序是固定的。也就是说，会遵循 `mousedown` -> `mouseup` -> `click` 的顺序调用处理程序。

```online
点击（译注：即单击）下面的按钮，你会看到事件。并尝试双击它。

在测试台下面记录了所有的鼠标事件，如果它们之间的延迟时间超过 1 秒，那么它们会被水平分割线分开。

我们还可以看出 `button` 属性允许检测鼠标按钮，演示示例如下。

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## 鼠标按钮

与点击相关的事件始终具有 `button` 属性，该属性允许获取确切的鼠标按钮。 

通常我们不在 `click` 和 `contextmenu` 事件中使用这一属性，因为前者只在单击鼠标左键时触发，后者只在单击鼠标右键时触发。

不过，在 `mousedown` 和 `mouseup` 事件中则可能需要用到 `event.button`，因为这两个事件在任何按键上都会触发，所以我们可以使用 `button` 属性来区分是左键单击还是右键单击。

`event.button` 的所有可能值如下：

| 鼠标按键状态 | `event.button` |
|--------------|----------------|
| 左键 (主要按键) | 0 |
| 中键 (辅助按键) | 1 |
| 右键 (次要按键) | 2 |
| X1 键 (后退按键) | 3 |
| X2 键 (前进按键) | 4 |

大多数鼠标设备只有左键和右键，对应的值就是 `0` 和 `2`。触屏设备中的点按操作也会触发类似的事件。

另外，还有一个 `event.buttons` 属性，其中以整数的形式存储着当前所有按下的鼠标按键，每个按键一个比特位。在实际开发中，很少会用到这个属性，如果有需要的话，你可以在 [MDN](mdn:/api/MouseEvent/buttons) 中找到更多细节。

```warn header="过时的 `event.which`"
一些老代码可能会使用 `event.which` 属性来获得按下的按键。这是一个古老的非标准的方式，具有以下可能值：

- `event.which == 1` —— 鼠标左键，
- `event.which == 2` —— 鼠标中键，
- `event.which == 3` —— 鼠标右键。

现在，`event.which` 已经被弃用了，不应再使用它。
```

## 组合键：shift，alt，ctrl，meta

所有的鼠标事件都包含有关按下的组合键的信息。

事件属性：

- `shiftKey`：`key:Shift`
- `altKey`：`key:Alt`（或对于 Mac 是 `key:Opt`）
- `ctrlKey`：`key:Ctrl`
- `metaKey`：对于 Mac 是 `key:Cmd`

如果在事件期间按下了相应的键，则它们为 `true`。

比如，下面这个按钮仅在 `key:Alt+Shift`+click 时才有效：

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

```warn header="注意：在 Mac 上我们通常使用 `Cmd` 代替 `Ctrl`"
在 Windows 和 Linux 上有 `key:Alt`，`key:Shift` 和 `key:Ctrl`。在 Mac 上还有：`key:Cmd`，它对应于属性 `metaKey`。

在大多数情况下，当在 Windows/Linux 上使用 `key:Ctrl` 时，在 Mac 是使用 `key:Cmd`。

也就说：当 Windows 用户按下 `key:Ctrl+Enter` 或 `key:Ctrl+A` 时，Mac 用户会按下 `key:Cmd+Enter` 或 `key:Cmd+A`，以此类推。

因此，如果我们想支持 `key:Ctrl`+click，那么对于 Mac 应该使用 `key:Cmd`+click。对于 Mac 用户而言，这更舒适。

即使我们想强制 Mac 用户使用 `key:Ctrl`+click —— 这非常困难。问题是：在 MacOS 上左键单击和 `key:Ctrl` 一起使用会被解释为 **右键单击**，并且会生成 `contextmenu` 事件，而不是像 Windows/Linux 中的 `click` 事件。

因此，如果我们想让所有操作系统的用户都感到舒适，那么我们应该将 `ctrlKey` 与 `metaKey` 一起进行检查。

对于 JS 代码，这意味着我们应该检查 `if (event.ctrlKey || event.metaKey)`。
```

```warn header="还有移动设备"
键盘组合是工作流的一个补充。这样，如果访客使用键盘操作 —— 它们就会起作用。

但是，如果访客的设备没有键盘 —— 那么这里应该有另一种不使用键盘也能做到这一点的方式。
```

## 坐标：clientX/Y，pageX/Y

所有的鼠标事件都提供了两种形式的坐标：

1. 相对于窗口的坐标：`clientX` 和 `clientY`。
2. 相对于文档的坐标：`pageX` 和 `pageY`。

我们已经在 <info:coordinates> 中解释过它们之间的区别。

简而言之，相对于文档的坐标 `pageX/Y` 以文档的左上角为参照物，并且同一位置的坐标不随页面的滚动而改变。相对于窗口的坐标 `clientX/Y` 以当前窗口的左上角为参照物，并且同一位置的坐标会随着页面的滚动而改变。

例如，如果我们有一个大小为 500x500 的窗口，并且鼠标在左上角，那么 `clientX` 和 `clientY` 均为 `0`，无论页面如何滚动。

如果鼠标位于中间，那么 `clientX` 和 `clientY` 均为 `250`。这与它在文档中的位置无关。在这方面，它们类似于 `position:fixed`。

````online
将鼠标移动到输入字段上，可以看到 `clientX/clientY`（此示例位于 `iframe` 中，因此坐标是相对于 `iframe` 的）：

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````

## 防止在鼠标按下时的选择

双击鼠标会有副作用，在某些界面中可能会出现干扰：它会选择文本。

比如，双击下面的文本，除了我们的处理程序外，还会选择文本：

```html autorun height=50
<span ondblclick="alert('dblclick')">Double-click me</span>
```

如果按下鼠标左键，并在不松开的情况下移动鼠标，这也常常会造成不必要的选择。

有多种防止选择的方法，你可以在 <info:selection-range> 一章中详细阅读。

在这种情况下，最合理的方式是防止浏览器对 `mousedown` 进行操作。这样能够阻止刚刚提到的两种选择：

```html autorun height=50
Before...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Double-click me
</b>
...After
```

现在，在双击时，粗体元素不会被选中，并且在粗体元素上按下鼠标左键也不会开始选择。

请注意：其中的文本仍然是可选择的。但是，选择不应该开始于该文本自身，而应该在该文本之前或之后开始。通常，这对用户来说挺好的。

````smart header="防止复制"
如果我们想禁用选择以保护我们页面的内容不被复制粘贴，那么我们可以使用另一个事件：`oncopy`。

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then you can get everything from the page source though.
</div>
```
如果你试图在 `<div>` 中复制一段文本，这是行不通的，因为默认行为 `oncopy` 被阻止了。

当然，用户可以访问页面的 HTML 源码，并且可以从那里获取内容，但并不是每个人都知道如何做到这一点。
````

## 总结

鼠标事件有以下属性：

- 按钮：`button`。
- 组合键（如果被按下则为 `true`）：`altKey`，`ctrlKey`，`shiftKey` 和 `metaKey`（Mac）。
  - 如果你想处理 `key:Ctrl`，那么不要忘记 Mac 用户，他们通常使用的是 `key:Cmd`，所以最好检查 `if (e.metaKey || e.ctrlKey)`。

- 窗口相对坐标：`clientX/clientY`。
- 文档相对坐标：`pageX/pageY`。

`mousedown` 的默认浏览器操作是文本选择，如果它对界面不利，则应避免它。

在下一章中，我们将看到有关鼠标指针移动后的事件，以及如何跟踪其下元素变化的更多详细信息。
