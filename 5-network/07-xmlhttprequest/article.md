# XMLHttpRequest

`XMLHttpRequest` 是 JavaScript 中发送 HTTP 请求的浏览器内置对象。

虽然它的名字里面有“XML”，但它可以操作任何数据，而不仅仅是 XML 格式。我们可以用它来上传/下载文件，跟踪进度等等。

今天，我们有一个更现代地方式叫做 `fetch`，它开始抛弃 `XMLHttpRequest`。

在现代 web 开发中，出于以下三种原因，我们可能会用 `XMLHttpRequest`：

1. 历史原因：我们需要使用 `XMLHttpRequest` 支持现有脚本。
2. 我们需要兼容老旧的浏览器，并且不想用 polyfills（例如为了让脚本更小）。
3. 我们需要一些 `fetch` 目前无法做到的事情，比如追踪上传进度。

## 基本流程



## 异步 XMLHttpRequest

XMLHttpRequest 有两种作用模式：同步和异步。

首先我们先看看最常用的异步形式。

如下代码实现了加载服务器地址 `/article/xmlhttprequest/hello.txt` 并且把内容显示在屏幕上：

```js run
*!*
// 1. Create a new XMLHttpRequest object
*/!*
let xhr = new XMLHttpRequest();

*!*
// 2. Configure it: GET-request for the URL /article/.../hello.txt
xhr.open('GET', '/article/xmlhttprequest/hello.txt');
*/!*

*!*
// 3. Send the request over the network
*/!*
xhr.send();

*!*
// 4. This will be called after the response is received
*/!*
xhr.onload = function() {
  if (xhr.status != 200) { // analyze HTTP status of the response
    // if it's not 200, consider it an error
    alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
  } else {
    // show the result
    alert(xhr.responseText); // responseText is the server response
  }
};
```

如你所见，`XMLHttpRequest` 有很多方法。我们来逐个讲解。

## 建立：“open”

语法：
```js
xhr.open(method, URL, async, user, password)
```

这个方法通常紧接着 `new XMLHttpRequest` 后面调用。它指定了请求的以下几个主要参数：

- `method` — HTTP 方法。通常使用 `"GET"` 或者 `"POST"`，但我们也可以使用 TRACE/DELETE/PUT 等等。
- `URL` — 请求地址。可以使用任何路径和协议，但是有“同源策略”的限制。在当前页面我们可以使用形如 `protocol://domain:port` 格式发起任何请求，但是其他的地址是默认“禁止”的（除非实现了特殊的 HTTP-headers，我们将在后续章节详细介绍 [todo]）。
- `async` — 如果第三个参数显式地设置为 `false`，那么该请求就是同步的，否则就是异步的。我们会在这一章后续详细讲解。
- `user`，`password` — 登录和密码是基本的 HTTP 验证（如果必要的话）。

请注意 `open` 的调用，和它的名字相反，并没有开启连接。它只配置了请求，而网络请求仅在 `send` 调用时开始。

## 把它发送出去：“send”

语法：
```js
xhr.send([body])
```

这个方法开启连接并且把请求发送到服务端。可选参数 `body` 包含了请求体。有些请求没有 body 比如 `GET`。而有些请求通过 `body` 发送数据比如 `POST`。在下一章里我们可以看到一些 body 的例子。

## 取消：abort 和 timeout

如果我们改变主意，我们可以在任何时候中断请求。调用 `xhr.abort()` 即可：

```js
xhr.abort(); // terminate the request
```

我们可以通过相应的属性指定超时时间：

```js
xhr.timeout = 10000;
```

timeout 单位是毫秒。如果请求在指定时间内没有成功，它就会自动取消。

## 事件：onload，onerror 等

请求默认是异步的。换句话说，浏览器发送请求并且允许其他 JavaScript 代码执行。

请求发送后，`xhr` 开始产生事件。我们可以使用 `addEventListener` 或者 `on<event>` 属性来处理事件，就像监听 DOM 对象一样。

现代[规范](https://xhr.spec.whatwg.org/#events)列出了如下事件：

- `loadstart` — 请求开始。
- `progress` — 浏览器接收数据包（会进行多次）。
- `abort` — 通过 `xhr.abort()` 中止请求。
- `error` — 出现网络错误，请求失败。
- `load` — 请求成功，未发生错误。
- `timeout` — 请求因超时取消（如果设置了 timeout）。
- `loadend` — 请求完成（有无错误皆可）。
- `readystatechange` — 请求状态发生改变（后面会提到）。

使用这些事件我们可以追踪加载成功（`onload`），失败（`onerror`）和载入的数据量（`onprogress`）。

请注意这里说的错误是“通讯错误”。也就是说，如果连接丢失或者远程服务器根本没有响应 — 那么对 XMLHttpRequest 而言就是错误。负面的 HTTP 状态如 500 或者 404 不被认为是错误。

这里有包括错误和超时的更加全面的例子：

```html run
<script>
  function load(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.timeout = 1000;
    xhr.send();

    xhr.onload = function() {
      alert(`Loaded: ${this.status} ${this.responseText}`);
    };

    xhr.onerror = () => alert('Error');

    xhr.ontimeout = () => alert('Timeout!');
  }
</script>

<button onclick="load('/article/xmlhttprequest/hello.txt')">Load</button>
<button onclick="load('/article/xmlhttprequest/hello.txt?speed=0')">Load with timeout</button>
<button onclick="load('no-such-page')">Load 404</button>
<button onclick="load('http://example.com')">Load another domain</button>
```

1. 第一个按钮仅触发 `onload` 正常加载 `hello.txt` 文件。
2. 第二个按钮加载一个非常慢的 URL，因此仅会调用 `ontimeout`（因为设置了 `xhr.timeout`）。
3. 第三个按钮加载一个不存在的 URL，但是也会调用 `onload`（“加载：404”），因为没有网络错误。
4. 最后一个按钮试图加载其他域名的页面，除非远程服务器通过发送特定的 headers （后面会提到）明确地允许加载，否则这是被禁止的，因此这里会执行 `onerror`。`onerror` 处理器在另一种情况下也会被触发，那就是我们发起请求，然后切断我们设备的网络连接。

## 响应：status、responseText 及其他

一旦服务端响应，我们可以接收带有如下属性的请求结果：

`status`
: HTTP 状态码：`200`、`404`、`403` 等。如果有错误的话也可以是 `0`。

`statusText`
: HTTP 状态信息：通常 `200` 代表`成功`，`404` 代表`未找到`，`403` 代表`被禁止`等等。

`responseText`
: 服务器响应文本，

如果服务器返回 XML 带有正确的 header `Content-type: text/xml`，那么也会有 `responseXML` 属性带有解析过的 XML 文档。你可以用 `xhr.responseXml.querySelector("...")` 查询以及执行其他特定的 XML 操作。

但那很少用到，因为大多数时候服务器返回的是 JSON。我们可以用 `JSON.parse(xhr.responseText)` 解析。

## 同步和异步请求

如果 `open` 方法第三个参数 `async` 被设为 `false`，请求就是同步的。

换句话讲，Javascript 在该行暂停执行，等待接收响应后继续。有点像 `alert` 或 `prompt` 命令。

同步调用很少用到，因为这会阻止页面内的 Javascript 执行直到请求加载完成。在一些浏览器里，用户无法滚动页面。

```js
// Synchronous request
xhr.open('GET', 'phones.json', *!*false*/!*);

// Send it
xhr.send();
*!*
// ...JavaScript "hangs" and waits till the request is complete
*/!*
```

如果同步调用耗用太长时间，浏览器可能会建议关闭“挂起的”页面。

而且，因为阻塞，无法同时发起两个请求。进一步看，我们需注意一些 `XMLHttpRequest` 的高级功能，如请求其他域名或者指定超时时间，对同步请求来讲是不可用的。

基于上述原因，同步请求很少用到，几乎从来不用。

默认情况下，请求是异步的。

同理请求异步发起：

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', 'phones.json'); // the third parameter is true by default

xhr.send(); // (1)

*!*
xhr.onreadystatechange = function() { // (3)
  if (xhr.readyState != 4) return;
*/!*

  button.innerHTML = 'Complete!';

  if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    alert(xhr.responseText);
  }

}

button.innerHTML = 'Loading...'; // (2)
button.disabled = true;
```

现在 `open` 里面没有第三个参数（或者如果我们显式设置它为 `true`），那么请求就是异步的。也就是说，在 `(1)` 行调用 `xhr.send()` 后，Javascript 并不会“挂起”，而是继续执行。

在这个例子中，意味着 `(2)` 会显示 "loading" 信息。

然后，在那之后，接收到结果时，会来到 `(3)` 的事件处理，我们稍后会讲到。

```online
The full example in action:

[codetabs src="phones-async"]
```

# 事件 "readystatechange"

在发送请求和接收响应时 `readystatechange` 事件会多次响应。

顾名思义，`XMLHttpRequest` 有 "ready state"。可以通过 `xhr.readyState` 访问。

在上面的例子中我们仅使用了状态 `4`（请求完成），但还有其他状态。

完整的状态，在[规范](http://www.w3.org/TR/XMLHttpRequest/#states)中有：

```js
const unsigned short UNSENT = 0; // initial state
const unsigned short OPENED = 1; // open called
const unsigned short HEADERS_RECEIVED = 2; // response headers received
const unsigned short LOADING = 3; // response is loading (a data packed is received)
const unsigned short DONE = 4; // request complete
```

`XMLHttpRequest` 以 `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4` 的顺序改变状态。每次通过网络接收数据包状态都会重置为 `3`。

上面的例子演示了这些状态。服务器通过每秒发送一个数字 `1000` 的字符串来回应请求 `digits`。

[codetabs src="readystate"]

```warn header="Packets may break at any byte"
有人可能会想 `readyState=3`（下一个数据包被接收）允许我们在 `responseText` 中获取当前（并非全部）响应体。

那是对的。但有些片面。

技术上，我们无法控制网络数据包之间的断点。许多语言使用 UTF-8 等多字节编码，即一个字符代表多个字节。有些字符只使用 1 个字节，有些使用 2 个或更多。数据包可能会*在字符中间分割*。

例如，字符 `ö` 是用两个字节编码。其中第一个可能在一个数据包的末尾，第二个 — 在下一个数据包的开头。

因此，在 `readyState` 期间，在 `responseText` 的末尾会有一个半字符字节。这可能会导致问题。在一些简单场景下，当我们只使用拉丁字符和数字时（它们都用 1 个字节编码），这种事情不会发生，但是在其他场景，这就可能是导致 bug 的源头。
```

## HTTP-headers

`XMLHttpRequest` 允许发送自定义 headers 和从响应中读取 headers。

HTTP-headers 有 3 种方法：

`setRequestHeader(name, value)`
: 通过指定 `name` 和 `value` 设置请求头。

    Например:

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="Headers limitations"
    有些 headers 只能由浏览器管理，比如 `Referer` 和 `Host`。
    完整的列表在[规范](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method)中。

    为了用户安全和请求的正确性，XMLHttpRequest 不允许更改它们。
    ```

    ````warn header="Can't remove a header"
    `XMLHttpRequest` 的另一个特性就是无法撤消 `setRequestHeader`。

    一旦设置了 header，它就被设置了。额外的调用会给 header 添加信息，而不会覆盖它。

    例如：

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // the header will be:
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
: 通过给定 `name` 获取响应头（除了 `Set-Cookie` 和 `Set-Cookie2`）。

    例如：

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: 返回全部响应头，除了 `Set-Cookie` 和 `Set-Cookie2`。

    Headers 以单行返回，例如：
    
    ```
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    headers 的换行符始终是 `"\r\n"`（不依赖操作系统），所以我们可以轻松地将其拆分为单独的 headers。名称和值之间的分隔符始终是冒号，后跟空格 `": "`。这在规范中已得到修复。

    所以，如果我们想要获得具有名称/值对的对象，我们需要写一点 JS。

    就像这样（假设两个 headers 有同样的名称，那么后面的就会覆盖前面的）：

    ```js
    let headers = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return acc;
      }, {});
    ```

## Timeout

异步请求 `timeout` 属性可以被设置的最长持续时间：

```js
xhr.timeout = 30000; // 30 seconds (in milliseconds)
```

如果请求超过该时长，它就会中止，并生成 `timeout` 事件：

```js
xhr.ontimeout = function() {
  alert( 'Sorry, the request took too long.' );
}
```

## 完整的事件列表

[现代规范](http://www.w3.org/TR/XMLHttpRequest/#events)列出了如下事件（按照生命周期顺序）：

- `loadstart` — 请求开始。
- `progress` — 响应数据包到达，此时整个响应体都在 `responseText` 中。
- `abort` — 通过调用 `xhr.abort()` 取消请求。
- `error` — 连接发送错误，例如域名错误。对于像 404 这样的 HTTP 错误不会发生。
- `load` — 请求成功完成。
- `timeout` — 请求超时结束（只有当我们设置超时才会发生）。
- `loadend` — 请求完成（不管成功还是失败）。

用到最多的事件是加载完成（`onload`）、加载失败（`onerror`）和跟踪进程 `onprogress`。

我们已经看过另一个事件：`readystatechange`。从历史上看，它在规范创建之前就出现了。如今，没有必要使用它，我们可以用更新的事件代替它，但通常可以在较旧的脚本中发现它。

## 总结

`XMLHttpRequest` GET 请求的典型代码：

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  // we can check
  // status, statusText - for response HTTP status
  // responseText, responseXML (when content-type: text/xml) - for the response

  if (this.status != 200) {
    // handle error
    alert( 'error: ' + this.status);
    return;
  }

  // get the response from this.responseText
};

xhr.onerror = function() {
  // handle error
};
```

Мы разобрали следующие методы `XMLHttpRequest`:

- `open(method, url, async, user, password)`
- `send(body)`
- `abort()`
- `setRequestHeader(name, value)`
- `getResponseHeader(name)`
- `getAllResponseHeaders()`

Свойства `XMLHttpRequest`:

- `timeout`
- `responseText`
- `responseXML`
- `status`
- `statusText`

事件：

- `onreadystatechange`
- `ontimeout`
- `onerror`
- `onload`
- `onprogress`
- `onabort`
- `onloadstart`
- `onloadend`
