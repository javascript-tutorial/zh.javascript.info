# 鼠标拖放事件

拖放（Drag'n'Drop）是一个很赞的界面解决方案。取某件东西并将其拖放是执行许多东西的一种简单明了的方式，从复制和移动文档（如在文件管理器中）到订购（将物品放入购物车）。

在现代 HTML 标准中有一个 [关于拖放的部分](https://html.spec.whatwg.org/multipage/interaction.html#dnd)，其中包含了例如 `dragstart` 和 `dragend` 等特殊事件。

这些事件很有用，因为它们使我们能够轻松地解决简单的任务。例如，使我们能够处理将“外部”文件拖放到浏览器中的操作，因此我们可以在 OS 文件管理器中获取文件，并将其拖放到浏览器窗口中，从而使 JavaScript 可以访问其内容。

但是，原声的拖放事件也有其局限性。例如，我们无法将拖放限制在某个区域内。并且，我们无法将拖放变成“水平”或“垂直”拖放。还有其他一些使用该 API 无法完成的拖放任务。此外，移动设备基本都不支持此事件。

因此，在这里我们将看到，如何使用鼠标事件来实现拖放。

## 拖放算法

基础的拖放算法如下所示：

1. 在 `mousedown` 上 —— 根据需要准备要移动的元素（也许创建它的一个副本）。
2. 然后在 `mousemove` 上，通过更改 `left/top` 和 `position:absolute` 来移动它。
3. 在 `mouseup` 上 —— 执行与完成的拖放相关的所有行为。

这些是基础。稍后我们可以扩展它，例如，当鼠标悬停在元素上方时，突出显示可放置（可用于放置）的元素。

下面是拖放一个球的算法：

```js
ball.onmousedown = function(event) { // (1) 启动处理

  // (2) 准备移动：确保 absolute，并通过设置 z-index 以确保球在顶层
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  // 将其从当前父元素中直接移动到 body 中
  // 以使其定位是相对于 body 的
  document.body.append(ball);  
  // ...并将绝对定位的球放在鼠标指针下方

  moveAt(event.pageX, event.pageY);

  // 现在球的中心在 (pageX, pageY) 坐标上
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (3) 在 mousemove 事件上移动球
  document.addEventListener('mousemove', onMouseMove);

  // (4) 放下球，并移除不需要的处理程序
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
```

如果我们运行这段代码，我们会发现一些奇怪的事情。在拖放的一开始，球“分叉”了：我们开始拖动它的“克隆”。

```online
这是一个正在运行中的示例：

[iframe src="ball" height=230]

尝试拖放鼠标，你会看到这种奇怪的行为。
```

这是因为浏览器有自己的对图片和一些其他元素的拖放处理，会在我们拖放时自动运行，这与我们的拖放处理产生了冲突。

禁用它：

```js
ball.ondragstart = function() {
  return false;
};
```

现在一切都正常了。

```online
这是一个正在运行中的示例：

[iframe src="ball2" height=230]
```

另一个重要的方面是 —— 我们在 `document` 上跟踪 `mousemove`，而不是在 `ball` 上。乍一看，鼠标似乎总是在球的上方，我们可以将 `mousemove` 放在球上。

但正如我们所记得的那样，`mousemove` 会经常被触发，但不会针对每个像素都如此。因此，在快速移动鼠标后，鼠标指针可能会从球上跳转至文档中间的某个位置（甚至跳转至窗口外）。

因此，我们应该监听 `document` 以捕获它。

## 修正定位

在上述示例中，球在移动时，球的中心始终位于鼠标指针下方：

```js
ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
```

不错，但这存在副作用。要启动拖放，我们可以在球上的任意位置 `mousedown`。但是，

我们可以在球的任何地方使用 `mousedown` 来开始拖放。如果在边缘那么做，那么球就会突然“跳”到以指针为中心的位置。

如果我们保持元素相对指针的初始位移，情况会更好。

例如，我们从球的边缘处开始拖动，那么光标在拖动时应该保持在边缘。

![](ball_shift.svg)

1. 当访问者按下按钮（`mousedown`）时 —— 我们可以使用变量 `shiftX/shiftY` 来记住光标到球左上角的距离。我们应该在拖动时保持这样的距离。

    我们可以减去坐标来获取位移：

    ```js
    // onmousedown
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
    ```

    请注意，在 JavaScript 中没有获取文档坐标的方法，因此我们在这里使用相对于窗口的坐标。

2. 然后，在拖动球时，我们将球放置在相对于指针移动的位置上，就像这样：

    ```js
    // onmousemove
    // ball has position:absoute
    ball.style.left = event.pageX - *!*shiftX*/!* + 'px';
    ball.style.top = event.pageY - *!*shiftY*/!* + 'px';
    ```

具有更好定位的最终代码：

```js
ball.onmousedown = function(event) {

*!*
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;
*/!*

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // 球中心在 (pageX, pageY) 坐标上
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - *!*shiftX*/!* + 'px';
    ball.style.top = pageY - *!*shiftY*/!* + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (3) 用 mousemove 移动球
  document.addEventListener('mousemove', onMouseMove);

  // (4) 释放球，移除不需要的处理器
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

ball.ondragstart = function() {
  return false;
};
```

```online
In action (inside `<iframe>`):

[iframe src="ball3" height=230]
```

如果我们按在球的右下角进行拖动，这种差异就会特别明显。在前面的示例中，球在指针下“跳动”。现在，它从当前位置跟随鼠标会很流畅。

## 检测是否可释放

在之前的示例中，球可以停放到“任何地方”。在实际中，我们通常把一个元素放在另一个元素上。例如，将文件放入文件夹，或者用户放入回收站之类的操作。

抽象地，我们取一个（可拖放的）"draggable" 元素，并将其放在（可释放的）"droppable" 元素上。

我们需要知道拖放结束时的可释放目标 —— 执行相应的行为，最好是在拖动过程中高亮显示。

这个解决方案很有意思，只是有点麻烦，所以我们在这里提及相关内容。

第一个想法是什么？可能是将 `onmouseover/mouseup` 处理器放在潜在的可释放的元素上，然后检测鼠标指针出现在它们上面的时机。这样我们就知道了我们正在这个元素上进行拖/放操作

但这并不会运行。

问题是当我们拖动时，可拖动元素总是在其他元素之上。而且鼠标事件总是发生在顶部元素上，而不会在元素之下的其他元素上发生。

比如，下面有两个 `<div>` 元素，红色在蓝色顶部。没有方法可以在蓝色的事件中捕获到一个事件，因为红色在顶部：

```html run autorun height=60
<style>
  div {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
  }
</style>
<div style="background:blue" onmouseover="alert('never works')"></div>
<div style="background:red" onmouseover="alert('over red!')"></div>
```

与一个可以拖动的元素相同。球总是在其他元素之上，因此事件会在其上发生。无论我们在低元素上如何设置处理器，它们都不会起作用。

这就是为什么起初将处理器放在潜在的可释放的元素中的想法，在实际操作中无效的原因。它们无法运行。

那么，改如何做？

有一个叫做 `document.elementFromPoint(clientX, clientY)` 的方法。它会根据给定的窗口相对坐标，返回该处嵌套最深的元素（如果坐标在窗口之外，则返回 `null`）。

因此我们可以检测任何情况下的鼠标事件中，指针下面的潜在可释放元素，就像这样：

```js
// 在鼠标事件处理器中
ball.hidden = true; // (*)
let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
ball.hidden = false;
// elemBelow 是球下面的元素。如果它是可释放的，那么我们就可以对它进行处理。
```

请注意：我们需要在调用 `(*)` 之前隐藏球。否则，我们通常会在这些坐标上有个球，因为它的是在指针下的顶部元素：`elemBelow=ball`。

在任何时候，我们都可以使用该代码检测我们“掠过”的东西。当它发生时会进行释放处理。

拓展了 `onMouseMove` 方法，用来查找“可释放的”元素的代码：

```js
let currentDroppable = null; // 我们正在通过的可释放元素

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  ball.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  ball.hidden = false;

  // mousemove 事件可能会在窗口外被触发（当球被拖出屏幕时）
  // 如果 clientX/clientY 在窗口外，那么 elementfromPoint 会返回 null
  if (!elemBelow) return;

  // 潜在的可释放的将被标记为 "droppable" 类（可以是其他逻辑）
  let droppableBelow = elemBelow.closest('.droppable');

  if (currentDroppable != droppableBelow) { // 如果有任何改变
    // 鼠标的进入或者离开状态
    // 注意：它们的值都可能是 null
    // 如果鼠标不在一个可释放的物体上（例如，通过任意空白区域），那么 currentDroppable=null
    // droppableBelow=null 如果在这个事件中，我们不是在通过一个可释放的物体上

    if (currentDroppable) {
      // 处理“离开”可释放物体的逻辑
      leaveDroppable(currentDroppable);
    }
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      // 处理“进入”可释放物体的逻辑
      enterDroppable(currentDroppable);
    }
  }
}
```

在下面的示例中，当球被拖过足球门时，门会被高亮显示。

[codetabs height=250 src="ball4"]

现在在整个过程中，我们在 `currentDroppable` 变量中存储了当前 “drop target”，并且可以使用它来高亮显示或任何其他内容。

## 总结

我们考虑了一种基础的`拖放`算法。

关键部分：

1. 事件流：`ball.mousedown` -> `document.mousemove` -> `ball.mouseup`（取消原生 `ondragstart`）。
2. 在拖拽启动时 —— 记住指针相对于元素的初始位移：shiftX/shiftY` 并在拖动过程保持状态。
3. 使用 `document.elementFromPoint` 检测指针下可放置的元素。

我们可以在这个基础上做很多的工作。

- 在 `mouseup` 事件中我们可以完成释放：改变数据，移动元素
- 我们可以高亮我们涉及的元素。
- 我们可以把拖动范围限制在某个区域内
- 我们可以对 `mousedown/up` 使用事件委托。一个大范围事件处理器可以检查 `event.target`，它可以管理数百个元素的拖放。
- 等等。

有一些已经构建好架构的框架：`DragZone`、`Droppable`、`Draggable` 和其他类。它们中的大多数都做了类似的事情，所以现在应该很容易理解了。或者我们自己滚动，因为你已经了解了如何处理这个过程，它可能比适应其他东西更灵活。
