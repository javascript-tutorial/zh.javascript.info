
# Fetch

<<<<<<< HEAD
JavaScript 可以将网络请求发送到服务器，并在需要时加载新信息。

例如，我们可以使用网络请求来：

- 提交订单，
- 加载用户信息，
- 从服务器接收最新的更新，
- ……等。

……所有这些都没有重新加载页面！

对于来自 JavaScript 的网络请求，有一个总称术语 "AJAX"（<b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML 的简称）。但是，我们不必使用 XML：这个术语诞生于很久以前，所以这个词一直在那儿。

有很多方式可以向服务器发送网络请求，并从服务器获取信息。

`fetch()` 方法是一种现代通用的方法，那么我们就从它开始吧。旧版本的浏览器不支持它（可以 polyfill），但是它在现代浏览器中的支持情况很好。

基本语法：
=======
JavaScript can send network requests to the server and load new information whenever it's needed.

For example, we can use a network request to:

- Submit an order,
- Load user information,
- Receive latest updates from the server,
- ...etc.

...And all of that without reloading the page!

There's an umbrella term "AJAX" (abbreviated <b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML) for network requests from JavaScript. We don't have to use XML though: the term comes from old times, that's why that word is there. You may have heard that term already.

There are multiple ways to send a network request and get information from the server.

The `fetch()` method is modern and versatile, so we'll start with it. It's not supported by old browsers (can be polyfilled), but very well supported among the modern ones.

The basic syntax is:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
let promise = fetch(url, [options])
```

<<<<<<< HEAD
- **`url`** —— 要访问的 URL。
- **`options`** —— 可选参数：method，header 等。

没有 `options`，那就是一个简单的 GET 请求，下载 `url` 的内容。

浏览器立即启动请求，并返回一个该调用代码应该用来获取结果的 `promise`。

获取响应通常需要经过两个阶段。

**第一阶段，当服务器发送了响应头（response header），`fetch` 返回的 `promise` 就使用内建的 [Response](https://fetch.spec.whatwg.org/#response-class) class 对象来对响应头进行解析。**

在这个阶段，我们可以通过检查响应头，来检查 HTTP 状态以确定请求是否成功，当前还没有响应体（response body）。

如果 `fetch` 无法建立一个 HTTP 请求，例如网络问题，亦或是请求的网址不存在，那么 promise 就会 reject。异常的 HTTP 状态，例如 404 或 500，不会导致出现 error。

我们可以在 response 的属性中看到 HTTP 状态：

- **`status`** —— HTTP 状态码，例如 200。
- **`ok`** —— 布尔值，如果 HTTP 状态码为 200-299，则为 `true`。

例如：
=======
- **`url`** -- the URL to access.
- **`options`** -- optional parameters: method, headers etc.

Without `options`, that is a simple GET request, downloading the contents of the `url`.

The browser starts the request right away and returns a promise that the calling code should use to get the result.

Getting a response is usually a two-stage process.

**First, the `promise`, returned by `fetch`, resolves with an object of the built-in [Response](https://fetch.spec.whatwg.org/#response-class) class as soon as the server responds with headers.**

At this stage we can check HTTP status, to see whether it is successful or not, check headers, but don't have the body yet.

The promise rejects if the `fetch` was unable to make HTTP-request, e.g. network problems, or there's no such site. Abnormal HTTP-statuses, such as 404 or 500 do not cause an error.

We can see HTTP-status in response properties:

- **`status`** -- HTTP status code, e.g. 200.
- **`ok`** -- boolean, `true` if the HTTP status code is 200-299.

For example:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
let response = await fetch(url);

<<<<<<< HEAD
if (response.ok) { // 如果 HTTP 状态码为 200-299
  // 获取 response body（此方法会在下面解释）
=======
if (response.ok) { // if HTTP-status is 200-299
  // get the response body (the method explained below)
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

<<<<<<< HEAD
**第二阶段，为了获取 response body，我们需要使用一个其他的方法调用。**

`Response` 提供了多种基于 promise 的方法，来以不同的格式访问 body：

- **`response.text()`** —— 读取 response，并以文本形式返回 response，
- **`response.json()`** —— 将 response 解析为 JSON，
- **`response.formData()`** —— 以 `FormData` 对象（在 [下一章](info:formdata) 有解释）的形式返回 response，
- **`response.blob()`** —— 以 [Blob](info:blob)（具有类型的二进制数据）形式返回 response，
- **`response.arrayBuffer()`** —— 以 [ArrayBuffer](info:arraybuffer-binary-arrays)（低级别的二进制数据）形式返回 response，
- 另外，`response.body` 是 [ReadableStream](https://streams.spec.whatwg.org/#rs-class) 对象，它允许你逐块读取 body，我们稍后会用一个例子解释它。

例如，我们从 GitHub 获取最新 commits 的 JSON 对象：
=======
**Second, to get the response body, we need to use an additional method call.**

`Response` provides multiple promise-based methods to access the body in various formats:

- **`response.text()`** -- read the response and return as text,
- **`response.json()`** -- parse the response as JSON,
- **`response.formData()`** -- return the response as `FormData` object (explained in the [next chapter](info:formdata)),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (low-level representaion of binary data),
- additionally, `response.body` is a [ReadableStream](https://streams.spec.whatwg.org/#rs-class) object, it allows you to read the body chunk-by-chunk, we'll see an example later.

For instance, let's get a JSON-object with latest commits from GitHub:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js run async
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

*!*
<<<<<<< HEAD
let commits = await response.json(); // 读取 response body，并将其解析为 JSON
=======
let commits = await response.json(); // read response body and parse as JSON
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
*/!*

alert(commits[0].author.login);
```

<<<<<<< HEAD
也可以使用纯 promise 语法，不使用 `await`：
=======
Or, the same without `await`, using pure promises syntax:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

<<<<<<< HEAD
要获取响应文本，可以使用 `await response.text()` 代替 `.json()`：
=======
To get the response text, `await response.text()` instead of `.json()`:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

<<<<<<< HEAD
let text = await response.text(); // 将 response body 读取为文本
=======
let text = await response.text(); // read response body as text
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

alert(text.slice(0, 80) + '...');
```

<<<<<<< HEAD
作为一个读取为二进制格式的演示示例，让我们 fetch 并显示一张 ["fetch" 规范](https://fetch.spec.whatwg.org) 中的图片（`Blob` 操作的有关内容请见 [Blob](info:blob)）：
=======
As a show-case for reading in binary format, let's fetch and show a logo image of ["fetch" specification](https://fetch.spec.whatwg.org) (see chapter [Blob](info:blob) for details about operations on `Blob`):
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
<<<<<<< HEAD
let blob = await response.blob(); // 下载为 Blob 对象
*/!*

// 为其创建一个 <img>
=======
let blob = await response.blob(); // download as Blob object
*/!*

// create <img> for it
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

<<<<<<< HEAD
// 显示它
img.src = URL.createObjectURL(blob);

setTimeout(() => { // 3 秒后将其隐藏
=======
// show it
img.src = URL.createObjectURL(blob);

setTimeout(() => { // hide after three seconds
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

````warn
<<<<<<< HEAD
我们只能选择一种读取 body 的方法。

如果我们已经使用了 `response.text()` 方法来获取 response，那么如果再用 `response.json()`，则不会生效，因为 body 内容已经被处理过了。

```js
let text = await response.text(); // response body 被处理了
let parsed = await response.json(); // 失败（已经被处理过了）
```
````

## Response header

Response header 位于 `response.headers` 中的一个类似于 Map 的 header 对象。

它不是真正的 Map，但是它具有类似的方法，我们可以按名称（name）获取各个 header，或迭代它们：
=======
We can choose only one body-reading method.

If we've already got the response with `response.text()`, then `response.json()` won't work, as the body content has already been processed.

```js
let text = await response.text(); // response body consumed
let parsed = await response.json(); // fails (already consumed)
```
````

## Response headers

The response headers are available in a Map-like headers object in `response.headers`.

It's not exactly a Map, but it has similar methods to get individual headers by name or iterate over them:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

<<<<<<< HEAD
// 获取一个 header
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// 迭代所有 header
=======
// get one header
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// iterate over all headers
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

<<<<<<< HEAD
## Request header

要在 `fetch` 中设置 request header，我们可以使用 `headers` 选项。它有一个带有输出 header 的对象，如下所示：
=======
## Request headers

To set a request header in `fetch`, we can use the `headers` option. It has an object with outgoing headers, like this:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});
```

<<<<<<< HEAD
……但是有一些我们无法设置的 header（详见 [forbidden HTTP headers](https://fetch.spec.whatwg.org/#forbidden-header-name)）：
=======
...But there's a list of [forbidden HTTP headers](https://fetch.spec.whatwg.org/#forbidden-header-name) that we can't set:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

<<<<<<< HEAD
这些 header 保证了 HTTP 的正确性和安全性，所以它们仅由浏览器控制。

## POST 请求

要创建一个 `POST` 请求，或者其他方法的请求，我们需要使用 `fetch` 选项：

- **`method`** —— HTTP 方法，例如 `POST`，
- **`body`** —— request body，其中之一：
  - 字符串（例如 JSON 编码的），
  - `FormData` 对象，以 `form/multipart` 形式发送数据，
  - `Blob`/`BufferSource` 发送二进制数据，
  - [URLSearchParams](info:url)，以 `x-www-form-urlencoded` 编码形式发送数据，很少使用。

JSON 形式是最常用的。

例如，下面这段代码以 JSON 形式发送 `user` 对象：
=======
These headers ensure proper and safe HTTP, so they are controlled exclusively by the browser.

## POST requests

To make a `POST` request, or a request with another method, we need to use `fetch` options:

- **`method`** -- HTTP-method, e.g. `POST`,
- **`body`** -- the request body, one of:
  - a string (e.g. JSON-encoded),
  - `FormData` object, to submit the data as `form/multipart`,
  - `Blob`/`BufferSource` to send binary data,
  - [URLSearchParams](info:url), to submit the data in `x-www-form-urlencoded` encoding, rarely used.

The JSON format is used most of the time.

For example, this code submits `user` object as JSON:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
*/!*

let result = await response.json();
alert(result.message);
```

<<<<<<< HEAD
请注意，如果请求的 `body` 是字符串，则 `Content-Type` 会默认设置为 `text/plain;charset=UTF-8`。

但是，当我们要发送 JSON 时，我们会使用 `headers` 选项来发送 `application/json`，这是 JSON 编码的数据的正确的 `Content-Type`。

## 发送图片

我们同样可以使用 `Blob` 或 `BufferSource` 对象通过 `fetch` 提交二进制数据。

例如，这里有一个 `<canvas>`，我们可以通过在其上移动鼠标来进行绘制。点击 "submit" 按钮将图片发送到服务器：
=======
Please note, if the request `body` is a string, then `Content-Type` header is set to `text/plain;charset=UTF-8` by default.

But, as we're going to send JSON, we use `headers` option to send `application/json` instead, the correct `Content-Type` for JSON-encoded data.

## Sending an image

We can also submit binary data with `fetch` using `Blob` or `BufferSource` objects.

In this example, there's a `<canvas>` where we can draw by moving a mouse over it. A click on the "submit" button sends the image to the server:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

<<<<<<< HEAD
      // 服务器给出确认信息和图片大小作为响应
=======
      // the server responds with confirmation and the image size
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

<<<<<<< HEAD
请注意，这里我们没有手动设置 `Content-Type` header，因为 `Blob` 对象具有内建的类型（这里是 `image/png`，通过 `toBlob` 生成的）。对于 `Blob` 对象，这个类型就变成了 `Content-Type` 的值。

可以在不使用 `async/await` 的情况下重写 `submit()` 函数，像这样：
=======
Please note, here we don't set `Content-Type` header manually, because a `Blob` object has a built-in type (here `image/png`, as generated by `toBlob`). For `Blob` objects that type becomes the value of `Content-Type`.

The `submit()` function can be rewritten without `async/await` like this:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

<<<<<<< HEAD
## 总结

典型的 fetch 请求由两个 `await` 调用组成：

```js
let response = await fetch(url, options); // 解析 response header
let result = await response.json(); // 将 body 读取为 json
```

或者以 promise 形式：
=======
## Summary

A typical fetch request consists of two `await` calls:

```js
let response = await fetch(url, options); // resolves with response headers
let result = await response.json(); // read body as json
```

Or, without `await`:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* process result */)
```

<<<<<<< HEAD
响应的属性：
- `response.status` —— response 的 HTTP 状态码，
- `response.ok` —— HTTP 状态码为 200-299，则为 `true`。
- `response.headers` —— 类似于 Map 的带有 HTTP header 的对象。

获取 response body 的方法：
- **`response.text()`** —— 读取 response，并以文本形式返回 response，
- **`response.json()`** —— 将 response 解析为 JSON 对象形式，
- **`response.formData()`** —— 以 `FormData` 对象（form/multipart 编码，参见下一章）的形式返回 response，
- **`response.blob()`** —— 以 [Blob](info:blob)（具有类型的二进制数据）形式返回 response，
- **`response.arrayBuffer()`** —— 以 [ArrayBuffer](info:arraybuffer-binary-arrays)（低级别的二进制数据）形式返回 response。

到目前为止我们了解到的 fetch 选项：
- `method` —— HTTP 方法，
- `headers` —— 具有 request header 的对象（不是所有 header 都是被允许的）
- `body` —— 要以 `string`，`FormData`，`BufferSource`，`Blob` 或 `UrlSearchParams` 对象的形式发送的数据（request body）。

在下一章，我们将会看到更多 `fetch` 的选项和用例。
=======
Response properties:
- `response.status` -- HTTP code of the response,
- `response.ok` -- `true` is the status is 200-299.
- `response.headers` -- Map-like object with HTTP headers.

Methods to get response body:
- **`response.text()`** -- return the response as text,
- **`response.json()`** -- parse the response as JSON object,
- **`response.formData()`** -- return the response as `FormData` object (form/multipart encoding, see the next chapter),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (low-level binary data),

Fetch options so far:
- `method` -- HTTP-method,
- `headers` -- an object with request headers (not any header is allowed),
- `body` -- the data to send (request body) as `string`, `FormData`, `BufferSource`, `Blob` or `UrlSearchParams` object.

In the next chapters we'll see more options and use cases of `fetch`.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
