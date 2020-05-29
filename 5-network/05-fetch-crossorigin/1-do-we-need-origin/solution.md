<<<<<<< HEAD
我们需要 `Origin`，是因为有时会没有 `Referer`。例如，当我们从 HTTPS（从高安全性访问低安全性）`fetch` HTTP 页面时，便没有 `Referer`。

[内容安全策略](http://en.wikipedia.org/wiki/Content_Security_Policy) 可能会禁止发送 `Referer`。

正如我们将看到的，`fetch` 也具有阻止发送 `Referer` 的选项，甚至允许修改它（在同一网站内）。

根据规范，`Referer` 是一个可选的 HTTP-header。

正是因为 `Referer` 不可靠，才发明了 `Origin`。浏览器保证跨源请求的正确 `Origin`。
=======
We need `Origin`, because sometimes `Referer` is absent. For instance, when we `fetch` HTTP-page from HTTPS (access less secure from more secure), then there's no `Referer`.

The [Content Security Policy](http://en.wikipedia.org/wiki/Content_Security_Policy) may forbid sending a `Referer`.

As we'll see, `fetch` has options that prevent sending the `Referer` and even allow to change it (within the same site).

By specification, `Referer` is an optional HTTP-header.

Exactly because `Referer` is unreliable, `Origin` was invented. The browser guarantees correct `Origin` for cross-origin requests.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
