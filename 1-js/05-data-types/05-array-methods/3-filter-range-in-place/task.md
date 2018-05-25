importance: 4

---

# 范围过滤

写一个函数 `filterRangeInPlace(arr, a, b)` 获取一个数组 `arr`，并从中除去 `a` 和 `b` 之间的所有值。测试：`a ≤ arr[i] ≤ b`。

该函数只应修改数组。它不应该返回任何东西。

例如：
```js
let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // 删除了从 1 到 4 之外的数字

alert( arr ); // [3, 1]
```
