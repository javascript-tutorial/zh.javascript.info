We need `Origin`, because sometimes `Referer` is absent. For instance, when we `fetch` HTTP-page from HTTPS (access less secure from more secure), then there's no `Referer`.

The [Content Security Policy](http://en.wikipedia.org/wiki/Content_Security_Policy) may forbid sending a `Referer`.

<<<<<<< HEAD
As we'll see, `fetch` also has options that prevent sending the `Referer` and even allow to change it (within the same site).
=======
As we'll see, `fetch` has options that prevent sending the `Referer` and even allow to change it (within the same site).
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

By specification, `Referer` is an optional HTTP-header.

Exactly because `Referer` is unreliable, `Origin` was invented. The browser guarantees correct `Origin` for cross-origin requests.
