使用问号运算符 `'?'`：

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

使用或运算符 `||`（最短的变体）：

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

请注意此处不需要 `age > 18` 左右的括号。写上括号是为了提高可读性。
