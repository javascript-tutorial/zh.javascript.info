# 元素大小和滚动

JavaScript 中有许多属性可让我们读取有关元素宽度、高度和其他几何特征的信息。

<<<<<<< HEAD
我们在 JavaScript 中移动或定位元素时，我们会经常需要它们。

## 示例元素
=======
We often need them when moving or positioning elements in JavaScript.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

作为演示属性的示例元素，我们将使用下面给出的元素：

```html no-beautify
<div id="example">
  ...Text...
</div>
<style>
  #example {
    width: 300px;
    height: 200px;
    border: 25px solid #E8C48F;
    padding: 20px;              
    overflow: auto;             
  }
</style>
```

它有边框（border），内边距（padding）和滚动（scrolling）等全套功能。但没有外边距（margin），因为它们不是元素本身的一部分，并且它们没什么特殊的属性。

这个元素看起来就像这样：

![](metric-css.svg)

你可以 [在 sandbox 中打开这个文档](sandbox:metric)。

<<<<<<< HEAD
```smart header="注意滚动条"
上图演示了元素具有滚动条这种最复杂的情况。一些浏览器（并非全部）通过从内容（上面标记为 "content width"）中获取空间来为滚动条保留空间。

因此，如果没有滚动条，内容宽度将是 `300 px`，但是如果滚动条宽度是 `16px`（不同的设备和浏览器，滚动条的宽度可能有所不同），那么还剩下 `300 - 16 ＝ 284px`，我们应该考虑到这一点。这就是为什么本章的例子总是假设有滚动条。如果没有滚动条，一些计算会更简单。
```

```smart header="文本可能会溢出到 `padding-bottom` 中"
在我们的插图中的 padding 中通常显示为空，但是如果元素中有很多文本，并且溢出了，那么浏览器会在 `padding-bottom` 处显示“溢出”文本，这是正常现象。
=======
```smart header="Mind the scrollbar"
The picture above demonstrates the most complex case when the element has a scrollbar. Some browsers (not all) reserve the space for it by taking it from the content (labeled as "content width" above).

So, without scrollbar the content width would be `300px`, but if the scrollbar is `16px` wide (the width may vary between devices and browsers) then only `300 - 16 = 284px` remains, and we should take it into account. That's why examples from this chapter assume that there's a scrollbar. Without it, some calculations are simpler.
```

```smart header="The `padding-bottom` area may be filled with text"
Usually paddings are shown empty on our illustrations, but if there's a lot of text in the element and it overflows, then browsers show the "overflowing" text at `padding-bottom`, that's normal.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
```

## 几何

<<<<<<< HEAD
这是带有几何属性的整体图片：

![](metric-all.svg)

这些属性的值在技术上讲是数字，但这些数字其实是“像素（pixel）”，因此它们是像素测量值。

让我们从元素外部开始探索属性。

## offsetParent，offsetLeft/Top
=======
Here's the overall picture with geometry properties:

![](metric-all.svg)

Values of these properties are technically numbers, but these numbers are "of pixels", so these are pixel measurements.

Let's start exploring the properties starting from the outside of the element.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

这些属性很少使用，但它们仍然是“最外层”的几何属性，所以我们将从它们开始。

`offsetParent` 是最接近的祖先（ancestor），在浏览器渲染期间，它被用于计算坐标。

<<<<<<< HEAD
最近的祖先为下列之一：

1. CSS 定位的（`position` 为 `absolute`，`relative` 或 `fixed`），
2. 或 `<td>`，`<th>`，`<table>`，
3. 或 `<body>`。

属性 `offsetLeft/offsetTop` 提供相对于 `offsetParent` 左上角的 x/y 坐标。

在下面这个例子中，内部的 `<div>` 有 `<main>` 作为 `offsetParent`，并且 `offsetLeft/offsetTop` 让它从左上角位移（`180`）：
=======
The `offsetParent` is the nearest ancestor that the browser uses for calculating coordinates during rendering.

That's the nearest ancestor that is one of the following:

1. CSS-positioned (`position` is `absolute`, `relative`, `fixed` or `sticky`),  or
2. `<td>`, `<th>`, or `<table>`,  or
3. `<body>`.

Properties `offsetLeft/offsetTop` provide x/y coordinates relative to `offsetParent` upper-left corner.

In the example below the inner `<div>` has `<main>` as `offsetParent` and `offsetLeft/offsetTop` shifts from its upper-left corner (`180`):
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```html run height=10
<main style="position: relative" id="main">
  <article>
    <div id="example" style="position: absolute; left: 180px; top: 180px">...</div>
  </article>
</main>
<script>
  alert(example.offsetParent.id); // main
  alert(example.offsetLeft); // 180（注意：这是一个数字，不是字符串 "180px"）
  alert(example.offsetTop); // 180
</script>
```

![](metric-offset-parent.svg)

有以下几种情况下，`offsetParent` 的值为 `null`：

1. 对于未显示的元素（`display:none` 或者不在文档中）。
2. 对于 `<body>` 与 `<html>`。
3. 对于带有 `position:fixed` 的元素。

## offsetWidth/Height

现在，让我们继续关注元素本身。

这两个属性是最简单的。它们提供了元素的“外部” width/height。或者，换句话说，它的完整大小（包括边框）。

![](metric-offset-width-height.svg)

对于我们的示例元素：

- `offsetWidth = 390` — 外部宽度（width），可以计算为内部 CSS-width（`300px`）加上 padding（`2 * 20px`）和 border（`2 * 25px`）。
- `offsetHeight = 290` — 外部高度（height）。

<<<<<<< HEAD
````smart header="对于未显示的元素，几何属性为 0/null"
仅针对显示的元素计算几何属性。

如果一个元素（或其任何祖先）具有 `display:none` 或不在文档中，则所有几何属性均为零（或 `offsetParent` 为 `null`）。

例如，当我们创建了一个元素，但尚未将其插入文档中，或者它（或它的祖先）具有 `display:none` 时，`offsetParent` 为 `null`，并且 `offsetWidth` 和 `offsetHeight` 为 `0`。
=======
````smart header="Geometry properties are zero/null for elements that are not displayed"
Geometry properties are calculated only for displayed elements.

If an element (or any of its ancestors) has `display:none` or is not in the document, then all geometry properties are zero (or `null` for `offsetParent`).

For example, `offsetParent` is `null`, and `offsetWidth`, `offsetHeight` are `0` when we created an element, but haven't inserted it into the document yet, or it (or it's ancestor) has `display:none`.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

我们可以用它来检查一个元素是否被隐藏，像这样：

```js
function isHidden(elem) {
  return !elem.offsetWidth && !elem.offsetHeight;
}
```

请注意，对于屏幕上显示，但大小为零的元素（例如空的 `<div>`），它们的 `isHidden` 返回 `true`。
````

## clientTop/Left

在元素内部，我们有边框（border）。

为了测量它们，可以使用 `clientTop` 和 `clientLeft`。

在我们的例子中：

- `clientLeft = 25` — 左边框宽度
- `clientTop = 25` — 上边框宽度

![](metric-client-left-top.svg)

<<<<<<< HEAD
……但准确地说 — 这些属性不是边框的 width/height，而是内侧与外侧的相对坐标。
=======
...But to be precise -- these properties are not border width/height, but rather relative coordinates of the inner side from the outer side.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

有什么区别？

当文档从右到左显示（操作系统为阿拉伯语或希伯来语）时，影响就显现出来了。此时滚动条不在右边，而是在左边，此时 `clientLeft` 则包含了滚动条的宽度。

<<<<<<< HEAD
在这种情况下，`clientLeft` 的值将不是 `25`，而是加上滚动条的宽度 `25 + 16 = 41`。

这是希伯来语的例子：

=======
In that case, `clientLeft` would be not `25`, but with the scrollbar width `25 + 16 = 41`.

Here's the example in hebrew:

>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
![](metric-client-left-top-rtl.svg)

## clientWidth/Height

这些属性提供了元素边框内区域的大小。

它们包括了 "content width" 和 "padding"，但不包括滚动条宽度（scrollbar）：

![](metric-client-width-height.svg)

<<<<<<< HEAD
在上图中，我们首先考虑 `clientHeight`。

这里没有水平滚动条，所以它恰好是 border 内的总和：CSS-width `200px` 加上顶部和底部的 padding（`2 * 20px`），总计 `240px`。
=======
![](metric-client-width-height.svg)

On the picture above let's first consider `clientHeight`.

There's no horizontal scrollbar, so it's exactly the sum of what's inside the borders: CSS-height `200px` plus top and bottom paddings (`2 * 20px`) total `240px`.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

现在 `clientWidth` — 这里的 "content width" 不是 `300px`，而是 `284px`，因为被滚动条占用了 `16px`。所以加起来就是 `284px` 加上左侧和右侧的 padding，总计 `324px`。

**如果这里没有 padding，那么 `clientWidth/Height` 代表的就是内容区域，即 border 和 scrollbar（如果有）内的区域。**

![](metric-client-width-nopadding.svg)

因此，当没有 padding 时，我们可以使用 `clientWidth/clientHeight` 来获取内容区域的大小。

## scrollWidth/Height

<<<<<<< HEAD
这些属性就像 `clientWidth/clientHeight`，但它们还包括滚动出（隐藏）的部分：
=======
These properties are like `clientWidth/clientHeight`, but they also include the scrolled out (hidden) parts:
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

![](metric-scroll-width-height.svg)

在上图中：

- `scrollHeight = 723` — 是内容区域的完整内部高度，包括滚动出的部分。
- `scrollWidth = 324` — 是完整的内部宽度，这里我们没有水平滚动，因此它等于 `clientWidth`。

我们可以使用这些属性将元素展开（expand）到整个 width/height。

像这样：

```js
// 将元素展开（expand）到完整的内容高度
element.style.height = `${element.scrollHeight}px`;
```

```online
单击按钮展开元素：

<div id="element" style="width:300px;height:200px; padding: 0;overflow: auto; border:1px solid black;">text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text</div>

<button style="padding:0" onclick="element.style.height = `${element.scrollHeight}px`">element.style.height = `${element.scrollHeight}px`</button>
```

## scrollLeft/scrollTop

属性 `scrollLeft/scrollTop` 是元素的隐藏、滚动部分的 width/height。

在下图中，我们可以看到带有垂直滚动块的 `scrollHeight` 和 `scrollTop`。

![](metric-scroll-top.svg)

换句话说，`scrollTop` 就是“已经滚动了多少”。

<<<<<<< HEAD
````smart header="`scrollLeft/scrollTop` 是可修改的"
大多数几何属性是只读的，但是 `scrollLeft/scrollTop` 是可修改的，并且浏览器会滚动该元素。
=======
````smart header="`scrollLeft/scrollTop` can be modified"
Most of the geometry properties here are read-only, but `scrollLeft/scrollTop` can be changed, and the browser will scroll the element.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```online
如果你单击下面的元素，则会执行代码 `elem.scrollTop += 10`。这使得元素内容向下滚动 `10px`。

<div onclick="this.scrollTop+=10" style="cursor:pointer;border:1px solid black;width:100px;height:80px;overflow:auto">Click<br>Me<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9</div>
```

将 `scrollTop` 设置为 `0` 或 `Infinity` 将会使元素滚动到顶部/底部。
````

## 不要从 CSS 中获取 width/height

<<<<<<< HEAD
我们刚刚介绍了 DOM 元素的几何属性，它们可用于获得宽度、高度和计算距离。
=======
We've just covered geometry properties of DOM elements, that can be used to get widths, heights and calculate distances.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

但是，正如我们在 <info:styles-and-classes> 一章所知道的那样，我们可以使用 `getComputedStyle` 来读取 CSS-width 和 height。

<<<<<<< HEAD
那为什么不像这样用 `getComputedStyle` 读取元素的 width 呢？
=======
So why not to read the width of an element with `getComputedStyle`, like this?
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```js run
let elem = document.body;

alert( getComputedStyle(elem).width ); // 显示 elem 的 CSS width
```

为什么我们应该使用几何属性呢？这里有两个原因：

<<<<<<< HEAD
1. 首先，CSS `width/height` 取决于另一个属性：`box-sizing`，它定义了“什么是” CSS 宽度和高度。出于 CSS 的目的而对 `box-sizing` 进行的更改可能会破坏此类 JavaScript 操作。
2. 其次，CSS 的 `width/height` 可能是 `auto`，例如内联（inline）元素：
=======
1. First, CSS `width/height` depend on another property: `box-sizing` that defines "what is" CSS width and height. A change in `box-sizing` for CSS purposes may break such JavaScript.
2. Second, CSS `width/height` may be `auto`, for instance for an inline element:
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

    ```html run
    <span id="elem">Hello!</span>

    <script>
    *!*
      alert( getComputedStyle(elem).width ); // auto
    */!*
    </script>
    ```

<<<<<<< HEAD
    从 CSS 的观点来看，`width:auto` 是完全正常的，但在 JavaScript 中，我们需要一个确切的 `px` 大小，以便我们在计算中使用它。因此，这里的 CSS 宽度没什么用。

还有另一个原因：滚动条。有时，在没有滚动条的情况下代码工作正常，当出现滚动条时，代码就出现了 bug，因为在某些浏览器中，滚动条会占用内容的空间。因此，可用于内容的实际宽度小于 CSS 宽度。而 `clientWidth/clientHeight` 则会考虑到这一点。
=======
    From the CSS standpoint, `width:auto` is perfectly normal, but in JavaScript we need an exact size in `px` that we can use in calculations. So here CSS width is useless.

And there's one more reason: a scrollbar. Sometimes the code that works fine without a scrollbar becomes buggy with it, because a scrollbar takes the space from the content in some browsers. So the real width available for the content is *less* than CSS width. And `clientWidth/clientHeight` take that into account.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

……但是，使用 `getComputedStyle(elem).width` 时，情况就不同了。某些浏览器（例如 Chrome）返回的是实际内部宽度减去滚动条宽度，而某些浏览器（例如 Firefox）返回的是 CSS 宽度（忽略了滚动条）。这种跨浏览器的差异是不使用 `getComputedStyle` 而依靠几何属性的原因。

```online
如果你的浏览器保留了滚动条的空间（大多数 Windows 中的浏览器），那么你可以在下面测试它。

[iframe src="cssWidthScroll" link border=1]

带有文本的元素具有 `width:300px`。

在桌面 Windows 操作系统上，Firefox、Chrome、Edgy 都为滚动条保留了空间。但 Firefox 显示的是 `300px`，而 Chrome 和 Edgy 显示较少。这是因为 Firefox 返回 CSS 宽度，其他浏览器返回“真实”宽度。
```

请注意，所描述的差异只是关于从 JavaScript 读取的 `getComputedStyle(...).width`，而视觉上看，一切都是正确的。

## 总结

元素具有以下几何属性：

<<<<<<< HEAD
- `offsetParent` — 是最接近的 CSS 定位的祖先，或者是 `td`，`th`，`table`，`body`。
- `offsetLeft/offsetTop` — 是相对于 `offsetParent` 的左上角边缘的坐标。
- `offsetWidth/offsetHeight` — 元素的“外部” width/height，边框（border）尺寸计算在内。
- `clientLeft/clientTop` — 从元素左上角外角到左上角内角的距离。对于从左到右显示内容的操作系统来说，它们始终是左侧/顶部 border 的宽度。而对于从右到左显示内容的操作系统来说，垂直滚动条在左边，所以 `clientLeft` 也包括滚动条的宽度。
- `clientWidth/clientHeight` — 内容的 width/height，包括 padding，但不包括滚动条（scrollbar）。
- `scrollWidth/scrollHeight` — 内容的 width/height，就像 `clientWidth/clientHeight` 一样，但还包括元素的滚动出的不可见的部分。
- `scrollLeft/scrollTop` — 从元素的左上角开始，滚动出元素的上半部分的 width/height。

除了 `scrollLeft/scrollTop` 外，所有属性都是只读的。如果我们修改 `scrollLeft/scrollTop`，浏览器会滚动对应的元素。
=======
- `offsetParent` -- is the nearest positioned ancestor or `td`, `th`, `table`, `body`.
- `offsetLeft/offsetTop` -- coordinates relative to the upper-left edge of `offsetParent`.
- `offsetWidth/offsetHeight` -- "outer" width/height of an element including borders.
- `clientLeft/clientTop` -- the distances from the upper-left outer corner to the upper-left inner (content + padding) corner. For left-to-right OS they are always the widths of left/top borders. For right-to-left OS the vertical scrollbar is on the left so `clientLeft` includes its width too.
- `clientWidth/clientHeight` -- the width/height of the content including paddings, but without the scrollbar.
- `scrollWidth/scrollHeight` -- the width/height of the content, just like `clientWidth/clientHeight`, but also include scrolled-out, invisible part of the element.
- `scrollLeft/scrollTop` -- width/height of the scrolled out upper part of the element, starting from its upper-left corner.

All properties are read-only except `scrollLeft/scrollTop` that make the browser scroll the element if changed.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
