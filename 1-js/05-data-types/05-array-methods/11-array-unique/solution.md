遍历数组
- 对于每个元素，我们将检查结果数组是否已经有该元素。
- 如果有，则忽略，否则添加结果。

```js run demo
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
```

代码有效，但其中存在潜在的性能问题。

方法 `result.includes(str)` 在内部遍历数组 `result` 并将每个元素与 `str` 进行比较以找到匹配项。

所以如果 `result` 中有 `100` 个元素，并且没有一个匹配上 `str`，那么它将遍历整个 `result` 并进行完全的 `100` 比较。如果 `result` 很大，比如 `10000`，那么会有 `10000` 次的比较。

这本身并不是问题，因为 JavaScript 引擎速度非常快，所以遍历 10000 次就是几微秒的事。

但是我们在 `for `循环中为 `arr` 的每个元素做了这样的测试。

所以如果 `arr.length` 是 `10000`，我们会有 `10000 * 10000` = 100 百万的比较。好多啊。

所以该解决方案仅适用于小型数组。

进一步，在 <info:map-set-weakmap-weakset> 我们将看到如何优化它。
