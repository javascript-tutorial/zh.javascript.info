importance: 5

---

# 检查空对象

写一个 `isEmpty(obj)` 函数，当对象没有属性的时候返回 `true`，否则返回 `false`。

应该像这样：

```js
let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false
```
