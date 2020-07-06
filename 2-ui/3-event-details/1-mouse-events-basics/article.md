<<<<<<< HEAD
# 鼠标事件基础

在本章中，我们将详细介绍鼠标事件及其属性。
=======
# Mouse events
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

请注意：此类事件不仅可能来自于“鼠标设备”，还可能来自于对此类操作进行了模拟以实现兼容性的其他设备，例如手机和平板电脑。

<<<<<<< HEAD
## 鼠标事件类型

我们可以将鼠标事件分成两类：“简单”和“复杂”。

### 简单事件

最常用的简单事件有：
=======
Please note: such events may come not only from "mouse devices", but are also from other devices, such as phones and tablets, where they are emulated for compatibility.

## Mouse event types

We've already seen some of these events:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

`mousedown/mouseup`
: 在元素上点击/释放鼠标按钮。

`mouseover/mouseout`
: 鼠标指针从一个元素上移入/移出。

`mousemove`
: 鼠标在元素上的每个移动都会触发此事件。

<<<<<<< HEAD
`contextmenu`
: 尝试打开上下文菜单时触发。在最常见的情况下，此事件发生在鼠标右键被按下时。虽然，还有其他打开上下文菜单的方式，例如使用特殊的键盘键，所以它不完全是一个鼠标事件。

……还有其他几种事件类型，我们稍后会讨论它们。

### 复杂事件

`click`
: 如果使用的是鼠标左键，则在同一个元素上的 `mousedown` 及 `mouseup` 相继触发后，触发该事件。

`dblclick`
: 双击一个元素后触发。

复杂事件是由简单事件组成的，因此，从理论上讲，如果没有这些复杂事件，我们也能实现相应的功能。但它们的存在却给我们提供了极大的便利。

### 事件顺序

一个行为可能会触发多个事件。

比如，点击鼠标按钮，在按下鼠标按钮时，点击会首先触发 `mousedown`，然后释放鼠标按钮时，会触发 `mouseup` 和 `click`。

在单个动作触发多个事件时，事件的顺序是固定的。也就是说，会遵循 `mousedown` -> `mouseup` -> `click` 的顺序调用处理程序。
=======
`click`
: Triggers after `mousedown` and then `mouseup` over the same element if the left mouse button was used.

`dblclick`
: Triggers after two clicks on the same element within a short timeframe. Rarely used nowadays.

`contextmenu`
: Triggers when when the right mouse button is pressed. There are other ways to open a context menu, e.g. using a special keyboard key, it triggers in that case also, so it's not exactly the mouse event.

...There are several other events too, we'll cover them later.

## Events order

As you can see from the list above, a user action may trigger multiple events.

For instance, a left-button click first triggers `mousedown`, when the button is pressed, then `mouseup` and `click` when it's released.

In cases when a single action initiates multiple events, their order is fixed. That is, the handlers are called in the order `mousedown` -> `mouseup` -> `click`. 
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```online
点击（译注：即单击）下面的按钮，你会看到事件。并尝试双击它。

<<<<<<< HEAD
在测试台下面记录了所有的鼠标事件，如果它们之间的延迟时间超过 1 秒，那么它们会被水平分割线分开。

我们还可以看出 `which` 属性允许检查鼠标按钮。
=======
On the teststand below all mouse events are logged, and if there is more than a 1 second delay between them they are separated by a horizontal ruler.

Also we can see the `button` property that allows to detect the mouse button, it's explained below.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

<<<<<<< HEAD
## 获取按钮：which

与点击相关的事件始终具有 `which` 属性，该属性允许获取确切的鼠标按钮。 

它不用于 `click` 和 `contextmenu` 事件，因为前者只在点击左键时发生，而后者只在点击右键时发生。

但是，如果我们跟踪 `mousedown` 和 `mouseup`，那么我们就需要它，因为这些事件会在任何按钮上触发，所以 `which` 让我们能够区分 "right-mousedown" 和 "left-mousedown"。

有三个可能的值：

- `event.which == 1` —— 左按钮
- `event.which == 2` —— 中间按钮
- `event.which == 3` —— 右按钮

中间按钮现在有些特殊，很少被使用了。
=======
## Mouse button

Click-related events always have the `button` property, which allows to get the exact mouse button.

We usually don't use it for `click` and `contextmenu` events, because the former happens only on left-click, and the latter -- only on right-click. 

From the other hand, `mousedown` and `mouseup` handlers we may need `event.button`, because these events trigger on any button, so `button` allows to distinguish between "right-mousedown" and "left-mousedown".

The possible values of `event.button` are:

| Button state | `event.button` |
|--------------|----------------|
| Left button (primary) | 0 |
| Middle button (auxillary) | 1 |
| Right button (secondary) | 2 |
| X1 button (back) | 3 |
| X2 button (forward) | 4 |

Most mouse devices only have the left and right buttons, so possible values are `0` or `2`. Touch devices also generate similar events when one taps on them.

Also there's `event.buttons` property that has all currently pressed buttons as an integer, one bit per button. In practice this property is very rarely used, you can find details at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons) if you ever need it.

```warn header="The outdated `event.which`"
Old code may use `event.which` property that's an old non-standard way of getting a button, with possible values:

- `event.which == 1` – left button,
- `event.which == 2` – middle button,
- `event.which == 3` – right button.

As of now, `event.which` is deprecated, we shouldn't use it.
```
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

## 组合键：shift，alt，ctrl，meta

所有的鼠标事件都包含有关按下的组合键的信息。

<<<<<<< HEAD
事件属性：

- `shiftKey`：`key:Shift`
- `altKey`：`key:Alt`（或对于 Mac 是 `key:Opt`）
- `ctrlKey`：`key:Ctrl`
- `metaKey`：对于 Mac 是 `key:Cmd`
=======
Event properties:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (or `key:Opt` for Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` for Mac

They are `true` if the corresponding key was pressed during the event.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

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

<<<<<<< HEAD
```warn header="注意：在 Mac 上我们通常使用 `Cmd` 代替 `Ctrl`"
在 Windows 和 Linux 上有 `key:Alt`，`key:Shift` 和 `key:Ctrl`。在 Mac 上还有：`key:Cmd`，它对应于属性 `metaKey`。

在大多数情况下，当在 Windows/Linux 上使用 `key:Ctrl` 时，在 Mac 是使用 `key:Cmd`。

也就说：当 Windows 用户按下 `key:Ctrl+Enter` 或 `key:Ctrl+A` 时，Mac 用户会按下 `key:Cmd+Enter` 或 `key:Cmd+A`，以此类推。

因此，如果我们想支持 `key:Ctrl`+click，那么对于 Mac 应该使用 `key:Cmd`+click。对于 Mac 用户而言，这更舒适。

即使我们想强制 Mac 用户使用 `key:Ctrl`+click —— 这非常困难。问题是：在 MacOS 上左键单击和 `key:Ctrl` 一起使用会被解释为 **右键单击**，并且会生成 `contextmenu` 事件，而不是像 Windows/Linux 中的 `click` 事件。

因此，如果我们想让所有操作系统的用户都感到舒适，那么我们应该将 `ctrlKey` 与 `metaKey` 一起进行检查。
=======
```warn header="Attention: on Mac it's usually `Cmd` instead of `Ctrl`"
On Windows and Linux there are modifier keys `key:Alt`, `key:Shift` and `key:Ctrl`. On Mac there's one more: `key:Cmd`, corresponding to the property `metaKey`.

In most applications, when Windows/Linux uses `key:Ctrl`, on Mac `key:Cmd` is used.

That is: where a Windows user presses `key:Ctrl+Enter` or `key:Ctrl+A`, a Mac user would press `key:Cmd+Enter` or `key:Cmd+A`, and so on.

So if we want to support combinations like `key:Ctrl`+click, then for Mac it makes sense to use `key:Cmd`+click. That's more comfortable for Mac users.

Even if we'd like to force Mac users to `key:Ctrl`+click -- that's kind of difficult. The problem is: a left-click with `key:Ctrl` is interpreted as a *right-click* on MacOS, and it generates the `contextmenu` event, not `click` like Windows/Linux.

So if we want users of all operating systems to feel comfortable, then together with `ctrlKey` we should check `metaKey`.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

对于 JS 代码，这意味着我们应该检查 `if (event.ctrlKey || event.metaKey)`。
```

<<<<<<< HEAD
```warn header="还有移动设备"
键盘组合是工作流的一个补充。这样，如果访客使用键盘操作 —— 它就会起作用。而且，如果访客的设备没有键盘 —— 那么这里应该有另一种方法来做到这一点。
=======
```warn header="There are also mobile devices"
Keyboard combinations are good as an addition to the workflow. So that if the visitor uses a keyboard -- they work. 

But if their device doesn't have it -- then there should be a way to live without modifier keys.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
```

## 坐标：clientX/Y，pageX/Y

<<<<<<< HEAD
所有的鼠标事件都有两种形式的坐标：
=======
All mouse events provide coordinates in two flavours:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

1. 相对于窗口的坐标：`clientX` 和 `clientY`。
2. 相对于文档的坐标：`pageX` 和 `pageY`。

<<<<<<< HEAD
比如，如果我们有一个大小为 500x500 的窗口，并且鼠标在左上角，那么 `clientX` 和 `clientY` 均为 `0`。如果鼠标位于中间，那么 `clientX` 和 `clientY` 均为 `250`。这与它在文档中的位置无关。它们类似于 `position:fixed`。

````online
将鼠标移动到输入字段上，可以看到 `clientX/clientY`（此示例位于 `iframe` 中，因此坐标是相对于 `iframe` 的）：
=======
We already covered the difference between them in the chapter <info:coordinates>.

In short, document-relative coordinates `pageX/Y` are counted from the left-upper corner of the document, and do not change when the page is scrolled, while `clientX/Y` are counted from the current window left-upper corner. When the page is scrolled, they change.

For instance, if we have a window of the size 500x500, and the mouse is in the left-upper corner, then `clientX` and `clientY` are `0`, no matter how the page is scrolled. 

And if the mouse is in the center, then `clientX` and `clientY` are `250`, no matter what place in the document it is. They are similar to `position:fixed` in that aspect.

````online
Move the mouse over the input field to see `clientX/clientY` (the example is in the `iframe`, so coordinates are relative to that `iframe`):
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````

<<<<<<< HEAD
文档相对坐标 `pageX` 和 `pageY` 是从文档的左上角而不是窗口开始计算的。你可以在 <info:coordinates> 一章中阅读有关坐标的更多细节。

## 禁用选择

双击鼠标会有副作用，在某些界面中可能会出现干扰：它会选择文本。
=======
## Preventing selection on mousedown

Double mouse click has a side-effect that may be disturbing in some interfaces: it selects text.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

比如，双击下面的文本，除了我们的处理程序外，还会选择文本：

```html autorun height=50
<span ondblclick="alert('dblclick')">Double-click me</span>
```

<<<<<<< HEAD
如果按下鼠标左键，并在不松开的情况下移动鼠标，这也常常会造成不必要的选择。

有多种防止选择的方法，你可以在 <info:selection-range> 一章中详细阅读。

在这种情况下，最合理的方式是防止浏览器对 `mousedown` 进行操作。这样能够阻止刚刚提到的两种选择：
=======
If one presses the left mouse button and, without releasing it, moves the mouse, that also makes the selection, often unwanted.

There are multiple ways to prevent the selection, that you can read in the chapter <info:selection-range>.

In this particular case the most reasonable way is to prevent the browser action on `mousedown`. It prevents both these selections:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```html autorun height=50
Before...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Double-click me
</b>
...After
```

<<<<<<< HEAD
现在，在双击时，粗体元素不会被选中，并且在粗体元素上按下鼠标左键也不会开始选择。

请注意：其中的文本仍然是可选择的。但是，选择不应该开始于该文本自身，而应该在该文本之前或之后开始。通常，这对用户来说挺好的。

````smart header="防止复制"
如果我们想禁用选择以保护我们页面的内容不被复制粘贴，那么我们可以使用另一个事件：`oncopy`。
=======
Now the bold element is not selected on double clicks, and pressing the left button on it won't start the selection.

Please note: the text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that's fine for users.

````smart header="Preventing copying"
If we want to disable selection to protect our page content from copy-pasting, then we can use another event: `oncopy`.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then you can get everything from the page source though.
</div>
```
如果你试图在 `<div>` 中复制一段文本，这是行不通的，因为默认行为 `oncopy` 被阻止了。

<<<<<<< HEAD
当然，用户可以访问页面的 HTML 源码，并且可以从那里获取内容，但并不是每个人都知道如何做到这一点。
=======
Surely the user has access to HTML-source of the page, and can take the content from there, but not everyone knows how to do it.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
````

## 总结

鼠标事件有以下属性：

<<<<<<< HEAD
- 按钮：`which`。
- 组合键（如果被按下则为 `true`）：`altKey`，`ctrlKey`，`shiftKey` 和 `metaKey`（Mac）。
  - 如果你想处理 `key:Ctrl`，那么不要忘记 Mac 用户，他们通常使用的是 `key:Cmd`，所以最好检查 `if (e.metaKey || e.ctrlKey)`。
=======
- Button: `button`.
- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - If you want to handle `key:Ctrl`, then don't forget Mac users, they usually use `key:Cmd`, so it's better to check `if (e.metaKey || e.ctrlKey)`.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

- 窗口相对坐标：`clientX/clientY`。
- 文档相对坐标：`pageX/pageY`。

<<<<<<< HEAD
`mousedown` 的默认浏览器操作是文本选择，如果它对界面不利，则应避免它。

在下一章中，我们将看到有关鼠标指针移动后的事件，以及如何跟踪其下元素变化的更多详细信息。
=======
The default browser action of `mousedown` is text selection, if it's not good for the interface, then it should be prevented.

In the next chapter we'll see more details about events that follow pointer movement and how to track element changes under it.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
