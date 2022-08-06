importance: 5

---

#  如何找到省略号 "..."？

创建一个正则表达式来查找省略号：连续 3（或更多）个点。

例如：

```js
let regexp = /你的正则表达式/g;
alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....
```
