# 拖放鼠标事件

拖放是一个很好的界面解决方案。从复制和移动（参考文件管理）到排序（放入购物车），拖动和施放是一种简洁明了的方法。

在现代 HTML 标准中，有一个[拖动事件的部分](https://html.spec.whatwg.org/multipage/interaction.html#dnd)。

这很有趣，以为它们允许轻松地解决一些简单的任务，而且允许处理“外部”文件拖放到浏览器中。因此我们可以在 OS 文件管理中获取文件，并将其拖动到浏览器窗口。然后 JavaScript 获取对其内容的访问权限。

但是本地的拖动时间总是有局限性。比如，我们可以通过某个区域来限制拖动。而且我们也可以把它变成 "horizontal" 或 "vertical"。还有其他的拖放任务无法通过使用 API 实现。

在这里，我们将看到如何使用鼠标事件实现拖放。并不难。

## 拖放算法

拖放基础算法就像这样：

1. 在可拖动元素上捕获 `mousedown`。
2. 准备要移动的元素（可能创建它的副本或其他任何东西）。
3. 然后在 `mousemove` 上，通过改变 `left/top` 和 `position:absolute` 来移动它。
4. 在 `mouseup`（释放按钮）中 —— 执行所有完成相关拖放的动作。

这些是基础。我们可以继承它，例如，我们可以在可拖动元素上悬停时，高亮显示过的元素（对于可用的拖动）来继承它。

这是拖放球的算法：

```js
ball.onmousedown = function(event) { // (1) 启动进程

  // (2) 准备移动：确保 absolute，以及用 z 下标确保在顶部
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  // 将它从当前父亲中直接移到 body 中
  // 确保它的位置是相对于 body 的
  document.body.append(ball);  
  // ...将绝对定位的球放在光标下

  moveAt(event.pageX, event.pageY);

  // 球中心在 (pageX, pageY) 坐标上
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
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
```

如果我们运行代码，我们会发现一些奇怪的事情。在拖放的一开始，球会 "forks"：我们开始拖动它的 "clone"。

```online
这是一个动作实例：

[iframe src="ball" height=230]

尝试拖放鼠标，你会看到奇怪的行为。
```

这是因为浏览器有自己拖放图像功能和其他一些自动运行可能与我们的产生冲突的元素。

如果禁用：

```js
ball.ondragstart = function() {
  return false;
};
```

现在一切都会好起来的。

```online
动作：

[iframe src="ball2" height=230]
```

另一个重要的方面是 —— 我们在 `document` 上跟踪 `mousemove`，而不是 `ball`。第一眼看，鼠标似乎总是在球的上方，我们可以在上面放 `mousemove`。

正如我们记得的那样，`mousemove` 会经常被触发，但不会针对每个像素都如此。因此在快速移动之后，光标可以从文档中心的某个地方（甚至是窗口外）从球上跳出来。

因此为了捕获它，我们应该监听 `document`。

## Correct positioning

在上述例子中，球中是以指针为中心的：

```js
ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
```

不错，但这存在副作用。我们可以在球的任何地方使用 `mousedown` 来开始 drag'n'drop。如果在边缘那么做，那么球就会 "jumps" 到中心。

如果我们保持元素相对指针的初始位移，情况会更好。

例如，如果我们开始拖动球的边缘，那么光标在拖动时应该保持在边缘上方。

![](ball_shift.png)

1. 当访问者按下按钮（`mousedown`）时 —— 我们可以使用变量 `shiftX/shiftY` 来记住光标到球左上角的距离。我们应该在拖动时确保距离的正确性。

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

如果我们将球拖动到右下角，这种差异就会特别明显。在前面的示例中，球在指针下“跳动”。现在，它从当前位置可以跟踪光标会很流畅。

## 检测是否可释放

在之前的示例中，可以被释放到“任何地方”来停留。在实际中，我们通常把一个元素放在另一个元素上。例如，将文件放入文件夹，或者用户放入回收站之类的操作。

抽象地，我们取一个 "draggable" 元素，并将其放在 "droppable" 元素上。

我们需要知道拖放结束时的可释放目标 —— 执行相应的动作，最好是在拖动过程中高亮显示。

这个解决方案很有意思，只是有点麻烦，所以我们在这里提及相关内容。

第一个想法是什么？可能是将 `onmouseover/mouseup` 处理器放在潜在的可释放的元素上，然后检测鼠标指正出现在它们上面的时机。这样我们就知道了我们正在拖放这个元素。

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

这就是为什么起初将处理器放在潜在的下降指针中的想法，在实际操作中无效的原因。它们无法运行。

那么，改如何做？

有一个叫做 `document.elementFromPoint(clientX, clientY)` 的方法。它会返回给定窗口相对坐标上嵌套最深的元素（如果坐标在窗口之外，则返回 `null`）。

因此我们可以检测任何情况下的鼠标事件中，指针潜在的下降，就像这样：

```js
// 在鼠标事件处理器中
ball.hidden = true; // (*)
let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
ball.hidden = false;
// elemBelow 是球下面的元素。如果它是可释放的，那么我们就可以对它进行处理。
```

请注意：我们需要在调用 `(*)` 之前隐藏球。否则，我们通常会在这些坐标上有个球，因为它的是在指针下的顶部元素：`elemBelow=ball`。

我们可以使用该代码来检测我们“掠过”内容的时机。当它发生时会进行释放处理。

查找“可释放的”元素的 `onMouseMove` 来继承：

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

  if (currentDroppable != droppableBelow) { // if there are any changes
    // 我们正在通过或者已经通过
    // 注意：它们的值都可能是 null
    //   currentDroppable=null如果我们不是通过一个可释放的（例如，通过任意空白区域）
    //   droppableBelow=null 如果在这个事件中，我们不是在通过一个可释放的

    if (currentDroppable) {
      // 处理“已经通过”的逻辑（移除高亮）
      leaveDroppable(currentDroppable);
    }
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      // 处理通过“可释放”的逻辑
      enterDroppable(currentDroppable);
    }
  }
}
```

在下面的示例中，当球被拖过足球门时，门会被高亮显示。

[codetabs height=250 src="ball4"]

现在在整个过程中，我们在 `currentDroppable` 变量中有了当前 “drop target”，并且可以使用它来高亮显示或任何其他内容。

## 总结

我们考虑了一种基础的拖放算法。

关键组合：

1. 事件流：`ball.mousedown` -> `document.mousemove` -> `ball.mouseup`（取消原生 `ondragstart`）。
2. 在拖拽启动时 —— 记住指针相对于元素的初始位移：shiftX/shiftY` 并在拖动过程保持状态。
3. 使用 `document.elementFromPoint` 检测指针下可放置的元素。

我们可以在这个基础上做很多的工作。

- 在 `mouseup` 上我们可以最终确定丢弃：e can finalize the drop: change data, move elements around.
- 我们可以高亮我们涉及的元素。
- 我们可以限制某一区域或方向的拖动。
- 我们可以对 `mousedown/up` 使用进行事件委托。一个大范围事件处理器可以检查 `event.target`，它可以管理数百个元素的拖放。
- 等待。

有一些框架可以在上面构建架构：`DragZone`、`Droppable`、`Draggable` 和其他类。它们中的大多数都做了类似的事情，所以现在应该很容易理解了。或者我们自己滚动，因为你已经了解了如何处理这个过程，它可能比适应其他东西更灵活。
