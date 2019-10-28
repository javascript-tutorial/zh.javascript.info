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

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/05-recipients-when-read/task.md
在前一个任务中我们只需要保存“是/否”。现在我们需要保存日期，并且它也应该在消息没有了就消失。
=======
In the previous task we only needed to store the "yes/no" fact. Now we need to store the date, and it should only remain in memory until the message is garbage collected.

P.S. Dates can be stored as objects of built-in `Date` class, that we'll cover later.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0:1-js/05-data-types/08-weakmap-weakset/02-recipients-when-read/task.md
