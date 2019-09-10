使用 `'?'` 操作符标记一个问题：

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

使用 OR `||` (最短变体)：

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

请注意此处不需要 `age > 18` 附近的括号。它们的存在是为了更好的可读性。
