importance: 5

---

# 迭代键

我们期望使用 `map.keys()` 得到一个数组，然后使用特定的方法例如 `.push` 等，对其进行处理。

但是运行不了：

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: keys.push is not a function
keys.push("more");
*/!*
```

为什么？我们应该如何修改代码让 `keys.push` 工作？
