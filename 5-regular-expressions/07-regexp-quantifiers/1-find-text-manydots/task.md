importance: 5

---

#  如何找到省略号 "..." ？

创建一个正则表达式来查找省略号：连续 3（或更多）个点。

来一探究竟：

```js
let reg = /your regexp/g;
alert( "Hello!... How goes?.....".match(reg) ); // ..., .....
```
