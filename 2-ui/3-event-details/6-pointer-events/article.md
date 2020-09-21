# 指针事件

指针事件（Pointer Events）是一种用于处理来自各种输入设备（例如鼠标、触控笔和触摸屏等）的输入信息的现代化解决方案。

## 一段简史

让我们先做一个简短的概览，以便你对指针事件及其在其它事件类型中所处位置有个粗略认识。

- 很早以前，浏览器只存在鼠标事件。

    后来，触屏设备出现了。为了让以前的代码正常运行，触屏设备也沿用了鼠标事件。比如，轻触屏幕就会触发 `mousedown` 事件。但由于触摸设备在诸多方面都更加强大，而鼠标事件就显得心有余而力不足了。比如，我们可以同时触控多点，而鼠标事件并没有相关属性。

- 为了实现一些触摸屏特有的特性（这里不再赘述这些特性，因为指针事件更加完善），人们引入了触摸事件，例如 `touchstart`、`touchend`、`touchmove`。

    不过这还是不够完美。因为很多其他输入设备（如触控笔）都有自己的特性。而且同时维护两份分别处理鼠标事件和触摸事件的代码，显得有些笨重了。

- 为了解决这些问题，人们引入了全新的规范「指针事件」。它为各种指针输入设备提供了一套统一的事件。

目前，各大主流浏览器已经支持了 [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) 标准，[Pointer Events Level 3](https://w3c.github.io/pointerevents/) 也已经在路上了。所以，除非你专门为 IE 10 或 Safari 12 以下版本的浏览器构建代码，否则无需继续使用鼠标事件或触摸事件，你可以安全地使用指针事件。

话虽如此，指针事件仍然有一些重要的奇怪特性，你应当对它们有所了解以避免一些意料之外的错误。我们会在本文中一一介绍。

## 指针事件类型

指针事件的命名方式和鼠标事件类似：

| 指针事件 | 鼠标事件 |
|---------------|-------------|
| `pointerdown` | `mousedown` |
| `pointerup` | `mouseup` |
| `pointermove` | `mousemove` |
| `pointerover` | `mouseover` |
| `pointerout` | `mouseout` |
| `pointerenter` | `mouseenter` |
| `pointerleave` | `mouseleave` |
| `pointercancel` | - |
| `gotpointercapture` | - |
| `lostpointercapture` | - |

不难发现，每一个 `mouse<event>` 都有与之相对应的 `pointer<event>`。同时还有 3 个额外的事件没有相应的 `mouse...`，我们会在稍后详细解释它们。

```smart header="在代码中用 `pointer<event>` 替换 `mouse<event>`"
我们可以把代码中的 `mouse<event>` 都替换成 `pointer<event>`，程序仍然正常兼容鼠标设备。

替换之后，程序对触屏设备的支持会“魔法般”地提升。但你可能需要在 CSS 中添加一行规则 `touch-action: none`。我们会在下文 `pointercancel` 一节中描述这里面的细节。
```

## 指针事件属性

指针事件具备和鼠标事件完全相同的属性，包括 `clientX/Y` 和 `target` 等，以及一些额外的属性：

- `pointerId` —— 触发当前事件的指针唯一标识符。
    
    可以用来处理多指针的情况，比如带有触控笔和多点触控功能（将在下文详述）的触摸屏。
- `pointerType` —— 指针的设备类型，必须为一个字符串。可以是："mouse"、"pen" 或 "touch"。

    我们可以使用这个属性来针对不同类型的指针输入做出不同响应。
- `isPrimary` —— 当指针为首要指针（多点触控时按下的第一根手指）时为 `true`。

对于一些能够测量接触面积和点按压力的指针（例如一根手指压在触屏上），这些额外属性会比较有用：

- `width` —— 触摸接触面积的宽度。对于不支持的设备（如鼠标），这个值总是 `1`。
- `height` —— 触摸接触面积的长度。对于不支持的设备，这个值总是 `1`。
- `pressure` —— 触摸压力，是一个介于 0 到 1 之间的浮点数。对于不支持压力检测的设备，这个值总是 `0.5`（按下时）或 `0`。
- `tangentialPressure` —— 归一化后的切向压力（tangential pressure）。
- `tiltX`, `tiltY`, `twist` —— 针对触摸笔的几个属性，用于描述笔和屏幕表面的相对位置。

这些属性在不同设备上的支持并不完善，所以使用得比较少。在需要时你可以查看指针事件的 [规范文档](https://w3c.github.io/pointerevents/#pointerevent-interface)。

## 多点触控

多点触控（用户同时在手机或平板上点击若干个位置执行特殊手势）是鼠标事件完全不支持的功能之一。

指针事件通过 `pointerId` 和 `isPrimary` 属性让我们能够处理多点触控。

这里是当用户先后在两个地方按下手指时发生的事情：

1. 第一个触摸：
    - `pointerdown` 事件触发，`isPrimary=true`，并且被指派了一个 `pointerId`。
2. 第二个和后续的更多触摸：
    - `pointerdown` 事件触发，`isPrimary=false`，并且每一个触摸都被指派了不同的 `pointerId`。

请注意：`pointerId` 不是分配给整个设备的，而是分配给每一个触摸的。如果 5 根手指同时触摸屏幕，我们会得到 5 个 `pointerdown` 事件和相应的坐标以及 5 个不同的 `pointerId`。

和第一个触摸相关联的事件总有 `isPrimary=true`。

利用 `pointerId`，我们可以追踪多根正在触摸屏幕的手指。当用户移动或抬起某根手指时，我们会得到和 `pointerdown` 事件具有相同 `pointerId` 的 `pointermove` 或 `pointerup` 事件。

```online
这是一个记录 `pointerdown` 和 `pointerup` 事件的演示:

[iframe src="multitouch" edit height=200]

请注意：你使用的必须是一个多点触控设备（如平板或手机）才能看到区别。对于使用鼠标这样的单点触控设备，所有指针事件都会具有相同的 `pointerId` 和 `isPrimary=true` 属性。
```

## 事件：pointercancel

我们之前提及过 `touch-action: none` 的重要性。现在让我们来解释一下它，因为略过它可能会导致在我们的交互中产生许多误操作。

`pointercancel` 事件将会在一个正处于活跃状态的指针交互由于某些原因被中断时触发。也就是在这个事件之后，该指针就不会继续触发更多事件了。

导致指针中断的可能原因如下：
- 指针设备硬件被禁用。
- 设备方向旋转（例如给平板转了个方向）。
- 浏览器打算自行处理这一交互，比如将其看作是一个专门的鼠标手势或缩放操作等。

我们会用一个实际例子来阐释 `pointercancel` 的影响。

例如，我们想要实现一个像 <info:mouse-drag-and-drop> 中开头提到的那样的一个对球的拖放操作。

用户的操作流和对应的事件如下：

1) 用户在一张图片上按下鼠标，开始拖拽
    - `pointerdown` 事件触发
2) 用户开始拖动图片
    - `pointermove` 事件触发，可能触发多次
3) 想不到吧！浏览器有自己原生的图片拖放操作，接管了之前的拖放过程，于是触发了 `pointercancel` 事件。
    - 现在拖放图片的操作由浏览器自行实现。用户甚至可能会把图片拖出浏览器，放进他们的邮件程序或文件管理器。
    - 我们不会再得到 `pointermove` 事件了。

这里的问题就在于浏览器”劫持“了这一个互动操作，触发了 `pointercancel` 事件，而 `pointermove` 事件不再继续触发。

```online
这里是一个指针事件的演示（只包含 `up/down`、`move` 和 `cancel），事件的触发被记录在了文本框中：

[iframe src="ball" height=240 edit]
```

我们想要实现自己的拖放操作，所以让我们来看看如何告诉浏览器不要接管拖放操作。

**阻止浏览器的默认行为来防止 `pointercancel` 触发。**

我们需要做两件事：

1. 阻止原生的拖放操作发生：
    - 正如我们在 <info:mouse-drag-and-drop> 中描述的那样，可以通过设置 `ball.ondragstart = () => false` 来实现。
    - 这种方式也适用于鼠标事件。
2. 对于触屏设备，浏览器同样有和触摸相关的行为。在这里我们也会遇到类似的问题。
    - 我们可以通过在 CSS 中设置 `#ball { touch-action: none }` 来阻止它们。
    - 之后我们的代码便可以在触屏设备中正常工作了。

经过上述操作，事件将会按照我们预期的方式触发，浏览器也不会劫持拖放过程来产生一个 `pointercancel` 事件。

```online
这个演示增加了以下几行：

[iframe src="ball-2" height=240 edit]

可以看到，`pointercancel` 事件不再被触发。
```

现在我们就可以添加让球的位置移动的代码了，并且我们的代码对鼠标和触控设备都有效。

## 指针捕获

指针捕获（Pointer capturing）是针对指针事件的一个特性。

这其中的主要思想是，我们可以通过一个特定的 `pointerId` 来把所有事件绑定（bind）到一个元素。这样之后，所有具有相同 `pointerId` 的后续事件都将被重定向到同一个元素。也就是说：浏览器会把那个元素作为目标和相关处理程序的触发器，无论这些指针事件实际上是在何处发生的。

相关的方法有：
- `elem.setPointerCapture(pointerId)` —— 把给定的 `pointerId` 绑定到 `elem`。
- `elem.releasePointerCapture(pointerId)` —— 把给定的 `pointerId` 从 `elem` 取消绑定。

这种绑定操作不会持续太长时间。在 `pointerup` 或 `pointercancel` 事件触发，或者目标元素 `elem` 被移除后，这种绑定都会被自动取消。

我们在什么情况下需要指针捕获呢？

**指针捕获被用于简化拖放类的操作。**

让我们来回忆一下在 <info:mouse-drag-and-drop> 中提到的写一个自定义滑动条时所遇到的问题。

1) 首先，用户按下滑块，触发 `pointerdown` 事件，用户开始拖动滑块。
2) ……但随着指针的移动，用户的指针可能会离开滑动条，移动到滑动条之上或之下的位置。

但我们会想要继续追踪 `pointermove` 事件，移动滑块直到 `pointerup` 事件，即便指针已经不再位于滑动条上了。

[之前的解决方案](info:mouse-drag-and-drop)，为了处理滑块之外的 `pointermove` 事件，我们监听了整个 `document` 的 `pointermove` 事件。

指针捕获提供了第二种解决方案：我们可以在 `pointerdown` 事件的处理程序中调用 `thumb.setPointerCapture(event.pointerId)`，这样接下来在 `pointerup` 之前发生的所有指针事件都会被重定向到 `thumb` 上。

也就是说，`thumb` 上的事件处理程序会被调用，并且 `event.target` 始终会是 `thumb`，即便用户在文档任意地方移动指针。所以，我们可以继续在 `thumb` 上监听 `pointermove`，无论其是在何处发生的。

主要代码如下：

```js
thumb.onpointerdown = function(event) {
  // 把所有指针事件（pointerup 之前发生的）重定向到自己
  thumb.setPointerCapture(event.pointerId);
};

thumb.onpointermove = function(event) {
  // 移动滑动条：在 thumb 上监听即可，因为所有事件都被重定向到了 thumb
  let newLeft = event.clientX - slider.getBoundingClientRect().left;
  thumb.style.left = newLeft + 'px';
};

// 注意：无需调用 thumb.releasePointerCapture，
// 它会在 pointerup 时自动调用
```

```online
完整示例：

[iframe src="slider" height=100 edit]
```

**言而总之：由于我们无需再在整个 `document` 上添加/移除处理程序，代码就变得整洁多了。这就是指针捕获的意义所在。**

还有两个相关的指针捕获事件:

- `gotpointercapture` 会在一个元素使用 `setPointerCapture` 来启用捕获后触发。
- `lostpointercapture` 会在捕获被释放后触发：其触发可能是由于 `releasePointerCapture` 的显式调用，或是 `pointerup`/`pointercancel` 事件触发后的自动调用。

## 总结

指针事件允许我们同时处理鼠标、触摸和触控笔事件。

指针事件是鼠标事件的拓展。我们可以在事件名称中用 `pointer` 替换 `mouse` 来让我们的代码既能继续支持鼠标，也能更好地支持其他类型的设备。

记得在 CSS 中为涉及到的元素添加 `touch-events: none`。否则浏览器会劫持很多类型的触摸互动，导致指针事件无法正常触发。

指针事件还额外具备以下能力：

- 基于 `pointerId` 和 `isPrimary` 的多点触控支持。
- 针对特定设备的属性，例如 `pressure` 和 `width/height` 等。
- 指针捕获：我们可以把 `pointerup`/`pointercancel` 之前的所有指针事件重定向到一个特定的元素。

目前，指针事件已经被各大主流浏览器支持，所以如果不需要支持 IE10 和 Safari 12 以下的版本，我们可以放心地使用它们。不过即便是针对这些老式浏览器，也可以通过 polyfill 来让它们支持指针事件。
