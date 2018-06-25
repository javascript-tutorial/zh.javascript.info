importance: 5

---

# 过滤唯一数组元素

定义 `arr` 为一个数组。

创建一个函数 `unique(arr)`，函数将返回一个数组，包含 `arr` 中所有元素且元素均唯一。

例如：

```js
function unique(arr) {
  /* 你的代码 */
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O
```

附：这里用到了 string 类型，但其实可以是任何类型的值。

附：使用 `Set` 来存储唯一的数值。
