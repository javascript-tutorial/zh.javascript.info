importance: 4

---

# 是否需要 “else”？

如果参数 `age` 大于 `18`，那么下面的函数将返回 `true`。

否则它将会要求进行确认，并返回确认结果：

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('父母允许吗？');
  }
*/!*
}
```

如果 `else` 被删除，函数的工作方式会不同吗？

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('父母允许吗？');
*/!*
}
```

这两个变体的行为是否有区别？
