# Server Sent Events

[Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) 标准描述了一个内建的类 `EventSource`，它能保持与服务器的连接并允许从中接收事件。

类似于 `WebSocket`，其连接是持久的。

但是两者之间也有几个重要的区别：

| `WebSocket` | `EventSource` |
|-------------|---------------|
| 双向（Bi-directional）：客户端和服务端都能修改消息 | 单向（ One-directional）：仅服务端能发送消息 |
| 二进制和文本数据 | 仅文本数据 |
| WebSocket 协议 | 普通 HTTP 协议 |

与 `WebSocket` 相比，`EventSource` 是一种与服务器通信的低配版本。

我们为什么要使用它呢？

主要原因是：简单。在许多应用中，`WebSocket` 有点大材小用。

我们需要从服务器接收数据流：可能是聊天消息或者商品价格等等。这是 `EventSource` 擅长之处。它支持自动重新连接，而这在 `WebSocket` 中这个功能我们要手动实现。另外，它是一个普通的我们熟知的 HTTP，而不是其他新协议。

## 获取消息

要开始接收消息，我们只需要创建 `new EventSource(url)` 即可。

浏览器将会连接到 `url` 并保持连接开启等待事件到来。

服务器应该响应状态码为 200 并返回响应头 `Content-Type: text/event-stream`，然后保持此连接并以一种特殊的格式写入消息，就像这样：

```
data: Message 1

data: Message 2

data: Message 3
data: of two lines
```

- `data:` 后为消息文本，分号后面的空格是可选的。
- 消息以双换行符 `\n\n` 分隔。
- 要发送换行 `\n`，我们可以在要换行的位置添加一个 `data:`（上面的第三条消息）。

在实际开发中，复杂的消息通常是用 JSON 编码后发送。换行符在其中编码为 `\n`，因此不需要多行 `data:` 消息。

例如：

```js
data: {"user":"John","message":"First line*!*\n*/!* Second line"}
```

……因此我们可以假设一个 `data:` 只包含一条消息。

对每个消息，生成 `message` 事件：

```js
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
  console.log("New message", event.data);
  // 对于上面的数据，将会打印三次
};

// 或者 eventSource.addEventListener('message', ...)
```

### 跨域请求

`EventSource` 支持跨域请求，就像 `fetch` 任何其他的网络方法。我们可以使用任何 URL：

```js
let source = new EventSource("https://another-site.com/events");
```

远程服务器将会获取到 `Origin` 请求头，并且必须以 `Access-Control-Allow-Origin` 响应才能继续。

要传递凭证（credentials），我们应该设置附加选项 `withCredentials`，就像这样：

```js
let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

请参见 <info:fetch-crossorigin> 章节以了解更多关于跨域头的细节信息。


## 重新连接

创建之后，`new EventSource` 连接到服务器，如果连接断开 —— 则重新连接。

这很方便，我们不用去关心重新连接的事情。

每次重新连接之间有一点小的延迟，默认为几秒钟。

服务器可以使用 `retry:` 设置需要的延迟响应时间（以毫秒为单位）。

```js
retry: 15000
data: Hello, I set the reconnection delay to 15 seconds
```

`retry:` 既可以与某些数据一起出现，也可以作为独立的消息出现。

浏览器需要等待很长时间才能再次重新连接。或者更长，例如：如果浏览器知道（从系统知道的）此时没有网络连接，它可能会等到连接出现，然后重试。

- 如果服务器想要浏览器停止重新连接，那么它应该返回 HTTP 代码 204。
- 如果浏览器想要关闭连接，它应该调用 `eventSource.close()`：

```js
let eventSource = new EventSource(...);

eventSource.close();
```

另外，如果响应具有不正确的 `Content-Type` 或者其 HTTP 状态码不是 301，307，200 和 204，则不重新连接。发出 `"error"` 事件的连接，浏览器不会重新连接。

```smart
当连接最终被关闭时，就无法再“重新打开”它了。如果我们想再次连接，只需要创建一个新的 `EventSource`。
```

## 消息 id

当一个连接由于网络问题而断开时，客户端和服务器都无法确定哪些消息已经收到哪些没有收到。

要正确的恢复连接，每条消息都应该有一个 `id` 字段，就像这样：

```
data: Message 1
id: 1

data: Message 2
id: 2

data: Message 3
data: of two lines
id: 3
```

当收到带有 `id` 的消息时，浏览器会：

- 将属性 `eventSource.lastEventId` 设置为其值。
- 重新连接时，使用该 `id` 发送 `Last-Event-ID` 请求头，以便服务器可以重新发送后面的消息。

```smart header="把 `id:` 放到 `data:` 后"
请注意：`id` 是被服务器附加到 `data` 消息后的，以确保在收到消息后更新 `lastEventId`。
```

## 连接状态：readyState

`EventSource` 对象有 `readyState` 属性，具有下列其中一个值：

```js no-beautify
EventSource.CONNECTING = 0; // 连接中或者重连中
EventSource.OPEN = 1;       // 已连接
EventSource.CLOSED = 2;     // 连接关闭
```

创建对象或者连接断开时，它始终是 `EventSource.CONNECTING`（等于 `0`）。

我们可以查询这个属性以了解 `EventSource` 的状态。

## Event types

By default `EventSource` object generates three events:

- `message` -- a message received, available as `event.data`.
- `open` -- the connection is open.
- `error` -- the connection could not be established, e.g. the server returned HTTP 500 status.

The server may specify another type of event with `event: ...` at the event start.

For example:

```
event: join
data: Bob

data: Hello

event: leave
data: Bob
```

To handle custom events, we must use `addEventListener`, not `onmessage`:

```js
eventSource.addEventListener('join', event => {
  alert(`Joined ${event.data}`);
});

eventSource.addEventListener('message', event => {
  alert(`Said: ${event.data}`);
});

eventSource.addEventListener('leave', event => {
  alert(`Left ${event.data}`);
});
```

## Full example

Here's the server that sends messages with `1`, `2`, `3`, then `bye` and breaks the connection.

Then the browser automatically reconnects.

[codetabs src="eventsource"]

## Summary

`EventSource` object automatically establishes a persistent connection and allows the server to send messages over it.

It offers:
- Automatic reconnect, with tunable `retry` timeout.
- Message ids to resume events, the last received identifier is sent in `Last-Event-ID` header upon reconnection.
- The current state is in the `readyState` property.

That makes `EventSource` a viable alternative to `WebSocket`, as it's more low-level and lacks such built-in features (though they can be implemented).

In many real-life applications, the power of `EventSource` is just enough.

Supported in all modern browsers (not IE).

The syntax is:

```js
let source = new EventSource(url, [credentials]);
```

The second argument has only one possible option: `{ withCredentials: true }`, it allows sending cross-domain credentials.

Overall cross-domain security is same as for `fetch` and other network methods.

### Properties of an `EventSource` object

`readyState`
: The current connection state: either `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` or `EventSource.CLOSED (=2)`.

`lastEventId`
: The last received `id`. Upon reconnection the browser sends it in the header `Last-Event-ID`.

### Methods

`close()`
: Closes the connection.

### Events

`message`
: Message received, the data is in `event.data`.

`open`
: The connection is established.

`error`
: In case of an error, including both lost connection (will auto-reconnect) and fatal errors. We can check `readyState` to see if the reconnection is being attempted.

The server may set a custom event name in `event:`. Such events should be handled using `addEventListener`, not `on<event>`.

### Server response format

The server sends messages, delimited by `\n\n`.

A message may have following fields:

- `data:` -- message body, a sequence of multiple `data` is interpreted as a single message, with `\n` between the parts.
- `id:` -- renews `lastEventId`, sent in `Last-Event-ID` on reconnect.
- `retry:` -- recommends a retry delay for reconnections in ms. There's no way to set it from JavaScript.
- `event:` -- even name, must precede `data:`.

A message may include one or more fields in any order, but `id:` usually goes the last.
