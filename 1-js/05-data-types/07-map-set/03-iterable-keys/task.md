importance: 5

---

# 迭代键

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/03-iterable-keys/task.md
我们希望得到 `map.keys()` 的数组然后继续对它进行处理（脱离开 map 本身）。

但是有这样一个问题：
=======
We'd like to get an array of `map.keys()` in a variable and then do apply array-specific methods to it, e.g. `.push`.

But that doesn't work:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b:1-js/05-data-types/07-map-set/03-iterable-keys/task.md

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/03-iterable-keys/task.md
// 错误：numbers.push 不是一个函数
=======
// Error: keys.push is not a function
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b:1-js/05-data-types/07-map-set/03-iterable-keys/task.md
keys.push("more");
*/!*
```

为什么？我们如何修改代码让 `keys.push` 正常工作？
