importance: 5

---

# 搜索算法

任务有两部分。

我们有一个对象：

```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

1. 使用 `__proto__` 来分配原型的方式，任何查找都会遵循路径：`pockets` -> `bed` -> `table` -> `head`。例如，`pockets.pen` 应该是 `3`（在 `table` 中找到）， `bed.glasses` 应该是 `1` （在 `head` 中找到）。
2. 回答问题：如果需要检测的话，将 `glasses` 作为 `pockets.glasses` 更快还是作为 `head.glasses` 更快？
