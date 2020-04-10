
# Fetch API

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
  window: window // null
});
```

一个令人印象深刻的列表，对吧?

我们已经在 <info:fetch> 一章中详细介绍了 `method`，`headers` 和 `body`。

在 <info:fetch-abort> 一章中介绍了 `signal` 选项。

现在让我们学习其余的本领。

## referrer，referrerPolicy

这些选项决定了 `fetch` 如何设置 HTTP 的 `Referer` header。

通常来说，这个 header 是被自动设置的，并包含了发出请求的页面的 url。在大多数情况下，它一点也不重要，但有时出于安全考虑，删除或缩短它是有意义的。

**`referer` 选项允许设置在当前域名(origin) 的任何 `Referer`，或者移除它。**

要不发送来源，可以将 `referer` 设置为空字符串：
```js
fetch('/page', {
*!*
  referrer: "" // 没有 Referer header
*/!*
});
```

设置在当前域内的另一个 url：

```js
fetch('/page', {
  // 假设我们在 https://javascript.info
  // 我们可以设置任何 Referer header，但必须是在当前域内的
*!*
  referrer: "https://javascript.info/anotherpage"
*/!*
});
```

**`referrerPolicy` 选项为 `Referer` 设置一般的规则。**

请求分为 3 种类型：

1. 同源请求。
2. 跨域请求。
3. 从 HTTPS 到 HTTP 的请求 (从安全协议到不安全协议)。

与 `referrer` 选项允许设置确切的 `Referer` 值不同，`referrerPolicy` 告诉浏览器针对各个请求类型的一般的规则。

可能的值在 [Referrer Policy specification（来源协议规范）](https://w3c.github.io/webappsec-referrer-policy/)中有详细描述：

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

假如说我们有一个从网站外部无法观察的带有 URL 结构的管理区域。

如果我们发送了一个跨域的 `fetch`，然后它默认地发送带有我们网页完整 url 的 `Referer` 头部。(当我们从 HTTPS 向 HTTP 发送请求的除外，这种情况下是没有 `Referer` )。

比如 `Referer: https://javascript.info/admin/secret/paths`。

如果我们想要其他网址只知道域名部分，而不是 URL 的路径，我们可以这样设置选项：

```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```

我们可以把它放在所有 `fetch` 的调用，也可以整合进我们项目所有用于请求和内部使用 `fetch` 的 JavaScript 库。

与默认行为相比较，它的唯一区别是跨域请求的 `fetch` 只发送 URL 的域名部分(比如 `https://javascript.info`，没有路径)。对于同源请求，我们仍然能得到完整的 `Referer` (也许在 debug 中有用)。

```smart header="来源协议 (Referrer policy) 不只用于 `fetch`"
在 [规范](https://w3c.github.io/webappsec-referrer-policy/) 中描述的来源协议，不只是用于 `fetch`，它用处更广泛。

具体来说，它可以使用 `Referrer-Policy` 的 HTTP 头部信息给整个页面设置默认来源协议，或者使用 `<a rel="noreferrer">` 给单一链接设置。
```

## mode

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

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

然后 `fetch` 会自己计算 SHA-256 并且比较我们的字符串。假如匹配错误，则会报错。

## keepalive

`keepalive` 选项表示请求是否会使初始化后的网页“失活”。

比如，我们收集当前用户是如何使用我们的网页的(点击鼠标，看过的页面碎片)数据，来分析并提升用户体验。

当用户离开我们的网页时 -- 我们希望能够在服务器中储存数据。

为此，我们可以使用事件 `window.onunload`:

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

正常来说，当一个文档卸载时，所有相关联的网络请求都会被取消。但是 `keepalive` 选项告诉浏览器在后台执行请求，即使它离开了页面。所以这个选项对于我们的请求成功是至关重要的。

它有一些限制：

- 我们无法发送太大的数据：`keepalive` 请求的容量限制为 64kb。
    - 如果收集了太多数据，我们可以将其分包，按规律发送出去，所以不会留下太多数据在最后 `onunload` 请求。
    - 限制是对当前进行中的所有请求的。所以我们无法通过创建 100 个请求，每个 64kb 这样作弊。
- 如果请求是来自 `onunload`，我们无法处理服务器响应，因为文档在那个时候已经卸载，函数无法工作。
    - 通常来说，服务器给每个请求发送空响应，所以这不是问题。
