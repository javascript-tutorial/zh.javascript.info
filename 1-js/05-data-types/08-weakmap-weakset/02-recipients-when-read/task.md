importance: 5

---

# 保存阅读日期

这儿有一个和 [上一个任务](info:task/recipients-read) 类似的 `messages` 数组。场景也相似。

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

现在的问题是：你建议采用什么数据结构来保存信息：“消息是什么时候被阅读的？”。

在前一个任务中我们只需要保存“是/否”。现在我们需要保存日期，并且它应该在消息被垃圾回收时也被从内存中清除。

P.S. 日期可以存储为内建的 `Date` 类的对象，稍后我们将进行介绍。
