# 鼠标拖放事件

<<<<<<< HEAD
拖放（Drag'n'Drop）是一个很赞的界面解决方案。取某件东西并将其拖放是执行许多东西的一种简单明了的方式，从复制和移动文档（如在文件管理器中）到订购（将物品放入购物车）。

在现代 HTML 标准中有一个 [关于拖放的部分](https://html.spec.whatwg.org/multipage/interaction.html#dnd)，其中包含了例如 `dragstart` 和 `dragend` 等特殊事件。

这些事件很有用，因为它们使我们能够轻松地解决简单的任务。例如，使我们能够处理将“外部”文件拖放到浏览器中的操作，因此我们可以在 OS 文件管理器中获取文件，并将其拖放到浏览器窗口中，从而使 JavaScript 可以访问其内容。

但是，原生的拖放事件也有其局限性。例如，我们无法将拖放限制在某个区域内。并且，我们无法将拖放变成“水平”或“垂直”拖放。还有其他一些使用该 API 无法完成的拖放任务。此外，移动设备基本都不支持此事件。

因此，在这里我们将看到，如何使用鼠标事件来实现拖放。
=======
Drag'n'Drop is a great interface solution. Taking something and dragging and dropping it is a clear and simple way to do many things, from copying and moving documents (as in file managers) to ordering (dropping items into a cart).

In the modern HTML standard there's a [section about Drag and Drop](https://html.spec.whatwg.org/multipage/interaction.html#dnd) with special events such as `dragstart`, `dragend`, and so on.

These events allow us to support special kinds of drag'n'drop, such as handling dragging a file from OS file-manager and dropping it into the browser window. Then JavaScript can access the contents of such files.

But native Drag Events also have limitations. For instance, we can't prevent dragging from a certain area. Also we can't make the dragging "horizontal" or "vertical" only. And there are many other drag'n'drop tasks that can't be done using them. Also, mobile device support for such events is very weak.

So here we'll see how to implement Drag'n'Drop using mouse events.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

## 拖放算法

基础的拖放算法如下所示：

<<<<<<< HEAD
1. 在 `mousedown` 上 —— 根据需要准备要移动的元素（也许创建它的一个副本）。
2. 然后在 `mousemove` 上，通过更改 `left/top` 和 `position:absolute` 来移动它。
3. 在 `mouseup` 上 —— 执行与完成的拖放相关的所有行为。

这些是基础。稍后我们可以扩展它，例如，当鼠标悬停在元素上方时，高亮显示 "droppable"（可用于放置到）的元素。

下面是拖放一个球的算法：

```js
ball.onmousedown = function(event) { // (1) 启动处理

  // (2) 准备移动：确保 absolute，并通过设置 z-index 以确保球在顶部
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  // 将其从当前父元素中直接移动到 body 中
  // 以使其定位是相对于 body 的
  document.body.append(ball);  
  // ...并将绝对定位的球放在鼠标指针下方

  moveAt(event.pageX, event.pageY);
=======
1. On `mousedown` - prepare the element for moving, if needed (maybe create a clone of it, add a class to it or whatever).
2. Then on `mousemove` move it by changing `left/top` with `position:absolute`.
3. On `mouseup` - perform all actions related to finishing the drag'n'drop.

These are the basics. Later we'll see how to other features, such as highlighting current underlying elements while we drag over them.

Here's the implementation of dragging a ball:

```js
ball.onmousedown = function(event) { 
  // (1) prepare to moving: make absolute and on top by z-index
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(ball);  
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

  // 现在球的中心在 (pageX, pageY) 坐标上
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  // move our absolutely positioned ball under the pointer
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

<<<<<<< HEAD
  // (3) 在 mousemove 事件上移动球
  document.addEventListener('mousemove', onMouseMove);

  // (4) 放下球，并移除不需要的处理程序
=======
  // (2) move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // (3) drop the ball, remove unneeded handlers
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
```

<<<<<<< HEAD
如果我们运行这段代码，我们会发现一些奇怪的事情。在拖放的一开始，球“分叉”了：我们开始拖动它的“克隆”。
=======
If we run the code, we can notice something strange. On the beginning of the drag'n'drop, the ball "forks": we start dragging its "clone".
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```online
这是一个正在运行中的示例：

[iframe src="ball" height=230]

<<<<<<< HEAD
尝试拖放鼠标，你会看到这种奇怪的行为。
```

这是因为浏览器有自己的对图片和一些其他元素的拖放处理，会在我们拖放时自动运行，这与我们的拖放处理产生了冲突。
=======
Try to drag'n'drop with the mouse and you'll see such behavior.
```

That's because the browser has its own drag'n'drop support for images and some other elements. It runs automatically and conflicts with ours.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

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

<<<<<<< HEAD
但正如我们所记得的那样，`mousemove` 会经常被触发，但不会针对每个像素都如此。因此，在快速移动鼠标后，鼠标指针可能会从球上跳转至文档中间的某个位置（甚至跳转至窗口外）。
=======
But as we remember, `mousemove` triggers often, but not for every pixel. So after swift move the pointer can jump from the ball somewhere in the middle of document (or even outside of the window).
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

因此，我们应该监听 `document` 以捕获它。

## 修正定位

<<<<<<< HEAD
在上述示例中，球在移动时，球的中心始终位于鼠标指针下方：
=======
In the examples above the ball is always moved so, that it's center is under the pointer:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
```

<<<<<<< HEAD
不错，但这存在副作用。要启动拖放，我们可以在球上的任意位置 `mousedown`。但是，如果从球的边缘“抓住”球，那么球会突然“跳转”以使球的中心位于鼠标指针下方。
=======
Not bad, but there's a side-effect. To initiate the drag'n'drop, we can `mousedown` anywhere on the ball. But if "take" it from its edge, then the ball suddenly "jumps" to become centered under the mouse pointer.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

如果我们能够保持元素相对于鼠标指针的初始偏移，那就更好了。

<<<<<<< HEAD
例如，我们按住球的边缘处开始拖动，那么在拖动时，鼠标指针应该保持在一开始所按住的边缘位置上。

![](ball_shift.svg)

让我们更新一下我们的算法：
=======
For instance, if we start dragging by the edge of the ball, then the pointer should remain over the edge while dragging.

![](ball_shift.svg)

Let's update our algorithm:

1. When a visitor presses the button (`mousedown`) - remember the distance from the pointer to the left-upper corner of the ball in variables `shiftX/shiftY`. We'll keep that distance while dragging.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

1. 当访问者按下按钮（`mousedown`）时 —— 我们可以在变量 `shiftX/shiftY` 中记住鼠标指针到球左上角的距离。我们应该在拖动时保持这个距离。

    我们可以通过坐标相减来获取这个偏移：

    ```js
    // onmousedown
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
    ```

<<<<<<< HEAD
2. 然后，在拖动球时，我们将鼠标指针相对于球的这个偏移也考虑在内，像这样：
=======
2. Then while dragging we position the ball on the same shift relative to the pointer, like this:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

    ```js
    // onmousemove
    // 球具有 position:absoute
    ball.style.left = event.pageX - *!*shiftX*/!* + 'px';
    ball.style.top = event.pageY - *!*shiftY*/!* + 'px';
    ```

能够更好地进行定位的最终代码：

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

<<<<<<< HEAD
  // 移动现在位于坐标 (pageX, pageY) 上的球
  // 将初始的偏移考虑在内
=======
  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - *!*shiftX*/!* + 'px';
    ball.style.top = pageY - *!*shiftY*/!* + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

<<<<<<< HEAD
  // 在 mousemove 事件上移动球
  document.addEventListener('mousemove', onMouseMove);

  // 放下球，并移除不需要的处理程序
=======
  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
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

<<<<<<< HEAD
如果我们按住球的右下角来进行拖动，这种差异会尤其明显。在前面的示例中，球会在鼠标指针下“跳转”一下。现在，更新后的代码可以让我们从当前位置流畅地跟随鼠标。

## 潜在的放置目标

在前面的示例中，球可以被放置（drop）到“任何地方”。在实际中，我们通常是将一个元素放到另一个元素上。例如，将一个“文件”放置到一个“文件夹”或者其他地方。

抽象地讲，我们取一个 "draggable" 的元素，并将其放在 "droppable" 的元素上。

我们需要知道：
- 在拖放结束时，所拖动的元素要放在哪里 —— 执行相应的行为
- 并且，最好知道我们所拖动到的 "droppable" 的元素的位置，并高亮显示 "droppable" 的元素。
=======
The difference is especially noticeable if we drag the ball by its right-bottom corner. In the previous example the ball "jumps" under the pointer. Now it fluently follows the pointer from the current position.

## Potential drop targets (droppables)

In previous examples the ball could be dropped just "anywhere" to stay. In real-life we usually take one element and drop it onto another. For instance, a "file" into a "folder" or something else.

Speaking abstract, we take a "draggable" element and drop it onto "droppable" element.

We need to know:
- where the element was dropped at the end of Drag'n'Drop -- to do the corresponding action,
- and, preferably, know the droppable we're dragging over, to highlight it.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

这个解决方案很有意思，只是有点麻烦，所以我们在这儿对此进行介绍。

<<<<<<< HEAD
第一个想法是什么？可能是将 `onmouseover/mouseup` 处理程序放在潜在的 "droppable" 的元素中？
=======
What may be the first idea? Probably to set `mouseover/mouseup` handlers on potential droppables?
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

但这行不通。

问题在于，当我们拖动时，可拖动元素一直是位于其他元素上的。而鼠标事件只发生在顶部元素上，而不是发生在那些下面的元素。

<<<<<<< HEAD
例如，下面有两个 `<div>` 元素，红色的在蓝色的上面（完全覆盖）。这里，在蓝色的 `<div>` 中没有办法来捕获事件，因为红色的 `<div>` 在它上面：
=======
For instance, below are two `<div>` elements, red one on top of the blue one (fully covers). There's no way to catch an event on the blue one, because the red is on top:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

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

<<<<<<< HEAD
与可拖动的元素相同。球始终位于其他元素之上，因此事件会发生在球上。无论我们在较低的元素上设置什么处理程序，它们都不会起作用。
=======
The same with a draggable element. The ball is always on top over other elements, so events happen on it. Whatever handlers we set on lower elements, they won't work.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

这就是一开始的那个想法，将处理程序放在潜在的 "droppable" 的元素，在实际操作中不起作用的原因。它们不会运行。

那么，该怎么办？

<<<<<<< HEAD
有一个叫做 `document.elementFromPoint(clientX, clientY)` 的方法。它会返回在给定的窗口相对坐标处的嵌套的最深的元素（如果给定的坐标在窗口外，则返回 `null`）。

我们可以在我们的任何鼠标事件处理程序中使用它，以检测鼠标指针下的潜在的 "droppable" 的元素，就像这样：

```js
// 在一个鼠标事件处理程序中
ball.hidden = true; // (*) 隐藏我们拖动的元素

let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// elemBelow 是球下方的元素，可能是 droppable 的元素
=======
There's a method called `document.elementFromPoint(clientX, clientY)`. It returns the most nested element on given window-relative coordinates (or `null` if given coordinates are out of the window).

We can use it in any of our mouse event handlers to detect the potential droppable under the pointer, like this:

```js
// in a mouse event handler
ball.hidden = true; // (*) hide the element that we drag

let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// elemBelow is the element below the ball, may be droppable
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

ball.hidden = false;
```

<<<<<<< HEAD
请注意：我们需要在调用 `(*)` 之前隐藏球。否则，我们通常会在这些坐标上有一个球，因为它是在鼠标指针下的最顶部的元素：`elemBelow=ball`。

我们可以使用该代码来检查我们正在“飞过”的元素是什么。并在放置（drop）时，对放置进行处理。
=======
Please note: we need to hide the ball before the call `(*)`. Otherwise we'll usually have a ball on these coordinates, as it's the top element under the pointer: `elemBelow=ball`. So we hide it and immediately show again.

We can use that code to check what element we're "flying over" at any time. And handle the drop when it happens.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

基于 `onMouseMove` 扩展的代码，用于查找 "droppable" 的元素：

```js
<<<<<<< HEAD
// 我们当前正在飞过的潜在的 droppable 的元素
=======
// potential droppable that we're flying over right now
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
let currentDroppable = null;

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  ball.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  ball.hidden = false;

<<<<<<< HEAD
  // mousemove 事件可能会在窗口外被触发（当球被拖出屏幕时）
  // 如果 clientX/clientY 在窗口外，那么 elementfromPoint 会返回 null
=======
  // mousemove events may trigger out of the window (when the ball is dragged off-screen)
  // if clientX/clientY are out of the window, then elementFromPoint returns null
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
  if (!elemBelow) return;

  // 潜在的 droppable 的元素被使用 "droppable" 类进行标记（也可以是其他逻辑）
  let droppableBelow = elemBelow.closest('.droppable');

  if (currentDroppable != droppableBelow) {
<<<<<<< HEAD
    // 我们正在飞入或飞出...
    // 注意：它们两个的值都可能为 null
    //   currentDroppable=null —— 如果我们在此事件之前，鼠标指针不是在一个 droppable 的元素上（例如空白处）
    //   droppableBelow=null —— 如果现在，在当前事件中，我们的鼠标指针不是在一个 droppable 的元素上
=======
    // we're flying in or out...
    // note: both values can be null
    //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
    //   droppableBelow=null if we're not over a droppable now, during this event
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

    if (currentDroppable) {
      // 处理“飞出” droppable 的元素时的处理逻辑（移除高亮）
      leaveDroppable(currentDroppable);
    }
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      // 处理“飞入” droppable 的元素时的逻辑
      enterDroppable(currentDroppable);
    }
  }
}
```

在下面这个示例中，当球被拖到球门上时，球门会被高亮显示。

[codetabs height=250 src="ball4"]

<<<<<<< HEAD
现在，我们在整个处理过程中，在当前变量 `currentDroppable` 中都存储了当前的“放置目标”，可以用它来进行高亮显示或者其他操作。
=======
Now we have the current "drop target", that we're flying over, in the variable `currentDroppable` during the whole process and can use it to highlight or any other stuff.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

## 总结

<<<<<<< HEAD
我们考虑了一种基础的拖放算法。
=======
We considered a basic Drag'n'Drop algorithm.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

关键部分：

<<<<<<< HEAD
1. 事件流：`ball.mousedown` -> `document.mousemove` -> `ball.mouseup`（不要忘记取消原生 `ondragstart`）。
2. 在拖动开始时 —— 记住鼠标指针相对于元素的初始偏移（shift）：`shiftX/shiftY`，并在拖动过程中保持它不变。
3. 使用 `document.elementFromPoint` 检测鼠标指针下的 "droppable" 的元素。
=======
1. Events flow: `ball.mousedown` -> `document.mousemove` -> `ball.mouseup` (don't forget to cancel native `ondragstart`).
2. At the drag start -- remember the initial shift of the pointer relative to the element: `shiftX/shiftY` and keep it during the dragging.
3. Detect droppable elements under the pointer using `document.elementFromPoint`.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

我们可以在此基础上做很多事情。

<<<<<<< HEAD
- 在 `mouseup` 上，我们可以智能地完成放置（drop）：更改数据，移动元素。
- 我们可以高亮我们正在“飞过”的元素。
- 我们可以将拖动限制在特定的区域或者方向。
- 我们可以对 `mousedown/up` 使用事件委托。一个大范围的用于检查 `event.target` 的事件处理程序可以管理数百个元素的拖放。
- 等。

有一些在此基础上已经将体系结构构建好的框架：`DragZone`，`Droppable`，`Draggable` 及其他 class。它们中的大多数做的都是与上述类似的事情，所以现在你应该很容易理解它们了。或者自己动手实现。正如你所看到的，其实挺简单的，有时候比基于第三方解决方案进行改写还容易。
=======
- On `mouseup` we can intellectually finalize the drop: change data, move elements around.
- We can highlight the elements we're flying over.
- We can limit dragging by a certain area or direction.
- We can use event delegation for `mousedown/up`. A large-area event handler that checks  `event.target` can manage Drag'n'Drop for hundreds of elements.
- And so on.

There are frameworks that build architecture over it: `DragZone`, `Droppable`, `Draggable` and other classes. Most of them do the similar stuff to what's described above, so it should be easy to understand them now. Or roll your own, as you can see that that's easy enough to do, sometimes easier than adapting a third-part solution.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
