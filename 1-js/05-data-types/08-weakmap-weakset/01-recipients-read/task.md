importance: 5

---

<<<<<<< HEAD
# 存储 "unread" 标识

这里有一个 messages 数组：

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];
```

你的代码可以访问它，但是消息被其他代码管理。这段代码有规律的添加新消息，删除旧消息，而且你不知道这些操作发生的时间。

现在，你应该是用什么数据结构来保存消息是否已读这个信息？这个结构必须很适合给出当前已知的消息对象是否已读的答案。

附：当消息被从 `messages` 中移除的时候，它应该也从你的数据结构中消失。

附：我们不能直接修改消息对象。如果它们被其他代码管理，那么给他们添加额外的属性可能导致不好的后果。
=======
# Store "unread" flags

There's an array of messages:

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

Your code can access it, but the messages are managed by someone else's code. New messages are added, old ones are removed regularly by that code, and you don't know the exact moments when it happens.

Now, which data structure could you use to store information about whether the message "has been read"? The structure must be well-suited to give the answer "was it read?" for the given message object.

P.S. When a message is removed from `messages`, it should disappear from your structure as well.

P.P.S. We shouldn't modify message objects, add our properties to them. As they are managed by someone else's code, that may lead to bad consequences.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
