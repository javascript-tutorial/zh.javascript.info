# 跨窗口通信

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
"同源"策略限制了窗口之间的互相访问。

这个想法出于这样的考虑，如果我们打开了两个窗口：一个窗口来自 `john-smith.com`，另一个是 `gmail.com`，那么我们就不希望 `john-smith.com` 的脚本可以阅读我们的邮件。
=======
The "Same Origin" (same site) policy limits access of windows and frames to each other.

The idea is that if a user has two pages open: one from `john-smith.com`, and another one is `gmail.com`, then they wouldn't want a script from `john-smith.com` to read our mail from `gmail.com`. So, the purpose of the "Same Origin" policy is to protect users from information theft.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/03-cross-window-communication/article.md

## 同源

如果两个 URL 具有相同的协议，域名和端口，则称它们是"同源"的。

以下的几个 URL 都是同源的：

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

但是下面几个不是：

- <code>http://<b>www.</b>site.com</code> (`www.` 域名与其他不同)
- <code>http://<b>site.org</b></code> (`.org` 域名与其他不同)
- <code><b>https://</b>site.com</code> (协议与其他不同: `https`)
- <code>http://site.com:<b>8080</b></code> (端口与其他不同：`8080`)

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
如果我们有另外一个窗口（一个弹出窗口或者 iframe）的引用，并且这个窗口是同源的，那么我们可以使用它做任何事情。

如果它不是同源的，那么我们只能改变它的地址。请注意：不是**读取**地址，而是**改变**它，将其重定向到另外一个地址。因为 URL 可能包含一些敏感的参数，所以为了安全，禁止从一个非同源的站点获取地址，但是可以更改它。

当然这些窗口也可以互通信息，后面我们很快会讲到这一点。

````warn header="排除：子域可能是同源的"

在同源策略里有一个很重要的排除项。

如果窗口有相同的二级域名，比如 `john.site.com`，`peter.site.com` 和 `site.com`，我们可以使用 JavaScript 将 `document.domain` 设置为他们相同的二级域名 `site.com`。此时这些窗口将被当做同源的站点对待。

换句话说，所有的这些页面（包括来自 `site.com` 的页面）都添加这么一段代码：
=======
The "Same Origin" policy states that:

- if we have a reference to another window, e.g. a popup created by `window.open` or a window inside `<iframe>`, and that window comes from the same origin, then we have full access to that window.
- otherwise, if it comes from another origin, then we can't access the content of that window: variables, document, anything. The only exception is `location`: we can change it (thus redirecting the user). But we cannot *read* location (so we can't see where the user is now, no information leak).

Now let's see some examples. First, we'll look at pages that come from the same origin and do not conflict with the "Same Origin" policy, and afterwards we'll cover cross-window messaging that allows to work around the "Same Origin" policy.


````warn header="Subdomains may be same-origin"
There's a small exclusion in the "Same Origin" policy.

If windows share the same second-level domain, for instance `john.site.com`, `peter.site.com` and `site.com` (so that their common second-level domain is `site.com`), they can be treated as coming from the "same origin".

To make it work, all such pages (including the one from `site.com`) should run the code:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/03-cross-window-communication/article.md

```js
document.domain = 'site.com';
```

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
之后他们就可以无限制的互动了。

但是这仅适用于具有相同二级域名的页面。
=======
That's all. Now they can interact without limitations. Again, that's only possible for pages with the same second-level domain.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/03-cross-window-communication/article.md
````

## 访问 iframe 的内容

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
一个 `<iframe>` 是一个两面派的野兽。从一方面看，它就是一个标签，就像 `<script>` 或者 `<img>`，从另一方面来说，它又是一个窗口内嵌套的窗口。
=======
Our first example covers iframes. An `<iframe>` is a two-faced beast. From one side it's a tag, just like `<script>` or `<img>`. From the other side it's a window-in-window.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/03-cross-window-communication/article.md

嵌入的窗口有它单独的 `document` 和 `window` 对象。

我们可以使用以下属性访问他们：

- `iframe.contentWindow` 是对 `<iframe>` 里 window 的引用。
- `iframe.contentDocument` 是对 `<iframe>` 里的 document 对象的引用。

当我们访问嵌入式窗口时，浏览器会检查 iframe 是否具有相同的来源，如果不是这样会拒绝访问（除了上述提到的排除项）。

举个例子，这里是来自不同源的 `<iframe>`：

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // 我们可以通过它获取内部窗口的引用
    let iframeWindow = iframe.contentWindow;

    try {
      // ..但是无法获取 document
      let doc = iframe.contentDocument;
    } catch(e) {
      alert(e); // 安全错误（非同源）
    }

    // 并且我们无法读取嵌入窗口的地址
    try {
      alert(iframe.contentWindow.location);
    } catch(e) {
      alert(e); // 安全错误
    }

    // ...但是我们可以修改这个地址（并且将其他内容加载到 iframe 里）
    iframe.contentWindow.location = '/'; // 生效了

    iframe.onload = null; // 清除处理函数，保证代码只执行一次
  };
</script>
```

上述代码除了以下操作都会报错：

- 通过 `iframe.contentWindow` 获取内部窗口的 window
- 修改它的 `location`


```smart header="`iframe.onload` vs `iframe.contentWindow.onload`"
`iframe.onload` 实际上与 `iframe.contentWindow.onload` 相同，当嵌入窗口内所有资源全部加载完后触发。
...但是 `iframe.onload` 始终是可用的，然而 `iframe.contentWindow.onload` 需要满足同源策略。

```

现在有一个同源窗口的例子，我们可以对嵌入的窗口做任何事：

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // 随便做任何事
    iframe.contentDocument.body.prepend("Hello, world!");
  };
</script>
```

### 请等待 iframe 加载完成

创建 iframe 时，它立刻就会有一个 document，但是这个 document 与最终页面加载完成后的 document 是不同的。

看一下代码：


```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
*!*
    // 加载完后，document 和之前的已经不同了！
    alert(oldDoc == newDoc); // false
*/!*
  };
</script>
```

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
对于新的开发者来言，这实际上是一个众所周知的陷阱。我们不应该立即使用这个 document，因为这个是错误的。我们在它上面增加的任何事件处理函数都将被忽略。

...但是只有当 iframe 内的所有资源加载完后才会触发 `onload` 事件，如果我们希望更早的在嵌入文档的 `DOMContentLoaded` 上做操作怎么办？
=======
That's actually a well-known pitfall for developers. We shouldn't work with the document immediately, because that's the *wrong document*. If we set any event handlers on it, they will be ignored.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/03-cross-window-communication/article.md


如果 iframe 不是同源的，那就无法完成这件事。但是对于同源的 iframe 来说，我们可以尝试捕捉新文档出现的时机，然后设置必要的处理逻辑，如下所示：

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

  // 每 100ms 检测 document 是否是新的
    let timer = setInterval(() => {
    if (iframe.contentDocument == oldDoc) return;

    // 如果是新的，设置处理函数
    iframe.contentDocument.addEventListener('DOMContentLoaded', () => {
      iframe.contentDocument.body.prepend('Hello, world!');
    });

    clearInterval(timer); // 清空定时器
  }, 100);
</script>
```

如果您对这个问题有更好的解决方案，请在评论中告诉我。

## window.frames

获取 `<iframe>` 窗口对象的另一个方式是从命名集合 `window.frames` 上获取：

- 通过索引获取：`window.frames[0]` —— 当前文档里第一个 iframe 的窗口。
- 通过名称获取：`window.frames.iframeName` —— 获取 `name="iframeName"` 的 iframe 窗口。

举个例子：

```html run
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

一个 iframe 内可能嵌套了其他的 iframe，相应的 `window` 对象会也形成嵌套的层次结构。

可以通过以下方式获取引用：

- `window.frames` —— 子窗口的集合（用于嵌套的 iframe）。
- `window.parent` —— 对"父"（外部）窗口的引用。
- `window.top` —— 对最顶级父窗口的引用。

举例：

```js run
window.frames[0].parent === window; // true
```

我们可以使用 `top` 属性来检测当前的文档是否是在 iframe 内打开：

```js run
if (window == top) { // current window == window.top?
  alert('The script is in the topmost window, not in a frame');
} else {
  alert('The script runs in a frame!');
}
```

## sandbox 属性

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
`sandbox` 属性允许在 `<iframe>` 中禁止某些特定操作，以避免执行一些不被信任的代码。它通过将它当做非同源的网页对待以及添加一些限制以实现 iframe 的沙盒化。
=======
The `sandbox` attribute allows for the exclusion of certain actions inside an `<iframe>` in order to prevent it executing untrusted code. It "sandboxes" the iframe by treating it as coming from another origin and/or applying other limitations.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/03-cross-window-communication/article.md

默认情况下，对于 `<iframe sandbox src="...">`，会有一些"默认限制"被应用于 iframe。但是我们可以像 `<iframe sandbox="allow-forms allow-popups">` 这样，提供一个以空格分割的"排除"限制列表作为属性，此时被列出的限制将不会生效。

换句话说，一个空的 `"sandbox"` 可以带来最严格的限制，但是我们可以列出一个以空格分割的列表，列出我们想要提升的内容。

以下是限制列表的一些属性：

`allow-same-origin`： 默认情况下，`"sandbox"` 在 iframe 上强制执行"不同来源"的策略。换句话说，即使 `iframe` 的 `src` 是同源的，它也会其作为非同源的站点来处理，并且对脚本添加所有隐含的限制。添加此选项后会移除这些限制。

`allow-top-navigation`
: 允许 `iframe` 修改父窗口的地址。

`allow-forms`
: 允许在 `iframe` 内提交表单。

`allow-scripts`
: 允许在 `iframe` 内运行脚本。

`allow-popups`
: 允许来自 `iframe` 的 `window.open` 弹出窗口。


查看 [官方手册](mdn:/HTML/Element/iframe) 以获取更多内容。

下面的示例演示了一个带有默认限制的沙盒 iframe：`<iframe sandbox src="...">`。它有一些 JavaScript 脚本和一个表单。

请注意这里的代码没有任何作用。可见默认设置非常苛刻：

[codetabs src="sandbox" height=140]


```smart
`"sandbox"` 属性的目的是为了*添加更多*限制。它不能移除这些限制，尤其是当 iframe 是非同源时，更不能放松同源策略。
```

## 跨窗口传递消息

通过 `postMessage` 这个接口，我们可以在不同源的窗口内进行通信。

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
它有两个部分。
=======
So, it's a way around the "Same Origin" policy. It allows a window from `john-smith.com` to talk to `gmail.com` and exchange information, but only if they both agree and call corresponding Javascript functions. That makes it safe for users.

The interface has two parts.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/03-cross-window-communication/article.md

### postMessage

想要发送消息的窗口需要调用接收窗口的 [postMessage](mdn:api/Window.postMessage) 方法来传递消息。换句话说，如果我们想把消息发送到 `win`，我们应该调用 `win.postMessage(data, targetOrigin)`。

这个接口有以下参数：

`data`
: 要发送的数据。可以是任何对象，接口内部会使用"结构化克隆算法"将数据克隆一份。IE 只支持字符串，因此我们需要对复杂对象调用 `JSON.stringify` 以支持该浏览器

`targetOrigin`
: 指定目标窗口的源，以确保只有来自指定源的窗口才能获得该消息。

`targetOrigin` 是一种安全措施。请记住，如果目标窗口是非同源的，我们无法读取它的 `location`，因此我们就无法确认当前在预期的窗口中打开的是哪个站点：因为用户随时可以跳转走。

指定 `targetOrigin` 可以确保窗口内指定的网站还存在时才会接收数据。在有敏感数据时非常重要。

举个例子：这里只有当 `win` 内的站点是 `http://example.com` 这个源时才会接收消息：

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

如果我们不希望做这个检测，可以将 `targetOrigin` 设置为 `*`。

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

为了接收消息，目标窗口应该在 `message` 事件上增加一个处理函数。当 `postMessage` 被调用时这个事件会被触发（并且 `targetOrigin` 检查成功）。

这个事件的 event 对象有一些特殊属性：

`data`
: 从 `postMessage` 传递来的数据。

`origin`
: 发送方的源，举个例子： `http://javascript.info`。

`source`
: 对发送方窗口的引用。如果我们需要的话可以立即回复 `postMessage`。

为了处理这个事件，我们需要使用 `addEventListener`，简单使用 `window.onmessage` 不起作用。

这里有一个例子：

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // 从未知源获取的消息，忽略它
    return;
  }

  alert( "received: " + event.data );
});
```

这里有完整的示例：

[codetabs src="postmessage" height=120]

```smart header="There's no delay"
`postMessage` 和 `message` 事件之间完全没有延迟。他们是同步的，甚至比 `setTimeout(...,0)` 还要快。
```

## 总结

为了获取另一个窗口的内容以及调用它的方法，首先我们需要获取它的引用。

对于弹出窗口我们有两个属性
- `window.open` —— 弹出一个新的窗口并返回它的引用,
- `window.opener` —— 在弹出窗口内获取打开它的窗口的引用。

对于 iframes 来说，我们可以使用以下方法获得父窗口或子窗口：
- `window.frames` —— 一个嵌套的 window 对象集合
- `window.parent`，`window.top` 是父窗口以及顶级窗口的引用
- `iframe.contentWindow` 是 `<iframe>` 内网页的 window 对象。

如果几个窗口的网页是同源的（域名，端口，协议都相同），那么这几个窗口可以互相操作任何事情。

否则，只能做以下操作：
- 修改另一个窗口的地址（并且只能修改，不能读取）
- 对它发送一个消息

但也有一些例外情况：
- 对于二级域名相同的页面：`a.site.com` 和 `b.site.com`。通过在它们的代码里执行 `document.domain='site.com'` 可以让他们处于"同源"状态。 
- 如果 iframe 有 `sandbox` 属性，则会强制其处于"非同源"状态，除非在属性中指定了 `allow-same-origin`，这可可用于在同一站点的 iframe 中运行不受信任的代码。

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
=======

Exclusions are:
- Windows that share the same second-level domain: `a.site.com` and `b.site.com`. Then setting `document.domain='site.com'` in both of them puts them into the "same origin" state.
- If an iframe has a `sandbox` attribute, it is forcefully put into the "different origin" state, unless the `allow-same-origin` is specified in the attribute value. That can be used to run untrusted code in iframes from the same site.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/03-cross-window-communication/article.md

`postMessage` 接口允许两个窗口之间进行通信（要通过安全检查）：

1. 发送方调用 `targetWin.postMessage(data, targetOrigin)`。
2. 如果 `targetOrigin` 不是 `'*'`，那么浏览器会检测 `targetWin` 的链接地址
3. 如果满足条件，`targetWin` 会触发 `message` 事件，并且有以下三个属性：
    - `origin` —— 发送方窗口的源（比如 `http://my.site.com`）
    - `source` —— 对发送窗口的引用
    - `data` —— 数据，除 IE 只支持字符串意外，其余浏览器都是对象。

    我们应该使用 `addEventListener` 在目标窗口监听这个事件。
