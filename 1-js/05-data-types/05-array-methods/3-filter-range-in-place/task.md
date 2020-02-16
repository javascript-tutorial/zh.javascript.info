importance: 4

---

# 原位（in place）过滤范围

写一个函数 `filterRangeInPlace(arr, a, b)`，该函数获取一个数组 `arr`，并删除其中介于 `a` 和 `b` 区间以外的所有值。检测：`a ≤ arr[i] ≤ b`。

该函数应该只修改数组。它不应该返回任何东西。

例如：
```js
let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // 删除了范围在 1 到 4 之外的所有值

alert( arr ); // [3, 1]
```
