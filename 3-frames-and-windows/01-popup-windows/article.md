# 弹窗和 window 的方法

弹窗是向用户展示额外内容最传统的方式之一。

基本上，你只需要执行：
```js
window.open('https://javascript.info/')
```

... 它将打开一个给定 URL 的新窗口。大多数的现代浏览器都配置为打开新的选项卡而不是单独的窗口。

## 阻止弹窗

弹窗在很久之前就存在。最初的想法是在不关闭主窗口的情况下显示额外的内容。到目前为止，还有其他的方式可以实现这一点：JavaScript 可以向服务器发送请求，所以很少使用弹窗了。但有些时候他们依然很方便。

在过去很多恶意网站滥用弹窗。一个恶意页面可能会打开大量带有广告的弹窗。所以现在大多数浏览器都会通过阻止弹窗来保护用户。

**如果在用户触发的事件处理函数（如`onclick`）之外调用它们，大多数浏览器会阻止弹窗**

<<<<<<< HEAD:4-frames-and-windows/01-popup-windows/article.md
如果你仔细想一想，这就有些棘手了。如果代码是直接绑定到 `onclick` 的处理函数上，那就很简单。但是在 `setTimeout` 中弹窗会怎样呢？
=======
For example:
```js
// popup blocked
window.open('https://javascript.info');

// popup allowed
button.onclick = () => {
  window.open('https://javascript.info');
};
```

This way users are somewhat protected from unwanted popups, but the functionality is not disabled totally.

What if the popup opens from `onclick`, but after `setTimeout`? That's a bit tricky.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/01-popup-windows/article.md

试试这段代码：

```js run
// open after 3 seconds
setTimeout(() => window.open('http://google.com'), 3000);
```

弹窗在 Chrome 中会打开，但是在 Firefox 被阻止。

<<<<<<< HEAD:4-frames-and-windows/01-popup-windows/article.md
...而这段代码在 Firefox 又有效果：
=======
...If we decrease the delay, the popup works in Firefox too:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/01-popup-windows/article.md

```js run
// open after 1 seconds
setTimeout(() => window.open('http://google.com'), 1000);
```

不同之处在于 Firefox 可以接受 2000 毫秒或更短的延迟，但是超过这个时间 — Firefox 就会取消“信任”，认为这“不属于用户操作”。所以第一个弹窗被禁止，而第二个却没有。

## 现代用法

到目前位置，我们有很多方法可以使用 JavaScript 加载和显示页面上的数据。但是仍然有弹窗表现更好的情况。

例如，许多购物网站为咨询的人们提供在线聊天。访问者点击按钮，就会执行 `window.open` 并打开聊天弹窗。

为什么这种情况下弹窗更好，而不是在页面上？

1. 弹窗是一个独立的窗口，具有自己独立的 JavaScript 运行环境。因此，聊天服务不需要和主要的购物网站的脚本集成在一起。
2. 弹窗很容易附加到网站，几乎没有开销。只需要一个小按钮，不需要额外的脚本。
3. 即使用户离开页面，弹窗依然可以存在。例如，一个咨询建议的用户访问了一个新的 “Super-Cooler” 活动页。用户从主窗口进入新页面，而不用退出聊天。

## window.open

打开弹窗的语法是：`window.open(url, name, params)`：

url
: 要在新窗口中加载的 URL。

name
: 新窗口的名称。每个窗口都有一个 `window.name` 的属性，在这里我们可以指定哪个窗口用于弹窗。如果已经有一个这样名字的窗口 — 给定的 URL 将在其中打开，否则会打开一个新窗口。

params
: 新窗口的配置字符串。它包括设置，由逗号分隔开来。参数之间必须没有空格，例如：`width:200,height=100`。

`params` 的设置项：

- 位置:
  - `left/top`（数字）— 距离屏幕左上角的坐标。这有一个限制：新窗口不能脱离屏幕。
  - `width/height`（数字）— 新窗口的宽高。有一个宽/高的最小值，所以不可能创建一个不可见的窗口。
- 窗口特征：
  - `menubar`（yes/no）— 显示或隐藏新窗口中的浏览器菜单。
  - `toolbar`（yes/no）— 在新窗口中显示或隐藏浏览器导航栏（后退、前进和重新加载等）。
  - `location`（yes/no）— 在新窗口中显示或隐藏 URL 字段。FF 和 IE 默认是不允许隐藏的。
  - `status`（yes/no）— 显示或隐藏状态栏。同样，大多数浏览器强制它显示。
  - `resizable`（yes/no）— 允许禁用新窗口调整大小。不建议使用。
  - `scrollbars`（yes/no）— 允许禁用新窗口的滚动条。不建议使用。

还有一些不太受支持的，浏览器特有的功能。通常不使用这些功能。详情请看 <a href="https://developer.mozilla.org/en/DOM/window.open">window.open in MDN</a>。

## 示例：一个简单的窗口

让我们打开一设置尽可能少的窗口，来看看哪些特性是浏览器允许禁用的：

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

这里大多数的“窗口特征”都被禁用而且窗口的位置脱离屏幕。执行看看究竟会发生什么。大多数浏览器修复了像零 `width/height` 和脱离屏幕的 `left/top` 的奇怪设置。例如，Chrome 打开这样一个全 width/height 的窗口，使其占满整个屏幕。

让我们添加正常的定位选项和合理的 `width`、`height`、`left` 和 `top` 坐标：

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
```

大多数浏览器根据需要显示了上面的示例。

省略设置的规则：

- 如果 `open` 调用中没有第三个参数，或者它是空的，则使用默认的窗口参数。
- 如果存在参数字符串，但是省略了某些 yes/no 的特性，那么如果浏览器允许，则禁用省略的特性。因此，如果指定参数，请确保将所有必需的特性明确设置为 yes。
- 如果参数中没有 `left/top`，则浏览器会尝试在最后打开的窗口附近打开一个新窗口。
- 如果没有“宽度/高度”，则新窗口的大小与上次打开的大小相同。

## 访问弹窗

`open` 的调用会返回对新窗口的引用。它可以用来操作弹窗的属性，改变位置甚至更多。

在下面的示例中，新窗口的内容在加载后被修改。

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus();

newWindow.onload = function() {
  let html = `<div style="font-size:30px">Welcome!</div>`;
*!*
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
*/!*
};
```

请注意，外部的 `document` 内容仅可被同源（相同的协议：//域名：端口）的 window 访问。

对于具有来自其他站点的 URL 的窗口，我们可以通过指定 `newWindow.location=...` 来改变地址，但是我们无法读取地址或者访问内容。这是为了用户安全，这样一来恶意网站就无法打开 `http://gmail.com` 并获取数据。我们将在稍后进一步讨论。

## 访问开启窗口 

一个弹窗可以访问“开启者”窗口。其中的 JavaScript 可以通过 `window.opener` 来访问打开它的窗口。除了弹窗之外，对其他所有的窗口来说都是 `null`。

因此主窗口和弹窗都有相互的引用。如果它们同源，则可以自由地相互修改。如果不是,他们仍然有沟通的手段, 将在下一章介绍 <info:cross-window-communication>。

## 关闭弹窗

如果我们不再需要弹窗，我们可以在其上调用 `newWindow.close()`。

技术上来将，`close()` 方法可以关闭任何 `window`，但是，如果 `window` 不是通过 `window.open()` 打开的，大多数浏览器会忽略 `window.close()` 方法。

如果窗口被关闭 `newWindow.closed` 会返回 `true`。 这对于检查弹窗（或主窗口）是否仍然打开非常有用。用户可以关闭它，我们的代码应该确定到这种可能性。

这段代码加载之后又关闭了弹窗：

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
```

## 弹窗的聚焦/失焦

理论上，用 `window.focus()` 或 `window.blur()` 方法可以使窗口获得或失去焦点。此外还有 `focus/blur` 事件，可以聚焦窗口并捕捉访问者切换到其他地方的时机。

它们曾被恶意网站所滥用。例如，看这段代码:

```js run
window.onblur = () => window.focus();
```

当一个用户尝试从窗口切换出去（`blur`），这段代码又让窗口重新获得焦点。目的是将用户“锁定”在 `window` 内。

因此，存在禁用相似代码的措施。保护用户免受广告和恶意网站的限制有很多。这取决于浏览器。

例如，移动浏览器通常完全忽略这种调用。当弹窗在单独的选项卡而不是新窗口中打开时，聚焦也不起作用。

然而，依然可以用他们来做一些事。

例如：

<<<<<<< HEAD:4-frames-and-windows/01-popup-windows/article.md
- 当我们打开弹窗时，在它上面执行 `newWindow.focus()` 可能是个好主意。为了以防万一，对于某些 OS/浏览器组合，它确保用户现在处于新窗口中。
- 如果我们想要跟踪访问者何时在实际使用我们的网页应用，我们可以跟踪 `window.onfocus/onblur`。这允许我们在暂停/恢复页面活动，动画等。但是请注意，`blur` 事件意味着访问者从窗口切换出来，但他仍然可以观察它。窗口在后台，但仍有可能是可见的。
=======
- When we open a popup, it's might be a good idea to run a `newWindow.focus()` on it. Just in case, for some OS/browser combinations it ensures that the user is in the new window now.
- If we want to track when a visitor actually uses our web-app, we can track `window.onfocus/onblur`. That allows us to suspend/resume in-page activities, animations etc. But please note that the `blur` event means that the visitor switched out from the window, but they still may observe it. The window is in the background, but still may be visible.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/01-popup-windows/article.md

## 总结   

- 弹窗可以通过 `open(url, name, params)` 调用。它返回新窗口的引用。
- 默认情况下，浏览器会阻止来自用户操作之外的代码中的 `open` 调用。通常会出现通知，以便用户可以允许它们。
- 弹窗可以使用 `window.opener` 属性访问开启窗口，因此两者相连。
- 如果主窗口和弹窗同源，它们彼此之间可以自由的读取和修改。否则，他们可以改变彼此的地址并使用消息进行通信（后续章节）。
- 关闭弹窗：通过调用 `close()` 方法。用户也可以关闭它们（就像任何其他窗口一样）。关闭之后 `window.closed` 返回 `true`。
- `focus()` and `blur()` 方法允许聚焦/失焦窗口。有时候。
- `focus `和 `blur` 事件允许跟踪窗口的切换。但请注意，在 `blur` 之后，即使在后台，窗口仍有可能是可见的。

此外，如果我们打开一个弹窗，通知用户是一种好的做法。带有图标的打开窗口可以帮助访客免受焦点切换的困扰并记住两个窗口。
