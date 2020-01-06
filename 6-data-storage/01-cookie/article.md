# Cookies, document.cookie

<<<<<<< HEAD
cookies 是直接保存在浏览器上的小数据串。它们是 HTTP 协议的一部分，由 [RFC 6265](https://tools.ietf.org/html/rfc6265) 规范定义。

大多数情况下，cookies 是由 web 服务器设置的。然后它们会自动添加到相同域名下的每次请求中。

最常见的用处之一是身份验证：

1. 登录后，服务端通过 `Set-Cookie` 在响应的 HTTP-header 中设置了一个带有 "会话标识符" 的 cookie。
2. 下次如果相同域名发起了请求，浏览器会发送带有 `Cookie` 的 HTTP-header。
3. 所以服务端知道是谁发起了请求。

我们还可以使用 `document.cookie` 属性在浏览器上访问 cookies。

有关 cookies 和它们的选项有很多棘手的事情。在本章节中，我们将会详细介绍。

## 从 document.cookie 中读取

```online
你在这个网站上有 cookies 吗？让我们来看看：
```

```offline
假设你在网站上可以看到 cookies，像这样：
```

```js run
// 在 javascript.info，我们使用谷歌分析来统计，
// 所以应该存在一些 cookies
=======
Cookies are small strings of data that are stored directly in the browser. They are a part of HTTP protocol, defined by [RFC 6265](https://tools.ietf.org/html/rfc6265) specification.

Cookies are usually set by a web-server using response `Set-Cookie` HTTP-header. Then the browser automatically adds them to (almost) every request to the same domain using `Cookie` HTTP-header.

One of the most widespread use cases is authentication:

1. Upon sign in, the server uses `Set-Cookie` HTTP-header in the response to set a cookie with a unique "session identifier".
2. Next time when the request is set to the same domain, the browser sends the cookie over the net using `Cookie` HTTP-header.
3. So the server knows who made the request.

We can also access cookies from the browser, using `document.cookie` property.

There are many tricky things about cookies and their options. In this chapter we'll cover them in detail.

## Reading from document.cookie

```online
Does your browser store any cookies from this site? Let's see:
```

```offline
Assuming you're on a website, it's possible to see the cookies from it, like this:
```

```js run
// At javascript.info, we use Google Analytics for statistics,
// so there should be some cookies
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
```


<<<<<<< HEAD
`document.cookie` 的值由一个个 `name=value` 组成，以 `; ` 相隔。每一个都是独立的 cookie。

为了找到一个特定的 cookie，我们可以通过 `; ` 截取 `document.cookie`，然后找到合适的名字。我们可以使用正则表达式或者数组的方法来实现。

我们把这个留给读者当作练习。此外，在本章节的结尾，你可以找到一些操作 cookies 的辅助函数。

## 写入 document.cookie

我们可以写入 `document.cookie`。但是这不是一个数据属性，它是一个访问者（getter/setter）。赋值操作会被特殊处理。

**浏览器的 `document.cookie` 写入操作只会更新已存在的 cookies，而不会影响其他 cookies。**

例如，这里设置了一个名称为 `user` 和值为 `John` 的 cookie：

```js run
document.cookie = "user=John"; // 只会更新名称为 user 的 cookie
alert(document.cookie); // 展示所有 cookies
```

如果你运行了代码，你很可能会看到多个 cookies。这是因为 `document.cookie=` 操作不是重写整个 cookies。它只设置代码中提到的 cookie `user`。

从技术层面看，cookie 的名称和值能是任何字符，为了保持格式有效，它们应该使用 `encodeURIComponent` 内置方法来编码一下：

```js run
// 特殊字符（空白符），需要编码
let name = "my name";
let value = "John Smith"

// 编码后变成 my%20name=John%20Smith
=======
The value of `document.cookie` consists of `name=value` pairs, delimited by `; `. Each one is a separate cookie.

To find a particular cookie, we can split `document.cookie` by `; `, and then find the right name. We can use either a regular expression or array functions to do that.

We leave it as an exercise for the reader. Also, at the end of the chapter you'll find helper functions to manipulate cookies.

## Writing to document.cookie

We can write to `document.cookie`. But it's not a data property, it's an accessor (getter/setter). An assignment to it is treated specially.

**A write operation to `document.cookie` updates only cookies mentioned in it, but doesn't touch other cookies.**

For instance, this call sets a cookie with the name `user` and value `John`:

```js run
document.cookie = "user=John"; // update only cookie named 'user'
alert(document.cookie); // show all cookies
```

If you run it, then probably you'll see multiple cookies. That's because `document.cookie=` operation does not overwrite all cookies. It only sets the mentioned cookie `user`.

Technically, name and value can have any characters, to keep the valid formatting they should be escaped using a built-in `encodeURIComponent` function:

```js run
// special characters (spaces), need encoding
let name = "my name";
let value = "John Smith"

// encodes the cookie as my%20name=John%20Smith
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```


<<<<<<< HEAD
```warn header="局限性"
存在一些局限性：
- `encodeURIComponent` 编码后的 `name=value` 对，大小不能超过 4kb。所以我们不能在一个 cookie 中保存大数据。
- 每个域名下所有 cookies 的总数限制在 20 几个，实际的限制数量取决于浏览器。
```

cookies 有好几个选项，很多选项都很重要并且应该设置它。

选项列在 `key=value` 后面，使用 `;` 间隔，像这样：
=======
```warn header="Limitations"
There are few limitations:
- The `name=value` pair, after `encodeURIComponent`, should not exceed 4kb. So we can't store anything huge in a cookie.
- The total number of cookies per domain is limited to around 20+, the exact limit depends on a browser.
```

Cookies have several options, many of them are important and should be set.

The options are listed after `key=value`, delimited by `;`, like this:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

## path

- **`path=/mypath`**

<<<<<<< HEAD
可访问到 cookie 的 url 路径前缀。必须是绝对路径。默认值为当前路径。

如果一个 cookie 设置了 `path=/admin`，那么在 `/admin` 和 `/admin/something` 下都是可见的，但是在 `/home` 或 `/adminpage` 下不可见。

通常，我们设置 `path=/` 来允许网站下所有页面访问 cookie。
=======
The url path prefix, the cookie will be accessible for pages under that path. Must be absolute. By default, it's the current path.

If a cookie is set with `path=/admin`, it's visible at pages `/admin` and `/admin/something`, but not at `/home` or `/adminpage`.

Usually, we should set `path` to the root: `path=/` to make the cookie accessible from all website pages.
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

## domain

- **`domain=site.com`**

<<<<<<< HEAD
可访问到 cookie 的域名。但是在实践中，存在局限性。我们不能设置任何域名。

默认情况下，cookie 只能在设置的域名下才能访问到。所以，如果 cookie 设置在 `site.com` 下，我们不能在任何其他域名下（`other.com`）访问它。

……但是棘手的是，我们在子域名下同样不能获取到 cookie（`forum.site.com`）！

```js
// 在 site.com
document.cookie = "user=John"

// 在 forum.site.com
alert(document.cookie); // 没有 user
```

**让 cookie 在另外一个二级域名下可以访问到是没有办法的，所以其他域名 `other.com` 将不会接收到设置在 `site.com` 的 cookie。**

这是一个安全限制，为了允许我们可以在 cookie 中保存敏感信息。

……但是如果我们想要批准像 `forum.site.com` 这样的子域名访问，这是可以做到的。我们应该明确设置 `domain` 选项为根域名：`domain=site.com`：

```js
// 在 site.com 中
// 使 cookie 在其任何子域名下可以访问：
document.cookie = "user=John; domain=site.com"

// 之后

// 在 forum.site.com
alert(document.cookie); // 也存在 user
```

因为历史原因，`domain=.site.com`（以点开头）也可以正常使用，最好添加点来支持老版本的浏览器。

所以，`domain` 选项允许子域名访问 cookie。

## expires, max-age

默认情况下，如果一个 cookie 没有设置这两个参数中的任何一个，那么在浏览器关闭后，它就会消失。此类 cookies 被称为 "session cookies”。

为了让 cookies 在浏览器关闭后仍然存在，我们可以设置 `expires` 或 `max-age` 其中一个选项。

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

cookie 过期日期，当到了过期时间浏览器会自动删除它。

日期必须是这种格式，GMT 时区。我们可以使用 `date.toUTCString` 方法得到。举个例子，我们可以设置 cookie 在 1 天后过期。

```js
// 在当前时间上加 1 天
=======
A domain where the cookie is accessible. In practice though, there are limitations. We can't set any domain.

By default, a cookie is accessible only at the domain that set it. So, if the cookie was set by `site.com`, we won't get it `other.com`.

...But what's more tricky, we also won't get the cookie at a subdomain `forum.site.com`!

```js
// at site.com
document.cookie = "user=John"

// at forum.site.com
alert(document.cookie); // no user
```

**There's no way to let a cookie be accessible from another 2nd-level domain, so `other.com` will never receive a cookie set at `site.com`.**

It's a safety restriction, to allow us to store sensitive data in cookies, that should be available only on one site.

...But if we'd like to allow subdomains like `forum.site.com` get a cookie, that's possible. When setting a cookie at `site.com`, we should explicitly set `domain` option to the root domain: `domain=site.com`:

```js
// at site.com
// make the cookie accessible on any subdomain *.site.com:
document.cookie = "user=John; domain=site.com"

// later

// at forum.site.com
alert(document.cookie); // has cookie user=John
```

For historical reasons, `domain=.site.com` (a dot before `site.com`) also works the same way, allowing access to the cookie from subdomains. That's an old notation, should be used if we need to support very old browsers.

So, `domain` option allows to make a cookie accessible at subdomains.

## expires, max-age

By default, if a cookie doesn't have one of these options, it disappears when the browser is closed. Such cookies are called "session cookies"

To let cookies survive browser close, we can set either `expires` or `max-age` option.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

Cookie expiration date, when the browser will delete it automatically.

The date must be exactly in this format, in GMT timezone. We can use `date.toUTCString` to get it. For instance, we can set the cookie to expire in 1 day:

```js
// +1 day from now
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

<<<<<<< HEAD
如果我们设置 `expires` 为已经过去的时间，cookie 会被删除。

-  **`max-age=3600`**

一个可以替代 `expires` 的选项，具体说明 cookie 的过期时间距离当前时间的秒数。

如果是 0 或者负数，cookie 会被删除：

```js
// 1 小时后 cookie 会失效
document.cookie = "user=John; max-age=3600";

// 删除 cookie (让 cookie 马上过期)
=======
If we set `expires` to a date in the past, the cookie is deleted.

-  **`max-age=3600`**

An alternative to `expires`, specifies the cookie expiration in seconds from the current moment.

If zero or negative, then the cookie is deleted:

```js
// cookie will die +1 hour from now
document.cookie = "user=John; max-age=3600";

// delete cookie (let it expire right now)
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
document.cookie = "user=John; max-age=0";
```  

## secure

- **`secure`**

<<<<<<< HEAD
cookie 应仅在 HTTPS 环境下传输。

**默认情况下，如果我们在 `http://site.com` 设置了 cookie，然后 cookie 在 `https://site.com` 中也会出现，反之亦然。**

也就是说，cookies 是基于域名的，它们不是通过协议来区分的。

有了这个选项，如果一个 cookie 通过 `https://site.com` 设置，然后它不会在相同域名的 HTTP 环境下出现，例如 `http://site.com`。所以，如果一个 cookie 存有敏感内容，不应该在不安全的 HTTP 环境下发送，此时这个选项就派上用场了。

```js
// 假设我们现在在 HTTPS 环境下
// 设置 cookie secure（只在 HTTPS 环境下传输）
=======
The cookie should be transferred only over HTTPS.

**By default, if we set a cookie at `http://site.com`, then it also appears at `https://site.com` and vice versa.**

That is, cookies are domain-based, they do not distinguish between the protocols.

With this option, if a cookie is set by `https://site.com`, then it doesn't appear when the same site is accessed by HTTP, as `http://site.com`. So if a cookie has sensitive content that should never be sent over unencrypted HTTP, then the flag is the right thing.

```js
// assuming we're on https:// now
// set the cookie secure (only accessible if over HTTPS)
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
document.cookie = "user=John; secure";
```  

## samesite

<<<<<<< HEAD
这是另外一个关于安全的选项，为了防止 XSRF（跨站点请求伪造）攻击。

为了理解它什么时候起效，我们来介绍下以下的攻击情况。

### XSRF 攻击

想象一下，你登录了 `bank.com` 网站。此时：你有了该站点的身份验证 cookie。你的浏览器会随着每次请求把它发送到 `bank.com`，因此，`bank.com` 承认你的身份和你做出的所有敏感经济操作。

现在，在另外一个窗口浏览网页时，你偶然访问了另外一个网站 `evil.com`，该网站有 JavaScript 代码提交了一个表单 `<form action="https://bank.com/pay">` 到 `bank.com`，提交的表单字段能够开始一笔到黑客账户的交易。

你每次访问 `bank.com` 时 cookie 都会发送，即使表单在 `evil.com` 上提交。所以银行识别你的身份并实际执行付款。

![](cookie-xsrf.svg)

这就被称为一个跨站点请求伪造（Cross-Site Request Forgery，简称 XSRF）攻击。

当然，真正的银行会防止出现这种情况。所有 `bank.com` 生成的表单都有一个特殊的字段，所谓的 "xsrf 保护令牌”，邪恶页面既不能生成或者从远程页面获取（它可以在那里提交表单，但是无法获取数据）。而且站点 `bank.com` 每次都会检查收到的表单上的令牌。

但这种防护需要时间来实现：我们需要确保每个表单都有 token 字段，而且必须检查所有的请求。

### 输入 cookie samesite 选项

cookie 的 `samesite` 选项提供了另一种防止此类攻击的方法，（理论上）应该不需要 "xsrf 保护令牌”。

它有两个可选的值：

- **`samesite=strict` (和 `samesite` 没有值一样)**

如果用户来自同一站点之外，那么设置了 `samesite=strict` 的 cookie 永远不会发送。

换句话说，无论用户是跟踪邮件链接或从 `evil.com` 提交表单，或者来自其他域名下的任何操作，cookie 都不会发送。

如果身份验证的 cookies 存在 `samesite` 选项，XSRF 攻击是没有机会成功的，因为 `evil.com` 发起的提交没有 cookies。所以 `bank.com` 无法识别用户，并且不会继续付款。

保护非常有效。只有来自 `bank.com` 的操作才会发送 `samesite` cookie，例如来自 `bank.com` 上另一页面的表单发送。

虽然，这样有一点点不方便。

当用户跟随合法链接来到 `bank.com`，例如他们自己的笔记，他们会感到惊讶，`bank.com` 不能识别他们的身份。实际上，在这种情况下 `samesite=strict` cookies 不会发送。

我们可以使用两个 cookies 来解决这个问题：一个 cookie 用来 "大致识别"，仅用来说 "Hello, John"，另外一个带有 `samesite=strict` 的 cookie 用来验证数据改变的操作。然后来自外部网站的用户会看到欢迎页面，但必须在银行的网站上发起付款，为了第二个 cookie 能被发送。

- **`samesite=lax`**

一种更轻松的方法也能防止 XSRF 攻击并且不会破坏用户体验。

lax 模式，和 `strict` 模式类似，禁止浏览器发送来自外部网站的 cookie，但是增加了一个例外。

`samesite=lax` cookie 在以下两个条件都成立时会被发送：
1. HTTP 方法是安全的（例如 GET 方法，不是 POST）。

    所有安全的 HTTP 方法列表可以看 [RFC7231 规范](https://tools.ietf.org/html/rfc7231)。基本上，这些都是只能用来读取数据但是不能写入数据的方法。他们不能执行任何更改数据的操作。以下链接都是 GET 安全方法。

2. 操作执行顶级导航（在浏览器地址栏中改变 URL）。

    这通常是正确的，但是如果导航是在一个 `<iframe>` 中执行，那么它不是顶级的。此外，JavaScript 的网络请求不执行任何导航，因为它们不适合。

所以，`samesite=lax` 基本上允许最常见的跳转 URL 的操作来获取 cookie。例如，在符合条件的笔记中打开网站链接。

但是任何更复杂的事，比如来自另一网站的网络请求或表单提交都会丢失 cookie。

如果这种情况适合你，那么添加 `samesite=lax` 将不会破坏用户体验并且可以增加保护。

总体来看，`samesite` 是一个很好的选项，但是它有一个重要的缺点：
- `samesite` 会被老版本的浏览器忽略（不兼容），2017 年左右。

**所以如果我们完全依赖 `samesite` 提供保护，那么老版本的浏览器是容易受到攻击的。**

但是我们肯定可以同时使用 `samesite` 和其他的保护措施，例如 xsrf tokens，这样可以增加多一层保护，将来，当老版本的浏览器淘汰时，我们可能会丢弃 xsrf tokens 这种方式。

## httpOnly

这个选项和 JavaScript 没有关系，但是为了完整性我们也提一下它。

web 服务器使用 `Set-Cookie` 标头来设置 cookie。它可以设置 `httpOnly` 这个选项。

这个选项禁止任何 JavaScript 操作访问 cookie。我们使用 `document.cookie` 不能看到 cookie 或操作 cookie。

这被用作预防措施，以保护黑客将自己的 JavaScript 代码注入页面并等待用户访问页面时发起的攻击。这应该是不可能发生的，黑客应该不可能将他们的代码注入我们的网站，但是网站有可能存在漏洞让黑客利用来实现这样的操作。


通常来说，如果发生了这种情况，并且让用户访问了带有黑客 JavaScript 代码的页面，黑客代码执行并获取到 `document.cookie` 包括用户身份验证的 cookie。这样就很糟糕了。

但是如果 cookie 设置了 `httpOnly`，然后 `document.cookie` 不能看到这个 cookie，所以它是受保护的。

## 附录: Cookie 函数

这里有一小组有关 cookies 操作的函数，比 `document.cookie` 手动修改更加方便。

有很多这种 cookie 库，所以这些函数只用于演示。虽然它们都能正常使用。
=======
That's another security attribute `samesite`. It's designed to protect from so-called XSRF (cross-site request forgery) attacks.

To understand how it works and when it's useful, let's take a look at XSRF attacks.

### XSRF attack

Imagine, you are logged into the site `bank.com`. That is: you have an authentication cookie from that site. Your browser sends it to `bank.com` with every request, so that it recognizes you and performs all sensitive financial operations.

Now, while browsing the web in another window, you accidentally come to another site `evil.com`. That site has JavaScript code that submits a form `<form action="https://bank.com/pay">` to `bank.com` with fields that initiate a transaction to the hacker's account.

The browser sends cookies every time you visit the site `bank.com`, even if the form was submitted from `evil.com`. So the bank recognizes you and actually performs the payment.

![](cookie-xsrf.svg)

That's called a "Cross-Site Request Forgery" (in short, XSRF) attack.

Real banks are protected from it of course. All forms generated by `bank.com` have a special field, so called "XSRF protection token", that an evil page can't generate or extract from a remote page (it can submit a form there, but can't get the data back). And the site `bank.com` checks for such token in every form it receives.

But such protection takes time to implement: we need to ensure that every form has the token field, and we must also check all requests.

### Enter cookie samesite option

The cookie `samesite` option provides another way to protect from such attacks, that (in theory) should not require "xsrf protection tokens".

It has two possible values:

- **`samesite=strict` (same as `samesite` without value)**

A cookie with `samesite=strict` is never sent if the user comes from outside the same site.

In other words, whether a user follows a link from their mail or submits a form from `evil.com`, or does any operation that originates from another domain, the cookie is not sent.

If authentication cookies have `samesite` option, then XSRF attack has no chances to succeed, because a submission from `evil.com` comes without cookies. So `bank.com` will not recognize the user and will not proceed with the payment.

The protection is quite reliable. Only operations that come from `bank.com` will send the `samesite` cookie, e.g. a form submission from another page at `bank.com`.

Although, there's a small inconvenience.

When a user follows a legitimate link to `bank.com`, like from their own notes, they'll be surprised that `bank.com` does not recognize them. Indeed, `samesite=strict` cookies are not sent in that case.

We could work around that by using two cookies: one for "general recognition", only for the purposes of saying: "Hello, John", and the other one for data-changing operations with `samesite=strict`. Then a person coming from outside of the site will see a welcome, but payments must be initiated from the bank website, for the second cookie to be sent.

- **`samesite=lax`**

A more relaxed approach that also protects from XSRF and doesn't break user experience.

Lax mode, just like `strict`, forbids the browser to send cookies when coming from outside the site, but adds an exception.

A `samesite=lax` cookie is sent if both of these conditions are true:
1. The HTTP method is "safe" (e.g. GET, but not POST).

    The full list of safe HTTP methods is in the [RFC7231 specification](https://tools.ietf.org/html/rfc7231). Basically, these are the methods that should be used for reading, but not writing the data. They must not perform any data-changing operations. Following a link is always GET, the safe method.

2. The operation performs top-level navigation (changes URL in the browser address bar).

    That's usually true, but if the navigation is performed in an `<iframe>`, then it's not top-level. Also, JavaScript methods for network requests do not perform any navigation, hence they don't fit.

So, what `samesite=lax` does is basically allows a most common "go to URL" operation to have cookies. E.g. opening a website link from notes satisfies these conditions.

But anything more complicated, like a network request from another site or a form submittion loses cookies.

If that's fine for you, then adding `samesite=lax` will probably not break the user experience and add protection.

Overall, `samesite` is a great option, but it has an important drawback:
- `samesite` is ignored (not supported) by old browsers, year 2017 or so.

**So if we solely rely on `samesite` to provide protection, then old browsers will be vulnerable.**

But we surely can use `samesite` together with other protection measures, like xsrf tokens, to add an additional layer of defence and then, in the future, when old browsers die out, we'll probably be able to drop xsrf tokens.

## httpOnly

This option has nothing to do with JavaScript, but we have to mention it for completeness.

The web-server uses `Set-Cookie` header to set a cookie. And it may set the `httpOnly` option.

This option forbids any JavaScript access to the cookie. We can't see such cookie or manipulate it using `document.cookie`.

That's used as a precaution measure, to protect from certain attacks when a hacker injects his own JavaScript code into a page and waits for a user to visit that page. That shouldn't be possible at all, a hacker should not be able to inject their code into our site, but there may be bugs that let hackers do it.


Normally, if such thing happens, and a user visits a web-page with hacker's JavaScript code, then that code executes and gains access to `document.cookie` with user cookies containing authentication information. That's bad.

But if a cookie is `httpOnly`, then `document.cookie` doesn't see it, so it is protected.

## Appendix: Cookie functions

Here's a small set of functions to work with cookies, more convenient than a manual modification of `document.cookie`.

There exist many cookie libraries for that, so these are for demo purposes. Fully working though.
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a


### getCookie(name)

<<<<<<< HEAD
获取 cookie 最简短的方式是使用 [正则表达式](info:regular-expressions)。

`getCookie(name)` 函数返回该 `name` 对应的 cookie：

```js
// 返回该 `name` 对应的 cookie,
// 如果没找到返回 undefined
=======
The shortest way to access cookie is to use a [regular expression](info:regular-expressions).

The function `getCookie(name)` returns the cookie with the given `name`:

```js
// returns the cookie with the given name,
// or undefined if not found
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

<<<<<<< HEAD
这里的 `new RegExp` 是动态生成的，为了匹配 `; name=<value>`。

请注意 cookie 的值是经过编码的，所以 `getCookie` 使用内置方法 `decodeURIComponent` 来解码。

### setCookie(name, value, options)

使用给定的 `value` 设置 `name` cookie，默认值是 `path=/`（可以修改或添加其他默认值）：
=======
Here `new RegExp` is generated dynamically, to match `; name=<value>`.

Please note that a cookie value is encoded, so `getCookie` uses a built-in `decodeURIComponent` function to decode it.

### setCookie(name, value, options)

Sets the cookie `name` to the given `value` with `path=/` by default (can be modified to add other defaults):
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js run
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
<<<<<<< HEAD
    // 如果需要的话，在这里添加其他默认值
    ...options
  };

  if (options.expires.toUTCString) {
=======
    // add other defaults here if necessary
    ...options
  };

  if (options.expires && options.expires.toUTCString) {
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

<<<<<<< HEAD
// 使用举例：
=======
// Example of use:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```

### deleteCookie(name)

<<<<<<< HEAD
要删除 cookie，我们可以给它设置一个负数的过期时间：
=======
To delete a cookie, we can call it with a negative expiration date:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```

```warn header="Updating or deleting must use same path and domain"
<<<<<<< HEAD
请注意：当我们更新或者删除一个 cookie 时，我们应该使用和设置 cookie 时相同的路径和域名选项。
```

代码放在: [cookie.js](cookie.js).


## 附录：第三方 cookies

如果 cookie 在用户正在访问的页面外的域名网站设置，则被称为第三方 cookie。

例如：
1. `site.com` 网站的一个页面加载了另外一个网站的 banner：`<img src="https://ads.com/banner.png">`。
2. 和 banner 一起，`ads.com` 的远程服务器可能设置 `Set-Cookie` 标头比如 `id=1234`。此类 cookie 源自 `ads.com` 域名，并且只在 `ads.com` 下是可见的：

    ![](cookie-third-party.svg)

3. 下次访问 `ads.com` 网站时，远程服务器获取 `id` cookie 并且识别用户身份。

    ![](cookie-third-party-2.svg)

4. 更为重要的是，当用户从 `site.com` 网站移动到另外一个带有 banner 的 `other.com` 上时，然后 `ads.com` 获取它所属的 cookie，从而识别用户身份并跟踪他在网站之间跳转：
=======
Please note: when we update or delete a cookie, we should use exactly the same path and domain options as when we set it.
```

Together: [cookie.js](cookie.js).


## Appendix: Third-party cookies

A cookie is called "third-party" if it's placed by domain other than the page user is visiting.

For instance:
1. A page at `site.com` loads a banner from another site: `<img src="https://ads.com/banner.png">`.
2. Along with the banner, the remote server at `ads.com` may set `Set-Cookie` header with cookie like `id=1234`. Such cookie originates from `ads.com` domain, and will only be visible at `ads.com`:

    ![](cookie-third-party.svg)

3. Next time when `ads.com` is accessed, the remote server gets the `id` cookie and recognizes the user:

    ![](cookie-third-party-2.svg)

4. What's even more important, when the users moves from `site.com` to another site `other.com` that also has a banner, then `ads.com` gets the cookie, as it belongs to `ads.com`, thus recognizing the visitor and tracking him as he moves between sites:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

    ![](cookie-third-party-3.svg)


<<<<<<< HEAD
由于它的性质，第三方 cookies 传统上用于跟踪和广告服务。它们绑定在原始域名上，因此 `ads.com` 可以跟踪到不同站点下的相同用户，如果他们访问的话。

当然，一些用户不喜欢被跟踪，所以浏览器禁止此类 cookies。

此外，一些现代浏览器对此类 cookies 采用特殊策略：
- Safari 浏览器根本不允许第三方 cookies。
- Firefox 浏览器附带一个第三方域名的黑名单，可以阻止第三方 cookies。


```smart
如果我们加载了一段第三方域的脚本，例如 `<script src="https://google-analytics.com/analytics.js">`，并且这段脚本使用 `document.cookie` 设置了 cookie，然后此类 cookie 不是第三方。

如果脚本设置了一个 cookie，那么无论脚本来自何处 —— 这个 cookie 都属于当前网页的域下。
```

## 附录: GDPR

本主题和 JavaScript 无关，只是设置 cookies 时的一些注意事项。

欧洲有一项名为 GDPR 的立法，它对网站实施一套尊重用户隐私的规则。其中一条规则是要求用户明确许可了才可以跟踪 cookies。

请注意，这只是关于跟踪/识别/授权 cookies。

所以，如果我们设置一个只保存了一些信息的 cookie，但是既不跟踪也不识别用户，那么我们可以自由的设置它。

但是如果我们要设置带有身份验证的 cookie 或跟踪 id，那么必须得到用户允许。

网站在遵循 GDPR 下通常有两种做法。你应该已经在网站中看到过它们了：

1. 如果一个网站想要为已经经过身份验证的用户设置跟踪 cookies。

    为此，注册表格必须要有一个选择框，例如“接受隐私政策”（描述怎么使用 cookie），用户必须勾选它，然后网站才可以自由设置身份验证 cookies。

2. 如果一个网站想要为每个人设置跟踪 cookies。

    为了合法实现，网站为新用户显示一个模态框，然后要求他们同意设置 cookies。然后网站才设置 cookie 并且让用户看到网站内容。虽然这对新用户来说可能是令人不安的。没有人喜欢看到 "必须点击" 的模态框而不是网站内容。但是 GDPR 要求得到用户明确的同意。


GDPR 不仅只涉及 cookie，还涉及其他与隐私相关的问题，但这超出了我们的讨论范围。


## 总结

`document.cookie` 提供了对 cookies 的访问
- 写入操作只会修改其中存在的 cookie。
- name/value 必须编码。
- 一个 cookie 最大 4kb，每个网站最多 20+ 个 cookies（取决于浏览器）。

Cookie 选项：
- `path=/`，默认为当前路径，使 cookie 仅在该路径下可见。
- `domain=site.com`，默认 cookie 仅在当前域名下可见，如果明确设置了域名，可以让 cookie 在子域名下也可见。
- `expires` 或 `max-age` 设置 cookie 过期时间，如果没有设置，则当浏览器关闭时 cookie 就失效了。
- `secure` 使 cookie 仅在 HTTPS 下有效。
- `samesite` 如果请求来自外部网站，禁止浏览器发送 cookie，这样有助于防止 XSRF 攻击。

另外：
- 浏览器可能会禁用第三方 cookies，例如 Safari 浏览器默认就会这样做。
- 在为欧洲人民设置跟踪 cookie 时，GDPR 要求得到用户明确许可。
=======
Third-party cookies are traditionally used for tracking and ads services, due to their nature. They are bound to the originating domain, so `ads.com` can track the same user between different sites, if they all access it.

Naturally, some people don't like being tracked, so browsers allow to disable such cookies.

Also, some modern browsers employ special policies for such cookies:
- Safari does not allow third-party cookies at all.
- Firefox comes with a "black list" of third-party domains where it blocks third-party cookies.


```smart
If we load a script from a third-party domain, like `<script src="https://google-analytics.com/analytics.js">`, and that script uses `document.cookie` to set a cookie, then such cookie is not third-party.

If a script sets a cookie, then no matter where the script came from -- the cookie belongs to the domain of the current webpage.
```

## Appendix: GDPR

This topic is not related to JavaScript at all, just something to keep in mind when setting cookies.

There's a legislation in Europe called GDPR, that enforces a set of rules for websites to respect users' privacy. And one of such rules is to require an explicit permission for tracking cookies from a user.

Please note, that's only about tracking/identifying/authorizing cookies.

So, if we set a cookie that just saves some information, but neither tracks nor identifies the user, then we are free to do it.

But if we are going to set a cookie with an authentication session or a tracking id, then a user must allow that.

Websites generally have two variants of following GDPR. You must have seen them both already in the web:

1. If a website wants to set tracking cookies only for authenticated users.

    To do so, the registration form should have a checkbox like "accept the privacy policy" (that describes how cookies are used), the user must check it, and then the website is free to set auth cookies.

2. If a website wants to set tracking cookies for everyone.

    To do so legally, a website shows a modal "splash screen" for newcomers, and require them to agree for cookies. Then the website can set them and let people see the content. That can be disturbing for new visitors though. No one likes to see "must-click" modal splash screens instead of the content. But GDPR requires an explicit agreement.


GDPR is not only about cookies, it's about other privacy-related issues too, but that's too much beyond our scope.


## Summary

`document.cookie` provides access to cookies
- write operations modify only cookies mentioned in it.
- name/value must be encoded.
- one cookie up to 4kb, 20+ cookies per site (depends on a browser).

Cookie options:
- `path=/`, by default current path, makes the cookie visible only under that path.
- `domain=site.com`, by default a cookie is visible on current domain only, if set explicitly to the domain, makes the cookie visible on subdomains.
- `expires` or `max-age` sets cookie expiration time, without them the cookie dies when the browser is closed.
- `secure` makes the cookie HTTPS-only.
- `samesite` forbids the browser to send the cookie with requests coming from outside the site, helps to prevent XSRF attacks.

Additionally:
- Third-party cookies may be forbidden by the browser, e.g. Safari does that by default.
- When setting a tracking cookie for EU citizens, GDPR requires to ask for permission.
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
