# 拖放鼠标事件

<<<<<<< HEAD
拖放是一个很好的界面解决方案。从复制和移动（参考文件管理）到排序（放入购物车），拖放是一种简洁明了的方法。

在现代 HTML 标准中，有一个[拖动事件的部分](https://html.spec.whatwg.org/multipage/interaction.html#dnd)。

这很有趣，因为它们允许轻松地解决一些简单的任务，而且允许处理“外部”文件拖放到浏览器中的事件。因此我们可以在 OS 文件管理中获取文件，并将其拖动到浏览器窗口。然后 JavaScript 获取对其内容的访问权限。

但是本地的拖动事件总是有局限性。比如，我们可以把拖动范围限制在某个区域内。而且我们也可以把它变成 "horizontal" 或 "vertical"。还有其他的拖放任务无法通过使用 API 实现。

在这里，我们将看到如何使用鼠标事件实现拖放。并不难。
=======
Drag'n'Drop is a great interface solution. Taking something, dragging and dropping is a clear and simple way to do many things, from copying and moving documents (as in file managers) to ordering (drop into cart).

In the modern HTML standard there's a [section about Drag and Drop](https://html.spec.whatwg.org/multipage/interaction.html#dnd) with special events such as `dragstart`, `dragend` and so on.

They are interesting because they allow to solve simple tasks easily, and also allow to handle drag'n'drop of "external" files into the browser. So we can take a file in the OS file-manager and drop it into the browser window. Then JavaScript gains access to its contents.

But native Drag Events also have limitations. For instance, we can't limit dragging by a certain area. Also we can't make it "horizontal" or "vertical" only. There are other drag'n'drop tasks that can't be done using that API. Besides, mobile devices support for such events is almost non-existant.

So here we'll see how to implement Drag'n'Drop using mouse events.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

## 拖放算法

拖放基础算法就像这样：

<<<<<<< HEAD
1. 在可拖动元素上捕获 `mousedown` 事件。
2. 准备要移动的元素（可能创建它的副本或其他任何东西）。
3. 然后在 `mousemove` 上，通过改变 `left/top` 和 `position:absolute` 来移动它。
4. 在 `mouseup`（释放按钮）中 —— 执行所有完成拖放相关的动作。

这些是基础。我们可以对其进行拓展，例如，当鼠标在可拖动元素上悬停时，高亮这个元素。
=======
1. On `mousedown` - prepare the element for moving, if needed (maybe create a copy of it).
2. Then on `mousemove` move it by changing `left/top` and `position:absolute`.
3. On `mouseup` - perform all actions related to a finished Drag'n'Drop.

These are the basics. Later we can extend it, for instance, by highlighting droppable (available for the drop) elements when hovering over them.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

这是拖放球的算法：

```js
ball.onmousedown = function(event) { // (1) 启动进程

  // (2) 准备移动：确保 absolute，以及用 z-index 确保在顶部
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  // 将它从当前父亲中直接移到 body 中
  // 确保它的位置是相对于 body 的
  document.body.append(ball);  
<<<<<<< HEAD
  // ...将绝对定位的球放在光标下
=======
  // ...and put that absolutely positioned ball under the pointer
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

  moveAt(event.pageX, event.pageY);

  // 球中心在 (pageX, pageY) 坐标上
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (3) 在 mousemove 事件中移动球
  document.addEventListener('mousemove', onMouseMove);

  // (4) 释放球，移除不需要的处理器
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
```

<<<<<<< HEAD
如果我们运行代码，我们会发现一些奇怪的事情。在拖放的一开始，球会 "forks"：我们开始拖动它的 "clone"。
=======
If we run the code, we can notice something strange. On the beginning of the drag'n'drop, the ball "forks": we start dragging its "clone".
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

```online
这是一个动作实例：

[iframe src="ball" height=230]

<<<<<<< HEAD
尝试拖放鼠标，你会看到奇怪的行为。
=======
Try to drag'n'drop the mouse and you'll see such behavior.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
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

另一个重要的方面是 —— 我们在 `document` 上跟踪 `mousemove`，而不是在 `ball` 上。第一眼看，鼠标似乎总是在球的上方，我们可以在上面放 `mousemove`。

<<<<<<< HEAD
正如我们记得的那样，`mousemove` 会经常被触发，但不会针对每个像素都如此。因此在快速移动之后，光标可以从文档中心的某个地方（甚至是窗口外）从球上跳出来。
=======
But as we remember, `mousemove` triggers often, but not for every pixel. So after swift move the pointer can jump from the ball somewhere in the middle of document (or even outside of the window).
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

因此为了捕获它，我们应该监听 `document`。

## 修正定位

<<<<<<< HEAD
在上述例子中，球总是以指针为中心的：
=======
In the examples above the ball is always moved so, that it's center is under the pointer:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

```js
ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
```

<<<<<<< HEAD
不错，但这存在副作用。我们可以在球的任何地方使用 `mousedown` 来开始拖放。如果在边缘那么做，那么球就会突然“跳”到以指针为中心的位置。
=======
Not bad, but there's a side-effect. To initiate the drag'n'drop, we can `mousedown` anywhere on the ball. But if "take" it from its edge, then the ball suddenly "jumps" to become centered under the mouse pointer.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

如果我们保持元素相对指针的初始位移，情况会更好。

<<<<<<< HEAD
例如，我们从球的边缘处开始拖动，那么光标在拖动时应该保持在边缘。

![](ball_shift.svg)

1. 当访问者按下按钮（`mousedown`）时 —— 我们可以使用变量 `shiftX/shiftY` 来记住光标到球左上角的距离。我们应该在拖动时保持这样的距离。
=======
For instance, if we start dragging by the edge of the ball, then the pointer should remain over the edge while dragging.

![](ball_shift.svg)

Let's update our algorithm:

1. When a visitor presses the button (`mousedown`) - remember the distance from the pointer to the left-upper corner of the ball in variables `shiftX/shiftY`. We'll keep that distance while dragging.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

    我们可以减去坐标来获取位移：

    ```js
    // onmousedown
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
    ```

<<<<<<< HEAD
    请注意，在 JavaScript 中没有获取文档坐标的方法，因此我们在这里使用相对于窗口的坐标。

2. 然后，在拖动球时，我们将球放置在相对于指针移动的位置上，就像这样：
=======
2. Then while dragging we position the ball on the same shift relative to the pointer, like this:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

    ```js
    // onmousemove
    // у мяча ball стоит position:absoute
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

<<<<<<< HEAD
  // 球中心在 (pageX, pageY) 坐标上
=======
  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - *!*shiftX*/!* + 'px';
    ball.style.top = pageY - *!*shiftY*/!* + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

<<<<<<< HEAD
  // (3) 用 mousemove 移动球
  document.addEventListener('mousemove', onMouseMove);

  // (4) 释放球，移除不需要的处理器
=======
  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
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
如果我们按在球的右下角进行拖动，这种差异就会特别明显。在前面的示例中，球在指针下“跳动”。现在，它从当前位置跟随鼠标会很流畅。

## 检测是否可释放

在之前的示例中，球可以停放到“任何地方”。在实际中，我们通常把一个元素放在另一个元素上。例如，将文件放入文件夹，或者用户放入回收站之类的操作。

抽象地，我们取一个（可拖放的）"draggable" 元素，并将其放在（可释放的）"droppable" 元素上。

我们需要知道拖放结束时的可释放目标 —— 执行相应的动作，最好是在拖动过程中高亮显示。
=======
The difference is especially noticeable if we drag the ball by its right-bottom corner. In the previous example the ball "jumps" under the pointer. Now it fluently follows the pointer from the current position.

## Potential drop targets (droppables)

In previous examples the ball could be dropped just "anywhere" to stay. In real-life we usually take one element and drop it onto another. For instance, a "file" into a "folder" or something else.

Speaking abstract, we take a "draggable" element and drop it onto "droppable" element.

We need to know:
- where the element was dropped at the end of Drag'n'Drop -- to do the corresponding action,
- and, preferably, know the droppable we're dragging over, to highlight it.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

这个解决方案很有意思，只是有点麻烦，所以我们在这里提及相关内容。

<<<<<<< HEAD
第一个想法是什么？可能是将 `onmouseover/mouseup` 处理器放在潜在的可释放的元素上，然后检测鼠标指针出现在它们上面的时机。这样我们就知道了我们正在这个元素上进行拖/放操作
=======
What may be the first idea? Probably to set `mouseover/mouseup` handlers on potential droppables?
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

但这并不会运行。

问题是当我们拖动时，可拖动元素总是在其他元素之上。而且鼠标事件总是发生在顶部元素上，而不会在元素之下的其他元素上发生。

<<<<<<< HEAD
比如，下面有两个 `<div>` 元素，红色在蓝色顶部。没有方法可以在蓝色的事件中捕获到一个事件，因为红色在顶部：
=======
For instance, below are two `<div>` elements, red one on top of the blue one (fully covers). There's no way to catch an event on the blue one, because the red is on top:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

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
与一个可以拖动的元素相同。球总是在其他元素之上，因此事件会在其上发生。无论我们在低元素上如何设置处理器，它们都不会起作用。
=======
The same with a draggable element. The ball is always on top over other elements, so events happen on it. Whatever handlers we set on lower elements, they won't work.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

这就是为什么起初将处理器放在潜在的可释放的元素中的想法，在实际操作中无效的原因。它们无法运行。

那么，改如何做？

<<<<<<< HEAD
有一个叫做 `document.elementFromPoint(clientX, clientY)` 的方法。它会根据给定的窗口相对坐标，返回该处嵌套最深的元素（如果坐标在窗口之外，则返回 `null`）。

因此我们可以检测任何情况下的鼠标事件中，指针下面的潜在可释放元素，就像这样：

```js
// 在鼠标事件处理器中
ball.hidden = true; // (*)
=======
There's a method called `document.elementFromPoint(clientX, clientY)`. It returns the most nested element on given window-relative coordinates (or `null` if given coordinates are out of the window).

We can use it in any of our mouse event handlers to detect the potential droppable under the pointer, like this:

```js
// in a mouse event handler
ball.hidden = true; // (*) hide the element that we drag

>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// elemBelow is the element below the ball, may be droppable

ball.hidden = false;
<<<<<<< HEAD
// elemBelow 是球下面的元素。如果它是可释放的，那么我们就可以对它进行处理。
```

请注意：我们需要在调用 `(*)` 之前隐藏球。否则，我们通常会在这些坐标上有个球，因为它的是在指针下的顶部元素：`elemBelow=ball`。

在任何时候，我们都可以使用该代码检测我们“掠过”的东西。当它发生时会进行释放处理。
=======
```

Please note: we need to hide the ball before the call `(*)`. Otherwise we'll usually have a ball on these coordinates, as it's the top element under the pointer: `elemBelow=ball`. So we hide it and immediately show again.

We can use that code to check what element we're "flying over" at any time. And handle the drop when it happens.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

拓展了 `onMouseMove` 方法，用来查找“可释放的”元素的代码：

```js
<<<<<<< HEAD
let currentDroppable = null; // 我们正在通过的可释放元素
=======
// potential droppable that we're flying over right now
let currentDroppable = null;
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

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
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
  if (!elemBelow) return;

  // 潜在的可释放的将被标记为 "droppable" 类（可以是其他逻辑）
  let droppableBelow = elemBelow.closest('.droppable');

<<<<<<< HEAD
  if (currentDroppable != droppableBelow) { // 如果有任何改变
    // 鼠标的进入或者离开状态
    // 注意：它们的值都可能是 null
    // 如果鼠标不在一个可释放的物体上（例如，通过任意空白区域），那么 currentDroppable=null
    // droppableBelow=null 如果在这个事件中，我们不是在通过一个可释放的物体上
=======
  if (currentDroppable != droppableBelow) {
    // we're flying in or out...
    // note: both values can be null
    //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
    //   droppableBelow=null if we're not over a droppable now, during this event
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

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

<<<<<<< HEAD
现在在整个过程中，我们在 `currentDroppable` 变量中存储了当前 “drop target”，并且可以使用它来高亮显示或任何其他内容。
=======
Now we have the current "drop target", that we're flying over, in the variable `currentDroppable` during the whole process and can use it to highlight or any other stuff.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

## 总结

<<<<<<< HEAD
我们考虑了一种基础的`拖放`算法。
=======
We considered a basic Drag'n'Drop algorithm.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

关键部分：

<<<<<<< HEAD
1. 事件流：`ball.mousedown` -> `document.mousemove` -> `ball.mouseup`（取消原生 `ondragstart`）。
2. 在拖拽启动时 —— 记住指针相对于元素的初始位移：shiftX/shiftY` 并在拖动过程保持状态。
3. 使用 `document.elementFromPoint` 检测指针下可放置的元素。
=======
1. Events flow: `ball.mousedown` -> `document.mousemove` -> `ball.mouseup` (don't forget to cancel native `ondragstart`).
2. At the drag start -- remember the initial shift of the pointer relative to the element: `shiftX/shiftY` and keep it during the dragging.
3. Detect droppable elements under the pointer using `document.elementFromPoint`.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

我们可以在这个基础上做很多的工作。

<<<<<<< HEAD
- 在 `mouseup` 事件中我们可以完成释放：改变数据，移动元素
- 我们可以高亮我们涉及的元素。
- 我们可以把拖动范围限制在某个区域内
- 我们可以对 `mousedown/up` 使用事件委托。一个大范围事件处理器可以检查 `event.target`，它可以管理数百个元素的拖放。
- 等等。

有一些已经构建好架构的框架：`DragZone`、`Droppable`、`Draggable` 和其他类。它们中的大多数都做了类似的事情，所以现在应该很容易理解了。或者我们自己滚动，因为你已经了解了如何处理这个过程，它可能比适应其他东西更灵活。
=======
- On `mouseup` we can intellectually finalize the drop: change data, move elements around.
- We can highlight the elements we're flying over.
- We can limit dragging by a certain area or direction.
- We can use event delegation for `mousedown/up`. A large-area event handler that checks  `event.target` can manage Drag'n'Drop for hundreds of elements.
- And so on.

There are frameworks that build architecture over it: `DragZone`, `Droppable`, `Draggable` and other classes. Most of them do the similar stuff to described above, so it should be easy to understand them now. Or roll our own, as you can see that's easy enough to do, sometimes easier than adapting a third-part solution.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
