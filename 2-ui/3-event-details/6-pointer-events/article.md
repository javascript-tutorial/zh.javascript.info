# 指针事件

指针事件（Pointer Events）是一种用于处理来自各种输入设备（例如鼠标、触控笔和触摸屏等）的输入信息的现代化解决方案。

## 一段简史

让我们先做一个简短的概览，以便你对指针事件及其在其它事件类型中所处位置有个粗略认识。

- 很早以前，只存在鼠标事件。

    后来，触屏设备开始普及，尤其是手机和平板电脑。为了使现有的脚本仍能正常工作，它们生成（现在仍生成）鼠标事件。例如，轻触屏幕就会生成 `mousedown` 事件。因此，触摸设备可以很好地与网页配合使用。
    
    但是，触摸设备比鼠标具有更多的功能。例如，我们可以同时触控多点（多点触控）。然而，鼠标事件并没有相关属性来处理这种多点触控。

- 因此，引入了触摸事件，例如 `touchstart`、`touchend` 和 `touchmove`，它们具有特定于触摸的属性（这里不再赘述这些特性，因为指针事件更加完善）。

    不过这还是不够完美。因为很多其他输入设备（如触控笔）都有自己的特性。而且同时维护两份分别处理鼠标事件和触摸事件的代码，显得有些笨重了。

- 为了解决这些问题，人们引入了全新的规范「指针事件」。它为各种指针输入设备提供了一套统一的事件。

目前，各大主流浏览器已经支持了 [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) 标准，版本更新的 [Pointer Events Level 3](https://w3c.github.io/pointerevents/) 已经发布，并且大多数情况下与 Pointer Events Level 2 兼容。

因此，除非你写的代码需要兼容旧版本的浏览器，例如 IE 10 或 Safari 12 或更低的版本，否则无需继续使用鼠标事件或触摸事件 —— 我们可以使用指针事件。

这样，你的代码就可以在触摸设备和鼠标设备上都能正常工作了。

话虽如此，指针事件仍然有一些重要的奇怪特性，你应当对它们有所了解以正确使用指针事件，并避免一些意料之外的错误。我们将在本文中对它们进行介绍。

## 指针事件类型

指针事件的命名方式和鼠标事件类似：

| 指针事件 | 类似的鼠标事件 |
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

替换之后，程序对触屏设备的支持会“魔法般”地提升。但是，我们可能需要在 CSS 中的某些地方添加 `touch-action: none`。我们会在下文的 `pointercancel` 一节中描述这里面的细节。
```

## 指针事件属性

指针事件具备和鼠标事件完全相同的属性，包括 `clientX/Y` 和 `target` 等，以及一些其他属性：

- `pointerId` —— 触发当前事件的指针唯一标识符。
    
    浏览器生成的。使我们能够处理多指针的情况，例如带有触控笔和多点触控功能的触摸屏（下文会有相关示例）。
- `pointerType` —— 指针的设备类型。必须为字符串，可以是："mouse"、"pen" 或 "touch"。

    我们可以使用这个属性来针对不同类型的指针输入做出不同响应。
- `isPrimary` —— 当指针为首要指针（多点触控时按下的第一根手指）时为 `true`。

有些指针设备会测量接触面积和点按压力（例如一根手指压在触屏上），对于这种情况可以使用以下属性：

- `width` —— 指针（例如手指）接触设备的区域的宽度。对于不支持的设备（如鼠标），这个值总是 `1`。
- `height` —— 指针（例如手指）接触设备的区域的长度。对于不支持的设备，这个值总是 `1`。
- `pressure` —— 触摸压力，是一个介于 0 到 1 之间的浮点数。对于不支持压力检测的设备，这个值总是 `0.5`（按下时）或 `0`。
- `tangentialPressure` —— 归一化后的切向压力（tangential pressure）。
- `tiltX`, `tiltY`, `twist` —— 针对触摸笔的几个属性，用于描述笔和屏幕表面的相对位置。

大多数设备都不支持这些属性，因此它们很少被使用。如果你需要使用它们，可以在 [规范文档](https://w3c.github.io/pointerevents/#pointerevent-interface) 中查看更多有关它们的详细信息。

## 多点触控

多点触控（用户在手机或平板上同时点击若干个位置，或执行特殊手势）是鼠标事件完全不支持的功能之一。

指针事件使我们能够通过 `pointerId` 和 `isPrimary` 属性的帮助，能够处理多点触控。

当用户用一根手指触摸触摸屏的某个位置，然后将另一根手指放在该触摸屏的其他位置时，会发生以下情况：

1. 第一个手指触摸：
    - `pointerdown` 事件触发，`isPrimary=true`，并且被指派了一个 `pointerId`。
2. 第二个和后续的更多个手指触摸（假设第一个手指仍在触摸）：
    - `pointerdown` 事件触发，`isPrimary=false`，并且每一个触摸都被指派了不同的 `pointerId`。

请注意：`pointerId` 不是分配给整个设备的，而是分配给每一个触摸的。如果 5 根手指同时触摸屏幕，我们会得到 5 个 `pointerdown` 事件和相应的坐标以及 5 个不同的 `pointerId`。

和第一个触摸相关联的事件总有 `isPrimary=true`。

利用 `pointerId`，我们可以追踪多根正在触摸屏幕的手指。当用户移动或抬起某根手指时，我们会得到和 `pointerdown` 事件具有相同 `pointerId` 的 `pointermove` 或 `pointerup` 事件。

```online
这是一个记录 `pointerdown` 和 `pointerup` 事件的演示:

[iframe src="multitouch" edit height=200]

请注意：你使用的必须是一个多点触控设备（如平板或手机）才能在 `pointerId/isPrimary` 中看到区别。对于使用鼠标这样的单点触控设备，所有指针事件都会具有相同的 `pointerId` 和 `isPrimary=true` 属性。
```

## 事件：pointercancel

`pointercancel` 事件将会在一个正处于活跃状态的指针交互由于某些原因被中断时触发。也就是在这个事件之后，该指针就不会继续触发更多事件了。

导致指针中断的可能原因如下：
- 指针设备硬件在物理层面上被禁用。
- 设备方向旋转（例如给平板转了个方向）。
- 浏览器打算自行处理这一交互，比如将其看作是一个专门的鼠标手势或缩放操作等。

我们会用一个实际例子来阐释 `pointercancel` 的影响。

例如，我们想要实现一个像 <info:mouse-drag-and-drop> 中开头提到的那样的一个对球的拖放操作。

用户的操作流和对应的事件如下：

1) 用户按住了一张图片，开始拖拽
    - `pointerdown` 事件触发
2) 用户开始移动指针（从而拖动图片）
    - `pointermove` 事件触发，可能触发多次
3) 然后意料之外的情况发生了！浏览器有自己原生的图片拖放操作，接管了之前的拖放过程，于是触发了 `pointercancel` 事件。
    - 现在拖放图片的操作由浏览器自行实现。用户甚至可能会把图片拖出浏览器，放进他们的邮件程序或文件管理器。
    - 我们不会再得到 `pointermove` 事件了。

这里的问题就在于浏览器”劫持“了这一个互动操作：在“拖放”过程开始时触发了 `pointercancel` 事件，并且不再有 `pointermove` 事件会被生成。

```online
这里是拖放示例的演示，并且在拖放过程中，指针事件（只包含 `up/down`、`move` 和 `cancel）的触发会被记录在 `textarea` 中：

[iframe src="ball" height=240 edit]
```

我们想要实现自己的拖放操作，所以让我们来看看如何告诉浏览器不要接管拖放操作。

**阻止浏览器的默认行为来防止 `pointercancel` 触发。**

我们需要做两件事：

1. 阻止原生的拖放操作发生：
    - 正如我们在 <info:mouse-drag-and-drop> 中描述的那样，我们可以通过设置 `ball.ondragstart = () => false` 来实现这一需求。
    - 这种方式也适用于鼠标事件。
2. 对于触屏设备，还有其他和触摸相关的浏览器行为（除了拖放）。为了避免它们所引发的问题：
    - 我们可以通过在 CSS 中设置 `#ball { touch-action: none }` 来阻止它们。
    - 之后我们的代码便可以在触屏设备中正常工作了。

经过上述操作，事件将会按照我们预期的方式触发，浏览器不会劫持拖放过程，也不会触发 `pointercancel` 事件。

```online
这个演示增加了以下几行：

[iframe src="ball-2" height=240 edit]

可以看到，`pointercancel` 事件不再被触发。
```

现在我们就可以添加让球的位置移动的代码了，并且我们的代码对鼠标和触控设备都有效。

## 指针捕获

指针捕获（Pointer capturing）是针对指针事件的一个特性。

这个想法很简单，但是乍一看可能感觉很奇怪，因为在其他任何事件类型中都没有这种东西。

主要的方法是：
- `elem.setPointerCapture(pointerId)` —— 将给定的 `pointerId` 绑定到 `elem`。在调用之后，所有具有相同 `pointerId` 的指针事件都将 `elem` 作为目标（就像事件发生在 `elem` 上一样），无论这些 `elem` 在文档中的实际位置是什么。

换句话说，`elem.setPointerCapture(pointerId)` 将所有具有给定 `pointerId` 的后续事件重新定位到 `elem`。

绑定会在以下情况下被移除：
- 当 `pointerup` 或 `pointercancel` 事件出现时，绑定会被自动地移除。
- 当 `elem` 被从文档中移除后，绑定会被自动地移除。
- 当 `elem.releasePointerCapture(pointerId)` 被调用，绑定会被移除。

**指针捕获可以被用于简化拖放类的操作。**

作为示例，让我们来回忆一下在 <info:mouse-drag-and-drop> 中所提到的，如何实现一个自定义滑动条。

我们创建一个带有条形图的，并且在其内部有一个“滑块”（`thumb`）的滑动条元素。

它的效果如下：

1. 用户按下滑动条的滑块 `thumb` —— `pointerdown` 事件触发。
2. 然后用户移动指针 —— `pointermove` 事件触发，然后我们随之移动 `thumb`。
    - ……在指针的移动过程中，指针可能会离开滑动条的 `thumb`：移动到 `thumb` 之上或之下的位置。而 `thumb` 应该严格在水平方向上移动，并与指针保持对齐。

因此，要跟踪指针的所有移动，包括指针移动到 `thumb` 之上或之下的位置时，所以我们必须在整个文档 `document` 上分配 `pointermove` 事件处理程序。

这个解决方案看起来似乎有点“脏”。其中的一个问题就是，指针在文档周围的移动可能会引起副作用，触发其他事件处理程序，而这些事件处理程序与滑动条完全无关。

指针捕获提供了一种将 `pointermove` 绑定到 `thumb` 并避免其他此类问题发生的方式：

- 我们可以在 `pointerdown` 事件的处理程序中调用 `thumb.setPointerCapture(event.pointerId)`，
- 这样接下来在 `pointerup/cancel` 之前发生的所有指针事件都会被重定向到 `thumb` 上。
- 当 `pointerup` 发生时（拖动完成），绑定会被自动移除，我们不需要关心它。

因此，即使用户在整个文档上移动指针，事件处理程序也将仅在 `thumb` 上被调用。此外，事件对象的坐标属性，例如 `clientX/clientY` 仍将是正确的 —— 捕获仅影响 `target/currentTarget`。

主要代码如下：

```js
thumb.onpointerdown = function(event) {
  // 把所有指针事件（pointerup 之前发生的）重定向到 thumb
  thumb.setPointerCapture(event.pointerId);
};

thumb.onpointermove = function(event) {
  // 移动滑动条：在 thumb 上监听即可，因为所有指针事件都被重定向到了 thumb
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

言而总之，指针捕获为我们带来了两个好处：
1. 代码变得更加简洁，我们不再需要在整个 `document` 上添加/移除处理程序。绑定会被自动释放。
2. 如果文档中有任何 `pointermove` 处理程序，则在用户拖动滑动条时，它们不会因指针的移动被意外地触发。

### 指针捕获事件

还有两个相关的指针捕获事件:

- `gotpointercapture` 会在一个元素使用 `setPointerCapture` 来启用捕获后触发。
- `lostpointercapture` 会在捕获被释放后触发：其触发可能是由于 `releasePointerCapture` 的显式调用，或是 `pointerup`/`pointercancel` 事件触发后的自动调用。

## 总结

指针事件允许我们通过一份代码，同时处理鼠标、触摸和触控笔事件。

指针事件是鼠标事件的拓展。我们可以在事件名称中用 `pointer` 替换 `mouse` 来让我们的代码既能继续支持鼠标，也能更好地支持其他类型的设备。

对于浏览器可能会决定进行劫持并自行处理的拖放和复杂的触控交互 —— 请记住取消事件的默认操作，并在 CSS 中为涉及到的元素设置 `touch-events: none`。

指针事件还额外具备以下能力：

- 基于 `pointerId` 和 `isPrimary` 的多点触控支持。
- 针对特定设备的属性，例如 `pressure` 和 `width/height` 等。
- 指针捕获：我们可以把 `pointerup`/`pointercancel` 之前的所有指针事件重定向到一个特定的元素。

目前，指针事件已经被各大主流浏览器支持，尤其是如果不需要支持 IE10 和 Safari 12 以下的版本，我们可以放心地使用它们。不过即便是针对这些老式浏览器，也可以通过 polyfill 来让它们支持指针事件。
