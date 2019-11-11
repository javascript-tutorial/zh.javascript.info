We need `Origin`, because sometimes `Referer` is absent. For instance, when we `fetch` HTTP-page from HTTPS (access less secure from more secure), then there's no `Referer`.

The [Content Security Policy](http://en.wikipedia.org/wiki/Content_Security_Policy) may forbid sending a `Referer`.

<<<<<<< HEAD
As we'll see, `fetch` also has options that prevent sending the `Referer` and even allow to change it (within the same site).
=======
As we'll see, `fetch` has options that prevent sending the `Referer` and even allow to change it (within the same site).
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

By specification, `Referer` is an optional HTTP-header.

Exactly because `Referer` is unreliable, `Origin` was invented. The browser guarantees correct `Origin` for cross-origin requests.
