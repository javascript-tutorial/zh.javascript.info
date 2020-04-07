
# Fetch

当需要加载新信息时，JavaScript 可以向服务器发送网络请求。

例如，我们可以：

- 提交订单，
- 加载用户信息，
- 接受来自服务器的最新更新，
- ……等等。

……所有这些都没有重新加载页面！

它有个通用术语称为“AJAX”（<b>A</b>synchronous <b>J</b>avascript <b>A</b>nd <b>X</b>ml 的首字母缩写）。我们不必使用 XML：这个术语很早就产生了，这个词一直在那里。

有很多办法向服务器发送请求并获取信息。

`fetch()` 方法是一种现代通用方法，那么我们就从它开始吧。它已经发展了几年了并在不断改进，现在它已经得到很多浏览器的支持了。

基本语法：

```js
let promise = fetch(url, [options])
```

- **`url`** —— 要访问的 URL。
- **`options`** —— 可选参数：method，headers 等。

浏览器立即发送请求，并返回一个 `promise`。

获取响应通常需要经过两个阶段。

**第一阶段，当服务器发送了响应头，`promise` 就使用其内建的 [Response](https://fetch.spec.whatwg.org/#response-class) 类来解析该对象。**

因此，我们可以通过检查 HTTP 状态来确定请求是否成功，或者当响应体还没有返回时，通过检查响应头来确定状态。

如果 `fetch` 无法建立一个 HTTP 请求，例如网络问题，亦或是请求的网址不存在，那么 promise 就返回 reject。HTTP 错误，即使是 404 或者 500，也被视为正常的过程。

我们可以在 response 属性里看到它们：

- **`ok`** —— 布尔值，如果 HTTP 状态码在 200-299 之间，返回 `true`。
- **`status`** —— HTTP 状态码。

例如：

```js
let response = await fetch(url);

if (response.ok) { // 如果 HTTP 状态码在 200-299 之间
  // 获取响应体（如下所示）
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

**第二阶段，为了获取响应体，我们需要调用其他方法。**

`Response` 提供了多种基于 promise 的方法来获取不同格式的响应正文：

- **`response.json()`** —— 将 response 解析为 JSON 对象，
- **`response.text()`** —— 以文本形式返回 response，
- **`response.formData()`** —— 以 `FormData` 对象（form/multipart 编码（encoding），我们将在[下一章](info:formdata)中了解到更多）的形式返回 response。
- **`response.blob()`** —— 以 [Blob](info:blob) （具有类型的二进制数据）形式返回 response，
- **`response.arrayBuffer()`** —— 以 [ArrayBuffer](info:arraybuffer-binary-arrays) （纯二进制数据）形式返回 response，
- 另外，`response.body` 是 [ReadableStream](https://streams.spec.whatwg.org/#rs-class) 对象，它允许逐块读取正文，我们稍后会用一个例子解释它。

例如，我们来获取 GitHub 上最新 commits 的 JSON 对象：

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

*!*
let commits = await response.json(); // 获取 response body 并解析为 JSON
*/!*

alert(commits[0].author.login);
```

也可以使用纯 promise 语法，不使用 `await`：

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

要获取文本，可以使用 `await response.text()` 代替 `.json()`：
```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // 以 text 形式读取响应体

alert(text.slice(0, 80) + '...');
```

我们以 fetch 并显示一张图像为例来了解一下读取二进制文件的情况（参见 [Blob](info:blob) 章节以了解更多关于 blob 的操作）：

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // 以 Blob 对象下载
*/!*

// 创建 <img> 元素
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// 显示图片
img.src = URL.createObjectURL(blob);

setTimeout(() => { // 3 秒后隐藏
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

````warn
我们只能选择其中一种解析响应体的方式。

如果我们以 `response.text()` 方法来获取 response，那么如果我们再用 `response.json()` 方法的话，那么这个方法是不会生效的，因为正文内容已经被处理过了。

```js
let text = await response.text(); // 响应体被处理
let parsed = await response.json(); // 错误（已被处理）
````

## Headers

`response.headers` 中有一个类似于 Map 的 headers 对象。

我们可以获取单个的 headers 或者迭代它们：

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// 获取其中一个 header
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// 迭代所有 headers
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

我们可以使用 `headers` 选项来设置 header，就像这样：

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'abcdef'
  }
});
```

但是有一些 headers 我们无法去设置它（详细列表参见 [forbidden HTTP headers](https://fetch.spec.whatwg.org/#forbidden-header-name)）：

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

这些 headers 保证了 HTTP 的正确性和安全性，所以它们仅由浏览器控制。

## POST 请求

创建一个 `POST` 请求，或者其他方法（HTTP method）的请求，我们需要使用 `fetch` 相关选项：

- **`method`** —— HTTP 方法（HTTP-method），例如 `POST`，
- **`body`** —— 其中之一：
  - 字符串（例如 JSON），
  - `FormData` 对象，以 `form/multipart` 形式发送数据，
  - `Blob`/`BufferSource` 发送二进制数据，
  - [URLSearchParams](info:url)，以 `x-www-form-urlencoded` 编码形式发送数据，很少使用。

例如，下面这段代码以 JSON 形式发送 `user` 对象：

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

请注意，如果 body 是字符串，`Content-Type` 默认会设置为 `text/plain;charset=UTF-8`。所以我们使用 `headers` 值为 `application/json` 来代替默认值，这是 JSON 编码的数据的正确格式。

## 发送图片

我们同样可以用 `Blob` 或者 `BufferSource` 来发送二进制数据。

例如，这里有个我们可以通过移动鼠标来绘制图像的 `<canvas>` 元素。“submit” 按钮可以用来向服务器发送绘制的图片：

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
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

同样，我们也不需要手动设置 `Content-Type`，因为 `Blob` 对象有一个内置的类型（这里是 `image/png`，通过 `toBlob` 自动生成的）。

`submit()` 函数可以不使用 `async/await`，改写后如下：

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

## 总结

典型的 fetch 请求包含两个 `await`：

```js
let response = await fetch(url, options); // 解析 response headers
let result = await response.json(); // 以 JSON 形式读取数据
```

或者以 promise 形式：
```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* 处理结果 */)
```

响应属性：
- `response.status` —— response 的 HTTP 状态码，
- `response.ok` —— HTTP 状态码在 200-299 之间返回 `true`。
- `response.headers` —— 类似于 Map 的 HTTP headers 对象。

获取响应体的方法：
- **`response.json()`** —— 以 JSON 对象形式解析 response，
- **`response.text()`** —— 以 text 形式返回 response，
- **`response.formData()`** —— 以 `FormData` 对象（form/multipart 编码，参见下一章）形式返回 response，
- **`response.blob()`** —— 以 [Blob](info:blob)（具有类型的二进制数据）形式返回 response，
- **`response.arrayBuffer()`** —— 以 [ArrayBuffer](info:arraybuffer-binary-arrays)（纯二进制数据）返回 response。

到目前为止我们了解的 fetch 选项包括：
- `method` —— HTTP 方法（HTTP-method）,
- `headers` —— 具有请求头的 headers 对象（不是所有请求头都是被允许的）
- `body` —— 以 `string`，`FormData`，`BufferSource`，`Blob` 或者 `UrlSearchParams` 对象发送数据。

在下一章中，我们将会看到更多关于 `fetch` 的选项以及使用场景。
