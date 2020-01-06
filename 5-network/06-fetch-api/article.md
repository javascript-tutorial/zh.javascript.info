
# Fetch API

<<<<<<< HEAD
到目前为止，我们已经对 fetch 有一定的了解。

现在就让我们来看看 fetch 的其他 API，来了解它的全部能力吧。

```smart
请注意：这些选项 (options) 大多很少使用。即使跳过这一章节，你也可以很好的使用 `fetch` 。

但是，知道 `fetch` 可以做什么也是很好的，所以如果你求知欲旺盛，你也可以来看看这些细节。
```

这个列表包含了 `fetch` 所有可能的选项和它们的默认值(可选值在注释中)：

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, 等等.
  headers: {
     // 内容类型头的值
     // 通常会根据请求主体自动设置
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string, FormData, Blob, BufferSource, 或者 URLSearchParams
  referrer: "about:client", // 要么为 "" 即不发送 Referer 头，
  // 要么是一个来自当前域名的 url
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, 或者 only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // 一个 hash 值, 比如 "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // 中止控制器（AbortController）用以中止请求
=======
So far, we know quite a bit about `fetch`.

Let's see the rest of API, to cover all its abilities.

```smart
Please note: most of these options are used rarely. You may skip this chapter and still use `fetch` well.

Still, it's good to know what `fetch` can do, so if the need arises, you can return and read the details.
```

Here's the full list of all possible `fetch` options with their default values (alternatives in comments):

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // the content type header value is usually auto-set
    // depending on the request body
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string, FormData, Blob, BufferSource, or URLSearchParams
  referrer: "about:client", // or "" to send no Referer header,
  // or an url from the current origin
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // a hash, like "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController to abort request
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
  window: window // null
});
```

<<<<<<< HEAD
一个令人印象深刻的列表，是吧?

我们已经在这个章节 <info:fetch-basics> 详细介绍过 `method`, `headers` 和 `body` 了

`signal` 选项已经在 <info:fetch-abort> 章节讨论过了。

现在让我们探讨它其他的本领。

## referrer, referrerPolicy

这些选项决定了 `fetch` 如何设置 HTTP 的 `Referer` 头

通常来说，这个头部被自动设置并包含了发出请求的页面的 url。在大部分情况下，它只是个无关紧要的小角色，但有些时候出于安全考虑，对它的移除或缩短是由必要的。
.

**`referer` 选项允许设置任何在当前域名 (origin) 的 `Referer` 或者移除它。**

要发送无来源页，可以将 `referer` 设置为空字符串：
```js
fetch('/page', {
*!*
  referrer: "" // 没有 Referer 头部信息
=======
An impressive list, right?

We fully covered `method`, `headers` and `body` in the chapter <info:fetch>.

The `signal` option is covered in <info:fetch-abort>.

Now let's explore the rest of capabilities.

## referrer, referrerPolicy

These options govern how `fetch` sets HTTP `Referer` header.

Usually that header is set automatically and contains the url of the page that made the request. In most scenarios, it's not important at all, sometimes, for security purposes, it makes sense to remove or shorten it.

**The `referrer` option allows to set any `Referer` within the current origin) or remove it.**

To send no referer, set an empty string:
```js
fetch('/page', {
*!*
  referrer: "" // no Referer header
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
*/!*
});
```

<<<<<<< HEAD
设置在当前域名内的另一个 url：

```js
fetch('/page', {
  // 假设我们在 https://javascript.info
  // 我们可以设置任何 Referer 头部，但只能在当前网页源
=======
To set another url within the current origin:

```js
fetch('/page', {
  // assuming we're on https://javascript.info
  // we can set any Referer header, but only within the current origin
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
*!*
  referrer: "https://javascript.info/anotherpage"
*/!*
});
```

<<<<<<< HEAD
**`referrerPolicy` 选项为 `Referer` 设置通用规则。**

请求被分为 3 种类型：
1. 同源请求。
2. 跨域请求。
3. HTTPS 到 HTTP 的请求 (从安全协议到不安全协议)。

与 `referrer` 选项允许设置确切的 `Referer` 值不同， `referrerPolicy` 告诉浏览器针对各个请求类型的使用的通常的规则。

可能的值在 [Referrer Policy specification (来源协议规范)](https://w3c.github.io/webappsec-referrer-policy/) 中有介绍:

- **`"no-referrer-when-downgrade"`** -- 默认值: 完整的 `Referer` 总被发送，除非我们从 HTTPS 发送请求到 HTTP (到较不安全协议)。
- **`"no-referrer"`** -- 从不发送 `Referer`.
- **`"origin"`** -- 只发送在 `Referer` 的域名，而不是整个页面 URL，比如，是发送 `http://site.com` 而不是 `http://site.com/path`。
- **`"origin-when-cross-origin"`** -- 同源情况下，发送完整的 referer，但在跨域情况下，则只发送域名部分(同上)。
- **`"same-origin"`** -- 同源情况下，发送完整的 referer，但在跨域情况下，则不发送 referer。
- **`"strict-origin"`** -- 只发送域名，但在 HTTPS→HTTP 请求中则不发送 referer。
- **`"strict-origin-when-cross-origin"`** -- 对于同源情况下则发送完整的 refererm 对于跨域情况下则只发送域名，如果是 HTTPS→HTTP 请求，则什么都不发送。
- **`"unsafe-url"`** -- 在 `Referer` 中总是发送完整的 url，即使是 HTTPS→HTTP 请求。

这是一个包含各种组合的表格：

| 值 | 同源 | 跨域 | HTTPS→HTTP |
|-------|----------------|-------------------|------------|
| `"no-referrer"` | - | - | - |
| `"no-referrer-when-downgrade"` 或者 `""` (默认) | 完整的 url | 完整的 url | - |
| `"origin"` | 仅域名 | 仅域名 | 仅域名 |
| `"origin-when-cross-origin"` | 完整的 url | 仅域名 | 仅域名 |
| `"same-origin"` | 完整的 url | - | - |
| `"strict-origin"` | 仅域名 | 仅域名 | - |
| `"strict-origin-when-cross-origin"` | 完整的 url | 仅域名 | - |
| `"unsafe-url"` | 完整的 url | 完整的 url | 完整的 url |

假如说我们有一个从网站外部无法观察的带有 URL 结构的管理区域。

如果我们发送了一个跨域的 `fetch`，然后它默认地发送带有我们网页完整 url 的 `Referer` 头部。(当我们从 HTTPS 向 HTTP 发送请求的除外，这种情况下是没有 `Referer` )。

比如 `Referer: https://javascript.info/admin/secret/paths`。

如果我们想要其他网址只知道域名部分，而不是 URL 的路径，我们可以这样设置选项：
=======
**The `referrerPolicy` option sets general rules for `Referer`.**

Requests are split into 3 types:

1. Request to the same origin.
2. Request to another origin.
3. Request from HTTPS to HTTP (from safe to unsafe protocol).

Unlike `referrer` option that allows to set the exact `Referer` value, `referrerPolicy` tells the browser general rules for each request type.

Possible values are described in the [Referrer Policy specification](https://w3c.github.io/webappsec-referrer-policy/):

- **`"no-referrer-when-downgrade"`** -- the default value: full `Referer` is sent always, unless we send a request from HTTPS to HTTP (to less secure protocol).
- **`"no-referrer"`** -- never send `Referer`.
- **`"origin"`** -- only send the origin in `Referer`, not the full page URL, e.g. only `http://site.com` instead of `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- send full `Referer` to the same origin, but only the origin part for cross-origin requests (as above).
- **`"same-origin"`** -- send full `Referer` to the same origin, but no referer for for cross-origin requests.
- **`"strict-origin"`** -- send only origin, don't send `Referer` for HTTPS→HTTP requests.
- **`"strict-origin-when-cross-origin"`** -- for same-origin send full `Referer`, for cross-origin send only origin, unless it's HTTPS→HTTP request, then send nothing.
- **`"unsafe-url"`** -- always send full url in `Referer`, even for HTTPS→HTTP requests.

Here's a table with all combinations:

| Value | To same origin | To another origin | HTTPS→HTTP |
|-------|----------------|-------------------|------------|
| `"no-referrer"` | - | - | - |
| `"no-referrer-when-downgrade"` or `""` (default) | full | full | - |
| `"origin"` | origin | origin | origin |
| `"origin-when-cross-origin"` | full | origin | origin |
| `"same-origin"` | full | - | - |
| `"strict-origin"` | origin | origin | - |
| `"strict-origin-when-cross-origin"` | full | origin | - |
| `"unsafe-url"` | full | full | full |

Let's say we have an admin zone with URL structure that shouldn't be known from outside of the site.

If we send a `fetch`, then by default it always sends the `Referer` header with the full url of our page (except when we request from HTTPS to HTTP, then no `Referer`).

E.g. `Referer: https://javascript.info/admin/secret/paths`.

If we'd like other websites know only the origin part, not URL-path, we can set the option:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```

<<<<<<< HEAD
我们可以把它放在所有 `fetch` 的调用，也可以整合进我们项目所有用于请求和内部使用 `fetch` 的 JavaScript 库。

与默认行为相比较，它的唯一区别是跨域请求的 `fetch` 只发送 URL 的域名部分(比如 `https://javascript.info`，没有路径)。对于同源请求，我们仍然能得到完整的 `Referer` (也许在 debug 中有用)。

```smart header="来源协议 (Referrer policy) 不只用于 `fetch`"
在 [规范](https://w3c.github.io/webappsec-referrer-policy/) 中描述的来源协议，不只是用于 `fetch`，它用处更广泛。

具体来说，它可以使用 `Referrer-Policy` 的 HTTP 头部信息给整个页面设置默认来源协议，或者使用 `<a rel="noreferrer">` 给单一链接设置。
=======
We can put it to all `fetch` calls, maybe integrate into JavaScript library of our project that does all requests and uses `fetch` inside.

Its only difference compared to the default behavior is that for requests to another origin `fetch` sends only the origin part of the URL (e.g. `https://javascript.info`, without path). For requests to our origin we still get the full `Referer` (maybe useful for debugging purposes).

```smart header="Referrer policy is not only for `fetch`"
Referrer policy, described in the [specification](https://w3c.github.io/webappsec-referrer-policy/), is not just for `fetch`, but more global.

In particular, it's possible to set the default policy for the whole page using `Referrer-Policy` HTTP header, or per-link, with `<a rel="noreferrer">`.
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
```

## mode

<<<<<<< HEAD
`mode` 选项服务类似安全守卫，用以阻止跨域请求：

- **`"cors"`** -- 默认值，允许跨域请求，可见于 <info:fetch-crossorigin>，
- **`"same-origin"`** -- 禁止跨域请求，
- **`"no-cors"`** -- 只允许简单的跨域请求。

当 `fetch` 的 url 来自于第三方，我们想要一个 "停电开关" 来限制跨域能力时，这也许会很有用。

## credentials

`credentials` 选项确定 `fetch` 是否应该在请求中发送 cookies 和 HTTP-Authorization 头部信息。

- **`"same-origin"`** -- 默认值，在跨域请求中不发送，
- **`"include"`** -- 总是发送，需要在跨域服务器中设置 `Accept-Control-Allow-Credentials` 来使 JavaScript 能够接受响应，这部分在这一章节<info:fetch-crossorigin> 有所讨论，
- **`"omit"`** -- 不发送，即使在同源请求。

## cache

`fetch` 请求会默认地利用标准的 HTTP 缓存。就是说，它遵从 `Expires`,， `Cache-Control` 头部信息，发送 `If-Modified-Since`，和其他头部信息。就像常规的 HTTP 请求。

`cache` 选项允许无视 HTTP 缓存或者微调它的用法：

- **`"default"`** -- `fetch` 使用标准的 HTTP 缓存规则和头部信息，
- **`"no-store"`** -- 完全无视 HTTP 缓存，如果我们设置了头部信息 `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, 或者 `If-Range`，这个模式会成为默认值，
- **`"reload"`** -- 不从 HTTP 缓存获取结果(如果有)，但使用响应填充缓存(如果响应头允许)，
- **`"no-cache"`** -- 如果有一个已缓存的响应则创建一个有条件的请求，否则创建一个常规的请求。使用响应填充 HTTP 缓存，
- **`"force-cache"`** -- 从 HTTP 缓存使用一个响应，即使该缓存已过时。如果在 HTTP 缓存中无响应，则创建一个常规的 HTTP 请求，
- **`"only-if-cached"`** -- 从 HTTP 缓存使用一个响应，即使该缓存已过时。如果在 HTTP 缓存中无响应，则报错。只有当 `mode` 为 `same-origin` 时生效。

## redirect

通常来说, `fetch` 直接随着 HTTP 重定向，比如 301，302等等。

`redirect` 选项允许改变这个情况:

- **`"follow"`** -- 默认值, 随着 HTTP 重定向,
- **`"error"`** -- 如果 HTTP 重定向则报错,
- **`"manual"`** -- 不随着 HTTP 重定向，但 `response.url` 会是一个新的 URL，然后 `response redirectd` 会变为 `true`，所以我们能够手动表现重定向到新的 URL (如果需要的话)。

## integrity

`integrity` 选项允许检查响应是否符合已知的校验和。

正如在[规范](https://w3c.github.io/webappsec-subresource-integrity/)描述的，支持的哈希函数 (hash-functions) SHA-256，SHA-384， 和 SHA-512，也许还有其他，这取决于浏览器。

比如，我们下载一个文件，并且我们知道它的 SHA-256 校验和是 "abcdef" (当然，一个真的校验和更长)。

我们可以把它放在 `integrity` 选项中，就像这样:
=======
The `mode` option is a safe-guard that prevents occasional cross-origin requests:

- **`"cors"`** -- the default, cross-origin requests are allowed, as described in <info:fetch-crossorigin>,
- **`"same-origin"`** -- cross-origin requests are forbidden,
- **`"no-cors"`** -- only simple cross-origin requests are allowed.

This option may be useful when the URL for `fetch` comes from a 3rd-party, and we want a "power off switch" to limit cross-origin capabilities.

## credentials

The `credentials` option specifies whether `fetch` should send cookies and HTTP-Authorization headers with the request.

- **`"same-origin"`** -- the default, don't send for cross-origin requests,
- **`"include"`** -- always send, requires `Accept-Control-Allow-Credentials` from cross-origin server in order for JavaScript to access the response, that was covered in the chapter <info:fetch-crossorigin>,
- **`"omit"`** -- never send, even for same-origin requests.

## cache

By default, `fetch` requests make use of standard HTTP-caching. That is, it honors `Expires`, `Cache-Control` headers, sends `If-Modified-Since`, and so on. Just like regular HTTP-requests do.

The `cache` options allows to ignore HTTP-cache or fine-tune its usage:

- **`"default"`** -- `fetch` uses standard HTTP-cache rules and headers,
- **`"no-store"`** -- totally ignore HTTP-cache, this mode becomes the default if we set a header `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, or `If-Range`,
- **`"reload"`** -- don't take the result from HTTP-cache (if any), but populate cache with the response (if response headers allow),
- **`"no-cache"`** -- create a conditional request if there is a cached response, and a normal request otherwise. Populate HTTP-cache with the response,
- **`"force-cache"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, make a regular HTTP-request, behave normally,
- **`"only-if-cached"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, then error. Only works when `mode` is `"same-origin"`.

## redirect

Normally, `fetch` transparently follows HTTP-redirects, like 301, 302 etc.

The `redirect` option allows to change that:

- **`"follow"`** -- the default, follow HTTP-redirects,
- **`"error"`** -- error in case of HTTP-redirect,
- **`"manual"`** -- don't follow HTTP-redirect, but `response.url` will be the new URL, and `response.redirected` will be `true`, so that we can perform the redirect manually to the new URL (if needed).

## integrity

The `integrity` option allows to check if the response matches the known-ahead checksum.

As described in the [specification](https://w3c.github.io/webappsec-subresource-integrity/), supported hash-functions are SHA-256, SHA-384, and SHA-512, there might be others depending on a browser.

For example, we're downloading a file, and we know that it's SHA-256 checksum is "abcdef" (a real checksum is longer, of course).

We can put it in the `integrity` option, like this:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

<<<<<<< HEAD
然后 `fetch` 会自己计算 SHA-256 并且比较我们的字符串。假如匹配错误，则会报错。

## keepalive

`keepalive` 选项表示请求是否会使初始化后的网页“失活”。

比如，我们收集当前用户是如何使用我们的网页的(点击鼠标，看过的页面碎片)数据，来分析并提升用户体验。

当用户离开我们的网页时 -- 我们希望能够在服务器中储存数据。

为此，我们可以使用事件 `window.onunload`:
=======
Then `fetch` will calculate SHA-256 on its own and compare it with our string. In case of a mismatch, an error is triggered.

## keepalive

The `keepalive` option indicates that the request may "outlive" the webpage that initiated it.

For example, we gather statistics about how the current visitor uses our page (mouse clicks, page fragments he views), to analyze and improve user experience.

When the visitor leaves our page -- we'd like to save the data at our server.

We can use `window.onunload` event for that:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js run
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
*!*
    keepalive: true
*/!*
  });
};
```

<<<<<<< HEAD
正常来说，当一个文档卸载时，所有相关联的网络请求都会被取消。但是 `keepalive` 选项告诉浏览器在后台执行请求，即使它离开了页面。所以这个选项对于我们的请求成功是至关重要的。

它有一些限制：

- 我们无法发送太大的数据：`keepalive` 请求的容量限制为 64kb。
    - 如果收集了太多数据，我们可以将其分包，按规律发送出去，所以不会留下太多数据在最后 `onunload` 请求。
    - 限制是对当前进行中的所有请求的。所以我们无法通过创建 100 个请求，每个 64kb 这样作弊。
- 如果请求是来自 `onunload`，我们无法处理服务器响应，因为文档在那个时候已经卸载，函数无法工作。
    - 通常来说，服务器给每个请求发送空响应，所以这不是问题。
=======
Normally, when a document is unloaded, all associated network requests are aborted. But `keepalive` option tells the browser to perform the request in background, even after it leaves the page. So this option is essential for our request to succeed.

It has few limitations:

- We can't send megabytes: the body limit for `keepalive` requests is 64kb.
    - If gather more data, we can send it out regularly in packets, so that there won't be a lot left for the last `onunload` request.
    - The limit is for all currently ongoing requests. So we can't cheat it by creating 100 requests, each 64kb.
- We can't handle the server response if the request is made in `onunload`, because the document is already unloaded at that time, functions won't work.
    - Usually, the server sends empty response to such requests, so it's not a problem.
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
