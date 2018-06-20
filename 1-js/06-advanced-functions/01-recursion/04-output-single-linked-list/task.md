importance: 5

---

# 输出一个单链表

假设我们有一个单链表（在 <info:recursion> 那章有讲过）：

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

编写一个可以逐个输出链表元素的函数 `printList(list)`。

使用两种方式实现：循环和递归。

哪个更好：用递归还是不用递归的？
