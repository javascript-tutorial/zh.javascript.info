# 长轮询（long polling）

长轮询是与服务器建立持久连接的最简单方法，它不使用任何特定协议，比如 WebSocket 或者服务端事件（Server Side Events）。

它很容易实现，在很多场景下也很好用。

## 普通轮询（regular Polling）

最简单的从服务器获取新信息的方式就是轮询。

也就是说，定期向服务器发出请求：“Hello, I'm here, do you have any information for me?”。例如，10 秒发送一次。

作为响应，服务器首先通知自己客户端在线，然后第二次 —— 发送直到那个时刻的消息包。

这很有效，但是也有些缺点：
1. 消息的传递时间长达 10 秒（每个请求之间）。
2. 即使没有消息，服务器也会每隔 10 秒被请求轰炸一次。对于后端来说，出于性能的考量，这是一个非常大的负担。

因此，如果我们讨论的是一个小型的服务，这种方法是可行的，但是一般来说，它需要一些改进。

## 长轮询（long polling）

所谓“长轮询”是一种更好的轮询服务器的方法。

它非常容易实现，并且可以无延迟地传递消息。

其流程为：

1. 发送请求到服务器。
2. 服务器在有消息之前不会关闭连接。
3. 当消息出现 —— 服务器响应请求，并携带相应的数据。
4. 浏览器马上创建一个新的请求。

当浏览器发送一个请求并与服务器建立挂起（pending）连接的情况是此方法的标准。仅仅在传递消息时，才会重新建立连接。

![](long-polling.png)

如果连接丢失，可能是因为网络错误，浏览器立即发送一个新请求。

发出长请求的客户端 `subscribe` 函数的草图：

```js
async function subscribe() {
  let response = await fetch("/subscribe");

  if (response.status == 502) {
    // 连接超时错误，
    // 当连接挂起太长可能会发生，远程服务器或者代理会关闭它
    // 重新连接
    await subscribe();
  } else if (response.status != 200) {
    // 显示错误
    showMessage(response.statusText);
    // 1 秒后重连
    await new Promise(resolve => setTimeout(resolve, 1000));
    await subscribe();
  } else {
    // 得到消息
    let message = await response.text();
    showMessage(message);
    await subscribe();
  }
}

subscribe();
```

你可以看到，`subscribe` 函数发起 fetch 请求，然后等待请求响应并处理它，然后再调用自己。

```warn header="对于许多的挂起连接，服务器也应该能够很好的处理"
服务器架构必须能够处理许多挂起连接。

某些服务器架构是每个连接对应一个进程。对于许多连接的情况，可能会有许多进程，每个进程占用很多内存。因此连接越多消耗也就越多。

这种情况通常是对于使用 PHP，Ruby 语言的后端，但是从技术上来说，它不是一种语言，而是实现的问题。

使用 Node.js 写的后端通常不会出现这样的问题。
```

## Demo：chat

这是一个 demo：

[codetabs src="longpoll" height=500]

## 使用场景

在消息很少的情况下，长轮询很有效。

如果消息比较频繁，那么上面描绘的请求接收（requesting-receiving）消息的图表就会变成锯状（saw-like）。

每条消息都是单独的请求，带有 headers，authentication 等开销。

因此，在这种情况下，首选另一种方法，例如：[Websocket](info:websocket) 或者 [Server Sent Events](info:server-sent-events)。
