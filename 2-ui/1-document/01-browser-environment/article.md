# 浏览器环境，规格

JavaScript 语言最初是为 Web 浏览器创建的。此后，它发展成为一种有多种用途和平台的语言。

平台可以是一个浏览器，一台网络服务器，一台洗衣机或其他**主机**。它们每个都提供特定于平台的功能。JavaScript 规范调用了**主机环境**。

主机环境提供语言核心以外的平台特定对象和功能。Web浏览器提供了一种控制网页的手段。Node.JS 提供了服务器端功能，等等。

以下是浏览器在 JavaScript 中运行时的一个鸟瞰图：

![](windowObjects.png)

有一个叫做 `window` 的“根”对象。它有两个角色：

1.首先，它是JavaScript代码的全局对象，如 <info：global-object>一章所述。
2.其次，它代表“浏览器窗口”并提供控制它的方法。

例如，在这里我们将其用作全局对象：

```js run
function sayHi() {
  alert("Hello");
}

// global functions are accessible as properties of window
window.sayHi();
```

在这里，我们将它用作浏览器窗口，以查看窗口高度：

```js run
alert(window.innerHeight); // inner window height
```

还有更多窗口特定的方法和属性，我们稍后会介绍它们。

## 文档对象模型(DOM)

`document` 对象可以访问页面内容。我们可以使用它在页面上更改或创建任何内容。

例如：
```js run
// change the background color to red
document.body.style.background = "red";

// change it back after 1 second
setTimeout(() => document.body.style.background = "", 1000);
```

Here we used `document.body.style`, but there's much, much more. Properties and methods are described in the specification. There happen to be two working groups who develop it:
这里我们使用了`document.body.style`，但还有很多很多其他的东西。 规范中描述了属性和方法。 正好有两个工作组在研发：

1. [W3C](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium) -- 其文档位于 <https://www.w3.org/TR/dom>.
2. [WhatWG](https://en.wikipedia.org/wiki/WHATWG), 发布在 ß <https://dom.spec.whatwg.org>.

巧的是，这两个工作组并不总是统一意见，所以我们有两套标准。 但它们非常相似，并最终融合在一起。您在给定资源上找到的文档非常相似，约有99％的相似度。 有很小的差异你可能并不会注意到。

Personally, I find <https://dom.spec.whatwg.org> more pleasant to use.

In the ancient past, there was no standard at all -- each browser implemented however it wanted. Different browsers had different sets, methods, and properties for the same thing, and developers had to write different code for each of them. Dark, messy times.

Even now we can sometimes meet old code that uses browser-specific properties and works around incompatibilities. But, in this tutorial we'll use modern stuff: there's no need to learn old things until you really need to (chances are high that you won't).

Then the DOM standard appeared, in an attempt to bring everyone to an agreement. The first version was "DOM Level 1", then it was extended by DOM Level 2, then DOM Level 3, and now it's reached DOM Level 4. People from WhatWG group got tired of version numbers and are calling it just "DOM", without a number. So we'll do the same.

```smart header="DOM is not only for browsers"
The DOM specification explains the structure of a document and provides objects to manipulate it. There are non-browser instruments that use it too.

For instance, server-side tools that download HTML pages and process them use the DOM. They may support only a part of the specification though.
```

```smart header="CSSOM for styling"
CSS rules and stylesheets are not structured like HTML. There's a separate specification [CSSOM](https://www.w3.org/TR/cssom-1/) that explains how they are represented as objects, and how to read and write them.

CSSOM is used together with DOM when we modify style rules for the document. In practice though, CSSOM is rarely required, because usually CSS rules are static. We rarely need to add/remove CSS rules from JavaScript, so we won't cover it right now.
```

## BOM (part of HTML spec)

Browser Object Model (BOM) are additional objects provided by the browser (host environment) to work with everything except the document.

For instance:

- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differ between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows us to read the current URL and can redirect the browser to a new one.

Here's how we can use the `location` object:

```js run
alert(location.href); // shows current URL
if (confirm("Go to wikipedia?")) {
  location.href = "https://wikipedia.org"; // redirect the browser to another URL
}
```

Functions `alert/confirm/prompt` are also a part of BOM: they are directly not related to the document, but represent pure browser methods of communicating with the user.


```smart header="HTML specification"
BOM is the part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods and browser-specific DOM extensions. That's "HTML in broad terms".
```

## Summary

Talking about standards, we have:

DOM specification
: Describes the document structure, manipulations and events, see <https://dom.spec.whatwg.org>.

CSSOM specification
: Describes stylesheets and style rules, manipulations with them and their binding to documents, see <https://www.w3.org/TR/cssom-1/>.

HTML specification
: Describes the HTML language (e.g. tags) and also the BOM (browser object model) -- various browser functions: `setTimeout`, `alert`, `location` and so on, see <https://html.spec.whatwg.org>. It takes the DOM specification and extends it with many additional properties and methods.

Now we'll get down to learning DOM, because the document plays the central role in the UI.

Please note the links above, as there's so much stuff to learn it's impossible to cover and remember everything.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/search> is a nice resource, but reading the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.
