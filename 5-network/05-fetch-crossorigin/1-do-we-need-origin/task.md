importance: 5

---

# Why do we need Origin?

As you probably know, there's HTTP-header `Referer`, that usually contains an url of the page which initiated a network request.

For instance, when fetching `http://google.com` from `http://javascript.info/some/url`, the headers look like this:

```
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

As you can see, both `Referer` and `Origin` are present.

The questions:

1. Why `Origin` is needed, if `Referer` has even more information?
<<<<<<< HEAD
2. If it possible that there's no `Referer` or `Origin`, or it's incorrect?
=======
2. Is it possible that there's no `Referer` or `Origin`, or is it incorrect?
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
