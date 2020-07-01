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

使用问号运算符 `'?'` 的解决方案：

```js
function min(a, b) {
  return a < b ? a : b;
}
```

P.S. 在 `a == b` 的情况下，返回什么都无关紧要。
