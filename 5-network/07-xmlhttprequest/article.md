# XMLHttpRequest

`XMLHttpRequest` 是 JavaScript 中发送 HTTP 请求的浏览器内置对象。

虽然它的名字里面有“XML”，但它可以操作任何数据，而不仅仅是 XML 格式。我们可以用它来上传/下载文件，跟踪进度等等。

现如今，我们有一个更为现代的方式叫做 `fetch`，它开始抛弃 `XMLHttpRequest`。

在现代 web 开发中，出于以下三种原因，我们可能会用 `XMLHttpRequest`：

1. 历史原因：我们需要使用 `XMLHttpRequest` 支持现有脚本。
2. 我们需要兼容老旧的浏览器，并且不想用 polyfills（例如为了让脚本更小）。
3. 我们需要一些 `fetch` 目前无法做到的事情，比如追踪上传进度。

这些术语听起来都很熟悉是么？如果是那么请继续阅读下面 `XMLHttpRequest` 内容。如果还不是很熟悉的话，那么请先阅读关于 <info:fetch-basics> 的基础内容。

## 基本流程

XMLHttpRequest 有两种执行模式：同步（synchronous） 和 异步（asynchronous）。

我们首先来看看最常用的异步模式：

我们需要 3 个步骤来发送请求：

1. 创建 `XMLHttpRequest`。
    ```js
    let xhr = new XMLHttpRequest(); // 没有参数
    ```

2. 初始化 `XMLHttpRequest`。
    ```js
    xhr.open(method, URL, [async, user, password])
    ```

    通常在 `new XMLHttpRequest` 之后首先调用这个函数。它指定了请求的主要参数：

    - `method` -- HTTP 方法。通常是 `“GET”` 或者 `“POST”`。
    - `URL` -- 请求的 URL。
    - `async` -- 如果显式的设置为 `false`，那么请求将会以同步的方式处理，我们稍后会讨论它。
    - `user`, `password` -- 基本的 HTTP 身份验证（如果需要的话）的登录名和密码。

    请注意。`open` 并非其字面意思，调用它的时候并不会建立连接。它的作用仅仅是作为当前请求的配置，而网络活动要到 `send` 调用后才开启。

3. 发送请求。

    ```js
    xhr.send([body])
    ```

    这个方法打开连接，并发送请求到服务器。可选参数 `body` 包含了请求主体。

    有些请求方式，比如 `GET` 没有请求体。而像 `POST` 这类请求方式会用 `body` 来发送数据到服务器。我们稍后会看到一些示例。

4. 监听响应事件。

    这三个事件是最常用的：
    - `load` -- 当请求结果已经就绪，包括像 404 这样的 HTTP 错误。
    - `error` -- 当无法发送请求时，比如网络中断或者无效的 URL。
    - `progress` -- 下载期间定时触发，报告已经下载了多少。

    ```js
    xhr.onload = function() {
      alert(`Loaded: ${xhr.status} ${xhr.response}`);
    };

    xhr.onerror = function() { // 只有在请求无法建立时才会触发
      alert(`Network Error`);
    };

    xhr.onprogress = function(event) { // 定时触发
      // event.loaded - 已经下载了多少字节
      // event.lengthComputable = true 当服务器发送了 Content-Length 响应头时
      // event.total - 总字节数（如果 lengthComputable 为 true）
      alert(`Received ${event.loaded} of ${event.total}`);
    };
    ```

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
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    alert(`Received ${event.loaded} bytes`); // 没有 Content-Length
  }

};

xhr.onerror = function() {
  alert("Request failed");
};
```

一旦服务器有了响应，我们可以在下面这些请求对象的属性中接收结果：

`status`
：HTTP 状态码（一个数字）：`200`，`404`，`403` 等等，如果的是非 HTTP 错误，它的结果为 `0`。

`statusText`
：HTTP 状态消息（字符串）：如果状态码是 `200` 的话其消息通常为 `OK`，`404` 的消息是 `Not Found`，`403` 的消息是 `Forbidden`。

`response`（以前的脚本可能用的是 `responseText`）
：服务器响应。

如果我们改变注意，我们可以随时更改请求。`xhr.abort()` 调用可以做到：

```js
xhr.abort(); // terminate the request
```

它触发 `abort` 事件。

我们还可以使用相应的属性设置超时时间：

```js
xhr.timeout = 10000; // timeout 单位是 ms，10 秒
```

在给定时间内，如果请求没有成功，`timeout` 事件触发并且请求被取消。

## 响应类型

我们可以使用 `xhr.responseType` 属性来设置响应格式：

- `""` （默认） —— 响应格式为字符串，
- `"text"` —— 响应格式为字符串，
- `"arraybuffer"` —— 响应格式为 `ArrayBuffer`（对于二进制数据，请参见 <info:arraybuffer-binary-arrays>），
- `"blob"` -- 响应格式为 `Blob`（对于二进制数据，请参见 <info:blob>），
- `"document"` -- 响应格式为 XML document（可以使用 XPath 和其他 XML 方法），
- `"json"` -- 响应格式为 JSON（自动解析）。

例如，我们以 JSON 格式获取响应：

```js run
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

*!*
xhr.responseType = 'json';
*/!*

xhr.send();

// 响应数据为 {"message": "Hello, world!"}
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hello, world!
};
```

```smart
在旧的脚本中，你可能会看到 `xhr.responseText` 甚至是 `xhr.responseXML` 属性。

它们的存在是基于一些历史原因，用以获取字符串或者 XML 文档。现今，我们应该设置格式为 `xhr.responseType`，然后就能获取如上所示的 `xhr.response` 了。
```

## 准备状态（Ready states）

`XMLHttpRequest` 的状态（states）会随着它的处理进度变化而变化。当前状态可以用 `xhr.readyState` 来访问。

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

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
    // 加载
  }
  if (xhr.readyState == 4) {
    // 请求完成
  }
};
```

同样是基于历史原因，在非常老的代码中，你会发现它们使用的是 `readystatechange`。

如今，它们已被 `load/error/progress` 事件处理器替代。

## 同步请求

在 `open` 方法中，如果第三个参数 `async` 被设置为 `false`，那么请求就以同步的方式处理。

换句话说就是在 `send()` 阶段 JavaScript 停止执行，并且等到响应被接收时才继续执行剩余的代码。这有点儿像 `alert` 或 `prompt` 命令。

下面重写上面的例子，第 3 个参数 `open` 设置为 `false`：

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
} catch(err) { // 代替 onerror
  alert("Request failed");
};
```

它可能看起来很不错，但是同步调用很少使用，因为它们会阻塞页面内（in-page）的 JavaScript 直到加载完成。在一些浏览器中，滚动可能无法正常运行。如果一个同步调用执行很长时间，浏览器可能会建议关闭关闭“挂起”（hanging）的页面。

`XMLHttpRequest` 的许多高级功能在同步请求中都无效，比如向其他域发起请求或者设置超时时间。同时，你也可以看到，它们没有进度指示。

基于这些原因，同步请求使用的非常少，几乎是不使用。在此，我们不再讨论它了。

## HTTP 头（HTTP-headers）

`XMLHttpRequest` 允许发送自定义请求头，并且可以读取服务器发送过来的响应头。

HTTP-headers 有三种方法：

`setRequestHeader(name, value)`
：通过给定的 `name` 和 `value` 设置请求头。

    例如：

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="Headers 的限制"
    一些请求头可能由浏览器专门管理，比如，`Referer` 和 `Host`。
    参见 [规范](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method) 以获取更多信息。

    为了用户安全和请求的正确性 XMLHttpRequest 不允许修改它们，
    ```

    ````warn header="不能移除 header"
    `XMLHttpRequest` 的另一个特点是无法撤销 `setRequestHeader`。

    一旦请求头被设置。它就无法撤销。其他的调用会向请求头中添加信息，但不会覆盖它们。

    例如：

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // 请求头可能是：
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
：通过给定的 `name` 来获取响应头（除了 `Set-Cookie` 和 `Set-Cookie2`）。

    例如：

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
：返回除 `Set-Cookie` 和 `Set-Cookie2` 外的所有响应头。

    响应头以单行形式返回：形如：

    ```
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    响应头中的换行符总是 `"\r\n"`（不依赖于操作系统），所以我们可以很轻易地将其分割成单一的头。name 和 value 之间总是会以冒号后跟空格 `": "` 分隔开。这在规范中已经得到修复。

    因此，如果我们想要获取具有 name/value 对的对象，我们用一点点 JS 代码来处理它们。
    就像这样（假设有两个标题具有相同的名称，那么后者会覆盖前者）：

    ```js
    let headers = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return result;
      }, {});
    ```

## POST, FormData

要建立 POST 请求，我们可以使用内置的 [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) 对象。

语法为：

```js
let formData = new FormData([form]); // 创建对象，可以以 <form> 来填充
formData.append(name, value); // 追加一个字段
```

如果需要，可以从表单中创建它，追加一个字段，然后：

1. `xhr.open('POST', ...)` – 使用 `POST` 方法。
2. `xhr.send(formData)` 发送表单到服务器。

例如：

```html run
<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
  // 从表单中预填充 FormData
  let formData = new FormData(document.forms.person);

  // 追加更多字段
  formData.append("middle", "Lee");

  // 发送它
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

</script>
```

表单以 `multipart/form-data` 编码发送。

或者，如果我们更喜欢 JSON，那么可以使用 `JSON.stringify` 并以字符串形式发送。

不过，不要忘记设置请求头 `Content-Type: application/json` 哦。许多服务端框架都能自动解码 JSON：

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

`.send(body)` 方法就像一个非常杂食性的动物。它可以发送几乎所有内容，包括 Blob 和 BufferSource 对象。

## 上传进度（Upload progress）

`progress` 事件仅仅在下载状态下工作。

也就是说：如果 `POST` 一些内容，`XMLHttpRequest` 首先上传我们的数据，然后下载响应数据。

如果我们正在上传的文件很大，这时我们肯定对追踪上传进度感兴趣。但是 `progress` 事件在这里并不起作用。

这里有个其他对象 `xhr.upload`，没有方法，专门用于上传事件。

这是其属性列表：

- `loadstart` —— 上传开始。
- `progress` —— 上传期间定期触发。
- `abort` —— 上传终止。
- `error` —— 非 HTTP 错误。
- `load` —— 上传成功完成。
- `timeout` —— 上传超时（如果设置了 `timeout` 属性）。
- `loadend` —— 上传操作完成，可能成功也可能失败。

handlers 示例:

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

下面是个应用示例：带有进度指示的文件上传：

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // 追踪上传进度
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };
*/!*

  // 跟踪完成：不论成功与否
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

## 跨域请求（Cross-origin requests）

`XMLHttpRequest` 可以使用和 [fetch](info:fetch-crossorigin) 相同的跨域资源共享（CORS）策略建立跨域请求。

类似于 `fetch`，默认情况下不会发送 cookies 和 HTTP 认证到其他域。如果要使用它们请设置 `xhr.withCredentials` 值为 `true`：

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```


## 总结

使用 `XMLHttpRequest` GET 方式请求数据的典型代码：

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send(); // 对于 POST，可以发送 string 或 FormData

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP 出错？
    // 处理错误
    alert( 'Error: ' + xhr.status);
    return;
  }

  // 从 xhr.response 中获取响应
};

xhr.onprogress = function(event) {
  // 报告进度
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
  // 处理非 HTTP 错误（如网络中断）
};
```

实际上还有更多事件，[现代规范](http://www.w3.org/TR/XMLHttpRequest/#events)中列出了它们（按生命周期排序）：

- `loadstart` —— 请求开始。
- `progress` —— 响应的数据包到达，此时整个响应体都在 `responseText` 里。
- `abort` —— 请求被 `xhr.abort()` 取消。
- `error` —— 发生连接错误，例如，域名错误。不会响应诸如 404 这类的 HTTP 错误。
- `load` —— 请求成功完成。
- `timeout` —— 请求超时被取消（仅仅发生在 timeout 被设置的情况下）。
- `loadend` —— 请求完成（可能成功也可能失败）。

最常用的事件是加载完成（`load`），加载失败（`error`）以及用来处理进度的 `progress`。

我们还了解了一些其他事件：`readystatechange`。由于历史原因，它在规范建立之前就已经出现。现如今已经没有必要使用他们了，我们可以用新的事件代替它，但是在旧的代码中仍然比较常见。

如果我们需要专门追踪上传，那么我们需要在 `xhr.upload` 对象上监听同样的事件。
