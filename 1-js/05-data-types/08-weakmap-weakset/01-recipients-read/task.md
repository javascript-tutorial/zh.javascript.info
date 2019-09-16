importance: 5

---

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

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/task.md
附：我们不能直接修改消息对象。如果它们被其他代码管理，那么给他们添加额外的属性可能导致不好的后果。
=======
P.P.S. We shouldn't modify message objects, add our properties to them. As they are managed by someone else's code, that may lead to bad consequences.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/task.md
