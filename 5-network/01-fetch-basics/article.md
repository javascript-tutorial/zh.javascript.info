
# Fetch：基础

`fetch()` 方法是一种更为现代的发送 HTTP 请求的方式。

它几年前被提出发展至今，并且还在不断改进，现在它已经得到了很多浏览器的支持。

基本语法：

```js
let promise = fetch(url, [options])
```

- **`url`** —— 要访问的 URL。
- **`options`** —— 可选参数：method，headers 等。

浏览器立即发送请求，并返回 `promise`。

获取响应通常需要经过两个阶段。

**只要服务器提供了响应头，`promise` 就会使用内置的 [Response](https://fetch.spec.whatwg.org/#response-class) 类的对象来解析。**

因此，我们可以通过检测 HTTP 状态来确定请求是否成功，或者当响应体还没有返回时，通过检查响应头来确定状态。

如果 `fetch` 无法建立一个 HTTP 请求，那么 promise 就返回 reject，例如，网络问题，亦或是请求的网址不存在。HTTP 错误，即使是 404 或者 500，也被视为正常的过程。

我们可以在 response 属性里看到它们：

- **`ok`** -- 布尔值，如果 HTTP 状态码在 200-299 之间，返回 `true`。
- **`status`** -- HTTP 状态码。

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

为了获取响应体，我们需要调用其他方法。

`Response` 提供了多种基于 promise 的方法来获取不同格式的响应正文：

- **`response.json()`** -- 将 response 解析为 JSON 对象
- **`response.text()`** -- 以文本形式返回 response
- **`response.formData()`** -- 以 FormData 对象（form/multipart encoding）形式返回 response
- **`response.blob()`** -- 以 [Blob](info:blob) （具有类型的二进制数据）形式返回 response
- **`response.arrayBuffer()`** -- 以 [ArrayBuffer](info:arraybuffer-binary-arrays) （纯二进制数据）形式返回 response
- 另外，`response.body` 是 [ReadableStream](https://streams.spec.whatwg.org/#rs-class) 对象，它允许逐块读取正文，我们稍后会用一个例子解释它。

例如，这里我们从 GitHub 获取最新提交的 JSON 对象：

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

*!*
let commits = await response.json(); // 获取 response body 并解析为 JSON
*/!*

alert(commits[0].author.login);
```

或者，我们也可以使用纯 promises 语法来实现同样的操作：

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

要获取文字可以使用下面方法：

```js
let text = await response.text();
```

对于二进制的示例，让我们来获取并显示一个图片（参见 [Blob](info:blob) 章节，获取更多关于 blob 操作的详细信息）：

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

setTimeout(() => { // 两秒后隐藏图片
  img.remove();
  URL.revokeObjectURL(img.src);
}, 2000);
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

- **`method`** -- HTTP 方法（HTTP-method），例如 `POST`
- **`body`** -- 其中之一：
  - 字符串（例如 JSON）
  - `FormData` 对象，以 `form/multipart` 形式发送数据
  - `Blob`/`BufferSource` 发送二进制数据
  - [URLSearchParams](info:url)，以 `x-www-form-urlencoded` 形式发送数据，很少使用

我们来看几个例子：

## Submit JSON

这段代码以 JSON 形式发送 `user` 对象：

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch-basics/post/user', {
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

请注意，如果 body 是字符串，`Content-Type` 默认会设置为 `text/plain;charset=UTF-8`。所以我们使用 `headers` 选项来发送 `application/json`。

## 发送表单

我们用上面同样的方法来处理 HTML `<form>`。

```html run
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
</form>

<script>
(async () => {
  let response = await fetch('/article/fetch-basics/post/user', {
    method: 'POST',
*!*
    body: new FormData(formElem)
*/!*
  });

  let result = await response.json();

  alert(result.message);
})();
</script>
```

这里 [FormData](https://xhr.spec.whatwg.org/#formdata) 方法会自动编码表单，`<input type="file">` 字段也同样被处理并以 `Content-Type: form/multipart` 来发送它。

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
      let response = await fetch('/article/fetch-basics/post/image', {
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
    fetch('/article/fetch-basics/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

## Custom FormData with image

但实际上，通常将图像以及其他字段作为表单的一部分发送是非常方便的做法，例如 “name” 和其他元数据。

同样，相较于原始二进制数据，服务器更适宜于接收多部分编码（multipart-encoded）的表单。

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

*!*
      let formData = new FormData();
      formData.append("name", "myImage");
      formData.append("image", blob);
*/!*    

      let response = await fetch('/article/fetch-basics/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

现在，从服务器角度来看，图像是表单中的“文件”。

## 总结

典型的 fetch 请求包含两个 `awaits`：

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
- `response.status` -- response 的 HTTP 状态码
- `response.ok` -- HTTP 状态码在 200-299 之间返回 `true`
- `response.headers` -- 类似于 Map 的 HTTP headers 对象

获取响应体的方法：
- **`response.json()`** -- 以 JSON 对象形式解析 response
- **`response.text()`** -- 以 text 形式返回 response
- **`response.formData()`** -- 以 FormData 对象形式返回 response（form/multipart encoding）
- **`response.blob()`** -- 以 [Blob](info:blob)（具有类型的二进制数据）形式返回 response
- **`response.arrayBuffer()`** -- 以 [ArrayBuffer](info:arraybuffer-binary-arrays)（纯二进制数据）返回 response

到目前为止我们了解的 fetch 选项包括：
- `method` -- HTTP 方法（HTTP-method）,
- `headers` -- 具有请求头的 headers 对象（不是所有请求头都是被允许的）
- `body` -- 提交 string/FormData/BufferSource/Blob/UrlSearchParams 这些数据

在下面章节中，我们将会看到更多选项和使用场景。
