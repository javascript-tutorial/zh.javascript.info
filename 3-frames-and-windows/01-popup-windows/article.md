# 弹窗和 window 的方法

弹窗（popup）是向用户显示其他文档的最古老的方法之一。

基本上，你只需要运行：
```js
window.open('https://javascript.info/')
```

……它将打开一个具有给定 URL 的新窗口。大多数现代浏览器都配置为在新选项卡中打开 url，而不是单独的窗口。

弹窗自古以来就存在。最初的想法是，在不关闭主窗口的情况下显示其他内容。目前为止，还有其他方式可以实现这一点：我们可以使用 [fetch](info:fetch) 动态加载内容，并将其显示在动态生成的 `<div>` 中。弹窗并不是我们每天都会使用的东西。

并且，弹窗在移动设备上非常棘手，因为移动设备无法同时显示多个窗口。

但仍然有一些任务在使用弹窗，例如进行 OAuth 授权（使用 Google/Facebook/... 登陆），因为：

1. 弹窗是一个独立的窗口，具有自己的独立 JavaScript 环境。因此，使用弹窗打开一个不信任的第三方网站是安全的。
2. 打开弹窗非常容易。
3. 弹窗可以导航（修改 URL），并将消息发送到 opener 窗口（译注：即打开弹窗的窗口）。

## 阻止弹窗

在过去，很多恶意网站经常滥用弹窗。一个不好的页面可能会打开大量带有广告的弹窗。因此，现在大多数浏览器都会通过阻止弹窗来保护用户。

**如果弹窗是在用户触发的事件处理程序（如 `onclick`）之外调用的，大多数浏览器都会阻止此类弹窗。**

例如：
```js
// 弹窗被阻止
window.open('https://javascript.info');

// 弹窗被允许
button.onclick = () => {
  window.open('https://javascript.info');
};
```

这种方式可以在某种程度上保护用户免受非必要的弹窗的影响，但是并没有完全阻止该功能。

如果弹窗是从 `onclick` 打开的，但是在 `setTimeout` 之后，该怎么办？这有点棘手。

试试运行一下这段代码：

```js run
// 3 秒后打开弹窗
setTimeout(() => window.open('http://google.com'), 3000);
```

这个弹窗在 Chrome 中会被打开，但是在 Firefox 中会被阻止。

……如果我们减少延迟，则弹窗在 Firefox 中也会被打开：

```js run
// 1 秒后打开弹窗
setTimeout(() => window.open('http://google.com'), 1000);
```

区别在于 Firefox 可以接受 2000ms 或更短的延迟，但是超过这个时间 —— 则移除“信任”。所以，第一个弹窗被阻止，而第二个却没有。

## window.open

打开一个弹窗的语法是 `window.open(url, name, params)`：

url
: 要在新窗口中加载的 URL。

name
: 新窗口的名称。每个窗口都有一个 `window.name`，在这里我们可以指定哪个窗口用于弹窗。如果已经有一个这样名字的窗口 —— 将在该窗口打开给定的 URL，否则会打开一个新窗口。

params
: 新窗口的配置字符串。它包括设置，用逗号分隔。参数之间不能有空格，例如：`width=200,height=100`。

`params` 的设置项：

- 位置:
  - `left/top`（数字）—— 屏幕上窗口的左上角的坐标。这有一个限制：不能将新窗口置于屏幕外（offscreen）。
  - `width/height`（数字）—— 新窗口的宽度和高度。宽度/高度的最小值是有限制的，因此不可能创建一个不可见的窗口。
- 窗口功能：
  - `menubar`（yes/no）—— 显示或隐藏新窗口的浏览器菜单。
  - `toolbar`（yes/no）—— 显示或隐藏新窗口的浏览器导航栏（后退，前进，重新加载等）。
  - `location`（yes/no）—— 显示或隐藏新窗口的 URL 字段。Firefox 和 IE 浏览器不允许默认隐藏它。
  - `status`（yes/no）—— 显示或隐藏状态栏。同样，大多数浏览器都强制显示它。
  - `resizable`（yes/no）—— 允许禁用新窗口大小调整。不建议使用。
  - `scrollbars`（yes/no）—— 允许禁用新窗口的滚动条。不建议使用。


还有一些不太受支持的特定于浏览器的功能，通常不使用。通常不使用这些功能。更多示例请见 <a href="https://developer.mozilla.org/en/DOM/window.open">MDN 中的 window.open</a>。

## 示例：一个最简窗口

让我们打开一个包含最小功能集的新窗口，来看看哪些功能是浏览器允许禁用的：

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

在这里，大多数“窗口功能”都被禁用了，并且窗口位于屏幕外。运行它，看看会发生什么。大多数浏览器都会“修复”奇怪的东西，例如 `width/height` 为零以及脱离屏幕（offscreen）的 `left/top` 设置。例如，Chrome 打开了一个全 `width/height` 的窗口，使其占满整个屏幕。

让我们添加正常的定位选项和合理的 `width`、`height`、`left` 和 `top` 坐标：

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
```

大多数浏览器会根据要求显示上面的示例。

设置中的省略规则：

- 如果 `open` 调用中没有第三个参数，或者它是空的，则使用默认的窗口参数。
- 如果这里有一个参数字符串，但是某些 `yes/no` 功能被省略了，那么被省略的功能则被默认值为 `no`。因此，如果你指定参数，请确保将所有必需的功能明确设置为 `yes`。
- 如果参数中没有 `left/top`，那么浏览器会尝试在最后打开的窗口附近打开一个新窗口。
- 如果没有 `width/height`，那么新窗口的大小将与上次打开的窗口大小相同。

## 从窗口访问弹窗

`open` 调用会返回对新窗口的引用。它可以用来操纵弹窗的属性，更改位置，甚至更多操作。

在下面这个示例中，我们从 JavaScript 中生成弹窗：

```js
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write("Hello, world!");
```

这里，我们在其加载完成后，修改其中的内容：

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus();

alert(newWindow.location.href); // (*) about:blank，加载尚未开始

newWindow.onload = function() {
  let html = `<div style="font-size:30px">Welcome!</div>`;
*!*
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
*/!*
};
```

请注意：在刚刚进行了 `window.open` 的时候，新窗口还没有加载完成。我们可以通过 `(*)` 行中的 `alert` 证实这一点。因此，我们需要等待 `onload` 以对新窗口进行更改。我们也可以对 `newWin.document` 使用 `DOMContentLoaded` 处理程序。

```warn header="同源策略"
只有在窗口是同源的时，窗口才能自由访问彼此的内容（`相同的协议://domain:port`）。

否则，例如，如果主窗口来自于 `site.com`，弹窗来自于 `gmail.com`，则处于安全性考虑，这两个窗口不能访问彼此的内容。有关详细信息，请参见 <info:cross-window-communication> 一章。
```

## 从弹窗访问窗口

弹窗也可以使用 `window.opener` 来访问 opener 窗口。除了弹窗之外，对其他所有窗口来说，`window.opener` 均为 `null`。

如果你运行下面这段代码，它将用 "Test" 替换 opener（也就是当前的）窗口的内容：

```js run
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);
```

所以，窗口之间的连接是双向的：主窗口和弹窗之间相互引用。

## 关闭弹窗

关闭一个窗口：`win.close()`。

检查一个窗口是否被关闭：`win.closed`。

从技术上讲，`close()` 方法可用于任何 `window`，但是如果 `window` 不是通过 `window.open()` 创建的，那么大多数浏览器都会忽略 `window.close()`。因此，`close()` 只对弹窗起作用。

如果窗口被关闭了，那么 `closed` 属性则为 `true`。这对于检查弹窗（或主窗口）是否仍处于打开状态很有用。用户可以随时关闭它，我们的代码应该考虑到这种可能性。

这段代码加载并关闭了窗口：

```js run
let newWindow = open('/', 'example', 'width=300,height=300');

newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
```


## 滚动和调整大小

有一些方法可以移动一个窗口，或者调整一个窗口的大小：

`win.moveBy(x,y)`
: 将窗口相对于当前位置向右移动 `x` 像素，并向下移动 `y` 像素。允许负值（向上/向左移动）。

`win.moveTo(x,y)`
: 将窗口移动到屏幕上的坐标 `(x,y)` 处。

`win.resizeBy(width,height)`
: 根据给定的相对于当前大小的 `width/height` 调整窗口大小。允许负值。

`win.resizeTo(width,height)`
: 将窗口调整为给定的大小。

还有 `window.onresize` 事件。

```warn header="仅对于弹窗"
为了防止滥用，浏览器通常会阻止这些方法。它们仅在我们打开的，没有其他选项卡的弹窗中能够可靠地工作。
```

```warn header="没有最小化/最大化"
JavaScript 无法最小化或者最大化一个窗口。这些操作系统级别的功能对于前端开发者而言是隐藏的。

移动或者调整大小的方法不适用于最小化/最大化的窗口。
```

## 滚动窗口

我们已经在 <info:size-and-scroll-window> 一章中讨论过了滚动窗口。

`win.scrollBy(x,y)`
: 相对于当前位置，将窗口向右滚动 `x` 像素，并向下滚动 `y` 像素。允许负值。

`win.scrollTo(x,y)`
: 将窗口滚动到给定坐标 `(x,y)`。

`elem.scrollIntoView(top = true)`
: 滚动窗口，使 `elem` 显示在 `elem.scrollIntoView(false)` 的顶部（默认）或底部。

这里也有 `window.onscroll` 事件。

## 弹窗的聚焦/失焦

从理论上讲，使用 `window.focus()` 和 `window.blur()` 方法可以使窗口获得或失去焦点。此外，这里还有 `focus/blur` 事件，可以捕获到访问者聚焦到一个窗口和切换到其他地方的时刻。

尽管，在实际中它们被进行了严格地限制，因为在过去，恶意网站滥用这些方法。

例如，看下面这段代码:

```js run
window.onblur = () => window.focus();
```

当用户尝试从窗口切换出去（`window.onblur`）时，这段代码又让窗口重新获得了焦点。目的是将用户“锁定”在 `window` 中。

因此，浏览器必须引入很多限制，以禁用此类代码并保护用户免受广告和恶意页面的侵害。具体则取决于浏览器。

例如，移动端浏览器通常会完全忽略 `window.focus()`。并且，当弹窗是在单独的选项卡而不是新窗口中打开时，也无法进行聚焦。

尽管如此，在某些情况下，此类调用确实有效且很有用。

例如：

- 当我们打开一个弹窗时，在它上面执行 `newWindow.focus()` 是个好主意。以防万一，对于某些操作系统/浏览器组合（combination），它可以确保用户现在位于新窗口中。
- 如果我们想要跟踪访问者何时在实际使用我们的 Web 应用程序，我们可以跟踪 `window.onfocus/onblur`。这使我们可以暂停/恢复页面活动和动画等。但是请注意，`blur` 事件意味着访问者从窗口切换了出来，但他们仍然可以观察到它。窗口处在背景中，但可能仍然是可见的。

## 总结   

弹窗很少使用，因为有其他选择：在页面内或在 iframe 中加载和显示信息。

如果我们要打开一个弹窗，将其告知用户是一个好的实践。在链接或按钮附近的“打开窗口”图标可以让用户免受焦点转移的困扰，并使用户知道点击它会弹出一个新窗口。

- 可以通过 `open(url, name, params)` 调用打开一个弹窗。它会返回对新打开的窗口的引用。
- 浏览器会阻止来自用户行为之外的代码中的 `open` 调用。通常会显示一条通知，以便用户可以允许它们。
- 默认情况下，浏览器会打开一个新标签页，但如果提供了窗口大小，那么浏览器将打开一个弹窗。
- 弹窗可以使用 `window.opener` 属性访问 opener 窗口（译注：即打开弹窗的窗口）。
- 如果主窗口和弹窗同源，那么它们可以彼此自由地读取和修改。否则，它们可以更改彼此的地址（location），[交换消息](info:cross-window-communication)。

要关闭弹窗：使用 `close()` 调用。用户也可以关闭弹窗（就像任何其他窗口一样）。关闭之后，`window.closed` 为 `true`。

- `focus()` 和 `blur()` 方法允许聚焦/失焦于窗口。但它们并不是一直都有效。
- `focus `和 `blur` 事件允许跟踪窗口的切换。但是请注意，在 `blur` 之后，即使窗口在背景状态下，窗口仍有可能是可见的。
