# 跨窗口通信

“同源（Same Origin）”策略限制了窗口（window）和 frame 之间的相互访问。

这个想法出于这样的考虑，如果一个用户有两个打开的页面：一个来自 `john-smith.com`，另一个是 `gmail.com`，那么用户将不希望 `john-smith.com` 的脚本可以读取 `gmail.com` 中的邮件。所以，“同源”策略的目的是保护用户免遭信息盗窃。

## 同源 [#same-origin]

如果两个 URL 具有相同的协议，域和端口，则称它们是“同源”的。

以下的几个 URL 都是同源的：

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

但是下面这几个不是：

- <code>http://<b>www.</b>site.com</code>（另一个域：`www.` 影响）
- <code>http://<b>site.org</b></code>（另一个域：`.org` 影响）
- <code><b>https://</b>site.com</code>（另一个协议：`https`）
- <code>http://site.com:<b>8080</b></code>（另一个端口：`8080`）

“同源”策略规定：

- 如果我们有对另外一个窗口（例如，一个使用 `window.open` 创建的弹窗，或者一个窗口中的 iframe）的引用，并且该窗口是同源的，那么我们就具有对该窗口的全部访问权限。
- 否则，如果该窗口不是同源的，那么我们就无法访问该窗口中的内容：变量，文档，任何东西。唯一的例外是 `location`：我们可以修改它（进而重定向用户）。但是我们无法读取 `location`（因此，我们无法看到用户当前所处的位置，也就不会泄漏任何信息）。

### 实例：iframe

一个 `<iframe>` 标签承载了一个单独的嵌入的窗口，它具有自己的 `document` 和 `window`。

我们可以使用以下属性访问它们：

- `iframe.contentWindow` 来获取 `<iframe>` 中的 window。
- `iframe.contentDocument` 来获取 `<iframe>` 中的 document，是 `iframe.contentWindow.document` 的简写形式。

当我们访问嵌入的窗口中的东西时，浏览器会检查 iframe 是否具有相同的源。如果不是，则会拒绝访问（对 `location` 进行写入是一个例外，它是会被允许的）。

例如，让我们尝试对来自另一个源的 `<iframe>` 进行读取和写入：

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // 我们可以获取对内部 window 的引用
*!*
    let iframeWindow = iframe.contentWindow; // OK
*/!*
    try {
      // ...但是无法获取其中的文档
*!*
      let doc = iframe.contentDocument; // ERROR
*/!*
    } catch(e) {
      alert(e); // Security Error（另一个源）
    }

    // 并且，我们也无法 **读取** iframe 中页面的 URL
    try {
      // 无法从 location 对象中读取 URL
*!*
      let href = iframe.contentWindow.location.href; // ERROR
*/!*
    } catch(e) {
      alert(e); // Security Error
    }

    // ...我们可以 **写入** location（所以，在 iframe 中加载了其他内容）！
*!*
    iframe.contentWindow.location = '/'; // OK
*/!*

    iframe.onload = null; // 清空处理程序，在 location 更改后不要再运行它
  };
</script>
```

上述代码除了以下操作都会报错：

- 通过 `iframe.contentWindow` 获取对内部 window 的引用 —— 这是被允许的。
- 对 `location` 进行写入

与此相反，如果 `<iframe>` 具有相同的源，我们可以使用它做任何事情：

```html run
<!-- 来自同一个网站的 iframe -->
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // 可以做任何事儿
    iframe.contentDocument.body.prepend("Hello, world!");
  };
</script>
```

```smart header="`iframe.onload` vs `iframe.contentWindow.onload`"
`iframe.onload` 事件（在 `<iframe>` 标签上）与 `iframe.contentWindow.onload`（在嵌入的 window 对象上）基本相同。当嵌入的窗口的所有资源都完全加载完毕时触发。

……但是，我们无法使用 `iframe.contentWindow.onload` 访问不同源的 iframe。因此，请使用 `iframe.onload`，
```

## 子域上的 window：document.domain

根据定义，两个具有不同域的 URL 具有不同的源。

但是，如果窗口的二级域相同，例如 `john.site.com`，`peter.site.com` 和 `site.com`（它们共同的二级域是 `site.com`），我们可以使浏览器忽略该差异，使得它们可以被作为“同源”的来对待，以便进行跨窗口通信。

为了做到这一点，每个这样的窗口都应该执行下面这行代码：

```js
document.domain = 'site.com';
```

这样就可以了。现在它们可以无限制地进行交互了。但是再强调一遍，这仅适用于具有相同二级域的页面。

## Iframe：错误文档陷阱

当一个 iframe 来自同一个源时，我们可能会访问其 `document`，但是这里有一个陷阱。它与跨源无关，但你一定要知道。

在创建 iframe 后，iframe 会立即就拥有了一个文档。但是该文档不同于加载到其中的文档！

因此，如果我们要立即对文档进行操作，就可能出问题。

看一下下面这段代码：


```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
*!*
    // 加载的文档与初始的文档不同！
    alert(oldDoc == newDoc); // false
*/!*
  };
</script>
```

我们不应该对尚未加载完成的 iframe 的文档进行处理，因为那是 **错误的文档**。如果我们在其上设置了任何事件处理程序，它们将会被忽略。

如何检测文档就位（加载完成）的时刻呢？

正确的文档在 `iframe.onload` 触发时肯定就位了。但是，只有在整个 iframe 和它所有资源都加载完成时，`iframe.onload` 才会触发。

我们可以尝试通过在 `setInterval` 中进行检查，以更早地捕获该时刻：

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

  // 每 100ms 检查一次文档是否为新文档
  let timer = setInterval(() => {
    let newDoc = iframe.contentDocument;
    if (newDoc == oldDoc) return;

    alert("New document is here!");

    clearInterval(timer); // 取消 setInterval，不再需要它做任何事儿
  }, 100);
</script>
```

## 集合：window.frames

获取 `<iframe>` 的 window 对象的另一个方式是从命名集合 `window.frames` 中获取：

- 通过索引获取：`window.frames[0]` —— 文档中的第一个 iframe 的 window 对象。
- 通过名称获取：`window.frames.iframeName` —— 获取 `name="iframeName"` 的 iframe 的 window 对象。

例如：

```html run
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

一个 iframe 内可能嵌套了其他的 iframe。相应的 `window` 对象会形成一个层次结构（hierarchy）。

可以通过以下方式获取：

- `window.frames` —— “子”窗口的集合（用于嵌套的 iframe）。
- `window.parent` —— 对“父”（外部）窗口的引用。
- `window.top` —— 对最顶级父窗口的引用。

例如：

```js run
window.frames[0].parent === window; // true
```

我们可以使用 `top` 属性来检查当前的文档是否是在 iframe 内打开的：

```js run
if (window == top) { // 当前 window == window.top?
  alert('The script is in the topmost window, not in a frame');
} else {
  alert('The script runs in a frame!');
}
```

## "sandbox" iframe 特性

`sandbox` 特性（attribute）允许在 `<iframe>` 中禁止某些特定行为，以防止其执行不被信任的代码。它通过将 iframe 视为非同源的，或者应用其他限制来实现 iframe 的“沙盒化”。

对于 `<iframe sandbox src="...">`，有一个应用于其上的默认的限制集。但是，我们可以通过提供一个以空格分隔的限制列表作为特性的值，来放宽这些限制，该列表中的各项为不应该应用于这个 iframe 的限制，例如：`<iframe sandbox="allow-forms allow-popups">`。

换句话说，一个空的 `"sandbox"` 特性会施加最严格的限制，但是我们用一个以空格分隔的列表，列出要移除的限制。

以下是限制的列表：

`allow-same-origin`
: 默认情况下，`"sandbox"` 会为 iframe 强制实施“不同来源”的策略。换句话说，它使浏览器将 `iframe` 视为来自另一个源，即使其 `src` 指向的是同一个网站也是如此。具有所有隐含的脚本限制。此选项会移除这些限制。

`allow-top-navigation`
: 允许 `iframe` 更改 `parent.location`。

`allow-forms`
: 允许在 `iframe` 中提交表单。

`allow-scripts`
: 允许在 `iframe` 中运行脚本。

`allow-popups`
: 允许在 `iframe` 中使用 `window.open` 打开弹窗。

查看 [官方手册](mdn:/HTML/Element/iframe) 获取更多内容。

下面的示例演示了一个具有默认限制集的沙盒 iframe：`<iframe sandbox src="...">`。它有一些 JavaScript 代码和一个表单。

请注意，这里没有东西会运行。可见默认设置非常苛刻：

[codetabs src="sandbox" height=140]


```smart
`"sandbox"` 特性的目的仅是 **添加更多** 限制。它无法移除这些限制。尤其是，如果 iframe 来自其他源，则无法放宽同源策略。
```

## 跨窗口通信

`postMessage` 接口允许窗口之间相互通信，无论它们来自什么源。

因此，这是解决“同源”策略的方式之一。它允许来自于 `john-smith.com` 的窗口与来自于 `gmail.com` 的窗口进行通信，并交换信息，但前提是它们双方必须均同意并调用相应的 JavaScript 函数。这可以保护用户的安全。

这个接口有两个部分。

### postMessage

想要发送消息的窗口需要调用接收窗口的 [postMessage](mdn:api/Window.postMessage) 方法。换句话说，如果我们想把消息发送给 `win`，我们应该调用 `win.postMessage(data, targetOrigin)`。

参数：

`data`
: 要发送的数据。可以是任何对象，数据会被通过使用“结构化序列化算法（structured serialization algorithm）”进行克隆。IE 浏览器只支持字符串，因此我们需要对复杂的对象调用 `JSON.stringify` 方法进行处理，以支持该浏览器。

`targetOrigin`
: 指定目标窗口的源，以便只有来自给定的源的窗口才能获得该消息。

`targetOrigin` 是一种安全措施。请记住，如果目标窗口是非同源的，我们无法在发送方窗口读取它的 `location`。因此，我们无法确定当前在预期的窗口中打开的是哪个网站：用户随时可以导航离开，并且发送方窗口对此一无所知。

指定 `targetOrigin` 可以确保窗口仅在当前仍处于正确的网站时接收数据。在有敏感数据时，这非常重要。

例如，这里的 `win` 仅在它拥有来自 `http://example.com` 这个源的文档时，才会接收消息：

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

如果我们不希望做这个检查，可以将 `targetOrigin` 设置为 `*`。

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

*!*
  win.postMessage("message", "*");
*/!*
</script>
```


### onmessage

为了接收消息，目标窗口应该在 `message` 事件上有一个处理程序。当 `postMessage` 被调用时触发该事件（并且 `targetOrigin` 检查成功）。

event 对象具有特殊属性：

`data`
: 从 `postMessage` 传递来的数据。

`origin`
: 发送方的源，例如 `http://javascript.info`。

`source`
: 对发送方窗口的引用。如果我们想，我们可以立即 `source.postMessage(...)` 回去。

要为 `message` 事件分配处理程序，我们应该使用 `addEventListener`，简短的语法 `window.onmessage` 不起作用。

这里有一个例子：

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // 来自未知的源的内容，我们忽略它
    return;
  }

  alert( "received: " + event.data );

  // 可以使用 event.source.postMessage(...) 向回发送消息
});
```

完整示例：

[codetabs src="postmessage" height=120]

## 总结

要调用另一个窗口的方法或者访问另一个窗口的内容，我们应该首先拥有对其的引用。

对于弹窗，我们有两个引用：
- 从打开窗口的（opener）窗口：`window.open` —— 打开一个新的窗口，并返回对它的引用，
- 从弹窗：`window.opener` —— 是从弹窗中对打开此弹窗的窗口（opener）的引用。

对于 iframe，我们可以使用以下方式访问父/子窗口：
- `window.frames` —— 一个嵌套的 window 对象的集合，
- `window.parent`，`window.top` 是对父窗口和顶级窗口的引用，
- `iframe.contentWindow` 是 `<iframe>` 标签内的 window 对象。

如果几个窗口的源相同（域，端口，协议），那么这几个窗口可以彼此进行所需的操作。

否则，只能进行以下操作：
- 更改另一个窗口的 `location`（只能写入）。
- 向其发送一条消息。

例外情况：
- 对于二级域相同的窗口：`a.site.com` 和 `b.site.com`。通过在这些窗口中均设置 `document.domain='site.com'`，可以使它们处于“同源”状态。 
- 如果一个 iframe 具有 `sandbox` 特性（attribute），则它会被强制处于“非同源”状态，除非在其特性值中指定了 `allow-same-origin`。这可用于在同一网站的 iframe 中运行不受信任的代码。

`postMessage` 接口允许两个具有任何源的窗口之间进行通信：

1. 发送方调用 `targetWin.postMessage(data, targetOrigin)`。
2. 如果 `targetOrigin` 不是 `'*'`，那么浏览器会检查窗口 `targetWin` 是否具有源 `targetOrigin`。
3. 如果它具有，`targetWin` 会触发具有特殊的属性的 `message` 事件：
    - `origin` —— 发送方窗口的源（比如 `http://my.site.com`）。
    - `source` —— 对发送方窗口的引用。
    - `data` —— 数据，可以是任何对象。但是 IE 浏览器只支持字符串，因此我们需要对复杂的对象调用 `JSON.stringify` 方法进行处理，以支持该浏览器。

    我们应该使用 `addEventListener` 来在目标窗口中设置 `message` 事件的处理程序。
