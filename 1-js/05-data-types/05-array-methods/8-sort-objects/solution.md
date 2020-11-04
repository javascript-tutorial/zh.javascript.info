```js run no-beautify
function sortByAge(arr) {
  arr.sort((a, b) => a.age - b.age);
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// 排序后的数组为：[john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```

译注：解决方案的代码还可以更短一些

```js
function sortByAge(arr) {
  arr.sort((a, b) => a.age - b.age);
}
```

因为 `sort()` 方法的语法为 `arr.sort([compareFunction])`，如果没有指明 `compareFunction`，那么元素会被按照转换为的字符串的诸个字符的 Unicode 编码进行排序，如果指明了 `compareFunction`，那么数组会按照调用该函数的返回值排序。即 `a` 和 `b` 是两个将要被比较的元素：

- 如果 `compareFunction(a, b)` 小于 `0`，那么 `a` 会被排列到 `b` 之前；
- 如果 `compareFunction(a, b)` 等于 `0`，那么 `a` 和 `b` 的相对位置不变。备注：ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
- 如果 `compareFunction(a, b)` 大于 `0`，那么 `b` 会被排列到 `a` 之前。

因此，升序排列的函数可以简写为：`(a, b) => a.age - b.age`。
