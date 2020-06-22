
<<<<<<< HEAD
算法看起来很简单：
1. 将 `onmouseover/out` 处理程序放在元素上。在这里也可以使用 `onmouseenter/leave`，但是它们的通用性较差，如果我们想引入事件委托时，它则无法使用。
2. 当鼠标指针进入元素时，开始测量 `mousemove` 上的速度。
3. 如果速度慢，则运行 `over`。
4. 当我们的鼠标指针要移出元素，并且 `over` 也执行了，则会运行 `out`。

但是如何测量速度？

第一个想法是：每 `100ms` 运行一次函数，并测量前坐标和新坐标之间的距离。如果很小，那么速度就很小。
=======
The algorithm looks simple:
1. Put `onmouseover/out` handlers on the element. Also can use `onmouseenter/leave` here, but they are less universal, won't work if we introduce delegation.
2. When a mouse cursor entered the element, start measuring the speed on `mousemove`.
3. If the speed is slow, then run `over`.
4. When we're going out of the element, and `over` was executed, run `out`.

But how to measure the speed?

The first idea can be: run a function every `100ms` and measure the distance between previous and new coordinates. If it's small, then the speed is small.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

不幸的是，在 JavaScript 中无法获取“鼠标当前坐标”。没有像 `getCurrentMouseCoordinates()` 这样的函数。

<<<<<<< HEAD
获取坐标的唯一方法是监听例如 `mousemove` 这样的鼠标事件。

因此，我们可以在 `mousemove` 上设置一个处理程序来跟踪坐标并记住它们。然后我每 `100ms` 比较一次。
=======
The only way to get coordinates is to listen for mouse events, like `mousemove`, and take coordinates from the event object.

So let's set a handler on `mousemove` to track coordinates and remember them. And then compare them, once per `100ms`.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

P.S. 请注意：解决方案测试使用 `dispatchEvent` 来检查工具提示是否正确。
