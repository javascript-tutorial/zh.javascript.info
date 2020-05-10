我们需要 `Origin`，是因为有时会没有 `Referer`。例如，当我们从 HTTPS（从高安全性访问低安全性）`fetch` HTTP 页面时，便没有 `Referer`。

[内容安全策略](http://en.wikipedia.org/wiki/Content_Security_Policy) 可能会禁止发送 `Referer`。

正如我们将看到的，`fetch` 也具有阻止发送 `Referer` 的选项，甚至允许修改它（在同一网站内）。

根据规范，`Referer` 是一个可选的 HTTP-header。

正是因为 `Referer` 不可靠，才发明了 `Origin`。浏览器保证跨源请求的正确 `Origin`。
