importance: 5

---

# 保存阅读日期

这里有一个和[前一任务](info:task/recipients-read)相像的消息数组。情境相似。

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];
```

现在的问题是：你建议采用什么数据结构来保存信息：“消息是什么时候被阅读的？”。

在前一个任务中我们只需要保存“是/否”。现在我们需要保存日期，并且它也应该在消息没有了就消失。
