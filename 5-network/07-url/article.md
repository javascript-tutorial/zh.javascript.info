
<<<<<<< HEAD
# URL 对象

内置的 [URL](https://url.spec.whatwg.org/#api) 类为创建和解析 URL 提供了非常方便的接口。

没有一个网络方法一定要使用 `URL` 对象，因为只使用字符串就已经足够了。因此从技术上来讲我们没有必要使用 `URL`。但是有些时候 `URL` 对象真的很有用。

## 创建 URL 对象

创建新 URL 对象的语法：
=======
# URL objects

The built-in [URL](https://url.spec.whatwg.org/#api) class provides a convenient interface for creating and parsing URLs.

There are no networking methods that require exactly an `URL` object, strings are good enough. So technically we don't have to use `URL`. But sometimes it can be really helpful.

## Creating an URL

The syntax to create a new `URL` object:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```js
new URL(url, [base])
```

<<<<<<< HEAD
- **`url`** —— URL 字符串（string）或者路径（path）（如果 base 被设置，我们会在下面介绍）。
- **`base`** —— 可选的 base，如果设置了此参数并且 `url` 只有路径，那么就会根据这个 `base` 生成 URL。

例如，下面两个 URL 是相同的：
=======
- **`url`** -- the full URL or only path (if base is set, see below),
- **`base`** -- an optional base URL: if set and `url` argument has only path, then the URL is generated relative to `base`.

For example:

```js
let url = new URL('https://javascript.info/profile/admin');
```

These two URLs are same:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

<<<<<<< HEAD
转到相对于当前 URL 的路径：

```js run
let url = new URL('https://javascript.info/profile/admin');
let testerUrl = new URL('tester', url);

alert(testerUrl); // https://javascript.info/profile/tester
```


`URL` 对象允许我们随时访问其组件，因此这是一个解析 URL 的好办法，例如：
=======
We can easily create a new URL based on the path relative to an existing URL:

```js run
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
```

The `URL` object immediately allows us to access its components, so it's a nice way to parse the url, e.g.:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

<<<<<<< HEAD
这是其组件列表：

![](url-object.svg)

- `href` 是完整的 URL，与 `url.toString()` 相同
- `protocol` 以冒号字符 `:` 结尾
- `search` - 以问号 `?` 开始的一串参数
- `hash` 以哈希字符 `#` 开始
- 如果存在 HTTP 身份验证的话，还会有 `user` 和 `password` 属性：`http://login:password@site.com`（图片上没有，很少使用它）。


```smart header="我们可以在任意位置用 `URL` 代替字符串"
我们可以在 `fetch` 或者 `XMLHttpRequest` 中使用 `URL` 对象，几乎在任何能使用字符串 URL 的地方都能使用 `URL` 对象。

在绝大多数方法中，它会自动转换为字符串。
```

## 搜索参数（SearchParams）“?...”

假设我们想要创建一个具有给定搜索参数的 URL，例如：`https://google.com/search?query=JavaScript`。

我们可以在 URL 字符串中提供他们：
=======
Here's the cheatsheet for URL components:

![](url-object.svg)

- `href` is the full url, same as `url.toString()`
- `protocol` ends with the colon character `:`
- `search` - a string of parameters, starts with the question mark `?`
- `hash` starts with the hash character `#`
- there may be also `user` and `password` properties if HTTP authentication is present: `http://login:password@site.com` (not painted above, rarely used).


```smart header="We can pass `URL` objects to networking (and most other) methods instead of a string"
We can use an `URL` object in `fetch` or `XMLHttpRequest`, almost everywhere where an URL-string is expected.

Generally, `URL` object can be passed to any method instead of a string, as most method will perform the string conversion, that turns an `URL` object into a string with full URL.
```

## SearchParams "?..."

Let's say we want to create an url with given search params, for instance, `https://google.com/search?query=JavaScript`.

We can provide them in the URL string:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```js
new URL('https://google.com/search?query=JavaScript')
```

<<<<<<< HEAD
……但是如果参数中包含空格，非拉丁字母等等（具体参见下面），参数中就要被编码。

因此，有一个 URL 属性用于解决这个问题：`url.searchParams`，[URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) 类型的对象。

它为搜索参数提供了简便的的方法：

- **`append(name, value)`** —— 添加参数，
- **`delete(name)`** —— 移除参数，
- **`get(name)`** —— 获取参数，
- **`getAll(name)`** —— 获取相同 `name` 的所有参数（这是可行的，例如 `?user=John&user=Pete`），
- **`has(name)`** —— 检查参数是否存在，
- **`set(name, value)`** —— set/replace 参数，
- **`sort()`** —— 按 name 排序参数，很少使用，
- ……并且是可迭代的，类似于 `Map`。

例如：

```js run
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!'); // 添加有空格和 ! 参数

alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // 这个参数指定 Google Search 的日期范围

alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// 遍历搜索参数（解码（decoded））
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!，然后是 tbs=qdr:y
=======
...But parameters need to be encoded if they contain spaces, non-latin letters, etc (more about that below).

So there's URL property for that: `url.searchParams`, an object of type [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).

It provides convenient methods for search parameters:

- **`append(name, value)`** -- add the parameter by `name`,
- **`delete(name)`** -- remove the parameter by `name`,
- **`get(name)`** -- get the parameter by `name`,
- **`getAll(name)`** -- get all parameters with the same `name` (that's possible, e.g. `?user=John&user=Pete`),
- **`has(name)`** -- check for the existance of the parameter by `name`,
- **`set(name, value)`** -- set/replace the parameter,
- **`sort()`** -- sort parameters by name, rarely needed,
- ...and it's also iterable, similar to `Map`.

An example with parameters that contain spaces and punctuation marks:

```js run
let url = new URL('https://google.com/search');

url.searchParams.set('q', 'test me!'); // added parameter with a space and !

alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // added parameter with a colon :

// parameters are automatically encoded
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// iterate over search parameters (decoded)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!, then tbs=qdr:y
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b
}
```


<<<<<<< HEAD
## 编码（encoding）

[RFC3986](https://tools.ietf.org/html/rfc3986) 标准定义了哪些字符是允许的，哪些不是。

下面这些是不允许的，必须要编码才可以，例如非拉丁字母，空格 —— 以它们的 UTF-8 代码代替，前缀为 `%`，例如 `%20`（基于历史原因，空格可以通过 `+` 编码，因此在 URL 中也可以这样做）。

好消息是 `URL` 对象能自动处理这些。我们仅需提供未编码的参数，然后将 URL 转换为字符串：

```js run
// 在这个例子中使用一些 cyrillic 字符
=======
## Encoding

There's a standard [RFC3986](https://tools.ietf.org/html/rfc3986) that defines which characters are allowed in URLs and which are not.

Those that are not allowed, must be encoded, for instance non-latin letters and spaces - replaced with their UTF-8 codes, prefixed by `%`, such as `%20` (a space can be encoded by `+`, for historical reasons, but that's an exception).

The good news is that `URL` objects handle all that automatically. We just supply all parameters unencoded, and then convert the `URL` to string:

```js run
// using some cyrillic characters for this example
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
```
<<<<<<< HEAD
正如所见，URL 路径中的 `Тест` 和 `ъ` 参数都被编码。

### 编码字符串

如果我们使用字符串而不是 URL 对象，此时我们可以使用内建函数手动编码：

- [encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) - 编码整个 URL。
- [decodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI) - 解码为未编码前的状态。
- [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) - 编码 URL 组件，例如搜索参数，或者 hash 或者 pathname。
- [decodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) - 解码为未编码前的状态。

`encodeURIComponent` 和 `encodeURI` 之间有什么区别？

如果我们看看 URL 就容易理解它们之间的差异，将它分隔为如上图中的组件形式：

```
http://site.com:8080/path/page?p1=v1&p2=v2#hash
```

正如所见，`:`，`?`，`=`，`&`，`#` 这类字符在 URL 中是允许的。而其他的，包括非拉丁字母和空格，则必须被编码。

这就是 `encodeURI` 所作的事情：

```js run
// 在 URL 路径中使用 cyrcillic 字符
let url = encodeURI('http://site.com/привет');

// 每个 cyrillic 都被以两个 %xx 的形式编码
// 它们一起组成了字符的 UTF-8 代码
alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

……另一方面，我们看看单个的 URL 组件，比如搜索参数，我们应该编码更多的字符，即被用来格式化 URL 组件的 `?`，`=` 和 `&`。

这就是 `encodeURIComponent` 所做的事情。它编码与 `encodeURI` 相同的字符，以及许多其他字符，以使得结果值在任何 URL 组件中都可以安全使用。

例如：
=======

As you can see, both `Тест` in the url path and `ъ` in the parameter are encoded.

The URL became longer, because each cyrillic letter is represented with two bytes in UTF-8, so there are two `%..` entities.

### Encoding strings

In old times, before `URL` objects appeared, people used strings for URLs.

As of now, `URL` objects are often more convenient, but strings can still be used as well. In many cases using a string makes the code shorter.

If we use a string though, we need to encode/decode special characters manually.

There are built-in functions for that:

- [encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) - encodes URL as a whole.
- [decodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI) - decodes it back.
- [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) - encodes a URL component, such as a search parameter, or a hash, or a pathname.
- [decodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) - decodes it back.

A natural question is: "What's the difference between `encodeURIComponent` and `encodeURI`? When we should use either?"

That's easy to understand if we look at the URL, that's split into components in the picture above:

```
https://site.com:8080/path/page?p1=v1&p2=v2#hash
```

As we can see, characters such as `:`, `?`, `=`, `&`, `#` are allowed in URL.

...On the other hand, if we look at a single URL component, such as a search parameter, these characters must be encoded, not to break the formatting.

- `encodeURI` encodes only characters that are totally forbidden in URL.
- `encodeURIComponent` encodes same characters, and, in addition to them, characters `#`, `$`, `&`, `+`, `,`, `/`, `:`, `;`, `=`, `?` and `@`.

So, for a whole URL we can use `encodeURI`:

```js run
// using cyrillic characters in url path
let url = encodeURI('http://site.com/привет');

alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

...While for URL parameters we should use `encodeURIComponent` instead:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```js run
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

<<<<<<< HEAD
相较于 `encodeURI`：
=======
Compare it with `encodeURI`:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```js run
let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

<<<<<<< HEAD
我们可以看到，`encodeURI` 不会编码 `&`，因为这是整个 URL 中合法的字符。

但是我们应该在搜索参数中编码 `&`，否则，我们得到的是 `q=Rock&Roll` —— 实际上是 `q=Rock` 加上一些模糊的参数 `Roll`。其结果和预期不同。

因此，对于每个搜索参数，我们应该使用 `encodeURIComponent` 将其准确的插入 URL 字符串。最安全的是编码 name 和 value，除非我们能完全保证参数中只有一个允许的字符。

### 为什么要用 URL？

很多旧的代码使用这些函数，这些函数有时候很方便，不会导致错误。

但是在现代代码中，建议使用 [URL](https://url.spec.whatwg.org/#url-class) 和 [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams) 类。

其中一个理由是：它们都是基于最新的 URI 标准：[RFC3986](https://tools.ietf.org/html/rfc3986)，而 `encode*` 函数是基于过时的 [RFC2396](https://www.ietf.org/rfc/rfc2396.txt) 标准。

例如，IPv6 地址以不同方式处理：

```js run
// IPv6 地址的合法 URL
=======
As we can see, `encodeURI` does not encode `&`, as this is a legit character in URL as a whole.

But we should encode `&` inside a search parameter, otherwise, we get `q=Rock&Roll` - that is actually `q=Rock` plus some obscure parameter `Roll`. Not as intended.

So we should use only `encodeURIComponent` for each search parameter, to correctly insert it in the URL string. The safest is to encode both name and value, unless we're absolutely sure that it has only allowed characters.

````smart header="Encoding difference compared to `URL`"
Classes [URL](https://url.spec.whatwg.org/#url-class) and [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams) are based on the latest URI specification: [RFC3986](https://tools.ietf.org/html/rfc3986), while `encode*` functions are based on the obsolete version [RFC2396](https://www.ietf.org/rfc/rfc2396.txt).

There are few differences, e.g. IPv6 addresses are encoded differently:

```js run
// valid url with IPv6 address
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
```

<<<<<<< HEAD
正如所见，`encodeURI` 取代了方括号 `[...]`，这是不正确的，原因是：在 RFC2396 (August 1998) 时代 IPv6 URL 还不存在。

这种情况很少见，`encode*` 函数大部分时间都能正常使用，这只是偏好使用新 API 的其中一个原因。
=======
As we can see, `encodeURI` replaced square brackets `[...]`, that's not correct, the reason is: IPv6 urls did not exist at the time of RFC2396 (August 1998).

Such cases are rare, `encode*` functions work well most of the time.
````
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b
