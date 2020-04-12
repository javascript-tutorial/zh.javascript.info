# WebSocket

在 [RFC 6455](http://tools.ietf.org/html/rfc6455) 规范中描述的 `WebSocket` 协议提供了一种在浏览器和服务器之间建立持久连接来交换数据的方法。数据可以作为“数据包”在两个方向上传递，而不会断开连接和其他 HTTP 请求。

对于需要连续数据交换的服务，例如网络游戏，实时交易系统等，WebSocket 尤其有用。

## 一个简单例子

要打开一个 Websocket 连接，我们需要在 url 中使用特殊的协议 `ws` 创建 `new WebSocket`：

```js
let socket = new WebSocket("*!*ws*/!*://javascript.info");
```

同样也有一个加密的 `wss://` 协议。类似于 Websocket 中的 HTTPS。

```smart header="始终使用 `wss://`"
`wss://` 协议不仅能加密，而且更可靠。

因为 `ws://` 数据不是加密的，对于任何中间人来说其数据都是可见的。并且，旧的代理服务器不了解 WebSocket，它们可能会因为看到“奇怪的” header 而中止连接。

另一方面，`wss://` 是基于 TLS 的 WebSocket，类似于 HTTPS 是基于 TLS 的 HTTP），传输安全层在发送方对数据进行了加密，在接收方进行解密。因此，数据包是通过代理加密传输的。它们看不到传输的里面的内容，且会让这些数据通过。
```

一旦 socket 被建立，我们就应该监听 socket 上的事件。一共有 4 个事件：
- **`open`** —— 连接已建立，
- **`message`** —— 接收到数据，
- **`error`** —— Websocket 错误，
- **`close`** —— 连接已关闭。

……如果我们想发送一些东西，那么可以使用 `socket.send(data)`。

这是一个示例：

```js run
let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

socket.onopen = function(e) {
  alert("[open] Connection established");
  alert("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  alert(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {  
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // 例如服务器进程被杀死或网络中断
    // 在这种情况下，event.code 通常为 1006
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};
```

出于演示目的，在上面的示例中，运行着一个用 Node.js 写的小型服务器 [server.js](demo/server.js)。它响应为 "Hello from server, John"，然后等待 5 秒，关闭连接。

所以你看到的事件顺序为：`open` -> `message` -> `close`。

这就是 WebSocket，我们已经可以使用 WebSocket 通信了。很简单，不是吗？

现在让我们更深入地学习它。

## 建立 WebSocket

当 `new WebSocket(url)` 被创建后，它将立即开始连接。

在连接期间，浏览器（使用 header）问服务器：“你支持 Websocket 吗？”如果服务器回复说“我支持”，那么通信就以 Websocket 协议继续进行，该协议根本不是 HTTP。

![](websocket-handshake.svg)

这是由 `new WebSocket("wss://javascript.info/chat")` 发出的请求的浏览器 header 示例。

```
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```

- `Origin` —— 客户端页面的源，例如 `https://javascript.info`。WebSocket 对象是原生支持跨源的。没有特殊的 header 或其他限制。旧的服务器无法处理 WebSocket，因此不存在兼容性问题。但是 `Origin` header 很重要，因为它允许服务器决定是否使用 WebSocket 与该网站通信。
- `Connection: Upgrade` —— 表示客户端想要更改协议。
- `Upgrade: websocket` —— 请求的协议是 "websocket"。
- `Sec-WebSocket-Key` —— 浏览器随机生成的安全密钥。
- `Sec-WebSocket-Version` —— WebSocket 协议版本，当前为 13。

```smart header="无法模拟 WebSocket 握手"
我们不能使用 `XMLHttpRequest` 或 `fetch` 来进行这种 HTTP 请求，因为不允许 JavaScript 设置这些 header。
```

如果服务器同意切换为 WebSocket 协议，服务器应该返回响应代码 101：

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
```

这里 `Sec-WebSocket-Accept` 是 `Sec-WebSocket-Key`，是使用特殊的算法重新编码的。浏览器使用它来确保响应与请求相对应。

然后，就使用 WebSocket 协议传输数据，我们很快就会看到它的结构（"frames"）。它根本不是 HTTP。

### 扩展和子协议

WebSocket 可能还有其他 header，`Sec-WebSocket-Extensions` 和 `Sec-WebSocket-Protocol`，它们描述了扩展和子协议。

例如：

- `Sec-WebSocket-Extensions: deflate-frame` 表示浏览器支持数据压缩。扩展与传输数据有关，扩展了 WebSocket 协议的功能。`Sec-WebSocket-Extensions` header 有浏览器自动发送，其中包含其支持的所有扩展的列表。

- `Sec-WebSocket-Protocol: soap, wamp` 表示我们不仅要传输任何数据，还要传输 [SOAP](http://en.wikipedia.org/wiki/SOAP) 或 WAMP（"The WebSocket Application Messaging Protocol"）协议中的数据。WebSocket 子协议已经在 [IANA catalogue](http://www.iana.org/assignments/websocket/websocket.xml) 中注册。

    这个可选的 header 是使用 `new WebSocket` 的第二个参数设置的。它是子协议数组，例如，如果我们想使用 SOAP 或 WAMP：

    ```js
    let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
    ```

服务器应该使用同意使用的协议和扩展的列表进行响应。

例如，这个请求：

```
GET /chat
Host: javascript.info
Upgrade: websocket
Connection: Upgrade
Origin: https://javascript.info
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
*!*
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap, wamp
*/!*
```

响应：

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
*!*
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap
*/!*
```

在这里服务器响应 —— 它支持扩展 "deflate-frame"，并且仅支持所请求的子协议中的 SOAP。

## 数据传输

WebSocket 通信由 "frames"（即数据片段）组成，可以从任何一方发送，并且有以下几种类型：

- "text frames" —— 包含各方发送给彼此的文本数据。
- "binary data frames" —— 包含各方发送给彼此的二进制数据。
- "ping/pong frames" 被用于检查从服务器发送的连接，浏览器会自动响应它们。
- 还有 "connection close frame" 以及其他服务 frames。

在浏览器里，我们仅直接使用文本或二进制 frames。

**WebSocket `.send()` 方法可以发送文本或二进制数据。**

`socket.send(body)` 调用允许 `body` 是字符串或二进制格式，包括 `Blob`，`ArrayBuffer` 等。不需要额外的设置：直接发送它们就可以了。

**当我们收到数据时，文本总是以字符串形式呈现。而对于二进制数据，我们可以在 `Blob` 和 `ArrayBuffer` 格式之间进行选择。**

它是由 `socket.bufferType` 属性设置的，默认为 `"blob"`，因此二进制数据通常以 `Blob` 对象呈现。

[Blob](info:blob) 是高级的二进制对象，它直接与 `<a>`，`<img>` 及其他标签集成在一起，因此，默认以 `Blob` 格式是一个明智的选择。但是对于二进制处理，要访问单个数据字节，我们可以将其改为 `"arraybuffer"`：

```js
socket.bufferType = "arraybuffer";
socket.onmessage = (event) => {
  // event.data 可以是文本（如果是文本），也可以是 arraybuffer（如果是二进制数据）
};
```

## 限速

想象一下：我们的应用程序正在生成大量要发送的数据。但是用户的网速却很慢，可能是在乡下的移动设备上。

我们可以一次又一次地调用 `socket.send(data)`。但是数据将会缓冲（储存）在内存中，并且只能在网速允许的情况下尽快将数据发送出去。

`socket.bufferedAmount` 属性储存目前已缓冲的字节的数量，等待通过网络发送。

我们可以检查它以查看 socket 是否真的可用于传输。

```js
// 每 100ms 检查一次 socket 并发送更多数据
// 仅当所有现有的数据都被发送出去
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```


## 连接关闭

通常，当一方想要关闭连接时（浏览器和服务器都有相同的权限），它们会发送带有状态码（numeric code）和文本形式的原因的 “connection close frame”。

它的方法是：
```js
socket.close([code], [reason]);
```

- `code` 是一个特殊的 WebSocket 状态码（可选）
- `reason` 是一个描述关闭连接的原因的字符串（可选）

然后，另外一方通过 `close` 事件处理器获取了状态码和关闭原因，例如：

```js
// 关闭方：
socket.close(1000, "Work complete");

// 另一方
socket.onclose = event => {
  // event.code === 1000
  // event.reason === "Work complete"
  // event.wasClean === true（完成关闭）
};
```

常见状态码：

- `1000` —— 默认，正常关闭（如果没有指明 `code` 时使用它），
- `1006` —— 没有办法手动指定这个值，表示连接丢失（没有 close frame）。

以及其他值：

- `1001` —— 一方打算离开，例如：服务器正在关机，或者从浏览器上离开页面，
- `1009` —— 消息太长而不能处理，
- `1011` —— 服务器意外出错，
- ……等等。

请参阅 [RFC6455, §7.4.1](https://tools.ietf.org/html/rfc6455#section-7.4.1) 以了解更多连接关闭状态码。

WebSocket 状态码有点像 HTTP 状态码，但它们是不同的。特别是当我们尝试设置任何小于 `1000` 的状态码时将会出错。

```js
// 如果连接断开
socket.onclose = event => {
  // event.code === 1006
  // event.reason === ""
  // event.wasClean === false（没有 closing frame）
};
```


## 连接状态（Connection state）

要获取连接状态，可以通过 `socket.readyState` 属性值来获取：

- **`0`** —— “CONNECTING”：连接还未建立，
- **`1`** —— “OPEN”：通信中，
- **`2`** —— “CLOSING”：连接关闭中，
- **`3`** —— “CLOSED”：连接已关闭。


## Chat 例子

让我们通过浏览器的 WebSocket API 和 Node.js 的 WebSocket 模块 <https://github.com/websockets/ws> 来回顾一下上述 chat 例子。

HTML：`<form>` 用于发送消息，`<div>` 用于显示接收到的消息：

```html
<!-- 消息 form -->
<form name="publish">
  <input type="text" name="message">
  <input type="submit" value="Send">
</form>

<!-- div 显示消息 -->
<div id="messages"></div>
```

JavaScript 代码也很简单。我们打开一个 socket，然后提交表单 —— `socket.send(message)`，对于传入的消息 —— 附加到 `div#messages` 上即可：

```js
let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// form 发送消息
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// div#messages 显示消息
socket.onmessage = function(event) {
  let message = event.data;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}
```

服务端代码有点超出我们的范围。我们使用的是浏览器 WebSocket API，服务端有其他库可用。

但它仍然很简单。我们将 Node.js 与 <https://github.com/websockets/ws> 模块一起用于 Websocket。

服务端算法为：
1. 创建 `clients = new Set()` —— 一系列 sockets。
2. 对于每个可接受的 Websocket，`clients.add(socket)` 并为其消息添加 `message` 事件侦听器。
3. 当接收到消息：迭代所有客户端，并将消息发送给每个人。
4. 当连接关闭时：`clients.delete(socket)`。

```js
const ws = new require('ws');
const wss = new ws.Server({noServer: true});

const clients = new Set();

http.createServer((req, res) => {
  // 我们在这里仅处理 Websocket 连接
  // 在实际例子中我们将会有其他代码来处理非 Websocket 请求
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 50); // 最大消息长度为 50

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}
```


这里是运行示例：

[iframe src="chat" height="100" zip]

你也可以下载它（点击 iframe 右上角按钮可下载）然后在本地运行。运行之前请记得安装 [Node.js](https://nodejs.org/en/) 和 `npm install ws`。


## 总结

WebSocket 是一种在浏览器和服务器之间建立持久连接的现代方式。

- WebSockets 没有跨域限制。
- 浏览器对 WebSockets 支持很好。
- 可以发送/接收字符串和二进制数据。

WebSockets 的 API 很简单。

WebSockets 方法：
- `socket.send(data)`，
- `socket.close([code], [reason])`。

WebSockets 事件：
- `open`，
- `message`，
- `error`，
- `close`。

WebSocket 自身并不包含重新连接（reconnection），身份验证（authentication）和许多其他高级机制。因此有针对于此的客户端/服务端的库，并且可以手动实现这些功能。

有时候，为了将 WebSocket 集成到现有项目中，人们将主 HTTP 服务与 WebSocket 服务并行运行，并且它们之间共享同一个数据库。对于 WebSocket 请求使用一个通向 WebSocket 服务器的子域 `wss://ws.site.com`，而 `https://site.com` 则转到主 HTTP 服务器。

当然，其他集成方式也是可行的。许多服务器（例如 Node.js）可以同时支持 HTTP 和 WebSocket 协议。
