importance: 5

---

# 搜索算法

本题目有两个部分。

给定以下对象：

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

1. 使用 `__proto__` 来分配原型，以使得任何属性的查找都遵循以下路径：`pockets` -> `bed` -> `table` -> `head`。例如，`pockets.pen` 应该是 `3`（在 `table` 中找到），`bed.glasses` 应该是 `1`（在 `head` 中找到）。
2. 回答问题：通过 `pockets.glasses` 或 `head.glasses` 获取 `glasses`，哪个更快？必要时需要进行基准测试。
