
# URL 对象

内建的 [URL](https://url.spec.whatwg.org/#api) 类提供了用于创建和解析 URL 的便捷接口。

没有任何一个网络方法一定需要使用 `URL` 对象，字符串就足够了。所以从技术上讲，我们并不是必须使用 `URL`。但是有些时候 `URL` 对象真的很有用。

## 创建 URL 对象

创建一个新 `URL` 对象的语法：

```js
new URL(url, [base])
```

- **`url`** —— 完整的 URL，或者仅路径（如果设置了 base），
- **`base`** —— 可选的 base URL：如果设置了此参数，且参数 `url` 只有路径，则会根据这个 `base` 生成 URL。

例如：

```js
let url = new URL('https://javascript.info/profile/admin');
```

下面这两个 URL 是一样的：

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

我们可以根据相对于现有 URL 的路径轻松创建一个新的 URL：

```js run
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
```

`URL` 对象立即允许我们访问其组件，因此这是一个解析 url 的好方法，例如：

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

这是 URL 组件的备忘单：

![](url-object.svg)

- `href` 是完整的 URL，与 `url.toString()` 相同
- `protocol` 以冒号字符 `:` 结尾
- `search` —— 以问号 `?` 开头的一串参数
- `hash` 以哈希字符 `#` 开头
- 如果存在 HTTP 身份验证，则这里可能还会有 `user` 和 `password` 属性：`http://login:password@site.com`（图片上没有，很少被用到）。


```smart header="我们可以将 `URL` 对象传递给网络（和大多数其他）方法，而不是字符串"
我们可以在 `fetch` 或 `XMLHttpRequest` 中使用 `URL` 对象，几乎可以在任何需要 URL 字符串的地方都能使用 `URL` 对象。

通常，`URL` 对象可以替代字符串传递给任何方法，因为大多数方法都会执行字符串转换，这会将 `URL` 对象转换为具有完整 URL 的字符串。
```

## SearchParams "?..."

假设，我们想要创建一个具有给定搜索参数的 url，例如：`https://google.com/search?query=JavaScript`。

我们可以在 URL 字符串中提供它们：

```js
new URL('https://google.com/search?query=JavaScript')
```

……但是，如果参数中包含空格，非拉丁字母等（具体参见下文），参数就需要被编码。

因此，有一个 URL 属性用于解决这个问题：`url.searchParams`，[URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) 类型的对象。

它为搜索参数提供了简便的方法：

- **`append(name, value)`** —— 按照 `name` 添加参数，
- **`delete(name)`** —— 按照 `name` 移除参数，
- **`get(name)`** —— 按照 `name` 获取参数，
- **`getAll(name)`** —— 获取相同 `name` 的所有参数（这是可行的，例如 `?user=John&user=Pete`），
- **`has(name)`** —— 按照 `name` 检查参数是否存在，
- **`set(name, value)`** —— set/replace 参数，
- **`sort()`** —— 按 name 对参数进行排序，很少使用，
- ……并且它是可迭代的，类似于 `Map`。

包含空格和标点符号的参数的示例：

```js run
let url = new URL('https://google.com/search');

url.searchParams.set('q', 'test me!'); // 添加带有一个空格和一个 ! 的参数

alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // 添加带有一个冒号 : 的参数

// 参数会被自动编码
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// 遍历搜索参数（被解码）
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!，然后是 tbs=qdr:y
}
```


## 编码（encoding）

[RFC3986](https://tools.ietf.org/html/rfc3986) 标准定义了 URL 中允许哪些字符，不允许哪些字符。

那些不被允许的字符必须被编码，例如非拉丁字母和空格 —— 用其 UTF-8 代码代替，前缀为 `%`，例如 `%20`（由于历史原因，空格可以用 `+` 编码，但这是一个例外）。

好消息是 `URL` 对象会自动处理这些。我们仅需提供未编码的参数，然后将 `URL` 转换为字符串：

```js run
// 在此示例中使用一些西里尔字符

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
```

正如你所看到的，url 路径中的 `Тест` 和 `ъ` 参数都被编码了。

URL 变长了，因为每个西里尔字母用 UTF-8 编码的两个字节表示，因此这里有两个 `%..` 实体（entities）。

### 编码字符串

在过去，在出现 `URL` 对象之前，人们使用字符串作为 URL。

而现在，`URL` 对象通常更方便，但是仍然可以使用字符串。在很多情况下，使用字符串可以使代码更短。

如果使用字符串，则需要手动编码/解码特殊字符。

下面是用于编码/解码 URL 的内建函数：

- [encodeURI](mdn:/JavaScript/Reference/Global_Objects/encodeURI) —— 编码整个 URL。
- [decodeURI](mdn:/JavaScript/Reference/Global_Objects/decodeURI) —— 解码为编码前的状态。
- [encodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/encodeURIComponent) —— 编码 URL 组件，例如搜索参数，或者 hash，或者 pathname。
- [decodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/decodeURIComponent) —— 解码为编码前的状态。

一个自然的问题：“`encodeURIComponent` 和 `encodeURI` 之间有什么区别？我们什么时候应该使用哪个？”

如果我们看一个 URL，就容易理解了，它被分解为本文上面图中所示的组件形式：

```
https://site.com:8080/path/page?p1=v1&p2=v2#hash
```

正如我们所看到的，在 URL 中 `:`，`?`，`=`，`&`，`#` 这类字符是被允许的。

……另一方面，对于 URL 的单个组件，例如一个搜索参数，则必须对这些字符进行编码，以免破坏 URL 的格式。

- `encodeURI` 仅编码 URL 中完全禁止的字符。
- `encodeURIComponent` 也编码这类字符，此外，还编码 `#`，`$`，`&`，`+`，`,`，`/`，`:`，`;`，`=`，`?` 和 `@` 字符。

所以，对于一个 URL 整体，我们可以使用 `encodeURI`：

```js run
// 在 url 路径中使用西里尔字符
let url = encodeURI('http://site.com/привет');

alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

……而对于 URL 参数，我们应该改用 `encodeURIComponent`：

```js run
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

将其与 `encodeURI` 进行比较：

```js run
let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

我们可以看到，`encodeURI` 没有对 `&` 进行编码，因为它对于整个 URL 来说是合法的字符。

但是，我们应该编码在搜索参数中的 `&` 字符，否则，我们将得到 `q=Rock&Roll` —— 实际上是 `q=Rock` 加上某个晦涩的参数 `Roll`。不符合预期。

因此，对于每个搜索参数，我们应该使用 `encodeURIComponent`，以将其正确地插入到 URL 字符串中。最安全的方式是对 name 和 value 都进行编码，除非我们能够绝对确保它只包含允许的字符。

````smart header="`encode*` 与 `URL` 之间的编码差异"
类 [URL](https://url.spec.whatwg.org/#url-class) 和 [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams) 基于最新的 URL 规范：[RFC3986](https://tools.ietf.org/html/rfc3986)，而 `encode*` 函数是基于过时的 [RFC2396](https://www.ietf.org/rfc/rfc2396.txt)。

它们之间有一些区别，例如对 IPv6 地址的编码方式不同：

```js run
// IPv6 地址的合法 url
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
```

正如我们所看到的，`encodeURI` 替换了方括号 `[...]`，这是不正确的，原因是：在 RFC2396 (August 1998) 时代，还不存在 IPv6 url。

这种情况很少见，`encode*` 函数在大多数情况下都能正常工作。
````
