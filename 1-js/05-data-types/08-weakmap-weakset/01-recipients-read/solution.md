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

它会自动清理自身。代价是，我们不能对它进行迭代，也不能直接从中获取“所有已读消息”。但是，我们可以通过迭代所有消息，然后找出存在于 set 的那些消息来完成这个功能。

Another, different solution could be to add a property like `message.isRead=true` to a message after it's read. As messages objects are managed by another code, that's generally discouraged, but we can use a symbolic property to avoid conflicts.

像这样：
```js
// the symbolic property is only known to our code
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

现在，第三方代码可能看不到我们的额外属性。

Although symbols allow to lower the probability of problems, using `WeakSet` is better from the architectural point of view.
