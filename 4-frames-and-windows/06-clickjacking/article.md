# 点击劫持攻击

“点击劫持” 攻击即允许恶意网页**以用户的名义**点击 “受害站点”。

许多站点都被这样攻击过，包括 Twitter、Facebook、Paypal 等等许多网站。当然，目前它们都已修复这个问题。

## 原理

原理十分简单。

以下以 Facebook 为例解释点击劫持是如何运作的：

1. 访问者被恶意网页吸引。此处略过如何被吸引的。
2. 页面上存在一个看起来无害的链接（比如：“马上有钱” 或者 “点我，超好玩！”）。
3. 恶意网页在该链接之上放置一个透明 `<iframe>` 标签，其中 `src` 指向 facebook.com，如此一来，“点赞” 按钮恰好在链接上面。通常用 `z-index` 实现。
4. 如果用户试图点击该链接，实际上是点到了 “点赞” 按钮上。

## 示例

以下是恶意网页的一般代码。为了更好的说明问题，`<iframe>` 标签设置成半透明状态（真正的恶意网页为全透明状态）：

```html run height=120 no-beautify
<style>
iframe { /* 来自受害网站的 iframe */
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
  opacity: 0.5; /* 真实为 opacity:0 */
*/!*
  z-index: 1;
}
</style>

<div>马上有钱：</div>

<!-- 来自受害网站的 url -->
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>点我！点我！</button>
*/!*

<div>...你会变帅（我才是帅黑客😜）！</div>
```

完整的攻击示例如下：

[codetabs src="clickjacking-visible" height=160]

例子中的半透明 `<iframe src="facebook.html">` 覆盖在按钮之上。点击按钮实际上点击在 iframe 标签上，但由于 iframe 标签透明，这一动作对用户不可见。


因此，若访问者曾登陆 Facebook（“记住我” 开关打开），这个动作会使用户在 Facebook 上进行 “Like” 操作。Twitter 上是 “Follow” 操作。

下面的例子相同，但 `iframe` 设置为 `opacity:0` 更符合实际情况：

[codetabs src="clickjacking" height=160]

只需要在恶意网页中的链接正上方放置 `<iframe>`，点击按钮就能发起攻击。通常用 CSS 就能实现。

```smart header="点击劫持作用于点击事件，而非键盘事件"
此攻击仅影响鼠标操作。

从技术上讲，可以用 iframe 中的文本域覆盖原有的文本域实现攻击。所以当访问者试图聚焦网页中的 input 标签时，实际上聚焦的是 iframe 中的 input 标签。

但是这里有个问题。访问者的所有输入都会被隐藏，因为该 iframe 是不可见的。

当用户无法在屏幕上看到自己输入的字符时，通常会停止打字。
```

## 传统防御（弱👎）

最古老的防御是一段禁止在非顶层页面中打开网页的 JavaScript 代码（所谓的 “framebusting”）。

如下所示：

```js
if (top != window) {
  top.location = window.location;
}
```

意思是：window 强制置顶，如果没在顶层，自动置顶。

这个方法并不可靠，因为有许多方式可以绕过这个限制。下面就介绍几个。

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
： 始终禁止 frame 中的页面加载。

`SAMEORIGIN`
： 允许和父页面同一来源的 frame 进行页面加载。

`ALLOW-FROM domain`
： 允许和父页面同一给定域的 frame 进行页面加载。

例如，Twitter 使用的是 `X-Frame-Options: SAMEORIGIN`。如下所示：

```html
<iframe src="https://twitter.com"></iframe>
```

<iframe src="https://twitter.com"></iframe>

取决于浏览器行为，以上 `iframe` 要么显示为空，要么提醒你浏览器不允许内部页面加载。

## 显示不可用功能

`X-Frame-Options` 存在副作用。它无差别地禁止合法站点在 frame 中显示我们的网页。

所以还有其他措施...... 例如，把设置了 `height: 100%; width: 100%;` 的 `<div>` “覆盖” 在页面上，这样就能监听所有的点击事件。在 `window == top` 或无需防御的情况下，此 `<div>` 则应该隐藏起来。

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

点击劫持是一种 “欺骗” 用户在不知情下点击恶意站点的方式。如果是重要的点击操作，这是非常危险的。

黑客可以通过信息提交一个链接到他的恶意网页，或者通过某些手段引诱访问者访问他的网页。当然还有许多其他变体。

一方面 —— 这种攻击方式是 “浅层” 的：黑客只需要拦截一次点击。但另一方面，如果被这次点击之后会开启另一个控制开关，那么黑客同样用狡猾的提示强制用户点击这些控制按钮。

这种攻击相当危险，因为在设计交互界面时，通常不会考虑到可能会有黑客代替真正的访问者点击界面。所以许多意想不到的地方可能发现攻击漏洞。

- 推荐在网页上（或整个站点）使用 `X-Frame-Options: SAMEORIGIN`，这不会被 frame 内部读取。
- 若要允许的页面在 frame 中显示，用一个 `<div>` 遮盖，这样仍然是安全的。
