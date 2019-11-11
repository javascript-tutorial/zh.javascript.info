<<<<<<< HEAD
# 页面生命周期：DOMContentLoaded，load，beforeunload，unload

HTML 页面的生命周期有三个重要事件：

- `DOMContentLoaded` —— 浏览器完成全部 HTML 的加载，并构建 DOM 树，但像 `<img>` 和样式这样的外部资源可能还没有加载完成。
- `load` —— 浏览器加载完所有资源，包括 HTML 文档，图像，样式等。
- `beforeunload/unload` —— 当用户离开页面时。

每个事件都是有用的：

- `DOMContentLoaded` 事件 —— DOM 已经准备好，因此事件处理器可以查找 DOM 节点，并初始化接口。
- `load` 事件 —— 外部资源加载完成后，我们就可以应用样式表，获取图像大小等。
- `beforeunload` 事件 —— 用户即将离开：我们可以检查用户是否保存了修改，并询问他是否真的要离开。
- `unload` 事件 —— 用户几乎已经离开了，但是我们仍然可以启动一些操作，比如发送统计数据。

我们探讨一下这些事件的细节。

## DOMContentLoaded

`DOMContentLoaded` 事件发生在 `document` 对象上。

我们必须使用 `addEventListener` 来监听它：

```js
document.addEventListener("DOMContentLoaded", ready);
// 不同于“document.onDOMContentLoaded = ...”
```

例如：

```html run height=200 refresh
<script>
  function ready() {
    alert('DOM is ready');

    // 图像尚未加载（除非已经有了缓存）因此其大小是 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

*!*
  document.addEventListener("DOMContentLoaded", ready);
*/!*
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

在示例中，`DOMContentLoaded` 处理器在文档加载完成后触发，所以它可以访问到所有的元素，包括它下面的 `<img>` 元素。

但是它不会等待图像加载完成，因此 `alert` 显示其大小为零。

初识 `DOMContentLoaded` 事件时，觉得它比较简单。DOM 树准备就绪 —— 这是它的触发条件。它并没有什么特别之处。

### DOMContentLoaded 和脚本

当浏览器开始加载 HTML 文档并在文档中遇到 `<script>` 标签时，就会在继续构建 DOM 之前运行它。这是一个防范措施，因为脚本可能想要修改 DOM，甚至对其执行 `document.write` 操作，所以 `DOMContentLoaded` 必须等待它执行结束。

因此，在下面的这些脚本执行结束之后肯定会发生 DOMContentLoaded：

```html run
<script>
  document.addEventListener("DOMContentLoaded", () => {
    alert("DOM ready!");
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert("Library loaded, inline script executed");
</script>
```

在上面的例子中，我们首先会看到“Library loaded...”，然后才会看到“DOM ready!”（所有脚本都已经执行结束）。

```warn header="具有 `async`, `defer` or `type=\"module\"` 属性的脚本不会阻塞 DOMContentLoaded"
我们[稍后会提到的](info:script-async-defer)脚本属性 `async` 和 `defer`，它们不会阻塞 DOMContentLoaded。[JavaScript 模块](info:modules)的行为和 `defer` 相似，同样也不会阻塞 DOMContentLoaded。

所以在这里，我们研究的是“普通”脚本，比如 `<script>...</script>` 或者 `<script src="..."></script>`。
```


### DOMContentLoaded 和样式

外部样式不会影响 DOM，因此 `DOMContentLoaded` 无需等待它们。

但有一个陷阱。如果在样式之后有一个脚本，那么该脚本必须等待样式被加载：

```html
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // 在样式表加载之前，脚本都不会执行
  alert(getComputedStyle(document.body).marginTop);
</script>
```

原因是脚本可能希望获取如上述示例所描述的元素坐标和其他与样式相关的属性。因此，它必须等待样式被加载。

当 `DOMContentLoaded` 等待脚本时，它也在等待脚本之前的样式。

### 浏览器内置的自动填充

Firefox、Chrome 和 Opera 都会在 `DOMContentLoaded` 中自动填写表单。

比如，如果页面有一个带有登录和密码的表单，并且浏览器记住了这些值，那么在 `DOMContentLoaded` 触发时，它就可以尝试自动填写它们（如果用户允许的话）。

因此，如果 `DOMContentLoaded` 被需要加载很长时间的脚本延迟触发，那么自动填充也在等待。你可能在某些站点上看到过（如果你使用浏览器自动填写） —— 登录/密码字段并不会立即自动填充，而是在页面被完全加载前会延迟填充。这实际上是 `DOMContentLoaded` 事件之前的延迟。


## window.onload [#window-onload]

当包括样式、图像和其他资源的页面被全部加载时，`window` 对象上的 `load` 事件就会被触发。

以下示例正确地显示了图像大小，因为 `window.onload` 会等待所有的图像加载完毕：

```html run height=200 refresh
<script>
  window.onload = function() {
    alert('Page loaded');

    // 此时图像已经加载完成
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

## window.onunload

当访问者离开页面时，`window` 对象上的 `unload` 事件就会被触发。我们可以在那里做一些不涉及延迟的事件，比如关闭相关的弹出窗口。

有一个值得注意的特殊情况那就是发送分析数据。

假设我们要收集页面使用情况的数据：鼠标点击、滚动、被查看的页面区域等等。

自然地，当用户要离开的时候，我们会使用 `unload` 事件去发送我们想要保存在服务器上的数据。

这里也有一个特殊的 `navigator.sendBeacon(url, data)` 方法来实现这种需求，请参见 w3c 规范 <https://w3c.github.io/beacon/>。

它在后台发送数据，转换到另外一个页面时不会被延迟：浏览器离开页面，但仍然在执行 `sendBeacon`。

下面是它的使用示例：

```js
let analyticsData = { /* 收集了数据的对象 */ };
window.addEventListener("unload", function() {
  navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
};
```

- 请求以 POST 方式发送。
- 我们不仅能发送字符串，还能发送表单以及其他格式的数据，在 <info:fetch-basics> 章节我们已有说明，但是通常情况下它是一个字符串化的对象。
- 数据大小限制在 64kb。

当 `sendBeacon` 请求完成的时候，浏览器可能已经离开了文档，所以就没办法获取服务器的响应数据（对于统计数据来说通常是空的）。

还有一个 `keep-alive` 的标志，用于在 [fetch](info:fetch-basics) 方法中为通用的网络请求执行此类“离开页面后（after-page-left）”的请求。你可以在 <info:fetch-api> 章节中了解到更多相关信息。

如果我们要取消跳转到另一页面的操作，在这里做不到。但是我们可以用另外一个事件 —— `onbeforeunload`。

## window.onbeforeunload [#window.onbeforeunload]

如果访问中触发了离开页面的导航或试图关闭窗口，`beforeunload` 处理器将要求提供更多的确认信息。

如果我们取消该事件，浏览器将会询问用户是否确定。

你可以通过运行这段代码，然后重新加载页面来进行尝试：

```js run
window.onbeforeunload = function() {
  return false;
};
```

由于历史原因，返回非空字符串也算作取消事件。在以前，浏览器通常将其显示为消息，但是根据 [modern specification](https://html.spec.whatwg.org/#unloading-documents) 所述，现在它们并不会显示了。

这里有个例子：

```js run
window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};
```

它的行为在某种意义上被改变了，因为一些站长通过显示误导性及恶意的信息滥用了这个事件处理器。所以，目前来看一些老旧的浏览器可能仍然显示为消息，但除此之外 —— 没有别的办法自定义显示给用户的消息。

## readyState

如果在文档加载之后设置 `DOMContentLoaded` 事件处理器会发生什么呢？

很自然地，它不会被运行。

在某些情况下，我们不确定文档是否已经准备就绪。当 DOM 加载完成时，我们想要执行一些函数，可能是立即执行也可能是稍后执行。

`document.readyState` 属性为我们提供了一些关于当前加载状态的信息。

它有三个可能的值：

- `“loading”` —— 文档正在被加载。
- `“interactive”` —— 文档被全部读取。
- `“complete”` —— 文档被全部读取，并且所有的资源（图像之类的）都被加载。

因此我们可以检查 `document.readyState` 并设置一个处理器，或在代码准备就绪时立即执行它。

就像这样：

```js
function work() { /*...*/ }

if (document.readyState == 'loading') {
  // 正在加载，等待事件
  document.addEventListener('DOMContentLoaded', work);
} else {
  // DOM 已经准备就绪！
  work();
}
```

还有一个 `readystatechange` 事件，当状态发生变化时触发，因此我们可以打印所有这些状态，就像这样：

```js run
// 当前状态
console.log(document.readyState);

// 状态改变时打印它
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

`readystatechange` 事件是跟踪文档加载状态的另一种机制，它很早就存在了。现在则很少被使用。

但是为了完整起见，我们继续讨论一下它的全部事件。

这里有一个带有 `<iframe>`、`<img>` 和记录事件的处理程序的文档：

```html
<script>
  function log(text) { /* output the time and message */ }
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```

[在 sandbox](sandbox:readystate) 中的运行示例。

典型输出：
1. [1] initial readyState:loading
2. [2] readyState:interactive
3. [2] DOMContentLoaded
4. [3] iframe onload
5. [4] img onload
6. [4] readyState:complete
7. [4] window onload

方括号中的数字表示发生这种情况的大致时间。标记为相同数字的事件几乎是同时发生的（+- 几毫秒）。

- `document.readyState` 在 `DOMContentLoaded` 之前会立即变成了 `interactive`。这两个事件的意义实际上是相同的。
- 当所有资源（`iframe` 和 `img`）都被加载完成后，`document.readyState` 变成了 `complete`。这里我们可以发现，它大约发生在 `img.onload`（`img` 是最后的资源）和 `window.onload` 之间。转换到 `complete` 状态的意义与 `window.onload` 一致。区别在于 `window.onload` 在所有其他 `load` 处理器之后一直有效。

## 总结

页面生命周期事件：

- 当 DOM 准备就绪时，`DOMContentLoaded` 事件就会在 `document` 上触发。在这个阶段，我们可以将 JavaScript 应用于元素。
  - 诸如 `<script>...</script>` 或者 `<script src="..."></script>` 会阻塞 DOMContentLoaded，浏览器等待它们执行结束。
  - 图像和其他资源仍然可以继续被加载。
- 当页面和所有资源被加载时，`window` 上的 `load` 事件会被触发。我们很少使用它，因为通常没有必要去等待那么久。
- 当用户想要离开页面时，`window` 上的 `beforeunload` 事件会被触发。如果我们取消这个事件，浏览器会询问用户是否真的要离开（比如有未保存的内容）。
- 当用户最终离开时，`window` 上的 `unload` 事件会被触发。在处理器中，我们只能做一些不会涉及到延迟或询问用户的简单事情。正是由于这个限制，它很少被使用。我们可以用 `navigator.sendBeacon` 来发送网络请求。
- `document.readyState` 是文档的当前状态，可以在 `readystatechange` 事件中跟踪状态变更：
  - `loading` —— 文档正在被加载。
  - `interactive` —— 文档被解析，大概是与 `DOMContentLoaded` 同时发生，而不是在它之前发生。
  - `complete` —— 文档和资源被加载，大概是与 `window.onload` 同时发生，而不是在它之前发生。
=======
# Page: DOMContentLoaded, load, beforeunload, unload

The lifecycle of an HTML page has three important events:

- `DOMContentLoaded` -- the browser fully loaded HTML, and the DOM tree is built, but external resources like pictures `<img>` and stylesheets may be not yet loaded.  
- `load` -- not only HTML is loaded, but also all the external resources: images, styles etc.
- `beforeunload/unload` -- the user is leaving the page.

Each event may be useful:

- `DOMContentLoaded` event -- DOM is ready, so the handler can lookup DOM nodes, initialize the interface.
- `load` event -- external resources are loaded, so styles are applied, image sizes are known etc.
- `beforeunload` event -- the user is leaving: we can check if the user saved the changes and ask them whether they really want to leave.
- `unload` -- the user almost left, but we still can initiate some operations, such as sending out statistics.

Let's explore the details of these events.

## DOMContentLoaded

The `DOMContentLoaded` event happens on the `document` object.

We must use `addEventListener` to catch it:

```js
document.addEventListener("DOMContentLoaded", ready);
// not "document.onDOMContentLoaded = ..."
```

For instance:

```html run height=200 refresh
<script>
  function ready() {
    alert('DOM is ready');

    // image is not yet loaded (unless was cached), so the size is 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

*!*
  document.addEventListener("DOMContentLoaded", ready);
*/!*
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

In the example the `DOMContentLoaded` handler runs when the document is loaded, so it can see all the elements, including `<img>` below.

But it doesn't wait for the image to load. So `alert` shows zero sizes.

At first sight, the `DOMContentLoaded` event is very simple. The DOM tree is ready -- here's the event. There are few peculiarities though.

### DOMContentLoaded and scripts

When the browser processes an HTML-document and comes across a `<script>` tag, it needs to execute before continuing building the DOM. That's a precaution, as scripts may want to modify DOM, and even `document.write` into it, so `DOMContentLoaded` has to wait.

So DOMContentLoaded definitely happens after such scripts:

```html run
<script>
  document.addEventListener("DOMContentLoaded", () => {
    alert("DOM ready!");
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert("Library loaded, inline script executed");
</script>
```

In the example above, we first see "Library loaded...", and then "DOM ready!" (all scripts are executed).

```warn header="Scripts that don't block DOMContentLoaded"
There are two exceptions from this rule:
1. Scripts with the `async` attribute, that we'll cover [a bit later](info:script-async-defer), don't block `DOMContentLoaded`.
2. Scripts that are generated dynamically with `document.createElement('script')` and then added to the webpage also don't block this event.
```

### DOMContentLoaded and styles

External style sheets don't affect DOM, so `DOMContentLoaded` does not wait for them.

But there's a pitfall. If we have a script after the style, then that script must wait until the stylesheet loads:

```html
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // the script doesn't not execute until the stylesheet is loaded
  alert(getComputedStyle(document.body).marginTop);
</script>
```

The reason for this is that the script may want to get coordinates and other style-dependent properties of elements, like in the example above. Naturally, it has to wait for styles to load.

As `DOMContentLoaded` waits for scripts, it now waits for styles before them as well.

### Built-in browser autofill

Firefox, Chrome and Opera autofill forms on `DOMContentLoaded`.

For instance, if the page has a form with login and password, and the browser remembered the values, then on `DOMContentLoaded` it may try to autofill them (if approved by the user).

So if `DOMContentLoaded` is postponed by long-loading scripts, then autofill also awaits. You probably saw that on some sites (if you use browser autofill) -- the login/password fields don't get autofilled immediately, but there's a delay till the page fully loads. That's actually the delay until the `DOMContentLoaded` event.


## window.onload [#window-onload]

The `load` event on the `window` object triggers when the whole page is loaded including styles, images and other resources.

The example below correctly shows image sizes, because `window.onload` waits for all images:

```html run height=200 refresh
<script>
  window.onload = function() {
    alert('Page loaded');

    // image is loaded at this time
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

## window.onunload

When a visitor leaves the page, the `unload` event triggers on `window`. We can do something there that doesn't involve a delay, like closing related popup windows.

The notable exception is sending analytics.

Let's say we gather data about how the page is used: mouse clicks, scrolls, viewed page areas, and so on.

Naturally, `unload` event is when the user leaves us, and we'd like to save the data on our server.

There exists a special `navigator.sendBeacon(url, data)` method for such needs, described in the specification <https://w3c.github.io/beacon/>.

It sends the data in background. The transition to another page is not delayed: the browser leaves the page, but still performs `sendBeacon`.

Here's how to use it:
```js
let analyticsData = { /* object with gathered data */ };

window.addEventListener("unload", function() {
  navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
};
```

- The request is sent as POST.
- We can send not only a string, but also forms and other formats, as described in the chapter <info:fetch>, but usually it's a stringified object.
- The data is limited by 64kb.

When the `sendBeacon` request is finished, the browser probably has already left the document, so there's no way to get server response (which is usually empty for analytics).

There's also a `keepalive` flag for doing such "after-page-left" requests in  [fetch](info:fetch) method for generic network requests. You can find more information in the chapter <info:fetch-api>.


If we want to cancel the transition to another page, we can't do it here. But we can use  another event -- `onbeforeunload`.

## window.onbeforeunload [#window.onbeforeunload]

If a visitor initiated navigation away from the page or tries to close the window, the `beforeunload` handler asks for additional confirmation.

If we cancel the event, the browser may ask the visitor if they are sure.

You can try it by running this code and then reloading the page:

```js run
window.onbeforeunload = function() {
  return false;
};
```

For historical reasons, returning a non-empty string also counts as canceling the event. Some time ago browsers used show it as a message, but as the [modern specification](https://html.spec.whatwg.org/#unloading-documents) says, they shouldn't.

Here's an example:

```js run
window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};
```

The behavior was changed, because some webmasters abused this event handler by showing misleading and annoying messages. So right now old browsers still may show it as a message, but aside of that -- there's no way to customize the message shown to the user.

## readyState

What happens if we set the `DOMContentLoaded` handler after the document is loaded?

Naturally, it never runs.

There are cases when we are not sure whether the document is ready or not. We'd like our function to execute when the DOM is loaded, be it now or later.

The `document.readyState` property tells us about the current loading state.

There are 3 possible values:

- `"loading"` -- the document is loading.
- `"interactive"` -- the document was fully read.
- `"complete"` -- the document was fully read and all resources (like images) are loaded too.

So we can check `document.readyState` and setup a handler or execute the code immediately if it's ready.

Like this:

```js
function work() { /*...*/ }

if (document.readyState == 'loading') {
  // loading yet, wait for the event
  document.addEventListener('DOMContentLoaded', work);
} else {
  // DOM is ready!
  work();
}
```

There's also the `readystatechange` event that triggers when the state changes, so we can print all these states like this:

```js run
// current state
console.log(document.readyState);

// print state changes
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

The `readystatechange` event is an alternative mechanics of tracking the document loading state, it appeared long ago. Nowadays, it is rarely used.

Let's see the full events flow for the completeness.

Here's a document with `<iframe>`, `<img>` and handlers that log events:

```html
<script>
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```

The working example is [in the sandbox](sandbox:readystate).

The typical output:
1. [1] initial readyState:loading
2. [2] readyState:interactive
3. [2] DOMContentLoaded
4. [3] iframe onload
5. [4] img onload
6. [4] readyState:complete
7. [4] window onload

The numbers in square brackets denote the approximate time of when it happens. Events labeled with the same digit happen approximately at the same time (+- a few ms).

- `document.readyState` becomes `interactive` right before `DOMContentLoaded`. These two things actually mean the same.
- `document.readyState` becomes `complete` when all resources (`iframe` and `img`) are loaded. Here we can see that it happens in about the same time as `img.onload` (`img` is the last resource) and `window.onload`. Switching to `complete` state means the same as `window.onload`. The difference is that `window.onload` always works after all other `load` handlers.


## Summary

Page load events:

- The `DOMContentLoaded` event triggers on `document` when the DOM is ready. We can apply JavaScript to elements at this stage.
  - Script such as `<script>...</script>` or `<script src="..."></script>` block DOMContentLoaded, the browser waits for them to execute.
  - Images and other resources may also still continue loading.
- The `load` event on `window` triggers when the page and all resources are loaded. We rarely use it, because there's usually no need to wait for so long.
- The `beforeunload` event on `window` triggers when the user wants to leave the page. If we cancel the event, browser asks whether the user really wants to leave (e.g we have unsaved changes).
- `The unload` event on `window` triggers when the user is finally leaving, in the handler we can only do simple things that do not involve delays or asking a user. Because of that limitation, it's rarely used. We can send out a network request with `navigator.sendBeacon`.
- `document.readyState` is the current state of the document, changes can be tracked in the `readystatechange` event:
  - `loading` -- the document is loading.
  - `interactive` -- the document is parsed, happens at about the same time as `DOMContentLoaded`, but before it.
  - `complete` -- the document and resources are loaded, happens at about the same time as `window.onload`, but before it.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
