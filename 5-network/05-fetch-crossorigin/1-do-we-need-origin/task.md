importance: 5

---

<<<<<<< HEAD
# 我们为什么需要源（Origin）？

你可能知道有一个 HTTP-header `Referer`，它通常包含发起网络请求的页面的 url。

例如，当从 `http://javascript.info/some/url` fetch `http://google.com` 时，header 看起来如下：

```http
=======
# Why do we need Origin?

As you probably know, there's HTTP-header `Referer`, that usually contains an url of the page which initiated a network request.

For instance, when fetching `http://google.com` from `http://javascript.info/some/url`, the headers look like this:

```
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
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

<<<<<<< HEAD
正如你所看到的，存在 `Referer` 和 `Origin`。

问题是：

1. 为什么需要 `Origin`，如果 `Referer` 甚至具有更多信息？
2. 如果这里没有 `Referer` 或 `Origin` 可行吗，还是说会出问题？
=======
As you can see, both `Referer` and `Origin` are present.

The questions:

1. Why `Origin` is needed, if `Referer` has even more information?
2. Is it possible that there's no `Referer` or `Origin`, or is it incorrect?
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
