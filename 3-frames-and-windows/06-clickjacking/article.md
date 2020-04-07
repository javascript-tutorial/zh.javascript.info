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

### 阻塞顶层容器

在 [beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload) 事件中阻塞 `top.location` 变更过渡。

顶层页面（从属于黑客）在 `beforeunload` 上添加一个处理方法：当 `iframe` 试图变更 `top.location` 时，访问者会收到询问是否离开的消息。

如下所示：
```js
window.onbeforeunload = function() {
  window.onbeforeunload = null;
  return "Want to leave without learning all the secrets (he-he)?";
};
```

大多数情况下，由于并不知道 iframe 的存在，访问者看到的只是顶层页面，即本来就要访问的页面，由此认为没有必要离开，所以会回答否。则 `top.location` 并不会变化！

作用如下：

[codetabs src="top-location"]

### 沙箱属性

一个受 `sandbox` 属性限制的对象是导航。沙箱化的 iframe 不能变更 `top.location`。

但可以添加带有 `sandbox="allow-scripts allow-forms"` 的 iframe 标签。从而放开限制，允许脚本和表单在 iframe 中执行。但 `allow-top-navigation` 禁止了 `top.location` 的变更。

代码如下：

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

当然还有其他绕过这个弱鸡防御的方法。

## X-Frame-Options

服务端 header 字段 `X-Frame-Options` 能够允许或禁止 frame 内页面的显示。

这个 header 必须由 **服务端** 发送：若浏览器发现 `<meta>` 标签里有该字段，则会忽略此字段。即，`<meta http-equiv="X-Frame-Options"...>` 不生效。

该 header 有三个值：


`DENY`
: 始终禁止 frame 中的页面加载。

`SAMEORIGIN`
: 允许和父页面同一来源的 frame 进行页面加载。

`ALLOW-FROM domain`
: 允许和父页面同一给定域的 frame 进行页面加载。

例如，Twitter 使用的是 `X-Frame-Options: SAMEORIGIN`。

````online
如下所示：

```html
<iframe src="https://twitter.com"></iframe>
```

<iframe src="https://twitter.com"></iframe>

取决于浏览器行为，以上 `iframe` 要么显示为空，要么提醒你浏览器不允许内部页面加载。
````

## 显示不可用功能

`X-Frame-Options` 存在副作用。它无差别地禁止合法网站在 frame 中显示我们的页面。

所以还有其他措施...例如，把设置了 `height: 100%; width: 100%;` 的 `<div>` “覆盖” 在页面上，这样就能监听所有的点击事件。在 `window == top` 或无需防御的情况下，此 `<div>` 则应该隐藏起来。

代码示例如下：

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
  <a href="/" target="_blank">Go to the site</a>
</div>

<script>
  // 如果顶层 window 来自不同的域，会报错
  // 但是此处并没有报错
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

演示如下：

[codetabs src="protector"]

## 总结

点击劫持是一种 “欺骗” 用户在不知情下点击恶意网站的方式。如果是重要的点击操作，这是非常危险的。

黑客可以通过信息提交一个链接到他的恶意页面，或者通过某些手段引诱访问者访问他的页面。当然还有许多其他变体。

一方面 —— 这种攻击方式是“浅层”的：黑客只需要拦截一次点击。但另一方面，如果被这次点击之后会开启另一个控制开关，那么黑客同样用狡猾的提示强制用户点击这些控制按钮。

这种攻击相当危险，因为在设计交互界面时，通常不会考虑到可能会有黑客代替真正的访问者点击界面。所以许多意想不到的地方可能发现攻击漏洞。

- 推荐在页面上（或整个网站）使用 `X-Frame-Options: SAMEORIGIN`，这不会被 frame 内部读取。
- 若要允许的页面在 frame 中显示，用一个 `<div>` 遮盖，这样仍然是安全的。
