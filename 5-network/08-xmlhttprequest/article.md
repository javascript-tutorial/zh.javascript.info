# XMLHttpRequest

<<<<<<< HEAD
`XMLHttpRequest` 是一个内建的浏览器对象，它允许使用 JavaScript 发送 HTTP 请求。

虽然它的名字里面有 "XML" 一词，但它可以操作任何数据，而不仅仅是 XML 格式。我们可以用它来上传/下载文件，跟踪进度等。

现如今，我们有一个更为现代的方法叫做 `fetch`，它的出现使得 `XMLHttpRequest` 在某种程度上被弃用。

在现代 Web 开发中，出于以下三种原因，我们还在使用 `XMLHttpRequest`：

1. 历史原因：我们需要支持现有的使用了 `XMLHttpRequest` 的脚本。
2. 我们需要兼容旧浏览器，并且不想用 polyfill（例如为了使脚本更小）。
3. 我们需要做一些 `fetch` 目前无法做到的事情，例如跟踪上传进度。

这些话听起来熟悉吗？如果是，那么请继续阅读下面的 `XMLHttpRequest` 相关内容吧。如果还不是很熟悉的话，那么请先阅读 <info:fetch> 一章的内容。

## XMLHttpRequest 基础

XMLHttpRequest 有两种执行模式：同步（synchronous）和异步（asynchronous）。

我们首先来看看最常用的异步模式：

要发送请求，需要 3 个步骤：

1. 创建 `XMLHttpRequest`：
    ```js
    let xhr = new XMLHttpRequest();
    ```
    此构造器没有参数。

2. 初始化它，通常就在 `new XMLHttpRequest` 之后：
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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
    ```js
    xhr.open(method, URL, [async, user, password])
    ```

<<<<<<< HEAD
    此方法指定请求的主要参数：

    - `method` —— HTTP 方法。通常是 `"GET"` 或 `"POST"`。
    - `URL` —— 要请求的 URL，通常是一个字符串，也可以是 [URL](info:url) 对象。
    - `async` —— 如果显式地设置为 `false`，那么请求将会以同步的方式处理，我们稍后会讲到它。
    - `user`，`password` —— HTTP 基本身份验证（如果需要的话）的登录名和密码。

    请注意，`open` 调用与其名称相反，不会建立连接。它仅配置请求，而网络活动仅以 `send` 调用开启。

3. 发送请求。
=======
    This method specifies the main parameters of the request:

    - `method` -- HTTP-method. Usually `"GET"` or `"POST"`.
    - `URL` -- the URL to request, a string, can be [URL](info:url) object.
    - `async` -- if explicitly set to `false`, then the request is synchronous, we'll cover that a bit later.
    - `user`, `password` -- login and password for basic HTTP auth (if required).

    Please note that `open` call, contrary to its name, does not open the connection. It only configures the request, but the network activity only starts with the call of `send`.

3. Send it out.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    ```js
    xhr.send([body])
    ```

<<<<<<< HEAD
    这个方法会建立连接，并将请求发送到服务器。可选参数 `body` 包含了 request body。

    一些请求方法，像 `GET` 没有 request body。还有一些请求方法，像 `POST` 使用 `body` 将数据发送到服务器。我们稍后会看到相应示例。

4. 监听 `xhr` 事件以获取响应。

    这三个事件是最常用的：
    - `load` —— 当请求完成（即使 HTTP 状态为 400 或 500 等），并且响应已完全下载。
    - `error` —— 当无法发出请求，例如网络中断或者无效的 URL。
    - `progress` —— 在下载响应期间定期触发，报告已经下载了多少。
=======
    This method opens the connection and sends the request to server. The optional `body` parameter contains the request body.

    Some request methods like `GET` do not have a body. And some of them like `POST` use `body` to send the data to the server. We'll see examples of that later.

4. Listen to `xhr` events for response.

    These three events are the most widely used:
    - `load` -- when the request is complete (even if HTTP status is like 400 or 500), and the response is fully downloaded.
    - `error` -- when the request couldn't be made, e.g. network down or invalid URL.
    - `progress` -- triggers periodically while the response is being downloaded, reports how much has been downloaded.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    ```js
    xhr.onload = function() {
      alert(`Loaded: ${xhr.status} ${xhr.response}`);
    };

<<<<<<< HEAD
    xhr.onerror = function() { // 仅在根本无法发出请求时触发
      alert(`Network Error`);
    };

    xhr.onprogress = function(event) { // 定期触发
      // event.loaded —— 已经下载了多少字节
      // event.lengthComputable = true，当服务器发送了 Content-Length header 时
      // event.total —— 总字节数（如果 lengthComputable 为 true）
=======
    xhr.onerror = function() { // only triggers if the request couldn't be made at all
      alert(`Network Error`);
    };

    xhr.onprogress = function(event) { // triggers periodically
      // event.loaded - how many bytes downloaded
      // event.lengthComputable = true if the server sent Content-Length header
      // event.total - total number of bytes (if lengthComputable)
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
      alert(`Received ${event.loaded} of ${event.total}`);
    };
    ```

<<<<<<< HEAD
下面是一个完整的示例。它从服务器加载 `/article/xmlhttprequest/example/load`，并打印加载进度：

```js run
// 1. 创建一个 new XMLHttpRequest 对象
let xhr = new XMLHttpRequest();

// 2. 配置它：从 URL /article/.../load GET-request
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. 通过网络发送请求
xhr.send();

// 4. 当接收到响应后，将调用此函数
xhr.onload = function() {
  if (xhr.status != 200) { // 分析响应的 HTTP 状态
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // 例如 404: Not Found
  } else { // 显示结果
    alert(`Done, got ${xhr.response.length} bytes`); // response 是服务器响应
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
    alert(`Done, got ${xhr.response.length} bytes`); // response is the server
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
  }

};

xhr.onerror = function() {
  alert("Request failed");
};
```

<<<<<<< HEAD
一旦服务器有了响应，我们可以在以下 `xhr` 属性中接收结果：

`status`
: HTTP 状态码（一个数字）：`200`，`404`，`403` 等，如果出现非 HTTP 错误，则为 `0`。

`statusText`
: HTTP 状态消息（一个字符串）：状态码为 `200` 对应于 `OK`，`404` 对应于 `Not Found`，`403` 对应于 `Forbidden`。

`response`（旧脚本可能用的是 `responseText`）
: 服务器 response body。

我们还可以使用相应的属性指定超时（timeout）：

```js
xhr.timeout = 10000; // timeout 单位是 ms，此处即 10 秒
```

如果在给定时间内请求没有成功执行，请求就会被取消，并且触发 `timeout` 事件。

````smart header="URL 搜索参数（URL search parameters）"
为了向 URL 添加像 `?name=value` 这样的参数，并确保正确的编码，我们可以使用 [URL](info:url) 对象：
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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');

<<<<<<< HEAD
// 参数 'q' 被编码
=======
// the parameter 'q' is encoded
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
xhr.open('GET', url); // https://google.com/search?q=test+me%21
```

````

<<<<<<< HEAD
## 响应类型

我们可以使用 `xhr.responseType` 属性来设置响应格式：

- `""`（默认）—— 响应格式为字符串，
- `"text"` —— 响应格式为字符串，
- `"arraybuffer"` —— 响应格式为 `ArrayBuffer`（对于二进制数据，请参见 <info:arraybuffer-binary-arrays>），
- `"blob"` —— 响应格式为 `Blob`（对于二进制数据，请参见 <info:blob>），
- `"document"` —— 响应格式为 XML document（可以使用 XPath 和其他 XML 方法），
- `"json"` —— 响应格式为 JSON（自动解析）。

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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js run
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

*!*
xhr.responseType = 'json';
*/!*

xhr.send();

<<<<<<< HEAD
// 响应为 {"message": "Hello, world!"}
=======
// the response is {"message": "Hello, world!"}
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hello, world!
};
```

```smart
<<<<<<< HEAD
在旧的脚本中，你可能会看到 `xhr.responseText`，甚至会看到 `xhr.responseXML` 属性。

它们是由于历史原因而存在的，以获取字符串或 XML 文档。如今，我们应该在 `xhr.responseType` 中设置格式，然后就能获取如上所示的 `xhr.response` 了。
```

## readyState

`XMLHttpRequest` 的状态（state）会随着它的处理进度变化而变化。可以通过 `xhr.readyState` 来了解当前状态。

[规范](https://xhr.spec.whatwg.org/#states) 中提到的所有状态如下：

```js
UNSENT = 0; // 初始状态
OPENED = 1; // open 被调用
HEADERS_RECEIVED = 2; // 接收到 response header
LOADING = 3; // 响应正在被加载（接收到一个数据包）
DONE = 4; // 请求完成
```

`XMLHttpRequest` 对象以 `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4` 的顺序在它们之间转变。每当通过网络接收到一个数据包，就会重复一次状态 `3`。

我们可以使用 `readystatechange` 事件来跟踪它们：
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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
<<<<<<< HEAD
    // 加载中
  }
  if (xhr.readyState == 4) {
    // 请求完成
=======
    // loading
  }
  if (xhr.readyState == 4) {
    // request finished
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
  }
};
```

<<<<<<< HEAD
你可能在非常老的代码中找到 `readystatechange` 这样的事件监听器，它的存在是有历史原因的，因为曾经有很长一段时间都没有 `load` 以及其他事件。如今，它已被 `load/error/progress` 事件处理程序所替代。

## 中止请求（Aborting）

我们可以随时终止请求。调用 `xhr.abort()` 即可：

```js
xhr.abort(); // 终止请求
```

它会触发 `abort` 事件，且 `xhr.status` 变为 `0`。

## 同步请求

如果在 `open` 方法中将第三个参数 `async` 设置为 `false`，那么请求就会以同步的方式进行。

换句话说，JavaScript 执行在 `send()` 处暂停，并在收到响应后恢复执行。这有点儿像 `alert` 或 `prompt` 命令。

下面是重写的示例，`open` 的第三个参数为 `false`：
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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
  alert("Request failed");
}
```

<<<<<<< HEAD
这看起来好像不错，但是很少使用同步调用，因为它们会阻塞页面内的 JavaScript，直到加载完成。在某些浏览器中，滚动可能无法正常进行。如果一个同步调用执行时间过长，浏览器可能会建议关闭“挂起（hanging）”的网页。

`XMLHttpRequest` 的很多高级功能在同步请求中都不可用，例如向其他域发起请求或者设置超时。并且，正如你所看到的，没有进度指示。

基于这些原因，同步请求使用的非常少，几乎从不使用。在这我们就不再讨论它了。

## HTTP-header

`XMLHttpRequest` 允许发送自定义 header，并且可以从响应中读取 header。

HTTP-header 有三种方法：

`setRequestHeader(name, value)`
: 使用给定的 `name` 和 `value` 设置 request header。

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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

<<<<<<< HEAD
    ```warn header="Header 的限制"
    一些 header 是由浏览器专门管理的，例如 `Referer` 和 `Host`。
    完整列表请见 [规范](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method)。

    为了用户安全和请求的正确性，`XMLHttpRequest` 不允许更改它们。
    ```

    ````warn header="不能移除 header"
    `XMLHttpRequest` 的另一个特点是不能撤销 `setRequestHeader`。

    一旦设置了 header，就无法撤销了。其他调用会向 header 中添加信息，但不会覆盖它。

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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

<<<<<<< HEAD
    // header 将是：
=======
    // the header will be:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
<<<<<<< HEAD
: 获取具有给定 `name` 的 header（`Set-Cookie` 和 `Set-Cookie2` 除外）。

    例如：
=======
: Gets the response header with the given `name` (except `Set-Cookie` and `Set-Cookie2`).

    For instance:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
<<<<<<< HEAD
: 返回除 `Set-Cookie` 和 `Set-Cookie2` 外的所有 response header。

    header 以单行形式返回，例如：
=======
: Returns all response headers, except `Set-Cookie` and `Set-Cookie2`.

    Headers are returned as a single line, e.g.:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    ```http
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

<<<<<<< HEAD
    header 之间的换行符始终为 `"\r\n"`（不依赖于操作系统），所以我们可以很容易地将其拆分为单独的 header。name 和 value 之间总是以冒号后跟一个空格 `": "` 分隔。这是标准格式。

    因此，如果我们想要获取具有 name/value 对的对象，则需要用一点 JavaScript 代码来处理它们。

    像这样（假设如果两个 header 具有相同的名称，那么后者就会覆盖前者）：
=======
    The line break between headers is always `"\r\n"` (doesn't depend on OS), so we can easily split it into individual headers. The separator between the name and the value is always a colon followed by a space `": "`. That's fixed in the specification.

    So, if we want to get an object with name/value pairs, we need to throw in a bit JS.

    Like this (assuming that if two headers have the same name, then the latter one overwrites the former one):
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

    ```js
    let headers = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return result;
      }, {});

    // headers['Content-Type'] = 'image/png'
    ```

<<<<<<< HEAD
## POST，FormData

要建立一个 POST 请求，我们可以使用内建的 [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) 对象。

语法为：

```js
let formData = new FormData([form]); // 创建一个对象，可以选择从 <form> 中获取数据
formData.append(name, value); // 附加一个字段
```

我们创建它，可以选择从一个表单中获取数据，如果需要，还可以 `append` 更多字段，然后：

1. `xhr.open('POST', ...)` —— 使用 `POST` 方法。
2. `xhr.send(formData)` 将表单发送到服务器。

例如：
=======
## POST, FormData

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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```html run refresh
<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
<<<<<<< HEAD
  // 从表单预填充 FormData
  let formData = new FormData(document.forms.person);

  // 附加一个字段
  formData.append("middle", "Lee");

  // 将其发送出去
=======
  // pre-fill FormData from the form
  let formData = new FormData(document.forms.person);

  // add one more field
  formData.append("middle", "Lee");

  // send it out
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

  xhr.onload = () => alert(xhr.response);
</script>
```

<<<<<<< HEAD
以 `multipart/form-data` 编码发送表单。

或者，如果我们更喜欢 JSON，那么可以使用 `JSON.stringify` 并以字符串形式发送。

只是，不要忘记设置 header `Content-Type: application/json`，只要有了它，很多服务端框架都能自动解码 JSON：
=======
The form is sent with `multipart/form-data` encoding.

Or, if we like JSON more, then `JSON.stringify` and send as a string.

Just don't forget to set the header `Content-Type: application/json`, many server-side frameworks automatically decode JSON with it:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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
`.send(body)` 方法就像一个非常杂食性的动物。它几乎可以发送任何 `body`，包括 `Blob` 和 `BufferSource` 对象。

## 上传进度

`progress` 事件仅在下载阶段触发。

也就是说：如果我们 `POST` 一些内容，`XMLHttpRequest` 首先上传我们的数据（request body），然后下载响应。

如果我们要上传的东西很大，那么我们肯定会对跟踪上传进度感兴趣。但是 `xhr.onprogress` 在这里并不起作用。

这里有另一个对象，它没有方法，它专门用于跟踪上传事件：`xhr.upload`。

它会生成事件，类似于 `xhr`，但是 `xhr.upload` 仅在上传时触发它们：

- `loadstart` —— 上传开始。
- `progress` —— 上传期间定期触发。
- `abort` —— 上传中止。
- `error` —— 非 HTTP 错误。
- `load` —— 上传成功完成。
- `timeout` —— 上传超时（如果设置了 `timeout` 属性）。
- `loadend` —— 上传完成，无论成功还是 error。

handler 示例：
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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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
这是一个真实示例：带有进度指示的文件上传：
=======
Here's a real-life example: file upload with progress indication:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

<<<<<<< HEAD
  // 跟踪上传进度
=======
  // track upload progress
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };
*/!*

<<<<<<< HEAD
  // 跟踪完成：无论成功与否
=======
  // track completion: both successful or not
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
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
## 跨源请求

`XMLHttpRequest` 可以使用和 [fetch](info:fetch-crossorigin) 相同的 CORS 策略进行跨源请求。

就像 `fetch` 一样，默认情况下不会将 cookie 和 HTTP 授权发送到其他域。要启用它们，可以将 `xhr.withCredentials` 设置为 `true`：
=======
## Cross-origin requests

`XMLHttpRequest` can make cross-origin requests, using the same CORS policy as [fetch](info:fetch-crossorigin).

Just like `fetch`, it doesn't send cookies and HTTP-authorization to another origin by default. To enable them, set `xhr.withCredentials` to `true`:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```

<<<<<<< HEAD
有关跨源 header 的详细信息，请见 <info:fetch-crossorigin> 一章。


## 总结

使用 `XMLHttpRequest` 的 GET 请求的典型代码：
=======
See the chapter <info:fetch-crossorigin> for details about cross-origin headers.


## Summary

Typical code of the GET-request with `XMLHttpRequest`:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP error?
<<<<<<< HEAD
    // 处理 error
=======
    // handle error
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
    alert( 'Error: ' + xhr.status);
    return;
  }

<<<<<<< HEAD
  // 获取来自 xhr.response 的响应
};

xhr.onprogress = function(event) {
  // 报告进度
=======
  // get the response from xhr.response
};

xhr.onprogress = function(event) {
  // report progress
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
<<<<<<< HEAD
  // 处理非 HTTP error（例如网络中断）
};
```

实际上还有很多事件，在 [现代规范](http://www.w3.org/TR/XMLHttpRequest/#events) 中有详细列表（按生命周期排序）：

- `loadstart` —— 请求开始。
- `progress` —— 一个响应数据包到达，此时整个 response body 都在 `response` 中。
- `abort` —— 调用 `xhr.abort()` 取消了请求。
- `error` —— 发生连接错误，例如，域错误。不会发生诸如 404 这类的 HTTP 错误。
- `load` —— 请求成功完成。
- `timeout` —— 由于请求超时而取消了该请求（仅发生在设置了 timeout 的情况下）。
- `loadend` —— 在 `load`，`error`，`timeout` 或 `abort` 之后触发。

`error`，`abort`，`timeout` 和 `load` 事件是互斥的。其中只有一种可能发生。

最常用的事件是加载完成（`load`），加载失败（`error`），或者我们可以使用单个 `loadend` 处理程序并检查请求对象 `xhr` 的属性，以查看发生了什么。

我们还了解了另一个事件：`readystatechange`。由于历史原因，它早在规范制定之前就出现了。如今我们已经无需使用它了，我们可以用新的事件代替它，但通常可以在旧的代码中找到它。

如果我们需要专门跟踪上传，那么我们应该在 `xhr.upload` 对象上监听相同的事件。
=======
  // handle non-HTTP error (e.g. network down)
};
```

There are actually more events, the [modern specification](http://www.w3.org/TR/XMLHttpRequest/#events) lists them (in the lifecycle order):

- `loadstart` -- the request has started.
- `progress` -- a data packet of the response has arrived, the whole response body at the moment is in `response`.
- `abort` -- the request was canceled by the call `xhr.abort()`.
- `error` -- connection error has occurred, e.g. wrong domain name. Doesn't happen for HTTP-errors like 404.
- `load` -- the request has finished successfully.
- `timeout` -- the request was canceled due to timeout (only happens if it was set).
- `loadend` -- triggers after `load`, `error`, `timeout` or `abort`.

The `error`, `abort`, `timeout`, and `load` events are mutually exclusive. Only one of them may happen.

The most used events are load completion (`load`), load failure (`error`), or we can use a single `loadend` handler and check the properties of the request object `xhr` to see what happened.

We've already seen another event: `readystatechange`. Historically, it appeared long ago, before the specification settled. Nowadays, there's no need to use it, we can replace it with newer events, but it can often be found in older scripts.

If we need to track uploading specifically, then we should listen to same events on `xhr.upload` object.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
