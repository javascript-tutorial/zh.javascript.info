importance: 5

---

# 我们为什么需要源（Origin）？

你可能知道有一个 HTTP-header `Referer`，它通常包含发起网络请求的页面的 url。

例如，当从 `http://javascript.info/some/url` fetch `http://google.com` 时，header 看起来如下：

```http
Accept: */*
Accept-Charset: utf-8
Accept-Encoding: gzip,deflate,sdch
Connection: keep-alive
Host: google.com
*!*
Origin: http://javascript.info
Referer: http://javascript.info/some/url
*/!*
```

正如你所看到的，存在 `Referer` 和 `Origin`。

问题是：

1. 为什么需要 `Origin`，如果 `Referer` 甚至具有更多信息？
2. 如果这里没有 `Referer` 或 `Origin` 可行吗，还是说会出问题？
