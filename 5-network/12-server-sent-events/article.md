# Server Sent Events

<<<<<<< HEAD
[Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) 规范描述了一个内建的类 `EventSource`，它能保持与服务器的连接，并允许从中接收事件。

与 `WebSocket` 类似，其连接是持久的。

但是两者之间有几个重要的区别：

| `WebSocket` | `EventSource` |
|-------------|---------------|
| 双向：客户端和服务端都能交换消息 | 单向：仅服务端能发送消息 |
| 二进制和文本数据 | 仅文本数据 |
| WebSocket 协议 | 常规 HTTP 协议 |

与 `WebSocket` 相比，`EventSource` 是与服务器通信的一种不那么强大的方式。

我们为什么要使用它？

主要原因：简单。在很多应用中，`WebSocket` 有点大材小用。

我们需要从服务器接收一个数据流：可能是聊天消息或者市场价格等。这正是 `EventSource` 所擅长的。它还支持自动重新连接，而在 `WebSocket` 中这个功能需要我们手动实现。此外，它是一个普通的旧的 HTTP，不是一个新协议。

## 获取消息

要开始接收消息，我们只需要创建 `new EventSource(url)` 即可。

浏览器将会连接到 `url` 并保持连接打开，等待事件。

服务器响应状态码应该为 200，header 为 `Content-Type: text/event-stream`，然后保持此连接并以一种特殊的格式写入消息，就像这样：
=======
The [Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) specification describes a built-in class `EventSource`, that keeps connection with the server and allows to receive events from it.

Similar to `WebSocket`, the connection is persistent.

But there are several important differences:

| `WebSocket` | `EventSource` |
|-------------|---------------|
| Bi-directional: both client and server can exchange messages | One-directional: only server sends data |
| Binary and text data | Only text |
| WebSocket protocol | Regular HTTP |

`EventSource` is a less-powerful way of communicating with the server than `WebSocket`.

Why should one ever use it?

The main reason: it's simpler. In many applications, the power of `WebSocket` is a little bit too much.

We need to receive a stream of data from server: maybe chat messages or market prices, or whatever. That's what `EventSource` is good at. Also it supports auto-reconnect, something  we need to implement manually with `WebSocket`. Besides, it's a plain old HTTP, not a new protocol.

## Getting messages

To start receiving messages, we just need to create `new EventSource(url)`.

The browser will connect to `url` and keep the connection open, waiting for events.

The server should respond with status 200 and the header `Content-Type: text/event-stream`, then keep the connection and write messages into it in the special format, like this:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```
data: Message 1

data: Message 2

data: Message 3
data: of two lines
```

<<<<<<< HEAD
- `data:` 后为消息文本，冒号后面的空格是可选的。
- 消息以双换行符 `\n\n` 分隔。
- 要发送一个换行 `\n`，我们可以在要换行的位置立即再发送一个 `data:`（上面的第三条消息）。

在实际开发中，复杂的消息通常是用 JSON 编码后发送。换行符在其中编码为 `\n`，因此不需要多行 `data:` 消息。

例如：
=======
- A message text goes after `data:`, the space after the colon is optional.
- Messages are delimited with double line breaks `\n\n`.
- To send a line break `\n`, we can immediately send one more `data:` (3rd message above).

In practice, complex messages are usually sent JSON-encoded. Line-breaks are encoded as `\n` within them, so multiline `data:` messages are not necessary.

For instance:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
data: {"user":"John","message":"First line*!*\n*/!* Second line"}
```

<<<<<<< HEAD
……因此，我们可以假设一个 `data:` 只保存了一条消息。

对于每个这样的消息，都会生成 `message` 事件：
=======
...So we can assume that one `data:` holds exactly one message.

For each such message, the `message` event is generated:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
  console.log("New message", event.data);
<<<<<<< HEAD
  // 对于上面的数据流将打印三次
};

// 或 eventSource.addEventListener('message', ...)
```

### 跨源请求

`EventSource` 支持跨源请求，就像 `fetch` 任何其他网络方法。我们可以使用任何 URL：
=======
  // will log 3 times for the data stream above
};

// or eventSource.addEventListener('message', ...)
```

### Cross-origin requests

`EventSource` supports cross-origin requests, like `fetch` any other networking methods. We can use any URL:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
let source = new EventSource("https://another-site.com/events");
```

<<<<<<< HEAD
远程服务器将会获取到 `Origin` header，并且必须以 `Access-Control-Allow-Origin` 响应来处理。

要传递凭证（credentials），我们应该设置附加选项 `withCredentials`，就像这样：
=======
The remote server will get the `Origin` header and must respond with `Access-Control-Allow-Origin` to proceed.

To pass credentials, we should set the additional option `withCredentials`, like this:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

<<<<<<< HEAD
更多关于跨源 header 的详细内容，请参见 <info:fetch-crossorigin>。


## 重新连接

创建之后，`new EventSource` 连接到服务器，如果连接断开 —— 则重新连接。

这非常方便，我们不用去关心重新连接的事情。

每次重新连接之间有一点小的延迟，默认为几秒钟。

服务器可以使用 `retry:` 来设置需要的延迟响应时间（以毫秒为单位）。
=======
Please see the chapter <info:fetch-crossorigin> for more details about cross-origin headers.


## Reconnection

Upon creation, `new EventSource` connects to the server, and if the connection is broken -- reconnects.

That's very convenient, as we don't have to care about it.

There's a small delay between reconnections, a few seconds by default.

The server can set the recommended delay using `retry:` in response (in milliseconds):
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
retry: 15000
data: Hello, I set the reconnection delay to 15 seconds
```

<<<<<<< HEAD
`retry:` 既可以与某些数据一起出现，也可以作为独立的消息出现。

在重新连接之前，浏览器需要等待那么多毫秒。甚至更长，例如，如果浏览器知道（从操作系统）此时没有网络连接，它会等到连接出现，然后重试。

- 如果服务器想要浏览器停止重新连接，那么它应该使用 HTTP 状态码 204 进行响应。
- 如果浏览器想要关闭连接，则应该调用 `eventSource.close()`：
=======
The `retry:` may come both together with some data, or as a standalone message.

The browser should wait that many milliseconds before reconnecting. Or longer, e.g. if the browser knows (from OS) that there's no network connection at the moment, it may wait until the connection appears, and then retry.

- If the server wants the browser to stop reconnecting, it should respond with HTTP status 204.
- If the browser wants to close the connection, it should call `eventSource.close()`:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
let eventSource = new EventSource(...);

eventSource.close();
```

<<<<<<< HEAD
并且，如果响应具有不正确的 `Content-Type` 或者其 HTTP 状态码不是 301，307，200 和 204，则不会进行重新连接。在这种情况下，将会发出 `"error"` 事件，并且浏览器不会重新连接。

```smart
当连接最终被关闭时，就无法“重新打开”它。如果我们想要再次连接，只需要创建一个新的 `EventSource`。
```

## 消息 id

当一个连接由于网络问题而中断时，客户端和服务器都无法确定哪些消息已经收到哪些没有收到。

为了正确地恢复连接，每条消息都应该有一个 `id` 字段，就像这样：
=======
Also, there will be no reconnection if the response has an incorrect `Content-Type` or its HTTP status differs from 301, 307, 200 and 204. In such cases the `"error"` event will be emitted, and the browser won't reconnect.

```smart
When a connection is finally closed, there's no way to "reopen" it. If we'd like to connect again, just create a new `EventSource`.
```

## Message id

When a connection breaks due to network problems, either side can't be sure which messages were received, and which weren't.

To correctly resume the connection, each message should have an `id` field, like this:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```
data: Message 1
id: 1

data: Message 2
id: 2

data: Message 3
data: of two lines
id: 3
```

<<<<<<< HEAD
当收到具有 `id` 的消息时，浏览器会：

- 将属性 `eventSource.lastEventId` 设置为其值。
- 重新连接后，发送带有 `id` 的 header `Last-Event-ID`，以便服务器可以重新发送后面的消息。

```smart header="把 `id:` 放在 `data:` 后"
请注意：`id` 被服务器附加到 `data` 消息后，以确保在收到消息后 `lastEventId` 会被更新。
```

## 连接状态：readyState

`EventSource` 对象有 `readyState` 属性，该属性具有下列值之一：

```js no-beautify
EventSource.CONNECTING = 0; // 连接中或者重连中
EventSource.OPEN = 1;       // 已连接
EventSource.CLOSED = 2;     // 连接已关闭
```

对象创建完成或者连接断开后，它始终是 `EventSource.CONNECTING`（等于 `0`）。

我们可以查询该属性以了解 `EventSource` 的状态。

## Event 类型

默认情况下 `EventSource` 对象生成三个事件：

- `message` —— 收到消息，可以用 `event.data` 访问。
- `open` —— 连接已打开。
- `error` —— 无法建立连接，例如，服务器返回 HTTP 500 状态码。

服务器可以在事件开始时使用 `event: ...` 指定另一种类型事件。

例如：
=======
When a message with `id:` is received, the browser:

- Sets the property `eventSource.lastEventId` to its value.
- Upon reconnection sends the header `Last-Event-ID` with that `id`, so that the server may re-send following messages.

```smart header="Put `id:` after `data:`"
Please note: the `id` is appended below message `data` by the server, to ensure that `lastEventId` is updated after the message is received.
```

## Connection status: readyState

The `EventSource` object has `readyState` property, that has one of three values:

```js no-beautify
EventSource.CONNECTING = 0; // connecting or reconnecting
EventSource.OPEN = 1;       // connected
EventSource.CLOSED = 2;     // connection closed
```

When an object is created, or the connection is down, it's always `EventSource.CONNECTING` (equals `0`).

We can query this property to know the state of `EventSource`.

## Event types

By default `EventSource` object generates three events:

- `message` -- a message received, available as `event.data`.
- `open` -- the connection is open.
- `error` -- the connection could not be established, e.g. the server returned HTTP 500 status.

The server may specify another type of event with `event: ...` at the event start.

For example:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```
event: join
data: Bob

data: Hello

event: leave
data: Bob
```

<<<<<<< HEAD
要处理自定义事件，我们必须使用 `addEventListener` 而非 `onmessage`：
=======
To handle custom events, we must use `addEventListener`, not `onmessage`:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

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

<<<<<<< HEAD
## 完整示例

服务器依次发送 `1`，`2`，`3`，最后发送 `bye` 并断开连接。

然后浏览器会自动重新连接。

[codetabs src="eventsource"]

## 总结

`EventSource` 对象自动建立一个持久的连接，并允许服务器通过这个连接发送消息。

它提供了：
- 在可调的 `retry` 超时内自动重新连接。
- 用于恢复事件的消息 id，重新连接后，最后接收到的标识符被在 `Last-Event-ID` header 中发送出去。
- 当前状态位于 `readyState` 属性中。

这使得 `EventSource` 成为 `WebSocket` 的一个可行的替代方案，因为 `WebSocket` 更低级（low-level），且缺乏这样的内建功能（尽管它们可以被实现）。

在很多实际应用中，`EventSource` 的功能就已经够用了。

`EventSource` 在所有现代浏览器（除了 IE）中都得到了支持。

语法：
=======
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
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

```js
let source = new EventSource(url, [credentials]);
```

<<<<<<< HEAD
第二个参数只有一个可选项：`{ withCredentials: true }`，它允许发送跨源凭证。

总体跨源安全性与 `fetch` 以及其他网络方法相同。

### `EventSource` 对象的属性

`readyState`
: 当前连接状态：为 `EventSource.CONNECTING (=0)`，`EventSource.OPEN (=1)`，`EventSource.CLOSED (=2)` 三者之一。

`lastEventId`
: 最后接收到的 `id`。重新连接后，浏览器在 header `Last-Event-ID` 中发送此 id。

### `EventSource` 对象的方法

`close()`
: 关闭连接。

### `EventSource` 对象的事件

`message`
: 接收到的消息，消息数据在 `event.data` 中。

`open`
: 连接已建立。

`error`
: 如果发生错误，包括连接丢失（将会自动重连）以及其他致命错误。我们可以检查 `readyState` 以查看是否正在尝试重新连接。

服务器可以在 `event:` 中设置自定义事件名称。应该使用 `addEventListener` 来处理此类事件，而不是使用 `on<event>`。

### 服务器响应格式

服务器发送由 `\n\n` 分隔的消息。

一条消息可能有以下字段：

- `data:` —— 消息体（body），一系列多个 `data` 被解释为单个消息，各个部分之间由 `\n` 分隔。
- `id:` —— 更新 `lastEventId`，重连时以 `Last-Event-ID` 发送此 id。
- `retry:` —— 建议重连的延迟，以 ms 为单位。无法通过 JavaScript 进行设置。
- `event:` —— 事件名，必须在 `data:` 之前。

一条消息可以按任何顺序包含一个或多个字段，但是 `id:` 通常排在最后。
=======
The second argument has only one possible option: `{ withCredentials: true }`, it allows sending cross-origin credentials.

Overall cross-origin security is same as for `fetch` and other network methods.

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
- `event:` -- event name, must precede `data:`.

A message may include one or more fields in any order, but `id:` usually goes the last.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
