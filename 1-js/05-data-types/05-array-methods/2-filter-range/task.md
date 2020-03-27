importance: 4

---

# 过滤范围

写一个函数 `filterRange(arr, a, b)`，该函数获取一个数组 `arr`，在其中查找数值大小在 `a` 和 `b` 之间的元素，并返回它们的数组。

该函数不应该修改原数组。它应该返回新的数组。

例如：

```js
let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4); 

alert( filtered ); // 3,1（匹配值）

alert( arr ); // 5,3,8,1（未修改）
```

