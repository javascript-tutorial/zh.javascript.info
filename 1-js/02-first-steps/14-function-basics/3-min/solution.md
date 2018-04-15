使用 `if` 的解决方案：

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

使用 `'?'` 运算符的解决方案：

```js
function min(a, b) {
  return a < b ? a : b;
}
```

P.S. 在等式 `a == b` 的情况下，返回的结果是无关紧要的。
