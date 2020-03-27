importance: 5

---

# 过滤数组中的唯一元素

定义 `arr` 为一个数组。

创建一个函数 `unique(arr)`，该函数返回一个由 `arr` 中所有唯一元素所组成的数组。

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

P.S. 这里用到了 string 类型，但其实可以是任何类型的值。

P.S. 使用 `Set` 来存储唯一值。
