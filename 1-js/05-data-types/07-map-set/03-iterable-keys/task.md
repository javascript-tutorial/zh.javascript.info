importance: 5

---

# 迭代键

我们希望得到 `map.keys()` 的数组然后继续对它进行处理（脱离开 map 本身）。

但是有这样一个问题：

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// 错误：numbers.push 不是一个函数
keys.push("more");
*/!*
```

为什么？我们如何修改代码让 `keys.push` 正常工作？
