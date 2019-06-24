
<<<<<<< HEAD
# URL 对象

内置的 [URL](https://url.spec.whatwg.org/#api) 类为创建和解析 URL 提供了非常方便的接口。

我们根本不需要使用它。没有一个网络方法一定要使用 `URL` 对象，因为只是使用字符串 url 就已经能够完成任务了。但是有时候 `URL` 对象真的很实用。

## 创建 URL 对象

创建新 URL 对象的语法：
=======
# URL objects

The built-in [URL](https://url.spec.whatwg.org/#api) class provides a convenient interface for creating and parsing URLs.

There are no networking methods that require exactly an `URL` object, strings are good enough. So technically we don't have to use `URL`. But sometimes it can be really helpful.

## Creating an URL

The syntax to create a new URL object:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js
new URL(url, [base])
```

<<<<<<< HEAD
- **`url`** —— url 文本地址
- **`base`** —— URL 根地址（可选）

`URL` 对象立即允许我们访问其组件，因此这是一个解析 URL 的好办法，例如：

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

这是其组件列表：

![](url-object.png)

- `href` 是完整的 URL，与 `url.toString()` 相同
- `protocol` 以冒号字符 `:` 结尾
- `search` 以问号 `?` 开始
- `hash` 以哈希字符 `#` 开始
- 如果存在 HTTP 身份验证的话，还会有 `user` 和 `password` 属性。

我们还可以使用 `URL` 的第二个参数来创建相对 URL：

```js run
let url = new URL('profile/admin', 'https://javascript.info');

alert(url); // https://javascript.info/profile/admin

url = new URL('tester', url); // 转到相对于当前 URL 路径的 ‘tester’

alert(url); // https://javascript.info/profile/tester
```

```smart header="几乎在任何需要使用 `URL` 的地方，我们都可以使用 `URL` 代替字符串"
我们可以在 `fetch` 或者 `XMLHttpRequest` 里使用 `URL` 对象，几乎在任何需要使用 URL 的地方，我们都可以使用 URL 代替字符串。

在绝大多数方法中，它会被自动转换成字符串并以此参与运算。
```

## 搜索参数（SearchParam）

当我们想要以给定的搜索词来创建 URL 时，例如，`https://google.com/search?query=value`。

它们必须被正确编码。

在古老的浏览器中，`URL` 出现之前，我们使用的是内置函数 `encodeURIComponent/decodeURIComponent`。

我们不必再使用它们了：`url.searchParams` 现在是 [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) 类型的对象。

它为操作搜索参数提供了便捷的方法（method）：

- **`append(name, value)`** —— 添加参数，
- **`delete(name)`** —— 移除参数，
- **`get(name)`** —— 获取参数，
- **`getAll(name)`** —— 获取给定名称的所有参数（如果有很多个参数的话，如：`?user=John&user=Pete`），
- **`has(name)`** —— 检查参数是否存在，
- **`set(name, value)`** —— set/replace 参数，
- **`sort()`** —— 按名称排序参数（我们很少需要这样做），
- ...并且是可迭代的，类似于 `Map`。

`URL` 对象为操作 url 参数提供了一种的简便方法。

例如：

```js run
let url = new URL('https://google.com/search');
url.searchParams.set('query', 'test me!');

alert(url); // https://google.com/search?query=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // 添加日期范围参数：past year
=======
- **`url`** -- the URL string or path (if base is set, see below).
- **`base`** -- an optional base, if set and `url` has only path, then the URL is generated relative to `base`.

For example, these two URLs are same:

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

Переход к пути относительно текущего URL:

```js run
let url = new URL('https://javascript.info/profile/admin');
let testerUrl = new URL('tester', url);

alert(testerUrl); // https://javascript.info/profile/tester
```


The `URL` object immediately allows us to access its components, so it's a nice way to parse the url, e.g.:

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

Here's the cheatsheet:

![](url-object.png)

- `href` is the full url, same as `url.toString()`
- `protocol` ends with the colon character `:`
- `search` - a string of parameters, starts with the question mark `?`
- `hash` starts with the hash character `#`
- there are also `user` and `password` properties if HTTP authentication is present.


```smart header="We can use `URL` everywhere instead of a string"
We can use an `URL` object in `fetch` or `XMLHttpRequest`, almost everywhere where a string url is expected.

In the vast majority of methods it's automatically converted to a string.
```

## SearchParams "?..."

Let's say we want to create an url with given search params, for instance, `https://google.com/search?query=JavaScript`.

They must be correctly encoded to include non-latin charcters, spaces etc.

Some time ago, before `URL` objects appeared, we'd use built-in functions `encodeURIComponent/decodeURIComponent`. They have some problems, but now that doesn't matter.

There's URL property for that: `url.searchParams` is an object of type [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).

It provides convenient methods for search parameters:

- **`append(name, value)`** -- add the parameter,
- **`delete(name)`** -- remove the parameter,
- **`get(name)`** -- get the parameter,
- **`getAll(name)`** -- get all parameters with that name (if many, e.g. `?user=John&user=Pete`),
- **`has(name)`** -- check for the existance of the parameter,
- **`set(name, value)`** -- set/replace the parameter,
- **`sort()`** -- sort parameters by name, rarely needed,
- ...and also iterable, similar to `Map`.

So, `URL` object also provides an easy way to operate on url parameters.

For example:

```js run
let url = new URL('https://google.com/search');
url.searchParams.set('query', 'test me!'); // added parameter with a space and !

alert(url); // https://google.com/search?query=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // add param for date range: past year
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

alert(url); // https://google.com/search?query=test+me%21&tbs=qdr%3Ay

// iterate over search parameters (decoded)
for(let [name, value] of url.searchParams) {
<<<<<<< HEAD
  alert(`${name}=${value}`); // query=test me!，然后是 tbs=qdr:y
=======
  alert(`${name}=${value}`); // query=test me!, then tbs=qdr:y
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
}
```
