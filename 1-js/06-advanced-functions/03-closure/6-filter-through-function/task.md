importance: 5

---

# 通过函数筛选

数组中有个内建的 `arr.filter(f)` 方法。它通过函数 `f` 过滤元素。如果返回 `true`的，那么元素会被返回到结果数组中。

制造一系列『马上能用』的筛选（方法）：

- `inBetween(a, b)` —— 在 `a` 和 `b` 之间或与它们相等（包括）。
- `inArray([...])` —— 包含在给定的数组中。

用法如下所示：

- `arr.filter(inBetween(3,6))` —— 只挑选 3 和 6 之间的值。
- `arr.filter(inArray([1,2,3]))` —— 只挑选与 `[1,2,3]` 其中成员匹配的元素。

For instance:

```js
/* .. inBetween 和 inArray 的代码 */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

