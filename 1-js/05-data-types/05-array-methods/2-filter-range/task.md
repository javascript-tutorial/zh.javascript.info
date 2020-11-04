importance: 4

---

# 过滤范围

写一个函数 `filterRange(arr, a, b)`，该函数获取一个数组 `arr`，在其中查找数值大于或等于 `a`，且小于或等于 `b` 的元素，并将结果以数组的形式返回。

该函数不应该修改原数组。它应该返回新的数组。

例如：

```js
let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4); 

alert( filtered ); // 3,1（匹配值）

alert( arr ); // 5,3,8,1（未修改）
```

