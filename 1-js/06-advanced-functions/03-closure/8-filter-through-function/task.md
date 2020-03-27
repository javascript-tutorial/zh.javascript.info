importance: 5

---

# 通过函数筛选

我们有一个内建的数组方法 `arr.filter(f)`。它通过函数 `f` 过滤元素。如果它返回 `true`，那么该元素会被返回到结果数组中。

制造一系列“即用型”过滤器：

- `inBetween(a, b)` —— 在 `a` 和 `b` 之间或与它们相等（包括）。
- `inArray([...])` —— 包含在给定的数组中。

用法如下所示：

- `arr.filter(inBetween(3,6))` —— 只挑选范围在 3 到 6 的值。
- `arr.filter(inArray([1,2,3]))` —— 只挑选与 `[1,2,3]` 中的元素匹配的元素。

例如：

```js
/* .. inBetween 和 inArray 的代码 */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

