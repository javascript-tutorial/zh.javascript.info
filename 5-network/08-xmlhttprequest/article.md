# XMLHttpRequest

<<<<<<< HEAD
`XMLHttpRequest` 是 JavaScript 中发送 HTTP 请求的浏览器内置对象。

虽然它的名字里面有“XML”，但它可以操作任何数据，而不仅仅是 XML 格式。我们可以用它来上传/下载文件，跟踪进度等等。

现如今，我们有一个更为现代的方式叫做 `fetch`，它的出现使得 `XMLHttpRequest` 渐渐被弃用。

在现代 web 开发中，出于以下三种原因，我们可能会用 `XMLHttpRequest`：

1. 历史原因：我们需要使用 `XMLHttpRequest` 支持现有脚本。
2. 我们需要兼容老旧的浏览器，并且不想用 polyfills（例如为了让脚本更小）。
3. 我们需要一些 `fetch` 目前无法做到的事情，比如跟踪上传进度。

这些术语听起来都很熟悉是么？如果是那么请继续阅读下面 `XMLHttpRequest` 内容。如果还不是很熟悉的话，那么请先阅读关于 <info:fetch> 的基础内容。

## XMLHttpRequest 基础

XMLHttpRequest 有两种执行模式：同步（synchronous） 和 异步（asynchronous）。

我们首先来看看最常用的异步模式：

发送请求需要 3 个步骤：

1. 创建 `XMLHttpRequest`：
    ```js
    let xhr = new XMLHttpRequest(); // 构造函数没有参数
    ```

2. 初始化 `XMLHttpRequest`：
=======
`XMLHttpRequest` is a built-in browser object that allows to make HTTP requests in JavaScript.

Despite of having the word "XML" in its name, it can operate on any data, not only in XML format. We can upload/download files, track progress and much more.

Right now, there's another, more modern method `fetch`, that somewhat deprecates `XMLHttpRequest`.

In modern web-development `XMLHttpRequest` is used for three reasons:

1. Historical reasons: we need to support existing scripts with `XMLHttpRequest`.
2. We need to support old browsers, and don't want polyfills (e.g. to keep scripts tiny).
3. We need something that `fetch` can't do yet, e.g. to track upload progress.

Does that sound familiar? If yes, then all right, go on with `XMLHttpRequest`. Otherwise, please head on to <info:fetch>.

## The basics

XMLHttpRequest has two modes of operation: synchronous and asynchronous.

Let's see the asynchronous first, as it's used in the majority of cases.

To do the request, we need 3 steps:

1. Create `XMLHttpRequest`:
    ```js
    let xhr = new XMLHttpRequest();
    ```
    The constructor has no arguments.

2. Initialize it, usually right after `new XMLHttpRequest`:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
    ```js
    xhr.open(method, URL, [async, user, password])
    ```

<<<<<<< HEAD
    在 `new XMLHttpRequest` 之后我们通常调用 `xhr.open` 函数。它指定了请求的主要参数：

    - `method` — HTTP 方法。通常是 `"GET"` 或者 `"POST"`。
    - `URL` — 要执行请求（request）的 URL 字符串，可以是 [URL](info:url) 对象。
    - `async` — 如果显式的设置为 `false`，那么请求将会以同步的方式处理，我们稍后会讨论它。
    - `user`，`password` — HTTP 基本身份认证（如果需要的话）的登录名和密码。

    请注意。调用 `xhr.open` 函数的时候并不会建立连接。它的作用仅仅是作为当前请求的配置，而网络活动要到 `send` 调用后才开启。

3. 发送请求。
=======
    This method specifies the main parameters of the request:

    - `method` -- HTTP-method. Usually `"GET"` or `"POST"`.
    - `URL` -- the URL to request, a string, can be [URL](info:url) object.
    - `async` -- if explicitly set to `false`, then the request is synchronous, we'll cover that a bit later.
    - `user`, `password` -- login and password for basic HTTP auth (if required).

    Please note that `open` call, contrary to its name, does not open the connection. It only configures the request, but the network activity only starts with the call of `send`.

3. Send it out.
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

    ```js
    xhr.send([body])
    ```

<<<<<<< HEAD
    这个方法建立连接，并发送请求到服务器。可选参数 `body` 包含了请求主体。

    我们稍后会看到一些不同请求方式的示例，比如 `GET` 没有请求体。而 `POST` 这类请求方式会用 `body` 来发送数据到服务器。

4. 监听响应事件。

    这三个事件是最常用的：
    - `load` — 当请求结果已经返回，包括像 404 这样的 HTTP 错误。
    - `error` — 当无法完成请求时，比如网络中断或者无效的 URL。
    - `progress` — 下载期间定时触发，报告已经下载了多少。
=======
    This method opens the connection and sends the request to server. The optional `body` parameter contains the request body.

    Some request methods like `GET` do not have a body. And some of them like `POST` use `body` to send the data to the server. We'll see examples of that later.

4. Listen to `xhr` events for response.

    These three events are the most widely used:
    - `load` -- when the request is complete (even if HTTP status is like 400 or 500), and the response is fully downloaded.
    - `error` -- when the request couldn't be made, e.g. network down or invalid URL.
    - `progress` -- triggers periodically while the response is being downloaded, reports how much has been downloaded.
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

    ```js
    xhr.onload = function() {
      alert(`Loaded: ${xhr.status} ${xhr.response}`);
    };

<<<<<<< HEAD
    xhr.onerror = function() { // 只有在请求无法完成时才会触发
      alert(`Network Error`);
    };

    xhr.onprogress = function(event) { // 定时触发
      // event.loaded - 已经下载了多少字节
      // event.lengthComputable = true 当服务器返回了 Content-Length 响应头时
      // event.total - 总字节数（如果 lengthComputable 为 true）
=======
    xhr.onerror = function() { // only triggers if the request couldn't be made at all
      alert(`Network Error`);
    };

    xhr.onprogress = function(event) { // triggers periodically
      // event.loaded - how many bytes downloaded
      // event.lengthComputable = true if the server sent Content-Length header
      // event.total - total number of bytes (if lengthComputable)
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
      alert(`Received ${event.loaded} of ${event.total}`);
    };
    ```

<<<<<<< HEAD
下面是一个完整的示例。它从服务器加载 `/article/xmlhttprequest/example/load`，并显示加载进度：

```js run
// 1. 创建一个新的 XMLHttpRequest 对象
let xhr = new XMLHttpRequest();

// 2. 配置该对象：对 URL /article/.../load 采用 GET 方式请求数据
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. 通过网络发送请求数据
xhr.send();

// 4. 当收到响应数据的时候，下面这个函数就会被调用
xhr.onload = function() {
  if (xhr.status != 200) { // 分析响应的状态码
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // 比如 404：Not Found
  } else { // 显示结果
    alert(`Done, got ${xhr.response.length} bytes`); // 响应文本是服务器传回的数据
=======
Here's a full example. The code below loads the URL at `/article/xmlhttprequest/example/load` from the server and prints the progress:

```js run
// 1. Create a new XMLHttpRequest object
let xhr = new XMLHttpRequest();

// 2. Configure it: GET-request for the URL /article/.../load
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. Send the request over the network
xhr.send();

// 4. This will be called after the response is received
xhr.onload = function() {
  if (xhr.status != 200) { // analyze HTTP status of the response
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
  } else { // show the result
    alert(`Done, got ${xhr.response.length} bytes`); // responseText is the server
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
<<<<<<< HEAD
    alert(`Received ${event.loaded} bytes`); // 没有 Content-Length
=======
    alert(`Received ${event.loaded} bytes`); // no Content-Length
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
  }

};

xhr.onerror = function() {
  alert("Request failed");
};
```

<<<<<<< HEAD
一旦服务器有了响应，我们可以在下面这些请求对象的属性中获取相关的返回结果：

`status`
: HTTP 状态码（一个数字）：`200`，`404`，`403` 等等，如果出现非 HTTP 错误，它的结果为 `0`。

`statusText`
: HTTP 状态消息（字符串）：如果状态码是 `200` 的话它的消息值通常为 `OK`，`404` 对应的值为 `Not Found`，`403` 对应的值为 `Forbidden`。

`response`（以前的脚本可能用的是 `responseText`）
: 服务器响应。

我们还可以使用相应的属性指定超时（timeout）时间：

```js
xhr.timeout = 10000; // timeout 单位是 ms，此处即 10 秒
```

如果在给定时间内请求没有成功执行，请求就会被取消，并且触发 `timeout` 事件。

````smart header="URL 搜索参数（URL search parameters）"
要传递诸如 `?name=value` 这样的 URL 参数，并确保参数被正确编码，我们可以使用 [URL](info:url) 对象：
=======
Once the server has responded, we can receive the result in the following `xhr` properties:

`status`
: HTTP status code (a number): `200`, `404`, `403` and so on, can be `0` in case of a non-HTTP failure.

`statusText`
: HTTP status message (a string): usually `OK` for `200`, `Not Found` for `404`, `Forbidden` for `403` and so on.

`response` (old scripts may use `responseText`)
: The server response body.

We can also specify a timeout using the corresponding property:

```js
xhr.timeout = 10000; // timeout in ms, 10 seconds
```

If the request does not succeed within the given time, it gets canceled and `timeout` event triggers.

````smart header="URL search parameters"
To add parameters to URL, like `?name=value`, and ensure the proper encoding, we can use [URL](info:url) object:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');

<<<<<<< HEAD
// 参数 'q' 被编码
=======
// the parameter 'q' is encoded
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
xhr.open('GET', url); // https://google.com/search?q=test+me%21
```

````

<<<<<<< HEAD
## 响应类型

我们可以使用 `xhr.responseType` 属性来设置响应格式：

- `""` （默认） — 响应格式为字符串，
- `"text"` — 响应格式为字符串，
- `"arraybuffer"` — 响应格式为 `ArrayBuffer`（对于二进制数据，请参见 <info:arraybuffer-binary-arrays>），
- `"blob"` — 响应格式为 `Blob`（对于二进制数据，请参见 <info:blob>），
- `"document"` — 响应格式为 XML document（可以使用 XPath 和其他 XML 方法），
- `"json"` — 响应格式为 JSON（自动解析）。

例如，我们以 JSON 格式获取响应：
=======
## Response Type

We can use `xhr.responseType` property to set the response format:

- `""` (default) -- get as string,
- `"text"` -- get as string,
- `"arraybuffer"` -- get as `ArrayBuffer` (for binary data, see chapter <info:arraybuffer-binary-arrays>),
- `"blob"` -- get as `Blob` (for binary data, see chapter <info:blob>),
- `"document"` -- get as XML document (can use XPath and other XML methods),
- `"json"` -- get as JSON (parsed automatically).

For example, let's get the response as JSON:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js run
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

*!*
xhr.responseType = 'json';
*/!*

xhr.send();

<<<<<<< HEAD
// 响应数据为 {"message": "Hello, world!"}
=======
// the response is {"message": "Hello, world!"}
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hello, world!
};
```

```smart
<<<<<<< HEAD
在旧的脚本中，你可能会看到 `xhr.responseText` 甚至是 `xhr.responseXML` 属性。

基于一些历史原因，我们使用它们来获取字符串或者 XML 文档。现今，我们应该设置格式为 `xhr.responseType`，然后就能获取如上所示的 `xhr.response` 了。
```

## 准备状态（Ready states）

`XMLHttpRequest` 的状态（states）会随着它的处理进度变化而变化。可以用 `xhr.readyState` 来了解当前状态。

[规范](https://xhr.spec.whatwg.org/#states) 中提到的所有状态如下：

```js
UNSENT = 0; // 初始化状态
OPENED = 1; // 调用 open 方法
HEADERS_RECEIVED = 2; // 收到响应头
LOADING = 3; // 响应正在被加载（收到数据包）
DONE = 4; // 请求完成
```

`XMLHttpRequest` 对象按顺序传送这些状态：`0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4`。在网络中每收到一个数据包，状态 `3` 就会被传送一次。

我们可以使用 `readystatechange` 事件来跟踪它们；
=======
In the old scripts you may also find `xhr.responseText` and even `xhr.responseXML` properties.

They exist for historical reasons, to get either a string or XML document. Nowadays, we should set the format in `xhr.responseType` and get `xhr.response` as demonstrated above.
```

## Ready states

`XMLHttpRequest` changes between states as it progresses. The current state is accessible as  `xhr.readyState`.

All states, as in [the specification](https://xhr.spec.whatwg.org/#states):

```js
UNSENT = 0; // initial state
OPENED = 1; // open called
HEADERS_RECEIVED = 2; // response headers received
LOADING = 3; // response is loading (a data packed is received)
DONE = 4; // request complete
```

An `XMLHttpRequest` object travels them in the order `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4`. State `3` repeats every time a data packet is received over the network.

We can track them using `readystatechange` event:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
<<<<<<< HEAD
    // 加载
  }
  if (xhr.readyState == 4) {
    // 请求完成
=======
    // loading
  }
  if (xhr.readyState == 4) {
    // request finished
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
  }
};
```

<<<<<<< HEAD
你可能在古老的代码中发现 `readystatechange` 这样的事件监听器，它的存在是基于一些历史原因，因为在很长一段时间内都没有 `load` 以及其他事件。

如今，它们已被 `load/error/progress` 事件替代。

## 终止请求（aborting）

我们可以随时终止请求。调用 `xhr.abort()` 即可：

```js
xhr.abort(); // 终止请求
```

它将会触发 `abort` 事件且 `xhr.status` 变为 `0`。

## 同步请求

在 `open` 方法中，如果第三个参数 `async` 被设置为 `false`，那么请求就以同步的方式处理。

换句话说就是在 `send()` 阶段 JavaScript 停止执行，并且等到响应被接收时才继续执行剩余的代码。这有点儿像 `alert` 或 `prompt` 命令。

下面重写上面的例子，`open` 函数的第三个参数设置为 `false`：
=======
You can find `readystatechange` listeners in really old code, it's there for historical reasons, as there was a time when there were no `load` and other events. Nowadays, `load/error/progress` handlers deprecate it.

## Aborting request

We can terminate the request at any time. The call to `xhr.abort()` does that:

```js
xhr.abort(); // terminate the request
```

That triggers `abort` event, and `xhr.status` becomes `0`.

## Synchronous requests

If in the `open` method the third parameter `async` is set to `false`, the request is made synchronously.

In other words, JavaScript execution pauses at `send()` and resumes when the response is received. Somewhat like `alert` or `prompt` commands.

Here's the rewritten example, the 3rd parameter of `open` is `false`:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/hello.txt', *!*false*/!*);

try {
  xhr.send();
  if (xhr.status != 200) {
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    alert(xhr.response);
  }
<<<<<<< HEAD
} catch(err) { // 代替 onerror
=======
} catch(err) { // instead of onerror
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
  alert("Request failed");
}
```

<<<<<<< HEAD
它可能看起来很不错，但是同步调用很少使用，因为它们会阻塞页面内（in-page）的 JavaScript 直到加载完成。在一些浏览器中，滚动可能无法正常运行。如果一个同步调用执行很长时间，浏览器可能会建议关闭“挂起”（hanging）的页面。

`XMLHttpRequest` 的许多高级功能在同步请求中都无效，比如向其他域发起请求或者设置超时时间。同时，你也可以看到，它们没有进度指示。

基于这些原因，同步请求使用的非常少，几乎是不使用。在此，我们不再讨论它了。

## HTTP 头（HTTP-headers）

`XMLHttpRequest` 允许发送自定义请求头，并且可以读取服务器发送过来的响应头。

HTTP-headers 有三种方法：

`setRequestHeader(name, value)`
: 通过给定的 `name` 和 `value` 设置请求头。

    例如：
=======
It might look good, but synchronous calls are used rarely, because they block in-page JavaScript till the loading is complete. In some browsers it becomes impossible to scroll. If a synchronous call takes too much time, the browser may suggest to close the "hanging" webpage.

Many advanced capabilities of `XMLHttpRequest`, like requesting from another domain or specifying a timeout, are unavailable for synchronous requests. Also, as you can see, no progress indication.

Because of all that, synchronous requests are used very sparingly, almost never. We won't talk about them any more.

## HTTP-headers

`XMLHttpRequest` allows both to send custom headers and read headers from the response.

There are 3 methods for HTTP-headers:

`setRequestHeader(name, value)`
: Sets the request header with the given `name` and `value`.

    For instance:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

<<<<<<< HEAD
    ```warn header="Headers 的限制"
    一些请求头可能由浏览器专门管理，比如，`Referer` 和 `Host`。
    参见 [规范](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method) 以获取更多信息。

    为了用户安全和请求的正确性，`XMLHttpRequest` 不允许修改请求头。
    ```

    ````warn header="不能移除 header"
    `XMLHttpRequest` 的另一个特点是无法撤销 `setRequestHeader`。

    一旦请求头被设置，它就无法撤销。其他的调用会向请求头中添加信息，但不会覆盖它们。

    例如：
=======
    ```warn header="Headers limitations"
    Several headers are managed exclusively by the browser, e.g. `Referer` and `Host`.
    The full list is [in the specification](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method).

    `XMLHttpRequest` is not allowed to change them, for the sake of user safety and correctness of the request.
    ```

    ````warn header="Can't remove a header"
    Another peculiarity of `XMLHttpRequest` is that one can't undo `setRequestHeader`.

    Once the header is set, it's set. Additional calls add information to the header, don't overwrite it.

    For instance:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

<<<<<<< HEAD
    // 请求头可能是：
=======
    // the header will be:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
<<<<<<< HEAD
: 通过给定的 `name` 来获取响应头（除了 `Set-Cookie` 和 `Set-Cookie2`）。

    例如：
=======
: Gets the response header with the given `name` (except `Set-Cookie` and `Set-Cookie2`).

    For instance:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
<<<<<<< HEAD
: 返回除 `Set-Cookie` 和 `Set-Cookie2` 外的所有响应头。

    响应头以单行形式返回，形如：

    ```
=======
: Returns all response headers, except `Set-Cookie` and `Set-Cookie2`.

    Headers are returned as a single line, e.g.:

    ```http
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

<<<<<<< HEAD
    响应头中的换行符总是 `"\r\n"`（不依赖于操作系统），所以我们可以很轻易地将其分割成单一的响应头部。name 和 value 之间总是会以冒号后跟空格 `": "` 分隔开。这在规范中已经得到修复。

    因此，如果我们想要获取具有 name/value 对的对象，我们用一点点 JS 代码来处理它们。

    就像这样（假设有两个响应头具有相同的名称，那么后者会覆盖前者）：
=======
    The line break between headers is always `"\r\n"` (doesn't depend on OS), so we can easily split it into individual headers. The separator between the name and the value is always a colon followed by a space `": "`. That's fixed in the specification.

    So, if we want to get an object with name/value pairs, we need to throw in a bit JS.

    Like this (assuming that if two headers have the same name, then the latter one overwrites the former one):
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

    ```js
    let headers = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return result;
      }, {});
<<<<<<< HEAD
=======

    // headers['Content-Type'] = 'image/png'
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
    ```

## POST, FormData

<<<<<<< HEAD
要建立 POST 请求，我们可以使用内置的 [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) 对象。

语法为：

```js
let formData = new FormData([form]); // 创建对象，可以用表单元素 <form> 来填充
formData.append(name, value); // 追加一个字段
```

我们可以从一个表单中创建它，如果需要的话还可以`追加（append）`更多的字段：

1. `xhr.open('POST', ...)` — 使用 `POST` 方法。
2. `xhr.send(formData)` 发送表单到服务器。

例如：

```html run
=======
To make a POST request, we can use the built-in [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.

The syntax:

```js
let formData = new FormData([form]); // creates an object, optionally fill from <form>
formData.append(name, value); // appends a field
```

We create it, optionally fill from a form, `append` more fields if needed, and then:

1. `xhr.open('POST', ...)` – use `POST` method.
2. `xhr.send(formData)` to submit the form to the server.

For instance:

```html run refresh
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
<<<<<<< HEAD
  // 从表单中预填充 FormData
  let formData = new FormData(document.forms.person);

  // 追加更多字段
  formData.append("middle", "Lee");

  // 发送它
=======
  // pre-fill FormData from the form
  let formData = new FormData(document.forms.person);

  // add one more field
  formData.append("middle", "Lee");

  // send it out
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

<<<<<<< HEAD
</script>
```

表单以 `multipart/form-data` 编码发送。

或者，如果我们更喜欢 JSON，那么可以使用 `JSON.stringify` 并以字符串形式发送。

不过，不要忘记设置请求头 `Content-Type: application/json` 哦。许多服务端框架都能自动解码 JSON：
=======
  xhr.onload = () => alert(xhr.response);
</script>
```

The form is sent with `multipart/form-data` encoding.

Or, if we like JSON more, then `JSON.stringify` and send as a string.

Just don't forget to set the header `Content-Type: application/json`, many server-side frameworks automatically decode JSON with it:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
let xhr = new XMLHttpRequest();

let json = JSON.stringify({
  name: "John",
  surname: "Smith"
});

xhr.open("POST", '/submit')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.send(json);
```

<<<<<<< HEAD
`.send(body)` 方法就像一个非常杂食性的动物。它可以发送几乎所有内容，包括 `Blob` 和 `BufferSource` 对象。

## 上传进度（Upload progress）

`progress` 事件仅仅在下载阶段工作。

也就是说：如果 `POST` 一些内容，`XMLHttpRequest` 首先上传我们的数据（请求体（request body）），然后下载响应数据。

如果我们正在上传的文件很大，这时我们肯定对追踪上传进度感兴趣。但是 `xhr.onprogress` 在这里并不起作用。

这里有个其他对象 `xhr.upload`，没有方法，专门用于上传事件。

XMLHttpRequest 事件和 `xhr` 类似，但是 `xhr.upload` 可以在上传阶段被触发：

- `loadstart` — 上传开始。
- `progress` — 上传期间定期触发。
- `abort` — 上传终止。
- `error` — 非 HTTP 错误。
- `load` — 上传成功完成。
- `timeout` — 上传超时（如果设置了 `timeout` 属性）。
- `loadend` — 上传操作完成，可能成功也可能失败。

handlers 示例：
=======
The `.send(body)` method is pretty omnivore. It can send almost any `body`, including `Blob` and `BufferSource` objects.

## Upload progress

The `progress` event triggers only on the downloading stage.

That is: if we `POST` something, `XMLHttpRequest` first uploads our data (the request body), then downloads the response.

If we're uploading something big, then we're surely more interested in tracking the upload progress. But `xhr.onprogress` doesn't help here.

There's another object, without methods, exclusively to track upload events: `xhr.upload`.

It generates events, similar to `xhr`, but `xhr.upload` triggers them solely on uploading:

- `loadstart` -- upload started.
- `progress` -- triggers periodically during the upload.
- `abort` -- upload aborted.
- `error` -- non-HTTP error.
- `load` -- upload finished successfully.
- `timeout` -- upload timed out (if `timeout` property is set).
- `loadend` -- upload finished with either success or error.

Example of handlers:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
xhr.upload.onprogress = function(event) {
  alert(`Uploaded ${event.loaded} of ${event.total} bytes`);
};

xhr.upload.onload = function() {
  alert(`Upload finished successfully.`);
};

xhr.upload.onerror = function() {
  alert(`Error during the upload: ${xhr.status}`);
};
```

<<<<<<< HEAD
下面是个应用示例：带有进度指示的文件上传：
=======
Here's a real-life example: file upload with progress indication:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

<<<<<<< HEAD
  // 追踪上传进度
=======
  // track upload progress
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };
*/!*

<<<<<<< HEAD
  // 跟踪完成：不论成功与否
=======
  // track completion: both successful or not
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("success");
    } else {
      console.log("error " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}
</script>
```

<<<<<<< HEAD
## 跨域请求（Cross-origin requests）

`XMLHttpRequest` 可以使用和 [fetch](info:fetch-crossorigin) 相同的跨域资源共享（CORS）策略建立跨域请求。

类似于 `fetch`，默认情况下不会发送 cookies 和 HTTP 认证到其他域。如果要使用它们请设置 `xhr.withCredentials` 值为 `true`：
=======
## Cross-origin requests

`XMLHttpRequest` can make cross-origin requests, using the same CORS policy as [fetch](info:fetch-crossorigin).

Just like `fetch`, it doesn't send cookies and HTTP-authorization to another origin by default. To enable them, set `xhr.withCredentials` to `true`:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```

<<<<<<< HEAD
参见 <info:fetch-crossorigin> 章节以了解更多关于 cross-origin headers 的信息。


## 总结

使用 `XMLHttpRequest` GET 方式请求数据的典型代码：
=======
See the chapter <info:fetch-crossorigin> for details about cross-origin headers.


## Summary

Typical code of the GET-request with `XMLHttpRequest`:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
<<<<<<< HEAD
  if (xhr.status != 200) { // HTTP 出错？
    // 处理错误
=======
  if (xhr.status != 200) { // HTTP error?
    // handle error
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
    alert( 'Error: ' + xhr.status);
    return;
  }

<<<<<<< HEAD
  // 从 xhr.response 中获取响应
};

xhr.onprogress = function(event) {
  // 报告进度
=======
  // get the response from xhr.response
};

xhr.onprogress = function(event) {
  // report progress
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
<<<<<<< HEAD
  // 处理非 HTTP 错误（如网络中断）
};
```

实际上还有更多事件，[现代规范](http://www.w3.org/TR/XMLHttpRequest/#events)中列出了它们（按生命周期排序）：

- `loadstart` — 请求开始。
- `progress` — 一个响应数据包到达，此时整个响应体都在 `responseText` 里。
- `abort` — 请求被 `xhr.abort()` 取消。
- `error` — 发生连接错误，例如，域名错误。不会响应诸如 404 这类的 HTTP 错误。
- `load` — 请求成功完成。
- `timeout` — 请求超时被取消（仅仅发生在 timeout 被设置的情况下）。
- `loadend` — 在 `load`，`error`，`timeout` 或者 `abort` 之后触发。

`error`，`abort`，`timeout` 和 `load` 事件是互斥的，即一次只能有一个事件发生。

最常用的事件是加载完成（load completion）（`load`），加载失败（load failure）（`error`），或者我们可以只用 `loadend` 处理程序来检查响应，看看其发生了什么。

我们还了解了一些其他事件：`readystatechange`。由于历史原因，它在规范建立之前就已经出现。现如今已经没有必要使用他们了，我们可以用新的事件代替它，但是在旧的代码中仍然比较常见。

如果我们需要专门追踪上传，那么我们需要在 `xhr.upload` 对象上监听同样的事件。
=======
  // handle non-HTTP error (e.g. network down)
};
```

There are actually more events, the [modern specification](http://www.w3.org/TR/XMLHttpRequest/#events) lists them (in the lifecycle order):

- `loadstart` -- the request has started.
- `progress` -- a data packet of the response has arrived, the whole response body at the moment is in `responseText`.
- `abort` -- the request was canceled by the call `xhr.abort()`.
- `error` -- connection error has occurred, e.g. wrong domain name. Doesn't happen for HTTP-errors like 404.
- `load` -- the request has finished successfully.
- `timeout` -- the request was canceled due to timeout (only happens if it was set).
- `loadend` -- triggers after `load`, `error`, `timeout` or `abort`.

The `error`, `abort`, `timeout`, and `load` events are mutually exclusive. Only one of them may happen.

The most used events are load completion (`load`), load failure (`error`), or we can use a single `loadend` handler and check the properties of the request object `xhr` to see what happened.

We've already seen another event: `readystatechange`. Historically, it appeared long ago, before the specification settled. Nowadays, there's no need to use it, we can replace it with newer events, but it can often be found in older scripts.

If we need to track uploading specifically, then we should listen to same events on `xhr.upload` object.
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
