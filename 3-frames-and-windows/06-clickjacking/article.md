# 点击劫持攻击

“点击劫持”攻击允许恶意页面 **以用户的名义** 点击“受害网站”。

许多网站都被黑客以这种方式攻击过，包括 Twitter、Facebook 和 Paypal 等许多网站。当然，它们都已经被修复了。

## 原理

原理十分简单。

我们以 Facebook 为例，解释点击劫持是如何完成的：

1. 访问者被恶意页面吸引。怎样吸引的不重要。
2. 页面上有一个看起来无害的链接（例如：“变得富有”或者“点我，超好玩！”）。
3. 恶意页面在该链接上方放置了一个透明的 `<iframe>`，其 `src` 来自于 facebook.com，这使得“点赞”按钮恰好位于该链接上面。这通常是通过 `z-index` 实现的。
4. 用户尝试点击该链接时，实际上点击的是“点赞”按钮。

## 示例

这是恶意页面看起来的样子。为了清楚起见，我们将 `<iframe>` 设置成了半透明的（在真正的恶意页面中，它是全透明的）：

```html run height=120 no-beautify
<style>
iframe { /* 来自受害网站的 iframe */
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
  opacity: 0.5; /* 在实际中为 opacity:0 */
*/!*
  z-index: 1;
}
</style>

<div>点击即可变得富有：</div>

<!-- 来自受害网站的 url -->
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>点这里！</button>
*/!*

<div>……你很酷（我实际上是一名帅气的黑客）！</div>
```

完整的攻击示例如下：

[codetabs src="clickjacking-visible" height=160]

在上面这个示例中，我们有一个半透明的 `<iframe src="facebook.html">`，我们可以看到，它位于按钮之上。点击按钮实际上会点击在 iframe 上，但这对用户不可见，因为 iframe 是透明的。

结果，如果访问者登陆了 Facebook（“记住我”通常是打开的），那么这个行为就会点一个“赞”。Twitter 上是 "Follow" 按钮。

下面是相同的示例，但 `iframe` 的透明度设置为了 `opacity:0`，更符合实际情况：

[codetabs src="clickjacking" height=160]

我们进行攻击所需要做的 —— 就是将 `<iframe>` 放置在恶意页面中，使得按钮恰好位于链接的正上方。这样当用户点击链接时，他们实际上点击的是按钮。这通常可以通过 CSS 实现。

```smart header="点击劫持是对点击事件，而非键盘事件"
此攻击仅影响鼠标行为（或者类似的行为，例如在手机上的点击）。

键盘输入很难重定向。从技术上讲，我们可以用 iframe 的文本区域覆盖原有的文本区域实现攻击。因此，当访问者试图聚焦页面中的输入时，实际上聚焦的是 iframe 中的输入。

但是这里有个问题。访问者键入的所有内容都会被隐藏，因为该 iframe 是不可见的。

当用户无法在屏幕上看到自己输入的字符时，通常会停止打字。
```

## 传统防御（弱 👎）

最古老的防御措施是一段用于禁止在 frame 中打开页面的 JavaScript 代码（所谓的 “framebusting”）。

它看起来像这样：

```js
if (top != window) {
  top.location = window.location;
}
```

意思是说：如果 window 发现它不在顶部，那么它将自动使其自身位于顶部。

这个方法并不可靠，因为有许多方式可以绕过这个限制。下面我们就介绍几个。

### 阻止顶级导航

我们可以阻止因更改 [beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload) 事件处理程序中的 `top.location` 而引起的过渡（transition）。

顶级页面（从属于黑客）在 `beforeunload` 上设置了一个用于阻止的处理程序，像这样：

```js
window.onbeforeunload = function() {
  return false;
};
```

当 `iframe` 试图更改 `top.location` 时，访问者会收到一条消息，询问他们是否要离开页面。

在大多数情况下，访问者会做出否定的回答，因为他们并不知道还有这么一个 iframe，他们所看到的只有顶级页面，他们没有理由离开。所以 `top.location` 不会变化！

演示示例：

[codetabs src="top-location"]

### Sandbox 特性

`sandbox` 特性的限制之一就是导航。沙箱化的 iframe 不能更改 `top.location`。

但我们可以添加具有 `sandbox="allow-scripts allow-forms"` 的 iframe。从而放开限制，允许脚本和表单。但我们没添加 `allow-top-navigation`，因此更改 `top.location` 是被禁止的。

代码如下：

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

还有其他方式可以绕过这个弱鸡防御。

## X-Frame-Options

服务器端 header `X-Frame-Options` 可以允许或禁止在 frame 中显示页面。

它必须被完全作为 HTTP-header 发送：如果浏览器在 HTML `<meta>` 标签中找到它，则会忽略它。因此，`<meta http-equiv="X-Frame-Options"...>` 没有任何作用。

这个 header 可能包含 3 个值：


`DENY`
: 始终禁止在 frame 中显示此页面。

`SAMEORIGIN`
: 允许在和父文档同源的 frame 中显示此页面。

`ALLOW-FROM domain`
: 允许在来自给定域的父文档的 frame 中显示此页面。

例如，Twitter 使用的是 `X-Frame-Options: SAMEORIGIN`。

````online
结果如下：

```html
<iframe src="https://twitter.com"></iframe>
```

<!-- ebook: prerender/ chrome headless dies and timeouts on this iframe -->
<iframe src="https://twitter.com"></iframe>

上面这个 `iframe` 可能为空，或者通过 alert 告知你浏览器不允许以这种方式导航至该页面，这取决于你的浏览器。
````

## 显示禁用的功能

`X-Frame-Options` 有一个副作用。其他的网站即使有充分的理由也无法在 frame 中显示我们的页面。

因此，还有其他解决方案……例如，我们可以用一个样式为 `height: 100%; width: 100%;` 的 `<div>` “覆盖”页面，这样它就能拦截所有点击。如果 `window == top` 或者我们确定不需要保护时，再将该 `<div>` 移除。

像这样：

```html
<style>
  #protector {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="protector">
  <a href="/" target="_blank">前往网站</a>
</div>

<script>
  // 如果顶级窗口来自其他源，这里则会出现一个 error
  // 但是在本例中没有问题
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

演示示例：

[codetabs src="protector"]

## Samesite cookie 特性

`samesite` cookie 特性也可以阻止点击劫持攻击。

具有 `samesite` 特性的 cookie 仅在网站是通过直接方式打开（而不是通过 frame 或其他方式）的情况下才发送到网站。更多细节请见 <info:cookie#samesite>。

如果网站，例如 Facebook，在其身份验证 cookie 中具有 `samesite` 特性，像这样：

```
Set-Cookie: authorization=secret; samesite
```

……那么，当在另一个网站中的 iframe 中打开 Facebook 时，此类 cookie 将不会被发送。因此，攻击将失败。

当不使用 cookie 时，`samesite` cookie 特性将不会有任何影响。这可以使其他网站能够轻松地在 iframe 中显示我们公开的、未进行身份验证的页面。

然而，这也可能会使得劫持攻击在少数情况下起作用。例如，通过检查 IP 地址来防止重复投票的匿名投票网站仍然会受到点击劫持的攻击，因为它不使用 cookie 对用户身份进行验证。

## 总结

点击劫持是一种“诱骗”用户在不知情的情况下点击恶意网站的方式。如果是重要的点击操作，这是非常危险的。

黑客可以通过信息发布指向他的恶意页面的链接，或者通过某些手段引诱访问者访问他的页面。当然还有很多其他变体。

一方面 —— 这种攻击方式是“浅层”的：黑客所做的只是拦截一次点击。但另一方面，如果黑客知道在点击之后将出现另一个控件，则他们可能还会使用狡猾的消息来迫使用户也点击它们。

这种攻击相当危险，因为在设计交互界面时，我们通常不会考虑到可能会有黑客代表用户点击界面。所以，在许多意想不到的地方可能发现攻击漏洞。

- 建议在那些不希望被在 frame 中查看的页面上（或整个网站上）使用 `X-Frame-Options: SAMEORIGIN`。
- 如果我们希望允许在 frame 中显示我们的页面，那我们使用一个 `<div>` 对整个页面进行遮盖，这样也是安全的。
