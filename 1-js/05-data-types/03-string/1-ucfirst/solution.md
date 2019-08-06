我们不能“替换”第一个字符，因为在 JavaScript 中字符串是不可变的。

但是我们可以根据已有字符串创建一个首字母大写的新字符串：

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

这里存在一个小问题。如果 `str` 是空的，那么 `str[0]` 就是 `undefined`，但由于 `undefined` 并没有 `toUpperCase()` 方法，因此我们会得到一个错误。

存在如下两种变体：

1. 使用 `str.charAt(0)`，因为它总是会返回一个字符串（可能为空）。
2. 为空字符添加测试。

这是第二种变体：

```js run
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```

