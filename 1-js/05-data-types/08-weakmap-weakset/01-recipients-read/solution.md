让我们将已读消息存储在 `WeakSet` 中：

```js run
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// 两个消息已读
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages 包含两个元素

// ……让我们再读一遍第一条消息！
readMessages.add(messages[0]);
// readMessages 仍然有两个不重复的元素

// 回答：message[0] 已读？
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// 现在 readMessages 有一个元素（技术上来讲，内存可能稍后才会被清理）
```

`WeakSet` 允许存储一系列的消息，并且很容易就能检查它是否包含某个消息。

它会自动清理自身。代价是，我们不能对它进行迭代，也不能直接从中获取“所有已读消息”。但是，我们可以通过遍历所有消息，然后找出存在于 set 的那些消息来完成这个功能。

另一种不同的解决方案可以是，在读取消息后向消息添加诸如 `message.isRead=true` 之类的属性。由于 `messages` 对象是由另一个代码管理的，因此通常不建议这样做，但是我们可以使用 symbol 属性来避免冲突。

像这样：
```js
// symbol 属性仅对于我们的代码是已知的
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

现在，第三方代码可能看不到我们的额外属性。

尽管 symbol 可以降低出现问题的可能性，但从架构的角度来看，还是使用 `WeakSet` 更好。
