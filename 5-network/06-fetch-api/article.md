
# Fetch API

<<<<<<< HEAD
到目前为止，我们已经对 `fetch` 相当了解了。

现在让我们来看看 `fetch` 的剩余 API，来了解它的全部本领吧。

```smart
请注意：这些选项 (option) 大多都很少使用。即使跳过本章，你也可以很好地使用 `fetch`。

但是，知道 `fetch` 可以做什么还是很好的，所以如果需要，你可以来看看这些细节内容。
```

这是所有可能的 `fetch` 选项及其默认值（注释中标注了可选值）的完整列表：

```js
let promise = fetch(url, {
  method: "GET", // POST，PUT，DELETE，等。
  headers: {
    // 内容类型 header 值通常是自动设置的
    // 取决于 request body
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string，FormData，Blob，BufferSource，或 URLSearchParams
  referrer: "about:client", // 或 "" 以不发送 Referer header，
  // 或者是当前源的 url
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer，origin，same-origin...
  mode: "cors", // same-origin，no-cors
  credentials: "same-origin", // omit，include
  cache: "default", // no-store，reload，no-cache，force-cache，或 only-if-cached
  redirect: "follow", // manual，error
  integrity: "", // 一个 hash，像 "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController 来中止请求
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
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
  window: window // null
});
```

<<<<<<< HEAD
一个令人印象深刻的列表，对吧?

我们已经在 <info:fetch> 一章中详细介绍了 `method`，`headers` 和 `body`。

在 <info:fetch-abort> 一章中介绍了 `signal` 选项。

现在让我们学习其余的本领。

## referrer，referrerPolicy

这些选项决定了 `fetch` 如何设置 HTTP 的 `Referer` header。

通常来说，这个 header 是被自动设置的，并包含了发出请求的页面的 url。在大多数情况下，它一点也不重要，但有时出于安全考虑，删除或缩短它是有意义的。

**`referer` 选项允许设置在当前域的任何 `Referer`，或者移除它。**

要不发送 referer，可以将 `referer` 设置为空字符串：
```js
fetch('/page', {
*!*
  referrer: "" // 没有 Referer header
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
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
*/!*
});
```

<<<<<<< HEAD
设置在当前域内的另一个 url：

```js
fetch('/page', {
  // 假设我们在 https://javascript.info
  // 我们可以设置任何 Referer header，但必须是在当前域内的
=======
To set another url within the current origin:

```js
fetch('/page', {
  // assuming we're on https://javascript.info
  // we can set any Referer header, but only within the current origin
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
*!*
  referrer: "https://javascript.info/anotherpage"
*/!*
});
```

<<<<<<< HEAD
**`referrerPolicy` 选项为 `Referer` 设置一般的规则。**

请求分为 3 种类型：

1. 同源请求。
2. 跨域请求。
3. 从 HTTPS 到 HTTP 的请求 (从安全协议到不安全协议)。

与 `referrer` 选项允许设置确切的 `Referer` 值不同，`referrerPolicy` 告诉浏览器针对各个请求类型的一般的规则。

可能的值在 [Referrer Policy 规范](https://w3c.github.io/webappsec-referrer-policy/)中有详细描述：

- **`"no-referrer-when-downgrade"`** —— 默认值：除非我们从 HTTPS 发送请求到 HTTP（到安全性较低的协议），否则始终会发送完整的 `Referer`。
- **`"no-referrer"`** —— 从不发送 `Referer`。
- **`"origin"`** —— 只发送在 `Referer` 中的域，而不是完整的页面 URL，例如，只发送 `http://site.com` 而不是 `http://site.com/path`。
- **`"origin-when-cross-origin"`** —— 发送完整的 `Referer` 到相同的源，但对于跨源请求，只发送域部分（同上）。
- **`"same-origin"`** —— 发送完整的 `Referer` 到相同的源，但对于跨源请求，不发送 `Referer`。
- **`"strict-origin"`** —— 只发送域，对于 HTTPS→HTTP 请求，则不发送中则不发送 `Referer`。
- **`"strict-origin-when-cross-origin"`** —— 对于同源情况下则发送完整的 `Referer`，对于跨源情况下，则只发送域，如果是 HTTPS→HTTP 请求，则什么都不发送。
- **`"unsafe-url"`** —— 在 `Referer` 中始终发送完整的 url，即使是 HTTPS→HTTP 请求。

这是一个包含所有组合的表格：

| 值 | 同源 | 跨源 | HTTPS→HTTP |
|-------|----------------|-------------------|------------|
| `"no-referrer"` | - | - | - |
| `"no-referrer-when-downgrade"` 或 `""`（默认） | 完整的 url | 完整的 url | - |
| `"origin"` | 仅域 | 仅域 | 仅域 |
| `"origin-when-cross-origin"` | 完整的 url | 仅域 | 仅域 |
| `"same-origin"` | 完整的 url | - | - |
| `"strict-origin"` | 仅域 | 仅域 | - |
| `"strict-origin-when-cross-origin"` | 完整的 url | 仅域 | - |
| `"unsafe-url"` | 完整的 url | 完整的 url | 完整的 url |

假如我们有一个带有 URL 结构的管理区域（admin zone），它不应该被从网站外看到。

如果我们发送了一个 `fetch`，则默认情况下，它总是发送带有页面完整 url 的 `Referer` header（我们从 HTTPS 向 HTTP 发送请求的情况除外，这种情况下没有 `Referer`）。

例如 `Referer: https://javascript.info/admin/secret/paths`。

如果我们想让其他网站只知道域的部分，而不是 URL 路径，我们可以这样设置选项：
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
- **`"same-origin"`** -- send full `Referer` to the same origin, but no `Referer` for cross-origin requests.
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
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```

<<<<<<< HEAD
我们可以将其置于所有 `fetch` 调用中，也可以将其集成到我们项目的执行所有请求并在内部使用 `fetch` 的 JavaScript 库中。

与默认行为相比，它的唯一区别在于，对于跨源请求，`fetch` 只发送 URL 域的部分（例如 `https://javascript.info`，没有路径）。对于同源请求，我们仍然可以获得完整的 `Referer`（可能对于调试目的是有用的）。

```smart header="Referrer policy 不仅适用于 `fetch`"
在 [规范](https://w3c.github.io/webappsec-referrer-policy/) 中描述的 referrer policy，不仅适用于 `fetch`，它还具有全局性。

特别是，可以使用 `Referrer-Policy` HTTP header，或者为每个链接设置 `<a rel="noreferrer">`，来为整个页面设置默认策略（policy）。
=======
We can put it to all `fetch` calls, maybe integrate into JavaScript library of our project that does all requests and uses `fetch` inside.

Its only difference compared to the default behavior is that for requests to another origin `fetch` sends only the origin part of the URL (e.g. `https://javascript.info`, without path). For requests to our origin we still get the full `Referer` (maybe useful for debugging purposes).

```smart header="Referrer policy is not only for `fetch`"
Referrer policy, described in the [specification](https://w3c.github.io/webappsec-referrer-policy/), is not just for `fetch`, but more global.

In particular, it's possible to set the default policy for the whole page using `Referrer-Policy` HTTP header, or per-link, with `<a rel="noreferrer">`.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
```

## mode

<<<<<<< HEAD
`mode` 选项是一种安全措施，可以防止偶发的跨源请求：

- **`"cors"`** —— 默认值，允许跨源请求，如 <info:fetch-crossorigin> 一章所述，
- **`"same-origin"`** —— 禁止跨源请求，
- **`"no-cors"`** —— 只允许简单的跨源请求。

当 `fetch` 的 URL 来自于第三方，并且我们想要一个“断电开关”来限制跨源能力时，此选项可能很有用。

## credentials

`credentials` 选项指定 `fetch` 是否应该随请求发送 cookie 和 HTTP-Authorization header。

- **`"same-origin"`** —— 默认值，对于跨源请求不发送，
- **`"include"`** —— 总是发送，需要来自跨源服务器的 `Accept-Control-Allow-Credentials`，才能使 JavaScript 能够访问响应，详细内容在 <info:fetch-crossorigin> 一章有详细介绍，
- **`"omit"`** —— 不发送，即使对于同源请求。

## cache

默认情况下，`fetch` 请求使用标准的 HTTP 缓存。就是说，它遵从 `Expires`，`Cache-Control` header，发送 `If-Modified-Since`，等。就像常规的 HTTP 请求那样。

使用 `cache` 选项可以忽略 HTTP 缓存或者对其用法进行微调：

- **`"default"`** —— `fetch` 使用标准的 HTTP 缓存规则和 header，
- **`"no-store"`** —— 完全忽略 HTTP 缓存，如果我们设置 header `If-Modified-Since`，`If-None-Match`，`If-Unmodified-Since`，`If-Match`，或 `If-Range`，则此模式会成为默认模式，
- **`"reload"`** —— 不从 HTTP 缓存中获取结果（如果有），而是使用响应填充缓存（如果 response header 允许），
- **`"no-cache"`** —— 如果有一个已缓存的响应，则创建一个有条件的请求，否则创建一个普通的请求。使用响应填充 HTTP 缓存，
- **`"force-cache"`** —— 使用来自 HTTP 缓存的响应，即使该响应已过时（stale）。如果 HTTP 缓存中没有响应，则创建一个常规的 HTTP 请求，行为像正常那样，
- **`"only-if-cached"`** —— 使用来自 HTTP 缓存的响应，即使该响应已过时（stale）。如果 HTTP 缓存中没有响应，则报错。只有当 `mode` 为 `same-origin` 时生效。

## redirect

通常来说，`fetch` 透明地遵循 HTTP 重定向，例如 301，302 等。

`redirect` 选项允许对此进行更改：

- **`"follow"`** —— 默认值，遵循 HTTP 重定向，
- **`"error"`** —— HTTP 重定向时报错，
- **`"manual"`** —— 不遵循 HTTP 重定向，但 `response.url` 将是一个新的 URL，并且 `response redirectd` 将为 `true`，以便我们能够手动执行重定向到新的 URL（如果需要的话）。

## integrity

`integrity` 选项允许检查响应是否与已知的预先校验和相匹配。

正如 [规范](https://w3c.github.io/webappsec-subresource-integrity/) 所描述的，支持的哈希函数有 SHA-256，SHA-384，和 SHA-512，可能还有其他的，这取决于浏览器。

例如，我们下载一个文件，并且我们知道它的 SHA-256 校验和为 "abcdef"（当然，实际校验和会更长）。

我们可以将其放在 `integrity` 选项中，就像这样:
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
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

<<<<<<< HEAD
然后 `fetch` 将自行计算 SHA-256 并将其与我们的字符串进行比较。如果不匹配，则会触发错误。

## keepalive

`keepalive` 选项表示该请求可能会使发起它的网页“失活（outlive）”。

例如，我们收集有关当前访问者是如何使用我们的页面（鼠标点击，他查看的页面片段）的统计信息，以分析和改善用户体验。

当访问者离开我们的网页时 —— 我们希望能够将数据保存到我们的服务器上。

我们可以使用 `window.onunload` 事件来实现：
=======
Then `fetch` will calculate SHA-256 on its own and compare it with our string. In case of a mismatch, an error is triggered.

## keepalive

The `keepalive` option indicates that the request may "outlive" the webpage that initiated it.

For example, we gather statistics about how the current visitor uses our page (mouse clicks, page fragments he views), to analyze and improve user experience.

When the visitor leaves our page -- we'd like to save the data at our server.

We can use `window.onunload` event for that:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

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
通常，当一个文档被卸载时（unloaded），所有相关的网络请求都会被中止。但是，`keepalive` 选项告诉浏览器，即使在离开页面后，也要在后台执行请求。所以，此选项对于我们的请求成功至关重要。

它有一些限制：

- 我们无法发送兆字节的数据：`keepalive` 请求的 body 限制为 64kb。
    - 如果我们收集了更多数据，我们可以定期将其以数据包的形式发送出去，这样就不会留下太多数据给最后的 `onunload` 请求了。
    - 该限制是对当前正在进行的所有请求的。因此，我们无法通过创建 100 个请求，每个 64kb 这样来作弊。
- 如果请求是在 `onunload` 中发起的，我们将无法处理服务器响应，因为文档在那个时候已经卸载了（unloaded），函数将无法工作。
    - 通常来说，服务器会向此类请求发送空响应，所以这不是问题。
=======
Normally, when a document is unloaded, all associated network requests are aborted. But `keepalive` option tells the browser to perform the request in background, even after it leaves the page. So this option is essential for our request to succeed.

It has few limitations:

- We can't send megabytes: the body limit for `keepalive` requests is 64kb.
    - If gather more data, we can send it out regularly in packets, so that there won't be a lot left for the last `onunload` request.
    - The limit is for all currently ongoing requests. So we can't cheat it by creating 100 requests, each 64kb.
- We can't handle the server response if the request is made in `onunload`, because the document is already unloaded at that time, functions won't work.
    - Usually, the server sends empty response to such requests, so it's not a problem.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
