importance: 5

---

<<<<<<< HEAD
# 存储 "unread" 标识

这里有一个 messages 数组：
=======
# Store "unread" flags

There's an array of messages:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

<<<<<<< HEAD
你的代码可以访问它，但是 message 是由其他人的代码管理的。该代码会定期添加新消息，删除旧消息，但是你不知道这些操作确切的发生时间。

现在，你应该使用什么数据结构来保存关于消息“是否已读”的信息？该结构必须很适合对给定的 message 对象给出“它读了吗？”的答案。

P.S. 当一个消息被从 `messages` 中删除后，它应该也从你的数据结构中消失。

P.S. 我们不能修改 message 对象，例如向其添加我们的属性。因为它们是由其他人的代码管理的，我们修改该数据可能会导致不好的后果。
=======
Your code can access it, but the messages are managed by someone else's code. New messages are added, old ones are removed regularly by that code, and you don't know the exact moments when it happens.

Now, which data structure could you use to store information about whether the message "has been read"? The structure must be well-suited to give the answer "was it read?" for the given message object.

P.S. When a message is removed from `messages`, it should disappear from your structure as well.

P.P.S. We shouldn't modify message objects, add our properties to them. As they are managed by someone else's code, that may lead to bad consequences.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
